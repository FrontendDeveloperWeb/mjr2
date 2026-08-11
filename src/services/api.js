const api = {
  // Authentication endpoints
  authorLogin: { method: "POST", url: "auth/author-login" },
  authorRegistration: { method: "POST", url: "auth/author-registration" },
  // forgotPassword: { method: "POST", url: "forgot-password" },
  // verifyOtp: { method: "POST", url: "verify-otp" },
  // resetPassword: { method: "POST", url: "reset-password" },

  // Auxiliary listing endpoints
  getSubjects: { method: "GET", url: "subjects" },
  getKeywords: { method: "GET", url: "keywords" },

  // Journal endpoints
  getJournals: { method: "GET", url: "journal" },

  // Global site data. Same physical endpoint as getJournals today because the
  // backend hasn't split it out yet — kept as its own key so that when the
  // backend ships a dedicated global-data endpoint, only this url changes.
  getGlobalData: { method: "GET", url: "journal" },

};

export default api;
