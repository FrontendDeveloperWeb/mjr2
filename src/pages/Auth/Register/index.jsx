import { Link, useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import AuthLayout from '../../../components/authlayout/AuthLayout.jsx';

export default function Register() {
    const [form] = Form.useForm();
    const navigate = useNavigate();

    // Single submit path — validates the required name/email fields and hands
    // off a clean payload ready for the future registration API call.
    const handleRegister = () => {
        form
            .validateFields()
            .then((values) => {
                const payload = { ...values };
                // TODO: integrate registration API — POST payload to /services/api.js helper.
                console.log('register submit', payload);
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

                            {/* RIGHT — REGISTER FORM */}
                            <div className="col-12 col-lg-7 auth-login-form-col">
                                <h3 className="auth-login-title">
                                    Register with Elsevier account
                                </h3>

                                <p className="auth-alt-text auth-alt-text--center">
                                    Retrieve your details from the ORCID registry:
                                </p>

                                <Button block className="auth-account-btn auth-orcid-btn">
                                    <span className="auth-orcid-badge">iD</span>
                                    Use My ORCID Record
                                </Button>

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
                                        <Button
                                            htmlType="submit"
                                            className="auth-primary-btn auth-continue-btn"
                                            onClick={handleRegister}
                                        >
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
                                    <Button
                                        className="auth-register-btn"
                                        onClick={() => navigate('/forgot-password')}
                                    >
                                        Forgot Your Login Details?
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
                </div>
            </div>
        </AuthLayout>
    );
}
