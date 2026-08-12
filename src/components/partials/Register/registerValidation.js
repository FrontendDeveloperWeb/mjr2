// Shared validation rules/handlers for the Register — Step 1 & Step 2 forms.
// Kept isolated to this page's partials (per the repo's page-isolation rule)
// since both steps are Register-only.

/** Letters and spaces only — for name fields (Given/First Name, Family/Last Name). */
export const NAME_PATTERN_RULE = {
  pattern: /^[a-zA-Z\s]+$/,
  message: 'Only alphabets are allowed',
};

/** Digits only — for phone/number fields. */
export const PHONE_PATTERN_RULE = {
  pattern: /^[0-9]+$/,
  message: 'Only numbers are allowed',
};

/**
 * Strict e-mail format, anchored end-to-end so nothing can trail after the
 * TLD (e.g. "name@x.com/junk" or "name@x.comfoo" are both rejected).
 */
export const EMAIL_PATTERN_RULE = {
  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,24}$/,
  message: 'Please enter a valid e-mail address',
};

/** antd Form rule for a required field with a custom message. */
export const requiredRule = (message) => ({ required: true, message });

/**
 * onKeyDown guard that blocks a single disallowed printable character from
 * being typed at all — navigation/editing keys (Backspace, Tab, arrows,
 * Ctrl/Cmd combos for copy-paste, ...) are always let through. Pasted text
 * is still caught by the pattern rule on validation.
 * @param {RegExp} allowedCharPattern - matches ONE allowed character
 */
export function blockDisallowedKeys(allowedCharPattern) {
  return (e) => {
    if (e.ctrlKey || e.metaKey || e.altKey || e.key.length !== 1) return;
    if (!allowedCharPattern.test(e.key)) {
      e.preventDefault();
    }
  };
}

export const blockNonAlphaKeys = blockDisallowedKeys(/^[a-zA-Z\s]$/);
export const blockNonDigitKeys = blockDisallowedKeys(/^[0-9]$/);
