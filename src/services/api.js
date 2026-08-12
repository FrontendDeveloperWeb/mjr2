const api = {
  // Authentication endpoints
  authorLogin: { method: "POST", url: "auth/author-login" },
  authorRegistration: { method: "POST", url: "auth/author-registration" },
  authorForgotPassword: { method: "POST", url: "auth/author-forgotPassword" },
  authorResetPassword: { method: "POST", url: "auth/author-resetPassword" },

  // Auxiliary listing endpoints
  getSubjects: { method: "GET", url: "subjects" },
  getKeywords: { method: "GET", url: "keywords" },

  getJournals: { method: "GET", url: "journal" },
  getGlobalData: { method: "GET", url: "journal" },

  // Manuscript submission (Step 1 — Overview)
  getPaperTypes: { method: "GET", url: "papers/paper-types" },
  storePaper: { method: "POST", url: "papers/store" },

};

export default api;
