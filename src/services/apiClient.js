import api from "./api";
import constants from "@/config/constants";
import { notification } from "antd";
import Swal from "sweetalert2";
import "@/hooks/sweetalert.css";

// No need to import Helper, we'll use window.helper

/**
 * Simple fetch client for API requests
 */
const apiClient = {
  /**
   * The auth token, read fresh at call time rather than trusting whatever
   * window.user happened to hold since the last bootstrap/login. Falls back
   * to re-hydrating window.user from persisted storage if it's momentarily
   * empty — covers the case where a request is dispatched in the same tick
   * a token was just written elsewhere.
   * @returns {Promise<string|null>}
   */
  async getFreshToken() {
    let token = window.user?.api_token || window.user?.access_token;
    if (token) return token;

    if (window.helper?.getStorageData) {
      try {
        const stored = await window.helper.getStorageData("session");
        if (stored?.api_token || stored?.access_token) {
          window.user = { ...(window.user || {}), ...stored };
          token = stored.api_token || stored.access_token;
        }
      } catch (error) {
        console.error("[apiClient] Failed to re-read session storage for token:", error);
      }
    }
    if (token) return token;

    // Fallback: the author-area session (login()/register() in
    // src/auth/session.js) is written straight to a plain localStorage key
    // ('mjr.auth') independently of window.user/the encrypted "session"
    // blob above. If the token only ever landed there (e.g. the backend's
    // response shape wasn't one handleResponse's token-capture recognizes),
    // this is the last place left to check before giving up.
    try {
      const authSession = JSON.parse(localStorage.getItem("mjr.auth"));
      token = authSession?.api_token || authSession?.access_token || authSession?.token;
      if (token) {
        window.user = { ...(window.user || {}), api_token: token, access_token: token };
      }
    } catch (error) {
      console.error("[apiClient] Failed to read mjr.auth for token fallback:", error);
    }

    return token || null;
  },

  /**
   * Create a fetch request with common headers and options
   * @param {string} url - API URL
   * @param {Object} options - Fetch options
   * @param {string} endpoint - API endpoint name for token logic
   * @returns {Promise} - Fetch promise
   */
  async fetchApi(url, options = {}, endpoint = "") {
    const {
      data,
      useFormData = false,
      customHeaders = {},
      ...fetchOptions
    } = options;

    // Set up headers with CORS support
    const headers = new Headers();

    headers.append("Accept", "application/json");

    // Don't set Content-Type for FormData (the browser needs to set its own
    // multipart boundary). Otherwise always send it, GET included — some
    // backends key their JSON-vs-HTML response/auth handling off this header
    // being present on every request, not just ones with a body.
    if (!useFormData) {
      headers.append("Content-Type", "application/json");
    }

    // Define endpoints that should NOT send token
    const publicEndpoints = [
      "login",
      "signup",
      "forgotPassword",
      "verifyOtp",
      "resetPassword",
      "authorLogin",
      "authorRegistration",
      "authorForgotPassword",
      "authorResetPassword",
    ];

    // Add auth token if available and not a public endpoint. Re-read it from
    // persisted storage right here (rather than trusting whatever window.user
    // happened to hold since bootstrap) so a token captured moments ago by
    // another in-flight request is never missed by this one.
    const isPublicEndpoint = publicEndpoints.includes(endpoint);
    const token = isPublicEndpoint ? null : await this.getFreshToken();
    const hasToken = Boolean(token);

    if (hasToken) {
      // This backend expects the token under custom header keys ('Bearer',
      // 'token') rather than (or in addition to) the standard Authorization
      // header — sent on every protected request so it applies uniformly to
      // GET (paper-types) and POST (store) alike, not per-endpoint.
      headers.append("Bearer", token);
      headers.append("token", token);
      headers.append("Authorization", `Bearer ${token}`);
    } else if (!isPublicEndpoint) {
      // Protected endpoint with nothing to send — surface this loudly so a
      // missing/never-captured token is obvious instead of silently 401ing.
      console.warn(
        `[apiClient] "${endpoint}" is not public but no auth token is set on window.user — request will be sent without Authorization.`
      );
    }

    // Add custom headers
    Object.entries(customHeaders).forEach(([key, value]) => {
      headers.append(key, value);
    });

    // Prepare request options with CORS support
    const requestOptions = {
      ...fetchOptions,
      headers,
    };

    // Add body for non-GET and non-DELETE requests
    if (data && options.method !== "GET" && options.method !== "DELETE") {
      if (useFormData) {
        // Check if data is already a FormData object
        if (data instanceof FormData) {
          requestOptions.body = data;
        } else {
          // Create FormData from regular object
          const formData = new FormData();
          Object.entries(data).forEach(([key, value]) => {
            formData.append(key, value);
          });
          requestOptions.body = formData;
        }
      } else {
        requestOptions.body = JSON.stringify(data);
      }
    }

    // Log right before dispatch so it's easy to confirm the token that made
    // it into the headers is the one we expect (never logs the raw token).
    console.log(
      `[apiClient] ${options.method || "GET"} ${url} — Authorization: ${hasToken ? "Bearer ***" + token.slice(-6) : "(none)"}`
    );

    // TEMP DEBUG — dumps the exact headers being sent for paper-types and
    // any future protected write (papers/store) so header formatting can be
    // eyeballed directly, not just inferred from the token-suffix log above.
    // Remove once the 401 is confirmed fixed.
    if (endpoint === "getPaperTypes" || endpoint === "storePaper") {
      console.log(
        `[apiClient][DEBUG] Exact headers for "${endpoint}":`,
        Object.fromEntries(headers.entries())
      );
    }

    const response = await fetch(url, requestOptions);
    return { response, hasToken };
  },

  /**
   * Handle API response
   * @param {Response} response - Fetch response
   * @param {boolean} showSuccessNotification - Whether to show success notifications
   * @param {string} endpoint - API endpoint name
   * @param {string} method - HTTP method used for the request
   * @returns {Promise} - Parsed response data
   */
  async handleResponse(
    response,
    showSuccessNotification = false,
    endpoint = "",
    method = "",
    hasToken = false
  ) {
    // Get all headers into a plain object before consuming the response body
    const headers = {};
    for (const [key, value] of response.headers.entries()) {
      headers[key.toLowerCase()] = value;
    }
    const pagination = {
      currentPage: parseInt(headers["x-current-page"]),
      pageLimit: parseInt(headers["x-page-limit"]),
      totalCount: parseInt(headers["x-total-count"]),
      totalPages: parseInt(headers["x-total-pages"]),
    };

    const data = await response.json(); // Consume the response body

    if (response.ok) {
      // The backend always answers with HTTP 200, even on failure — the real
      // outcome is `data.status`. Treat an explicit `status: false` as an
      // error the same way an HTTP error status is handled below: notify and
      // throw, so callers (React Query mutations/queries) land in their error
      // path instead of onSuccess. Endpoints that don't send a `status` field
      // at all are left alone, so this doesn't affect responses that never
      // used this convention (e.g. the journal endpoints).
      if (data && data.status === false) {
        const description = data.message || data.error || "Something went wrong";
        notification.error({
          message: "",
          description,
          duration: 4,
        });
        throw { status: response.status, ...data };
      }

      // Handle token updates from response headers for login and signup
      const tokenUpdateEndpoints = [
        "signup",
        "login",
        "authorLogin",
        "authorRegistration",
      ];

      if (tokenUpdateEndpoints.includes(endpoint)) {
        // The token can arrive as a response header OR inside the JSON body
        // (this backend uses the body — headers alone were silently missing
        // it, so window.user.api_token never got set and every later
        // authenticated call 401'd immediately, e.g. on Step 1's mount).
        // Check every shape we've seen before falling back to nothing.
        const bodyToken =
          data?.access_token ||
          data?.token ||
          data?.api_token ||
          data?.data?.access_token ||
          data?.data?.token ||
          data?.data?.api_token ||
          data?.data?.user?.access_token ||
          data?.data?.user?.token;

        const headerToken =
          headers["access_token"] ||
          headers["access-token"] ||
          headers["authorization"];

        const rawToken = bodyToken || headerToken;

        if (rawToken) {
          // Clean the token (remove 'Bearer ' prefix if present)
          const cleanToken = rawToken.replace(/^Bearer\s+/i, "");

          // Add token to response data if not already present
          if (!data.access_token && !data.api_token) {
            data.api_token = cleanToken;
          }

          // Update the global user object and storage for login/signup
          if (window.user) {
            // Store token in both fields for compatibility
            window.user.api_token = cleanToken;
            window.user.access_token = cleanToken;

            // Update storage with the new token
            if (window.helper && window.helper.setStorageData) {
              try {
                await window.helper.setStorageData("session", window.user);
              } catch (error) {
                console.error("Error updating storage with new token:", error);
              }
            }
          }
          console.log(`[apiClient] Captured auth token from "${endpoint}" response (${bodyToken ? "body" : "header"}).`);
        } else {
          console.warn(
            `[apiClient] "${endpoint}" succeeded but no access token was found in its response body or headers — subsequent authenticated requests will fail.`
          );
        }
      }

      // Show success messages for POST, PUT, PATCH, DELETE API calls when explicitly enabled
      if (
        (method === "POST" ||
          method === "PUT" ||
          method === "PATCH" ||
          method === "DELETE") &&
        showSuccessNotification
      ) {
        // First check for x-status-message header, then data.message
        const statusMessage = headers["x-status-message"] || data.message;

        if (statusMessage) {
          notification.success({
            message: "",
            description: statusMessage,
            duration: 4,
          });
        }
      }
      return { data, pagination }; // Return both data and pagination
    }

    // Always handle errors with notifications
    if (response.status === 401) {
      if (hasToken) {
        // We sent a token and the server still rejected it — a genuine
        // expired/invalid session. Show the modal and clear storage.
        const swalWithBootstrapButtons = Swal.mixin({
          customClass: {
            confirmButton: "custom-swal-confirm-btn",
            cancelButton: "custom-swal-cancel-btn",
            popup: "custom-swal-popup",
            title: "custom-swal-title",
            content: "custom-swal-content",
          },
        });

        await swalWithBootstrapButtons
          .fire({
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            icon: "warning",
            confirmButtonText: "OK",
            allowOutsideClick: false,
            allowEscapeKey: false,
          })
          .then(() => {
            // Clear storage and redirect after user clicks OK
            if (window.helper && window.helper.removeStorageData) {
              window.helper.removeStorageData();
            } else {
              // Fallback if helper is not available
              localStorage.clear();
              window.user = {};
              // Use window.location.replace to prevent back navigation
              window.location.replace("/login");
            }
          });
      } else {
        // No token was ever sent on this request — this isn't an expired
        // session, it's a call made without one (e.g. the token was never
        // captured after login, see the tokenUpdateEndpoints block above).
        // Surfacing "Session Expired" here would be misleading, so just log
        // it; the caller's own error handling (React Query's onError) still runs.
        console.warn(
          `[apiClient] 401 on "${endpoint}" with no auth token attached — not treating as a session expiry.`
        );
      }
    } else if (response.status === 400 || response.status === 422) {
      // Handle 400 and 422 validation errors
      if (data.message && Array.isArray(data.message)) {
        // Backend returns array of error strings
        data.message.forEach((errorMessage, index) => {
          notification.error({
            message: "",
            description: errorMessage,
            duration: 4,
            key: `validation-error-${index}`, // Unique key to prevent duplicates
          });
        });
      }
      if (data.error) {
        notification.error({
          message: "",
          description: data.error,
          duration: 4,
        });
      } else if (data.errors && typeof data.errors === "object") {
        // Laravel/standard validation format (object)
        Object.entries(data.errors).forEach(([field, message]) => {
          notification.error({
            message: "",
            description: `${Array.isArray(message) ? message[0] : message}`,
            duration: 4,
          });
        });
      } else if (data.message && typeof data.message === "string") {
        // Single error message
        notification.error({
          message: "",
          description: data.message,
          duration: 4,
        });
      } else if (Array.isArray(data)) {
        // Direct array of error messages
        data.forEach((errorMessage, index) => {
          notification.error({
            message: "",
            description: errorMessage,
            duration: 4,
            // key: `validation-error-${index}`,
          });
        });
      }
    } else if (data.data) {
      // Handle errors inside data.data structure
      if (typeof data.data === "object" && !Array.isArray(data.data)) {
        // Handle object with multiple key-value pairs
        Object.entries(data.data).forEach(([field, message]) => {
          // Handle different types of message values
          if (typeof message === "string") {
            notification.error({
              message: `Validation Errorr`,
              description: message,
              duration: 4,
            });
          } else if (Array.isArray(message)) {
            // If message is an array, show the first item
            notification.error({
              message: `Error: ${field}`,
              description: message[0],
              duration: 4,
            });
          } else if (typeof message === "object") {
            // If message is an object, stringify it
            notification.error({
              message: `Error: ${field}`,
              description: JSON.stringify(message),
              duration: 4,
            });
          }
        });
      } else if (typeof data.data === "string") {
        // Handle simple string error in data.data
        notification.error({
          message: "Error",
          description: data.data,
          duration: 4,
        });
      }
    } else {
      notification.error({
        message: "Error",
        description: data.message || "Something went wrong",
        duration: 4,
      });
    }

    throw { status: response.status, ...data };
  },

  /**
   * Get the full URL for an API endpoint
   * @param {string} endpoint - API endpoint key
   * @param {Object} params - URL parameters
   * @param {string} slug - Optional URL slug
   * @returns {string} - Full URL
   */
  getUrl(endpoint, params = {}, slug = "") {
    if (!api[endpoint]) {
      throw new Error(`API endpoint "${endpoint}" not found`);
    }

    const { url } = api[endpoint];
    // window.constants is the same object bootstrap() assigns from this module;
    // reading the import directly means the URL is correct even if bootstrap()
    // hasn't run yet, instead of silently falling back to a stale hardcoded host.
    const baseUrl = window.constants?.api_base_url || constants.api_base_url;

    // Join with exactly one slash regardless of whether baseUrl ends with
    // one and/or the endpoint's url starts with one — avoids both "//" and
    // missing-slash mismatches against the backend's route definitions.
    let fullUrl = `${baseUrl.replace(/\/+$/, "")}/${url.replace(/^\/+/, "")}`;

    // Append the slug to the URL if provided
    if (slug) {
      fullUrl = `${fullUrl}/${slug}`;
    }

    // Add query params
    if (params && Object.keys(params).length > 0) {
      const queryString = new URLSearchParams(params).toString();
      fullUrl += fullUrl.includes("?") ? `&${queryString}` : `?${queryString}`;
    }

    return fullUrl;
  },

  /**
   * Make a request to the API
   * @param {string} endpoint - API endpoint key
   * @param {Object} options - Request options
   * @returns {Promise} - Promise that resolves to the API response
   */
  async request(endpoint, options = {}) {
    if (!api[endpoint]) {
      throw new Error(`API endpoint "${endpoint}" not found`);
    }

    const {
      params,
      slug,
      method: customMethod, // Allow overriding the method
      showSuccessNotification = false,
      ...fetchOptions
    } = options;
    // Use the custom method if provided, otherwise use the endpoint's method
    const method = customMethod || api[endpoint].method;

    try {
      const url = this.getUrl(endpoint, params, slug);
      const { response, hasToken } = await this.fetchApi(
        url,
        { method, ...fetchOptions },
        endpoint
      );

      return this.handleResponse(
        response,
        showSuccessNotification,
        endpoint,
        method,
        hasToken
      );
    } catch (error) {
      // Check if it's a network error (not handled by handleResponse)
      if (!error.status) {
        // Show network/CORS errors
        notification.error({
          message: "Network Error",
          description:
            error.message ||
            "Failed to connect to the server. Please check your internet connection.",
          duration: 6,
        });
      }

      // Re-throw error for React Query to handle
      throw error;
    }
  },
};

export default apiClient;
