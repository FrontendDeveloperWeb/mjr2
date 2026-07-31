import { useNavigate } from 'react-router-dom';
import { Steps, Form, Select, Radio, Input, Button } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import { STEP_TITLES } from '../stepTitles.js';
import { setStepData } from '../manuscriptStore.js';
import { useDraftId, useDraftAutosave } from '../useManuscriptDraft.js';

// Sentinel for the pre-selected "Please select a response" option — treated as
// unanswered by the validators below.
const NONE = 'none';

const YES_NO_OPTIONS = [
  { value: NONE, label: 'Please select a response' },
  { value: 'Yes', label: 'Yes' },
  { value: 'No', label: 'No' },
];

const SCOPUS_LIMIT = 200;

// Reject the sentinel (or empty) so a real choice is required.
const requireResponse = {
  validator: (_, value) =>
    value && value !== NONE ? Promise.resolve() : Promise.reject(new Error('Please select a response.')),
};

const CONFIRM_FUNDING =
  'I confirm that I have mentioned all organizations that funded my research in the Acknowledgements section of my submission, including grant numbers where appropriate.';

/** Card wrapper for a single questionnaire item. */
function QCard({ statement, children }) {
  return (
    <div className="am-q-card">
      <div className="am-q-statement">{statement}</div>
      {children}
    </div>
  );
}

export default function SubmitManuscriptStep4() {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const scopus = Form.useWatch('scopus', form) || '';
  const allAnswers = Form.useWatch([], form) || {};

  const draftId = useDraftId();
  useDraftAutosave(draftId, 'step4', 4, allAnswers);

  const handleProceed = () => {
    form
      .validateFields()
      .then((values) => {
        setStepData('step4', values);
        navigate('/author/submit-manuscript/step-5');
      })
      .catch(() => {
        /* antd surfaces the per-field errors inline */
      });
  };

  return (
    <Layout>
      <TopBar />

      <section className="am-wizard">
        <div className="container">
          <Steps
            current={3}
            responsive
            titlePlacement="vertical"
            className="am-steps"
            items={STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            <div className="am-step">
              <h1 className="am-step-heading">Step 4: Additional Information</h1>

              <div className="am-attach-topbar">
                <a href="#insert-char" className="am-help-link am-insert-link">Insert Special Character</a>
              </div>

              <div className="row g-4">
                {/* Left rail: helper + warning callout */}
                <aside className="col-12 col-lg-3">
                  <p className="am-help-strong">Please respond to the presented questions/statements.</p>
                  <p className="am-q-warning">
                    If there are duplicate submissions made elsewhere, it can lead to immediate
                    rejection of the paper in JAR and flagging the author in the system.
                  </p>
                </aside>

                {/* Questionnaire */}
                <div className="col-12 col-lg-9">
                  <div className="am-q-headbar">Questionnaire</div>

                  <Form
                    form={form}
                    layout="horizontal"
                    requiredMark={false}
                    className="am-q-form"
                    labelCol={{ flex: '120px' }}
                    wrapperCol={{ flex: 'auto' }}
                    initialValues={{ q1: NONE, q2: NONE, q3: NONE, q4: NONE, q6: NONE }}
                  >
                    {/* Q1 */}
                    <QCard statement="Please confirm whether this manuscript, or any portion of it, is a simultaneous submission. In other words, if the manuscript has been submitted elsewhere.">
                      <Form.Item name="q1" label="Answer Required:" colon={false} className="am-q-item" rules={[requireResponse]}>
                        <Select className="am-q-select" options={YES_NO_OPTIONS} />
                      </Form.Item>
                    </QCard>

                    {/* Q2 */}
                    <QCard
                      statement={
                        <>
                          Please note that your paper must follow the format as listed in the
                          &ldquo;Submission Checklist&rdquo; for the journal. Can you please confirm
                          that your paper has followed the correct format by entering{' '}
                          <strong>Yes</strong> or <strong>No</strong> in the below field?{' '}
                          <a href="#checklist" className="am-help-link am-q-link">Checklist available to view here</a>
                        </>
                      }
                    >
                      <Form.Item name="q2" label="Answer Required:" colon={false} className="am-q-item" rules={[requireResponse]}>
                        <Select className="am-q-select" options={YES_NO_OPTIONS} />
                      </Form.Item>
                    </QCard>

                    {/* Q3 */}
                    <QCard statement="Please confirm that you have mentioned all organizations that funded your research in the Acknowledgements section of your submission, including grant numbers where appropriate.">
                      <Form.Item name="q3" label="Answer Required:" colon={false} className="am-q-item" rules={[requireResponse]}>
                        <Radio.Group className="am-q-radio">
                          <Radio value={NONE}>Please select a response</Radio>
                          <Radio value="confirm">{CONFIRM_FUNDING}</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </QCard>

                    {/* Q4 */}
                    <QCard statement="If the MS is accepted for publication, I agree to pay the publication fee of Four Thousand Four Hundred Dollars (4,400 USD) excluding taxes">
                      <span className="am-q-instructions">Instructions</span>
                      <Form.Item name="q4" label="Answer Required:" colon={false} className="am-q-item" rules={[requireResponse]}>
                        <Radio.Group className="am-q-radio">
                          <Radio value={NONE}>Please select a response</Radio>
                          <Radio value="Yes">Yes</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </QCard>

                    {/* Q5 */}
                    <QCard statement="Please copy paste the Scopus profile weblink of the corresponding author">
                      <div className="am-q-charcount-row">
                        <span className="am-q-charcount">Character Count: {scopus.length}</span>
                      </div>
                      <Form.Item
                        name="scopus"
                        label="Answer Required:"
                        colon={false}
                        className="am-q-item"
                        rules={[{ required: true, message: 'Please enter a response.' }]}
                        extra={<span className="am-q-limit">Limit {SCOPUS_LIMIT} characters</span>}
                      >
                        <Input maxLength={SCOPUS_LIMIT} className="am-q-scopus-input" />
                      </Form.Item>
                    </QCard>

                    {/* Q6 */}
                    <QCard statement="Please confirm that your paper is not a resubmission of a previously rejected paper. Rejected papers may not be resubmitted. Also, please make sure that even papers rejected due to high iThenticate score cannot be resubmitted.">
                      <Form.Item name="q6" label="Answer Required:" colon={false} className="am-q-item" rules={[requireResponse]}>
                        <Radio.Group className="am-q-radio">
                          <Radio value={NONE}>Please select a response</Radio>
                          <Radio value="Confirm">Confirm</Radio>
                        </Radio.Group>
                      </Form.Item>
                    </QCard>
                  </Form>

                  <div className="am-actions">
                    <Button className="am-btn-secondary" onClick={() => navigate('/author/submit-manuscript/step-3')}>
                      <ArrowLeftOutlined /> Back
                    </Button>
                    <Button className="am-btn-primary" onClick={handleProceed}>
                      Proceed <ArrowRightOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
