import { useState } from 'react';
import { Form, Input, Select, Radio, Button, Tag } from 'antd';
import PersonalClassificationsModal from './PersonalClassificationsModal.jsx';
import PersonalKeywordsModal from './PersonalKeywordsModal.jsx';
import {
  TITLE_OPTIONS,
  COUNTRY_OPTIONS,
  CLASSIFICATION_LABELS,
  MIN_CLASSIFICATIONS,
  MIN_KEYWORDS,
} from './registerOptions.js';

// --- Controlled form field: Personal Classifications -----------------------
// antd Form drives value/onChange; the modal edits a draft and commits here.
function ClassificationsField({ value = [], onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="reg-selector">
        <div className="reg-selector-summary">
          {value.length ? (
            <div className="reg-tag-wrap">
              {value.map((k) => (
                <Tag key={k} className="reg-keyword-tag">{CLASSIFICATION_LABELS[k]}</Tag>
              ))}
            </div>
          ) : (
            <span className="reg-selector-empty">(None Selected)</span>
          )}
        </div>
        <Button className="auth-register-btn reg-selector-btn" onClick={() => setOpen(true)}>
          Select Personal Classifications
        </Button>
      </div>

      <PersonalClassificationsModal
        open={open}
        value={value}
        onCancel={() => setOpen(false)}
        onSubmit={(keys) => {
          onChange(keys);
          setOpen(false);
        }}
      />
    </>
  );
}

// --- Controlled form field: Personal Keywords ------------------------------
function KeywordsField({ value = [], onChange }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="reg-selector">
        <div className="reg-selector-summary">
          {value.length ? (
            <div className="reg-tag-wrap">
              {value.map((k) => (
                <Tag key={k} className="reg-keyword-tag">{k}</Tag>
              ))}
            </div>
          ) : (
            <span className="reg-selector-empty">(None Defined)</span>
          )}
        </div>
        <Button className="auth-register-btn reg-selector-btn" onClick={() => setOpen(true)}>
          Edit Personal Keywords
        </Button>
      </div>

      <PersonalKeywordsModal
        open={open}
        value={value}
        onCancel={() => setOpen(false)}
        onSubmit={(keywords) => {
          onChange(keywords);
          setOpen(false);
        }}
      />
    </>
  );
}

/**
 * Register — Step 2. The detailed profile form. On submit it validates every
 * required field, then hands the clean Step 2 values up to the controller,
 * which merges them with Step 1 for the final payload.
 */
export default function RegisterStepTwo({ step1Data, onBack, onSubmit }) {
  const [form] = Form.useForm();

  // Seed the fields that Step 1 already collected so the user doesn't re-type.
  const initialValues = {
    firstName: step1Data?.firstName,
    lastName: step1Data?.lastName,
    email: step1Data?.email,
    availableAsReviewer: 'no',
    personalClassifications: [],
    personalKeywords: [],
  };

  const handleFinish = (values) => onSubmit(values);

  return (
    <>
      <h3 className="auth-login-title">Complete your registration</h3>
      <p className="auth-required-note">Asterisk indicates required field</p>

      <Form
        form={form}
        layout="vertical"
        requiredMark
        className="auth-login-form reg-step2-form"
        initialValues={initialValues}
        onFinish={handleFinish}
        scrollToFirstError
      >
        {/* ---------- User Credentials ---------- */}
        <div className="reg-section">
          <h4 className="reg-section-title">User Credentials</h4>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <Form.Item
                label="Username"
                name="username"
                rules={[{ required: true, message: 'Please choose a username' }]}
              >
                <Input autoComplete="username" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please enter a password' }]}
                hasFeedback
              >
                <Input.Password autoComplete="new-password" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item
                label="Re-type Password"
                name="confirmPassword"
                dependencies={['password']}
                hasFeedback
                rules={[
                  { required: true, message: 'Please re-type your password' },
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
            </div>
          </div>
        </div>

        {/* ---------- Personal Information ---------- */}
        <div className="reg-section">
          <h4 className="reg-section-title">Personal Information</h4>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <Form.Item
                label="Title"
                name="title"
                rules={[{ required: true, message: 'Please select a title' }]}
              >
                <Select placeholder="Select title" options={TITLE_OPTIONS} />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item
                label="Given/First Name"
                name="firstName"
                rules={[{ required: true, message: 'Please enter your first name' }]}
              >
                <Input autoComplete="given-name" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item label="Middle Name" name="middleName">
                <Input autoComplete="additional-name" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item
                label="Family/Last Name"
                name="lastName"
                rules={[{ required: true, message: 'Please enter your last name' }]}
              >
                <Input autoComplete="family-name" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item label="Degree" name="degree">
                <Input placeholder="Ph.D., M.D., etc." />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item label="Telephone Number" name="telephone">
                <Input placeholder="Including country code" autoComplete="tel" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
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
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="ORCID iD" name="orcid">
                <Input placeholder="0000-0000-0000-0000" />
              </Form.Item>
            </div>
          </div>
        </div>

        {/* ---------- Institution Related Information ---------- */}
        <div className="reg-section">
          <h4 className="reg-section-title">Institution Related Information</h4>
          <div className="row g-3">
            <div className="col-12 col-md-6">
              <Form.Item label="Position" name="position">
                <Input autoComplete="organization-title" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Institution" name="institution">
                <Input autoComplete="organization" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Department" name="department">
                <Input />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Street Address" name="streetAddress">
                <Input autoComplete="street-address" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item label="City" name="city">
                <Input autoComplete="address-level2" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item label="State or Province" name="stateProvince">
                <Input autoComplete="address-level1" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item label="Zip or Postal Code" name="zipPostalCode">
                <Input autoComplete="postal-code" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item
                label="Country or Region"
                name="country"
                rules={[{ required: true, message: 'Please select a country or region' }]}
              >
                <Select
                  placeholder="Please select from the list below"
                  options={COUNTRY_OPTIONS}
                  showSearch
                  optionFilterProp="label"
                />
              </Form.Item>
            </div>
            <div className="col-12 col-md-6">
              <Form.Item label="Available as a Reviewer?" name="availableAsReviewer">
                <Radio.Group>
                  <Radio value="yes">Yes</Radio>
                  <Radio value="no">No</Radio>
                </Radio.Group>
              </Form.Item>
            </div>
          </div>
        </div>

        {/* ---------- Areas of Interest or Expertise ---------- */}
        <div className="reg-section">
          <h4 className="reg-section-title">Areas of Interest or Expertise</h4>

          <Form.Item
            label="Personal Classifications"
            name="personalClassifications"
            required
            rules={[
              {
                validator: (_, value) =>
                  value && value.length >= MIN_CLASSIFICATIONS
                    ? Promise.resolve()
                    : Promise.reject(new Error(`Select at least ${MIN_CLASSIFICATIONS} classification`)),
              },
            ]}
          >
            <ClassificationsField />
          </Form.Item>

          <Form.Item
            label="Personal Keywords"
            name="personalKeywords"
            required
            rules={[
              {
                validator: (_, value) =>
                  value && value.length >= MIN_KEYWORDS
                    ? Promise.resolve()
                    : Promise.reject(new Error(`Enter at least ${MIN_KEYWORDS} keywords`)),
              },
            ]}
          >
            <KeywordsField />
          </Form.Item>
        </div>

        <div className="reg-step2-actions">
          <Button className="auth-register-btn" onClick={onBack}>
            &laquo; Back
          </Button>
          <Button htmlType="submit" className="auth-primary-btn auth-continue-btn">
            Complete Registration
          </Button>
        </div>
      </Form>
    </>
  );
}
