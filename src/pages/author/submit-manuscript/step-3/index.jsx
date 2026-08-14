import { useMemo, useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Steps, Select, Button, message } from 'antd';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import Layout from '../../../../components/layout/Layout';
import TopBar from '../../../../components/shared/TopBar';
import { useQuery, useMutation } from '../../../../hooks/reactQuery/index.js';
import { OVERVIEW_STEP_TITLES } from '../overviewStepTitles.js';
import { getWizardState, setStep3Data } from '../paperDraftStore.js';

/**
 * Step 3 — Keywords. Part of the (new) Overview-first flow (see
 * overviewStepTitles.js) — replaces the old step-3 "General Information"
 * page from the separate step-1..step-6 flow at this same route (same
 * situation as Step 2's replacement of the old "Attach Files" page).
 */
export default function SubmitManuscriptStep3() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const slug = searchParams.get('slug') || getWizardState()?.slug || null;

  useEffect(() => {
    if (!slug) {
      message.warning('Please complete Step 1 first.');
      navigate('/author/submit-manuscript/step-1', { replace: true });
    }
  }, [slug, navigate]);

  const { data: keywordsResult, isLoading: keywordsLoading } = useQuery('getKeywords');
  const keywordOptions = useMemo(
    () => (keywordsResult?.data || []).map((k) => ({ value: k.id, label: k.name })),
    [keywordsResult]
  );

  // Rehydrate from whatever was last successfully saved via
  // update-keywords, so a Back-navigation from Step 4 doesn't blank this out.
  const savedKeywords = useMemo(() => getWizardState()?.step3Data, []);
  const [existingKeywordIds, setExistingKeywordIds] = useState(savedKeywords?.existingIds || []);
  const [newKeywords, setNewKeywords] = useState(savedKeywords?.newKeywords || []);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');

  const addTag = (raw) => {
    const value = raw.trim();
    if (!value) return;
    setNewKeywords((prev) => (prev.includes(value) ? prev : [...prev, value]));
    setTagInput('');
    setError('');
  };

  const removeTag = (value) => setNewKeywords((prev) => prev.filter((k) => k !== value));

  const handleTagKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(tagInput);
    } else if (e.key === 'Backspace' && !tagInput && newKeywords.length) {
      // Convenience: backspacing on an empty field pops the last chip,
      // same as most chip-input widgets (Gmail's To field, antd tags, etc).
      setNewKeywords((prev) => prev.slice(0, -1));
    }
  };

  const { mutate: updateKeywords, isPending: isSaving } = useMutation('updatePaperKeywords', {
    useFormData: false,
    showSuccessNotification: true,
    onSuccess: () => {
      navigate('/author/submit-manuscript/step-4');
    },
  });

  const handleBack = () => {
    navigate('/author/submit-manuscript/step-2');
  };

  const handleNext = () => {
    // Keywords are now mandatory — at least one (existing or new) is
    // required before Step 4 is reachable.
    if (!existingKeywordIds.length && !newKeywords.length) {
      const msg = 'Please enter at least one keyword to proceed.';
      setError(msg);
      message.error(msg);
      return;
    }

    // Keeps the IDs (to re-hydrate the Select on a later visit) alongside
    // resolved labels (for Step 5's summary, without re-fetching keywords).
    setStep3Data({
      existingIds: existingKeywordIds,
      existingLabels: existingKeywordIds
        .map((id) => keywordOptions.find((o) => o.value === id)?.label || '')
        .filter(Boolean),
      newKeywords,
    });
    updateKeywords({
      slug,
      data: {
        keyword_ids: existingKeywordIds.map(Number),
        new_keywords: newKeywords,
      },
    });
  };

  return (
    <Layout>
      <TopBar />

      <section className="am-wizard">
        <div className="container">
          <Steps
            current={2}
            responsive
            titlePlacement="vertical"
            className="am-steps"
            items={OVERVIEW_STEP_TITLES.map((title) => ({ title }))}
          />

          <div className="am-step-body">
            <div className="am-step">
              <h1 className="am-step-heading">Step 3: Keywords</h1>

              <div className="row g-4">
                {/* Left helper rail */}
                <aside className="col-12 col-lg-3">
                  <p className="am-help-strong">
                    Select from existing keywords or add new ones that best describe your
                    manuscript.
                  </p>
                </aside>

                <div className="col-12 col-lg-9">
                  <label className="am-field-label">Select Existing Keywords</label>
                  <Select
                    className="w-100"
                    mode="multiple"
                    showSearch
                    optionFilterProp="label"
                    placeholder="Search and select keywords"
                    value={existingKeywordIds}
                    options={keywordOptions}
                    loading={keywordsLoading}
                    onChange={(value) => {
                      setExistingKeywordIds(value);
                      setError('');
                    }}
                  />

                  <label className="am-field-label am-mt-24">New Keywords</label>
                  <div className="am-tag-input">
                    {newKeywords.map((k) => (
                      <span key={k} className="am-tag-chip">
                        {k}
                        <button
                          type="button"
                          className="am-tag-chip-remove"
                          aria-label={`Remove ${k}`}
                          onClick={() => removeTag(k)}
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    <input
                      className="am-tag-input-field"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleTagKeyDown}
                      onBlur={() => addTag(tagInput)}
                      placeholder={newKeywords.length ? '' : 'Type a keyword and press Enter or ,'}
                    />
                  </div>
                  {error && <p className="am-error-text">{error}</p>}

                  <div className="am-actions">
                    <Button className="am-btn-secondary" onClick={handleBack}>
                      <ArrowLeftOutlined /> Back
                    </Button>
                    <Button className="am-btn-theme" onClick={handleNext} loading={isSaving}>
                      Save &amp; Next <ArrowRightOutlined />
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
