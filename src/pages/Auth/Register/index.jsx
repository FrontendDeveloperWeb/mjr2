import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../../../components/authlayout/AuthLayout.jsx';
import RegisterStepOne from '../../../components/partials/Register/RegisterStepOne.jsx';
import RegisterStepTwo from '../../../components/partials/Register/RegisterStepTwo.jsx';
import { login } from '../../../auth/session.js';

const STEPS = [
  { key: 1, label: 'Account Details' },
  { key: 2, label: 'Profile Information' },
];

/**
 * Register controller. Owns the 2-step flow: it keeps a single `/register`
 * route and switches between Step 1 and Step 2 in place, so the Step 1 data
 * survives navigating forward/back without relying on router state (which is
 * lost on refresh). On the final submit it merges both steps into one clean
 * payload ready for the registration API.
 */
export default function Register() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [step1Data, setStep1Data] = useState(null);

  const goToStep2 = (values) => {
    setStep1Data(values);
    setStep(2);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToStep1 = () => {
    setStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Combine Step 1 + Step 2 into a single, clean JSON payload. Step 2 owns the
  // shared name/email fields (it's the authoritative, detailed capture).
  const handleFinalSubmit = (step2Values) => {
    const payload = {
      ...step1Data, 
      ...step2Values,
    };
    // Drop the confirmation field — it's a UI-only check, not API data.
    delete payload.confirmPassword;

    // eslint-disable-next-line no-console
    console.log('Register — final payload:', JSON.stringify(payload, null, 2));
    // TODO: integrate registration API — POST payload via /services/api.js helper.
    // Establish the (mock) session and enter the author area.
    login({ username: payload.username || payload.email });
    navigate('/author/main-menu');
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

              {/* RIGHT — STEP FORMS */}
              <div className="col-12 col-lg-7 auth-login-form-col">
                {/* Stepper indicator */}
                <ol className="reg-stepper">
                  {STEPS.map(({ key, label }) => (
                    <li
                      key={key}
                      className={`reg-stepper-item ${
                        step === key ? 'is-active' : ''
                      } ${step > key ? 'is-done' : ''}`}
                    >
                      <span className="reg-stepper-num">{key}</span>
                      <span className="reg-stepper-label">{label}</span>
                    </li>
                  ))}
                </ol>

                {step === 1 ? (
                  <RegisterStepOne defaultValues={step1Data} onNext={goToStep2} />
                ) : (
                  <RegisterStepTwo
                    step1Data={step1Data}
                    onBack={goToStep1}
                    onSubmit={handleFinalSubmit}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
