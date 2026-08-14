import { useMemo } from 'react';
import { Modal, Form, Input, InputNumber, Select, Checkbox, DatePicker, Button } from 'antd';
import dayjs from 'dayjs';
import { useQuery } from '../../../../hooks/reactQuery/index.js';
import { COUNTRY_OPTIONS, TITLE_OPTIONS, GENDER_OPTIONS, flattenSubjects } from './authorData.js';

const API_DATE_FORMAT = 'YYYY-MM-DD';

// Flattens the saved author (the exact nested `authors[]` payload shape —
// see index.jsx) back into the flat field names/dayjs values the Form needs,
// for the Edit path. Add path just gets `undefined` (empty form).
function mapAuthorToFormValues(author) {
  if (!author) return undefined;
  const affiliation = author.affiliations?.[0] || {};
  return {
    title: author.title,
    gender: author.gender,
    first_name: author.first_name,
    last_name: author.last_name,
    date_of_birth: author.date_of_birth ? dayjs(author.date_of_birth) : undefined,
    email: author.email,
    phone: author.phone,
    biography: author.biography,
    orcid: author.orcid,
    scopus_id: author.scopus_id,
    researcher_id: author.researcher_id,
    author_order: author.author_order,
    contribution: author.contribution,
    is_corresponding: !!author.is_corresponding,
    country: author.country,
    city: author.city,
    address: author.address,
    subject_ids: (author.subjects || []).map((s) => s.id),
    affiliation: {
      institution_name: affiliation.institution_name,
      department: affiliation.department,
      designation: affiliation.designation,
      is_current: !!affiliation.is_current,
      start_date: affiliation.start_date ? dayjs(affiliation.start_date) : undefined,
      end_date: affiliation.end_date ? dayjs(affiliation.end_date) : undefined,
      country: affiliation.country,
      city: affiliation.city,
      address: affiliation.address,
    },
  };
}

/**
 * "Add New Author" dialog. Builds the exact nested author payload shape the
 * backend expects — a flat set of personal/identifier/location fields plus
 * a `subjects: [{ id, name }]` array and a single-entry `affiliations: [{...}]`
 * array — and hands it to the parent, which appends/merges it into the
 * Current Author List state.
 */
export default function AddAuthorModal({ open, onCancel, onSave, initialValues }) {
  const [form] = Form.useForm();

  const { data: subjectsResult } = useQuery('getSubjects', { enabled: open });
  const subjectOptions = useMemo(() => flattenSubjects(subjectsResult?.data || []), [subjectsResult]);

  const formInitialValues = useMemo(() => mapAuthorToFormValues(initialValues), [initialValues]);

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        const subjects = (values.subject_ids || []).map((id) => ({
          id,
          name: subjectOptions.find((o) => o.value === id)?.label || '',
        }));
        const affiliation = values.affiliation || {};

        onSave({
          title: values.title,
          gender: values.gender,
          first_name: values.first_name,
          last_name: values.last_name,
          date_of_birth: values.date_of_birth ? values.date_of_birth.format(API_DATE_FORMAT) : undefined,
          email: values.email,
          phone: values.phone,
          orcid: values.orcid,
          scopus_id: values.scopus_id,
          researcher_id: values.researcher_id,
          country: values.country,
          city: values.city,
          address: values.address,
          biography: values.biography,
          author_order: values.author_order,
          contribution: values.contribution,
          is_corresponding: values.is_corresponding ? 1 : 0,
          subjects,
          affiliations: [
            {
              institution_name: affiliation.institution_name,
              department: affiliation.department,
              designation: affiliation.designation,
              is_current: affiliation.is_current ? 1 : 0,
              start_date: affiliation.start_date ? affiliation.start_date.format(API_DATE_FORMAT) : undefined,
              end_date: affiliation.is_current || !affiliation.end_date ? null : affiliation.end_date.format(API_DATE_FORMAT),
              country: affiliation.country,
              city: affiliation.city,
              address: affiliation.address,
            },
          ],
        });
        form.resetFields();
      })
      .catch(() => {
        /* antd surfaces per-field errors inline */
      });
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  return (
    <Modal
      title={initialValues ? 'Edit Author' : 'Add New Author'}
      open={open}
      onCancel={handleCancel}
      width={880}
      className="am6-modal"
      destroyOnHidden
      footer={[
        <Button key="cancel" className="am-btn-secondary" onClick={handleCancel}>Cancel</Button>,
        <Button key="save" className="am-btn-theme" onClick={handleSave}>Save</Button>,
      ]}
    >
      <p className="am6-modal-hint">Asterisk indicates required field</p>

      <Form form={form} layout="vertical" requiredMark className="am6-modal-form" initialValues={formInitialValues}>
        <h4 className="reg-section-title am6-modal-section-title">Personal Details</h4>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <Form.Item name="title" label="Title">
              <Select options={TITLE_OPTIONS} placeholder="Select title" allowClear />
            </Form.Item>
          </div>
          <div className="col-12 col-md-4">
            <Form.Item name="gender" label="Gender">
              <Select options={GENDER_OPTIONS} placeholder="Select gender" allowClear />
            </Form.Item>
          </div>
          <div className="col-12 col-md-4">
            <Form.Item name="date_of_birth" label="Date of Birth" className="date-piker-input">
              <DatePicker className="w-100" format={API_DATE_FORMAT} placeholder="Select date" />
            </Form.Item>
          </div>
          <div className="col-12 col-md-4">
            <Form.Item name="first_name" label="Given/First Name" rules={[{ required: true, message: 'Please enter the first name.' }]}>
              <Input />
            </Form.Item>
          </div>
          <div className="col-12 col-md-4">
            <Form.Item name="last_name" label="Family/Last Name" rules={[{ required: true, message: 'Please enter the last name.' }]}>
              <Input />
            </Form.Item>
          </div>
          <div className="col-12 col-md-4">
            <Form.Item name="email" label="E-mail Address" rules={[{ required: true, message: 'Please enter an e-mail address.' }, { type: 'email', message: 'Please enter a valid e-mail address.' }]}>
              <Input />
            </Form.Item>
          </div>
          <div className="col-12 col-md-4">
            <Form.Item name="phone" label="Phone">
              <Input />
            </Form.Item>
          </div>
          <div className="col-12 col-md-8">
            <Form.Item name="biography" label="Biography">
              <Input.TextArea rows={1} />
            </Form.Item>
          </div>
        </div>

        <h4 className="reg-section-title am6-modal-section-title">Identifiers &amp; Contribution</h4>
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <Form.Item
              name="orcid"
              label="ORCID"
              extra={<a href="#what-is-orcid" className="am-help-link">What is ORCID?</a>}
            >
              <Input
                addonAfter={<span className="am6-fetch-link">Fetch</span>}
                placeholder="0000-0000-0000-0000"
              />
            </Form.Item>
          </div>
          <div className="col-12 col-md-4">
            <Form.Item name="scopus_id" label="Scopus ID">
              <Input />
            </Form.Item>
          </div>
          <div className="col-12 col-md-4">
            <Form.Item name="researcher_id" label="Researcher ID">
              <Input />
            </Form.Item>
          </div>
          <div className="col-12 col-md-4">
            <Form.Item name="author_order" label="Author Order">
              <InputNumber className="w-100" min={1} />
            </Form.Item>
          </div>
          <div className="col-12 col-md-8">
            <Form.Item name="contribution" label="Contribution">
              <Input.TextArea rows={1} placeholder="Conceptualization, methodology, ..." />
            </Form.Item>
          </div>
          <div className="col-12">
            <Form.Item name="is_corresponding" valuePropName="checked" className="am6-modal-check">
              <Checkbox>This is the corresponding author</Checkbox>
            </Form.Item>
          </div>
        </div>



        <h4 className="reg-section-title am6-modal-section-title">Subjects</h4>
        <div className="row g-3">
          <div className="col-12">
            <Form.Item name="subject_ids" label="Subjects">
              <Select mode="multiple" options={subjectOptions} placeholder="Select subjects" showSearch optionFilterProp="label" />
            </Form.Item>
          </div>
        </div>

        <h4 className="reg-section-title am6-modal-section-title">Institution Related Information</h4>
        <div className="row g-3">
          <div className="col-12 col-md-6">
            <Form.Item
              name={['affiliation', 'institution_name']}
              label="Institution"
              rules={[{ required: true, message: 'Please enter an institution.' }]}
              extra="Start typing to display potentially matching institutions."
            >
              <Input />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6">
            <Form.Item name={['affiliation', 'department']} label="Department">
              <Input />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6">
            <Form.Item name={['affiliation', 'designation']} label="Designation / Position">
              <Input />
            </Form.Item>
          </div>

          <div className="col-12">
            <Form.Item name={['affiliation', 'is_current']} valuePropName="checked">
              <Checkbox
                onChange={(e) => {
                  if (e.target.checked) form.setFieldValue(['affiliation', 'end_date'], undefined);
                }}
              >
                Currently working here
              </Checkbox>
            </Form.Item>
          </div>

          <div className="col-12 col-md-6 date-piker-input">
            <Form.Item name={['affiliation', 'start_date']} label="Start Date" rules={[{ required: true, message: 'Please select a start date.' }]}>
              <DatePicker className="w-100" format={API_DATE_FORMAT} placeholder="Select date" />
            </Form.Item>
          </div>
          <div className="col-12 col-md-6 date-piker-input">
            <Form.Item
              noStyle
              shouldUpdate={(prev, cur) => prev.affiliation?.is_current !== cur.affiliation?.is_current}
            >
              {({ getFieldValue }) => {
                const isCurrent = getFieldValue(['affiliation', 'is_current']);
                return (
                  <Form.Item
                    label="End Date"
                    name={['affiliation', 'end_date']}
                    dependencies={[['affiliation', 'is_current']]}
                  >
                    <DatePicker className="w-100" format={API_DATE_FORMAT} placeholder="Select date" disabled={isCurrent} />
                  </Form.Item>
                );
              }}
            </Form.Item>
          </div>
          <h4 className="reg-section-title am6-modal-section-title">Location</h4>
          <div className="row g-3">
            <div className="col-12 col-md-4">
              <Form.Item name="country" label="Country or Region">
                <Select options={COUNTRY_OPTIONS} placeholder="Please select from the list below" allowClear showSearch optionFilterProp="label" />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item name="city" label="City">
                <Input />
              </Form.Item>
            </div>
            <div className="col-12 col-md-4">
              <Form.Item name="address" label="Address">
                <Input />
              </Form.Item>
            </div>
          </div>

        </div>
      </Form>
    </Modal>
  );
}
