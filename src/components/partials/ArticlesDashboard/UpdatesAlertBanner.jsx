import { Button } from 'antd';

export default function UpdatesAlertBanner({
  title = 'Stay Updated with Every New Issue',
  description = 'Never miss the latest research. Receive instant notifications whenever a new journal issue is published.',
  buttonLabel = 'Sign In to Enable Alerts',
}) {
  return (
    <div className="sd-ae-updates-alert-ribbon mb-4 d-flex align-items-start gap-3">
      <div className="sd-ae-bell-alert-badge">
        <img src="/assets/img/bell-icon.png" alt="" />
      </div>
      <div className="flex-grow-1">
        <h6 className="m-0 text-dark font-weight-bold mb-1">{title}</h6>
        <p className="m-0 text-muted small">{description}</p>
        <Button className="sd-ae-btn-dark-teal mt-3 px-4 btn-sm">{buttonLabel}</Button>
      </div>
    </div>
  );
}
