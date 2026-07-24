import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import AuthLayout from '../../../components/authlayout/AuthLayout.jsx';

export default function ForgotPassword() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Single submit path — validates the email field and hands off a clean
    // payload ready for the future "send login details" API call.
    const handleSubmit = () => {
        form
            .validateFields()
            .then((values) => {
                const payload = { ...values };
                // TODO: integrate reset API — POST payload to /services/api.js helper.
                console.log('forgot-password submit', payload);
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

                            {/* RIGHT — FORGOT PASSWORD FORM */}
                            <div className="col-12 col-lg-7 auth-login-form-col">
                                <h3 className="auth-login-title">
                                    Forgot Your Login Details?
                                </h3>

                                <p className="auth-alt-text auth-alt-text--center">
                                    Enter your e-mail address and we'll send your login details.
                                </p>

                                <div className="auth-or-divider">
                                    <span>OR</span>
                                </div>

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
                                        <Button
                                            htmlType="submit"
                                            className="auth-primary-btn auth-continue-btn"
                                            onClick={handleSubmit}
                                        >
                                            Submit
                                        </Button>
                                    </div>
                                </Form>

                                <div className="auth-inline-links auth-inline-links--start">
                                    <Link to="/login" className="auth-link">Back to Login</Link>
                                    <span className="auth-sep" />
                                    <Link to="/register" className="auth-link">Register Now</Link>
                                </div>

                                <div className="auth-form-divider" />

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
                </div>
            </div>
        </AuthLayout>
    );
}
