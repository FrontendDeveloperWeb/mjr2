import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../../components/authlayout/AuthLayout.jsx';
import RegisterStepOne from '../../../components/partials/Register/RegisterStepOne.jsx';
import RegisterStepTwo from '../../../components/partials/Register/RegisterStepTwo.jsx';
import { login, linkOrcid } from '../../../auth/session.js';
import { useMutation } from '../../../hooks/reactQuery/index.js';

const STEPS = [
  { key: 1, label: 'Account Details' },
  { key: 2, label: 'Profile Information' },
];

/**
 * Read the profile /orcid/callback stored, mapped onto the Step 1 field names.
 * ORCID gives one display name, so it's split into given/family here.
 */
function readOrcidUser() {
  try {
    const user = JSON.parse(localStorage.getItem('orcid_user'));
    if (!user) return null;

    const [firstName = '', ...rest] = (user.name || '').trim().split(' ');
    return {
      firstName,
      lastName: rest.join(' '),
      email: user.email || '',
      orcid: user.orcidId,
    };
  } catch {
    return null;
  }
}

/**
 * Map the merged Step 1 + Step 2 form values onto the author-registration
 * API's payload shape. Only the institution-related fields the form actually
 * collects go into a single `affiliations` entry — start_date/end_date aren't
 * captured by the form, so they're left out rather than sent empty.
 */
function buildAuthorRegistrationPayload(payload) {
  const {
    firstName,
    lastName,
    middleName,
    username,
    email,
    password,
    confirmPassword,
    title,
    telephone,
    orcid,
    institution,
    department,
    position,
    country,
    city,
    stateProvince,
    streetAddress,
    zipPostalCode,
    personalClassifications = [],
    personalKeywords = [],
  } = payload;

  const hasAffiliationData =
    institution || department || position || country || city || stateProvince || streetAddress || zipPostalCode;

  return {
    first_name: firstName,
    last_name: lastName,
    middle_name: middleName,
    user_name: username,
    email,
    password,
    password_confirmation: confirmPassword,
    title,
    phone: telephone,
    orcid,
    affiliations: hasAffiliationData
      ? [
          {
            institution_name: institution,
            department,
            designation: position,
            is_current: 1,
            country,
            city,
            state: stateProvince,
            address: streetAddress,
            zip: zipPostalCode,
          },
        ]
      : [],
    // personalClassifications already arrives as [{ id, name }] from the
    // Subjects API via the classifications modal.
    subjects: personalClassifications.map(({ id, name }) => ({ id, name })),
    // personalKeywords mixes existing API keywords ({ id, name }, picked in
    // the keywords modal) with freshly-typed custom strings — split them here.
    keywords: personalKeywords
      .filter((k) => typeof k !== 'string')
      .map(({ id, name }) => ({ id, name })),
    new_keywords: personalKeywords.filter((k) => typeof k === 'string'),
  };
}

/**
 * Register controller. Owns the 2-step flow: it keeps a single `/register`
 * route and switches between Step 1 and Step 2 in place, so the Step 1 data
 * survives navigating forward/back. Each transition is mirrored into the
 * persisted draft, which is what lets an ORCID sign-up resume here after the
 * full-page trip to orcid.org — and what makes a mid-wizard refresh survivable.
 * On the final submit it merges both steps into one clean payload ready for
 * the registration API.
 */
export default function Register() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Lazy initialisers (not an effect) so a user arriving from /orcid/callback
  // at ?step=2 opens straight on Step 2 — an effect would render Step 1 first
  // and visibly flash it before jumping.
  const [orcidUser] = useState(readOrcidUser);
  const [step, setStep] = useState(() => (searchParams.get('step') === '2' ? 2 : 1));
  const [step1Data, setStep1Data] = useState(() => orcidUser);

  // Present only when the account came through ORCID; manual sign-ups leave it
  // undefined, which is what keeps Step 1 an ordinary editable form for them.
  const orcidId = step1Data?.orcid;

  const { mutate: authorRegistration, isPending: isRegistering } = useMutation('authorRegistration', {
    useFormData: false,
    onSuccess: (response, variables) => {
      login({
        username: variables.user_name || variables.email,
        ...(variables.orcid ? { provider: 'orcid', orcidId: variables.orcid } : {}),
        ...response?.data,
      });
      if (variables.orcid) linkOrcid(variables.orcid);
      navigate('/author/main-menu');
    },
  });

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
    const apiPayload = buildAuthorRegistrationPayload(payload);
    localStorage.removeItem('orcid_user');

    authorRegistration({ data: apiPayload, ...apiPayload });
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
                  <RegisterStepOne
                    defaultValues={step1Data}
                    orcidId={orcidId}
                    onNext={goToStep2}
                  />
                ) : (
                  <RegisterStepTwo
                    step1Data={step1Data}
                    orcidId={orcidId}
                    onBack={goToStep1}
                    onSubmit={handleFinalSubmit}
                    isSubmitting={isRegistering}
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
