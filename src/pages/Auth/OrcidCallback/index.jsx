import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import AuthLayout from '../../../components/authlayout/AuthLayout.jsx';

/**
 * ORCID OAuth redirect target (/orcid/callback?code=...).
 *
 * Reads the authorization code, stores a mock profile under "orcid_user", and
 * drops the user into Step 2 of registration. The mock stands in for the token
 * exchange the backend will own — when POST /oauth/token exists, replace the
 * setItem below with the real response and nothing else here changes.
 */
export default function OrcidCallback() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get('code');

    localStorage.setItem(
      'orcid_user',
      JSON.stringify({
        orcidId: '0009-0009-3687-0976',
        name: 'Noman Waheed',
        email: 'nomib7986@gmail.com',
        authCode: code,
      })
    );

    navigate('/register?step=2', { replace: true });
  }, [searchParams, navigate]);

  return (
    <AuthLayout>
      <div className="container">
        <div className="auth-login-wrapper">
          <div className="auth-callback-panel">
            <span className="auth-orcid-badge auth-callback-badge">iD</span>
            <h3 className="auth-login-title">Completing your ORCID sign-in…</h3>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
}
