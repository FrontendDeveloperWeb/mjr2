import { Link } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import AuthLayout from '../../../components/authlayout/AuthLayout.jsx';

// Roles wired to the four login buttons. Kept as data so the submit
// handler stays generic and API integration only touches one place.
const LOGIN_ROLES = [
  { key: 'author', label: 'Author Login' },
  { key: 'reviewer', label: 'Reviewer Login' },
  { key: 'editor', label: 'Editor Login' },
  { key: 'publisher', label: 'Publisher Login' },
];

export default function Login() {
  const [form] = Form.useForm();

  // Single, role-aware submit path. Validates the shared username/password
  // fields, then hands off a clean payload ready for the future API call.
  const handleLogin = (role) => {
    form
      .validateFields()
      .then((values) => {
        const payload = { ...values, role };
        // TODO: integrate auth API — POST payload to /services/api.js helper.
        console.log('login submit', payload);
      })
      .catch(() => {
        /* validation errors are surfaced inline by antd */
      });
  };
  // const openHelpPopup = (e) => {
  //     e.preventDefault();


  //     const url = '/login-help';
  //     const windowName = 'LoginHelpWindow';
  //     const windowFeatures = 'width=600,height=650,left=200,top=100,resizable=yes,scrollbars=yes';

  //     window.open(url, windowName, windowFeatures);
  // };

  return (
    <AuthLayout>
      <div className="container">
        <div className="auth-login-wrapper">
          <div className="auth-login-card">
            <div className="row g-0">
              {/* LEFT — JOURNAL COVER */}
              <div className="col-12 col-lg-5 auth-login-cover">
                <img src="/assets/img/golf-banner.png" alt="Journal cover" />
              </div>

              {/* RIGHT — SIGN IN FORM */}
              <div className="col-12 col-lg-7 auth-login-form-col">
                <h3 className="auth-login-title">
                  Sign in or register with Elsevier account
                </h3>

                <Button block className="auth-account-btn">
                  <span className="auth-account-icon">E</span>
                  Elsevier account
                </Button>

                <div className="auth-or-divider">
                  <span>OR</span>
                </div>

                <p className="auth-alt-text">
                  Alternatively, use your username and password
                </p>

                <Form
                  form={form}
                  layout="horizontal"
                  colon
                  requiredMark={false}
                  className="auth-login-form"
                  labelCol={{ xs: 24, sm: 6 }}
                  wrapperCol={{ xs: 24, sm: 18 }}
                >
                  <Form.Item
                    label="Username"
                    name="username"
                    rules={[{ required: true, message: 'Please enter your username' }]}
                  >
                    <Input autoComplete="username" />
                  </Form.Item>

                  <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please enter your password' }]}
                  >
                    <Input.Password autoComplete="current-password" />
                  </Form.Item>

                  <div className="auth-role-btns">
                    {LOGIN_ROLES.map(({ key, label }) => (
                      <Button
                        key={key}
                        htmlType="button"
                        className="auth-role-btn"
                        onClick={() => handleLogin(key)}
                      >
                        {label}
                      </Button>
                    ))}
                  </div>
                </Form>

                <div className="auth-orcid-row">
                  <span className="auth-muted">Or Login via:</span>
                  <span className="auth-orcid-badge">iD</span>
                  <Link to="" className="auth-link">
                    What is ORCID?
                  </Link>
                </div>

                <div className="auth-inline-links">
                  <Link to="/forget-password" className="auth-link">Send Login Details</Link>
                  <span className="auth-sep" />
                  <Link to="/register" className="auth-link">Register Now</Link>
                  <span className="auth-sep" />
                  <span className="auth-link cursor-pointer">Login Help</span>
                </div>

                <div className="auth-form-divider" />

                <p className="auth-new-text">New: Login with your Elsevier account</p>

                <div className="auth-new-btns">
                  <Button block className="auth-register-btn">
                    <span className="auth-btn-user"><img src="/assets/img/user-icon.png" alt="" /></span> Register
                  </Button>
                  <Button block className="auth-primary-btn">
                    <span className="auth-btn-user"><img src="/assets/img/user-icon.png" alt="" /></span> Login
                  </Button>
                </div>

                <div className="auth-copyright-row">
                  <span className="auth-muted">
                    Software Copyright &copy; 2026 Aries Systems Corporation.
                  </span>
                  <span className="auth-copyright-links">
                    <Link to="" className="auth-link">Aries Privacy Policy</Link>
                    <span className="auth-sep-thin">|</span>
                    <Link to="" className="auth-link">Data Privacy Policy</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* SECONDARY NAV BAR */}
          <div className="auth-login-navbar">
            <Link to="" className="auth-navbar-item">Instructions for Authors</Link>
            <Link to="" className="auth-navbar-item">Instructions for Reviewers</Link>
            <Link to="" className="auth-navbar-item">About the Journal</Link>
            <Link to="" className="auth-navbar-item">Contact Author and Reviewer support</Link>
          </div>

          {/* INSTRUCTIONAL COPY */}
          <div className="auth-login-instructions">
            <p>
              <strong>First-time users:</strong> Please click on the word "Register" in the
              navigation bar at the top of the page and enter the requested information. Upon
              successful registration, you will be sent an e-mail with instructions to verify
              your registration. NOTE: If you received an e-mail from us with an assigned user
              ID and password, DO NOT REGISTER AGAIN. Simply use that information to login.
              Usernames and passwords may be changed after registration (see instructions below).
            </p>
            <p>
              <strong>Repeat users:</strong> Please click the "Login" button from the menu above
              and proceed as appropriate.
            </p>
            <p>
              <strong>Authors:</strong> Please click the "Login" button from the menu above and
              login to the system as "Author." You may then submit your manuscript and track its
              progress through the system.
            </p>
            <p>
              <strong>Reviewers:</strong> Please click the "Login" button from the menu above and
              login to the system as "Reviewer." You may then view and/or download manuscripts
              assigned to you for review or submit your comments to the editor and the authors.
            </p>
            <p>
              <strong>To change your username and/or password:</strong> Once you are registered,
              you may change your contact information, username and/or password at any time.
              Simply log in to the system and click on "Update My Information" in the navigation
              bar at the top of the page.
            </p>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
