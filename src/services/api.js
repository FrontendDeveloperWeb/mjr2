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
  // No update endpoint exists for this step — POST /papers/store fires
  // exactly once per manuscript. Re-saving after the slug already exists is
  // handled entirely in frontend state (see step-1/index.jsx `submit`).

  // Manuscript submission (Step 2 — Author)
  getAuthors: { method: "GET", url: "authors" },
  updatePaperAuthors: { method: "POST", url: "papers/update-authors" },

  // Manuscript submission (Step 3 — Keywords)
  updatePaperKeywords: { method: "POST", url: "papers/update-keywords" },

  // Manuscript submission (Step 4 — Upload Files)
  getFileTypes: { method: "GET", url: "file-types" },
  getPaperFiles: { method: "GET", url: "papers/get-files" },
  updatePaperFiles: { method: "POST", url: "papers/update-files" },
  deletePaperFile: { method: "POST", url: "papers/delete-files" },

  // Manuscript submission (Step 5 — Final Submission)
  // No dedicated overview endpoint — Step 5 reuses getPaperFiles (Step 4's
  // GET papers/get-files/{slug}) since that response already carries the
  // full paper overview alongside its files array. No new endpoint added.
  finalSubmitPaper: { method: "POST", url: "papers/final-submission" },

};

export default api;
