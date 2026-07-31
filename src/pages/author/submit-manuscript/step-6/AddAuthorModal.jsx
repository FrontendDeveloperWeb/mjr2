import { Modal, Form, Input, Select, Checkbox, Button } from 'antd';
import { COUNTRY_OPTIONS } from './manuscriptData.js';

/**
 * "Add New Author" dialog. Collects the author fields and, on Save, hands a
 * clean payload to the parent which appends it to the Current Author List.
 */
export default function AddAuthorModal({ open, onCancel, onSave }) {
  const [form] = Form.useForm();

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        onSave(values);
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
      title="Add New Author"
      open={open}
      onCancel={handleCancel}
      width={620}
      className="am6-modal"
      destroyOnHidden
      footer={[
        <Button key="cancel" className="am-btn-secondary" onClick={handleCancel}>Cancel</Button>,
        <Button key="save" className="am-btn-primary" onClick={handleSave}>Save</Button>,
      ]}
    >
      <p className="am6-modal-hint">Asterisk indicates required field</p>

      <Form form={form} layout="vertical" requiredMark className="am6-modal-form">
        <Form.Item name="firstName" label="Given/First Name" rules={[{ required: true, message: 'Please enter the first name.' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="middleName" label="Middle Name">
          <Input />
        </Form.Item>
        <Form.Item name="lastName" label="Family/Last Name" rules={[{ required: true, message: 'Please enter the last name.' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="degrees" label="Academic Degree(s)">
          <Input />
        </Form.Item>
        <Form.Item name="email" label="E-mail Address" rules={[{ required: true, message: 'Please enter an e-mail address.' }, { type: 'email', message: 'Please enter a valid e-mail address.' }]}>
          <Input />
        </Form.Item>
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
        <Form.Item
          name="institution"
          label="Institution"
          rules={[{ required: true, message: 'Please enter an institution.' }]}
          extra="Start typing to display potentially matching institutions."
        >
          <Input />
        </Form.Item>
        <Form.Item name="country" label="Country or Region">
          <Select options={COUNTRY_OPTIONS} placeholder="Please select from the list below" allowClear />
        </Form.Item>
        <Form.Item name="corresponding" valuePropName="checked" className="am6-modal-check">
          <Checkbox>This is the corresponding author</Checkbox>
        </Form.Item>
      </Form>
    </Modal>
  );
}
