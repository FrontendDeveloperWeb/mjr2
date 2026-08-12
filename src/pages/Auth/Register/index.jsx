import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../../components/authlayout/AuthLayout.jsx';
import RegisterStepOne from '../../../components/partials/Register/RegisterStepOne.jsx';
import RegisterStepTwo from '../../../components/partials/Register/RegisterStepTwo.jsx';
import { login, linkOrcid } from '../../../auth/session.js';
import { extractUserFromResponse } from '../../../auth/userSelectors.js';
import { useMutation } from '../../../hooks/reactQuery/index.js';
import { dateHelper } from '../../../helpers/dateHelper.js';

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
 * collects go into a single `affiliations` entry.
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
    isCurrent,
    startDate,
    endDate,
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
          is_current: isCurrent ? 1 : 0,
          start_date: dateHelper.formatForAPI(startDate),
          end_date: isCurrent ? '' : dateHelper.formatForAPI(endDate),
          country,
          city,
          state: stateProvince,
          address: streetAddress,
          zip: zipPostalCode,
        },
      ]
      : [],

    subjects: personalClassifications.map(({ id, name }) => ({ id, name })),
    keywords: personalKeywords
      .filter((k) => typeof k !== 'string')
      .map(({ id, name }) => ({ id, name })),
    new_keywords: personalKeywords.filter((k) => typeof k === 'string'),
  };
}


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
      const apiUser = extractUserFromResponse(response);
      login({
        ...(variables.orcid ? { provider: 'orcid', orcidId: variables.orcid } : {}),
        ...apiUser,
        role: apiUser.role || 'author',
        user_name: apiUser.user_name || variables.user_name,
        first_name: apiUser.first_name || variables.first_name,
        last_name: apiUser.last_name || variables.last_name,
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
              <div className="col-12 col-lg-5 auth-register-cover">
                <img src="/assets/img/golf-banner.png" alt="Journal cover" />
              </div>

              {/* RIGHT — STEP FORMS */}
              <div className="col-12 col-lg-7 auth-login-form-col">
                {/* Stepper indicator */}
                <ol className="reg-stepper">
                  {STEPS.map(({ key, label }) => (
                    <li
                      key={key}
                      className={`reg-stepper-item ${step === key ? 'is-active' : ''
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
