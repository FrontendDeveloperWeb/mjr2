// Standalone "Login Help" popup — mirrors the Editorial Manager help window.
// Self-contained (own scoped styles, no site chrome) so it can be opened in a
// separate browser window and closed via the Close Window button.

export default function LoginHelp() {
    // Close the popup window. window.close() only succeeds for script-opened
    // windows; the self-target reopen trick coaxes most browsers into honoring
    // it, and history back is the graceful fallback for a normal tab.
    const handleClose = () => {
        window.open('', '_self');
        window.close();
        window.history.back();
    };

    return (
        <div className="login-help-page">
            <style>{loginHelpStyles}</style>

            <div className="login-help-card">
                <h1 className="login-help-title">Login Help</h1>
                <hr className="login-help-rule" />

                <p className="login-help-intro">
                    Below are some suggestions that may help if you're having trouble logging in to the
                    system.
                </p>
                <hr className="login-help-rule" />

                <ul className="lh-questions">
                    {/* Q1 */}
                    <li>
                        <span className="lh-q">What if I forgot my Username and/or Password?</span>
                        <p className="lh-text">
                            If you forgot your username and/or password, the system can send you an email
                            that contains your Login Details.
                        </p>
                        <ol className="lh-ol">
                            <li>On the Login page, click the Send Login Details link.</li>
                            <li>
                                Enter your email address and click the Send Login Details button. (If more
                                than one account in the system is associated with your email address, you
                                will be asked to enter your name also.)
                            </li>
                            <li>
                                If the system finds a record matching your information, you will receive an
                                email containing your username and a link to change your password. Click the
                                link and follow instructions on the page to create a new password.
                            </li>
                        </ol>
                        <ul className="lh-note">
                            <li>
                                Note: If you enter an invalid username/password combination 5 times within 5
                                minutes, your account will be locked and will not be available for 10 minutes
                                after the fifth failed login attempt. During the lockout period, you may click
                                the Send Login Details link and follow the steps above to recover your
                                username and reset your password.
                            </li>
                        </ul>
                    </li>

                    {/* Q2 */}
                    <li>
                        <span className="lh-q">
                            How do I change my Password? (My current password is hard to remember, and I keep
                            forgetting it each time I try to log in to the system.)
                        </span>
                        <ol className="lh-ol">
                            <li>
                                To change your password, log in to the system using your current Username and
                                Password.
                            </li>
                            <li>In the top navigation menu, click Update My Information.</li>
                            <li>
                                In the top section of the page (Login Information), enter a new password in
                                the Password field.
                            </li>
                            <li>
                                Enter the new password again in the Re-type Password field. For security
                                purposes, your password will always display on this page as asterisks in both
                                fields.
                            </li>
                            <li>Click the Submit button at the bottom of the page to save your changes.</li>
                        </ol>
                    </li>

                    {/* Q3 */}
                    <li>
                        <span className="lh-q">What does 'Or Login via:' mean?</span>
                        <p className="lh-text">
                            This feature, sometimes referred to as "Single Sign-On," enables you to log in to
                            this publication's Editorial Manager site using your credentials from another
                            site. Clicking any icon in this section tells the system to ask that third party
                            to establish your identity through the user account you have on that site. To log
                            in using this method:
                        </p>
                        <ol className="lh-ol">
                            <li>Do not fill in the Username or Password fields.</li>
                            <li>
                                Instead, click on the external site's icon to trigger Single Sign-On using
                                that site. This opens the login function for the external site. (This step
                                might be skipped if you are already signed in to the external system.)
                            </li>
                            <li>Sign in to the external system.</li>
                            <li>
                                Depending on the system, you may be asked to give Editorial Manager access to
                                your profile in order to return any ID needed to locate your user record.
                                Allow this authentication.
                            </li>
                        </ol>
                        <ul className="lh-note">
                            <li>
                                Note: In order to use single sign-on functionality, you must have a user
                                record in Editorial Manager and the record must be linked to the third-party
                                system by you. If you attempt to log in with single sign-on, Editorial Manager
                                will ask you to register if it can't find a linked record, and will then link
                                the external site to your user record. Each external system only needs to be
                                linked once in order for you to use it for single sign-on.
                            </li>
                        </ul>
                    </li>

                    {/* Q4 */}
                    <li>
                        <span className="lh-q">
                            How do I know which login button to select on the Login Page?
                        </span>
                        <ul className="lh-note">
                            <li>
                                The buttons enable you to log into the system with a particular Role. If you
                                are not sure which role you have, contact the publication office. Below is a
                                synopsis of the function each role performs.
                            </li>
                        </ul>

                        <div className="lh-role-block">
                            <p className="lh-role-title">Author</p>
                            <ul className="lh-note lh-role-list">
                                <li>Make a new or revised submission</li>
                                <li>Edit or Approve a submission</li>
                                <li>Check the status of a submission</li>
                            </ul>

                            <p className="lh-role-title">Editor</p>
                            <ul className="lh-note lh-role-list">
                                <li>Perform editorial office functions</li>
                                <li>Perform editorial tasks</li>
                                <li>Run performance reports</li>
                                <li>Access System Administration functions</li>
                            </ul>

                            <p className="lh-role-title">Reviewer</p>
                            <ul className="lh-note lh-role-list">
                                <li>Respond to a Reviewer Invitation</li>
                                <li>Submit a Reviewer Recommendation on a submission</li>
                            </ul>

                            <p className="lh-role-title">Publisher</p>
                            <ul className="lh-note lh-role-list">
                                <li>Perform production tasks</li>
                            </ul>
                        </div>
                    </li>

                    {/* Q5 */}
                    <li>
                        <span className="lh-q">
                            I serve as a Reviewer on several publications. Why can't I log into this
                            publication as a Reviewer?
                        </span>
                        <ul className="lh-note">
                            <li>
                                Even though you serve as a Reviewer for other publications, you may not be
                                assigned a Reviewer role on this publication. Click Contact Us in the top
                                navigation menu to send a message to the editorial staff if you want to
                                request a Reviewer role.
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>

            <div className="login-help-footer">
                <button type="button" className="login-help-close-btn" onClick={handleClose}>
                    Close Window
                </button>
            </div>
        </div>
    );
}

const loginHelpStyles = `
.login-help-page {
    background-color: #f1f1f1;
    min-height: 100vh;
    padding: 20px 16px 40px;
    font-family: Verdana, Geneva, Tahoma, Arial, sans-serif;
    color: #1f7a72;
}

.login-help-card {
    max-width: 840px;
    margin: 0 auto;
    background-color: #ffffff;
    border: 1px solid #cfcfcf;
    padding: 24px 34px 34px;
}

.login-help-title {
    color: #1a1a52 !important;
    font-family: Verdana, Geneva, Tahoma, Arial, sans-serif !important;
    font-size: 24px;
    font-weight: bold;
    margin: 6px 0 10px;
}

.login-help-rule {
    border: none;
    border-top: 1px solid #7a7a7a;
    margin: 10px 0;
}

.login-help-intro {
    color: #1f7a72;
    font-size: 13px;
    line-height: 1.5;
    margin: 10px 0;
}

/* Question list */
.lh-questions {
    list-style: disc;
    padding-left: 34px;
    margin-top: 18px;
}

.lh-questions > li {
    margin-bottom: 26px;
}

.lh-q {
    display: block;
    color: #1a1a52;
    font-size: 13px;
    font-weight: bold;
    line-height: 1.5;
    margin-bottom: 4px;
}

.lh-text {
    color: #1f7a72;
    font-size: 13px;
    line-height: 1.55;
    margin: 4px 0 8px;
}

.lh-ol {
    list-style: decimal;
    padding-left: 40px;
    margin: 6px 0;
}

.lh-ol > li {
    color: #1f7a72;
    font-size: 13px;
    line-height: 1.55;
    margin-bottom: 6px;
    padding-left: 4px;
}

.lh-note {
    list-style: circle;
    padding-left: 40px;
    margin: 6px 0;
}

.lh-note > li {
    color: #1f7a72;
    font-size: 13px;
    line-height: 1.55;
    margin-bottom: 6px;
    padding-left: 4px;
}

/* Role synopsis */
.lh-role-block {
    margin-top: 12px;
}

.lh-role-title {
    color: #1a1a52;
    font-size: 13px;
    font-weight: bold;
    margin: 8px 0 2px;
}

.lh-role-list {
    margin-top: 2px;
    margin-bottom: 8px;
}

/* Footer close button */
.login-help-footer {
    max-width: 840px;
    margin: 26px auto 0;
    text-align: center;
}

.login-help-close-btn {
    font-family: Verdana, Geneva, Tahoma, Arial, sans-serif;
    font-size: 13px;
    color: #000000;
    padding: 6px 16px;
    background: linear-gradient(#fbfbfb, #e2e2e2);
    border: 1px solid #9a9a9a;
    border-radius: 4px;
    box-shadow: 0 1px 0 #ffffff inset;
    cursor: pointer;
}

.login-help-close-btn:hover {
    background: linear-gradient(#ffffff, #e9e9e9);
    border-color: #7f7f7f;
}

.login-help-close-btn:active {
    background: linear-gradient(#e2e2e2, #f0f0f0);
}

@media (max-width: 575.98px) {
    .login-help-card {
        padding: 18px 16px 24px;
    }

    .lh-questions {
        padding-left: 22px;
    }

    .lh-ol,
    .lh-note {
        padding-left: 26px;
    }
}
`;
