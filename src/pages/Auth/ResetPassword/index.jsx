import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Form, Input, Button, Alert } from 'antd';
import AuthLayout from '../../../components/authlayout/AuthLayout.jsx';
import { useMutation } from '../../../hooks/reactQuery/index.js';

/**
 * Public landing page for the "reset your password" e-mail link
 * (/reset-password?token=...&email=...). Token/email travel as query params
 * because the link is generated server-side and clicked outside the app.
 */
export default function ResetPassword() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const { mutate: authorResetPassword, isPending: isSubmitting } = useMutation('authorResetPassword', {
    useFormData: false,
    onSuccess: () => {
      navigate('/login');
    },
  });

  // Validates the new/confirm password fields, then submits them alongside
  // the token (and email, when the link included one) to the reset API.
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        authorResetPassword({
          data: {
            token,
            ...(email ? { email } : {}),
            password: values.password,
            password_confirmation: values.confirmPassword,
          },
        });
      })
      .catch(() => {
        /* validation errors are surfaced inline by antd */
      });
  };

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

              {/* RIGHT — RESET PASSWORD FORM */}
              <div className="col-12 col-lg-7 auth-login-form-col">
                <h3 className="auth-login-title">Reset Your Password</h3>

                <p className="auth-alt-text auth-alt-text--center">
                  Enter a new password for your account.
                </p>

                {!token && (
                  <Alert
                    type="error"
                    showIcon
                    title="This password reset link is missing or invalid. Please request a new one."
                    className="mb-3"
                  />
                )}

                <Form
                  form={form}
                  layout="horizontal"
                  colon
                  requiredMark={false}
                  className="auth-login-form"
                  labelCol={{ xs: 24, sm: 8 }}
                  wrapperCol={{ xs: 24, sm: 16 }}
                >
                  <Form.Item
                    label="New Password"
                    name="password"
                    hasFeedback
                    rules={[
                      { required: true, message: 'Please enter a new password' },
                      { min: 6, message: 'Password must be at least 6 characters' },
                    ]}
                  >
                    <Input.Password autoComplete="new-password" />
                  </Form.Item>

                  <Form.Item
                    label="Confirm Password"
                    name="confirmPassword"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      { required: true, message: 'Please re-type your new password' },
                      ({ getFieldValue }) => ({
                        validator(_, value) {
                          if (!value || getFieldValue('password') === value) {
                            return Promise.resolve();
                          }
                          return Promise.reject(new Error('Passwords do not match'));
                        },
                      }),
                    ]}
                  >
                    <Input.Password autoComplete="new-password" />
                  </Form.Item>

                  <div className="auth-role-btns auth-role-btns--end">
                    <Button
                      htmlType="submit"
                      className="auth-primary-btn auth-continue-btn"
                      loading={isSubmitting}
                      disabled={!token}
                      onClick={handleSubmit}
                    >
                      Reset Password
                    </Button>
                  </div>
                </Form>

                <div className="auth-inline-links auth-inline-links--start">
                  <Link to="/login" className="auth-link">Back to Login</Link>
                  <span className="auth-sep" />
                  <Link to="/forgot-password" className="auth-link">Request a New Link</Link>
                </div>

                <div className="auth-form-divider" />

                <div className="auth-copyright-row">
                  <span className="auth-muted">
                    Software Copyright &copy; 2026 xyz.
                  </span>
                  <span className="auth-copyright-links">
                    <Link to="" className="auth-link">Privacy Policy</Link>
                    <span className="auth-sep-thin">|</span>
                    <Link to="" className="auth-link">Data Privacy Policy</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
