import { Modal, Form, Input, Select, Button } from 'antd';
import { GRANT_RECIPIENT_OPTIONS } from './manuscriptData.js';

/**
 * "Add New Funding Source" dialog. On Save, hands a clean payload to the parent
 * which appends it to the Current Funding Sources List.
 */
export default function AddFundingModal({ open, onCancel, onSave }) {
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
      title="Add New Funding Source"
      open={open}
      onCancel={handleCancel}
      width={560}
      className="am6-modal"
      destroyOnHidden
      footer={[
        <Button key="cancel" className="am-btn-secondary" onClick={handleCancel}>Cancel</Button>,
        <Button key="save" className="am-btn-primary" onClick={handleSave}>Save</Button>,
      ]}
    >
      <Form form={form} layout="vertical" className="am6-modal-form">
        <Form.Item name="funder" label="Find a Funder" rules={[{ required: true, message: 'Please enter a funder.' }]}>
          <Input placeholder="Start typing a funder name" />
        </Form.Item>
        <Form.Item name="award" label="Award Number">
          <Input />
        </Form.Item>
        <Form.Item name="recipient" label="Grant Recipient">
          <Select options={GRANT_RECIPIENT_OPTIONS} placeholder="Please select a recipient" allowClear />
        </Form.Item>
      </Form>
    </Modal>
  );
}
