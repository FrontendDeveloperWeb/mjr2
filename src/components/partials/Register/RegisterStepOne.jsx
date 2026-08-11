import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';

// Same ORCID sandbox redirect the Login page uses. Deliberately duplicated
// rather than shared, per this repo's rule that page partials stay isolated.
const ORCID_CLIENT_ID = import.meta.env.VITE_ORCID_CLIENT_ID || 'APP-XXXXXXXXXXXXXXXX';
const ORCID_REDIRECT_URI = `${window.location.origin}/orcid/callback`;

const ORCID_AUTH_URL =
  `https://sandbox.orcid.org/oauth/authorize?client_id=${ORCID_CLIENT_ID}` +
  `&response_type=code&scope=/read-limited&redirect_uri=${encodeURIComponent(ORCID_REDIRECT_URI)}`;

/**
 * Register — Step 1. Collects the initial name/email details, validates them,
 * and hands a clean object up to the controller via `onNext` so it can be
 * merged with Step 2. `defaultValues` re-hydrates the fields when the user
 * navigates back from Step 2.
 *
 * ORCID sign-ups normally never see this step — the controller opens on Step 2
 * with these fields already filled. It still renders for them if they click
 * Back, which is why the ORCID iD is carried through `onNext` below: this form
 * has no field for it, so it would otherwise be dropped on the way forward.
 */
export default function RegisterStepOne({ defaultValues, orcidId, onNext }) {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleOrcidRegister = () => {
    window.location.href = ORCID_AUTH_URL;
  };

  // Driven by the Form's own onFinish (same pattern as Step 2), so antd runs
  // validation exactly once and hands over the values. The previous version
  // called validateFields() from the button's onClick while the button was
  // also htmlType="submit" — two concurrent validation passes, and the manual
  // one lost the race, rejecting with `outOfDate` and no error fields. That
  // rejection landed in the catch-all below, so Continue silently did nothing.
  const handleContinue = (values) => {
    // Re-attach the authenticated iD, which lives outside this form.
    onNext({ ...values, ...(orcidId ? { orcid: orcidId } : {}) });
  };

  return (
    <>
      <h3 className="auth-login-title">Register with Elsevier account</h3>

      {orcidId ? (
        // Already authenticated — offering the button again would only send
        // them back to ORCID for details they have already provided.
        <div className="reg-orcid-linked">
          <span className="auth-orcid-badge">iD</span>
          <span>
            Authenticated as{' '}
            <a
              href={`https://orcid.org/${orcidId}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {orcidId}
            </a>
          </span>
        </div>
      ) : (
        <>
          <p className="auth-alt-text auth-alt-text--center">
            Retrieve your details from the ORCID registry:
          </p>

          <Button
            block
            htmlType="button"
            className="auth-account-btn auth-orcid-btn"
            onClick={handleOrcidRegister}
          >
            <span className="auth-orcid-badge">iD</span>
            Use My ORCID Record
          </Button>
        </>
      )}

      <div className="auth-or-divider">
        <span>OR</span>
      </div>

      <p className="auth-alt-text">
        Or type in your details and continue to register without using ORCID:
      </p>
      <p className="auth-required-note">Asterisk indicates required field</p>

      <Form
        form={form}
        layout="horizontal"
        colon
        requiredMark
        className="auth-login-form"
        labelCol={{ xs: 24, sm: 8 }}
        wrapperCol={{ xs: 24, sm: 16 }}
        initialValues={defaultValues}
        onFinish={handleContinue}
        scrollToFirstError
      >
        <Form.Item
          label="Given/First Name"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input autoComplete="given-name" />
        </Form.Item>

        <Form.Item
          label="Family/Last Name"
          name="lastName"
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input autoComplete="family-name" />
        </Form.Item>

        <Form.Item
          label="E-mail Address"
          name="email"
          rules={[
            { required: true, message: 'Please enter your e-mail address' },
            { type: 'email', message: 'Please enter a valid e-mail address' },
          ]}
        >
          <Input autoComplete="email" />
        </Form.Item>

        <div className="auth-role-btns auth-role-btns--end">
          <Button htmlType="submit" className="auth-primary-btn auth-continue-btn">
            Continue &raquo;
          </Button>
        </div>
      </Form>

      <div className="auth-warning-box">
        <strong>WARNING</strong> - If you think you already have an existing
        registration of any type (Author, Reviewer, or Editor) in this system,
        please DO NOT register again. This will cause delays or prevent the
        processing of any review or manuscript you submit. If you are unsure if
        you are already registered, click the 'Forgot Your Login Details?'
        button. If you are registering again because you want to change your
        current information, changes must be made to your existing information
        by clicking the 'Update My Information' link on the menu bar. If you are
        unsure how to perform these functions, please contact the editorial office.
      </div>

      <div className="auth-new-btns auth-new-btns--center">
        <Button className="auth-register-btn" onClick={() => navigate('/login')}>
          Cancel
        </Button>
        <Button className="auth-register-btn" onClick={() => navigate('/forgot-password')}>
          Forgot Your Login Details?
        </Button>
      </div>

      <div className="auth-copyright-row">
        <span className="auth-muted">
          Software Copyright &copy; 2026 xyz.
        </span>
        <span className="auth-copyright-links">
          <Link to="" className="auth-link"> Privacy Policy</Link>
          <span className="auth-sep-thin">|</span>
          <Link to="" className="auth-link">Data Privacy Policy</Link>
        </span>
      </div>
    </>
  );
}
