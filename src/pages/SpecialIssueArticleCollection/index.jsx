import { useMemo, useState } from 'react';
import { FileTextOutlined } from '@ant-design/icons';
import DashboardTopBar from '../../components/layout/DashboardTopBar.jsx';
import CollectionsSidebar from '../../components/partials/special-issues/CollectionsSidebar.jsx';
import CollectionsList from '../../components/partials/special-issues/CollectionsList.jsx';

const FILTER_TYPES = [
  { id: 'all', label: 'All collections' },
  { id: 'Special issue', label: 'Special issues', count: 11 },
  { id: 'Conference proceedings', label: 'Conference proceedings', count: 6 },
  { id: 'Supplements', label: 'Supplements', count: 3 },
];

const ALL_COLLECTIONS = [
  {
    id: 1,
    type: 'Conference proceedings',
    title: '12th International Scientific Conference "Innovations in Pharmacy Profession and Advancing Research" — Faculty of Pharmacy, Cairo University',
    subtitle: 'Held 6–7 May 2025, Cairo, Egypt',
    lastUpdate: 'August 2025',
    bgColor: 'bg-color-1',
  },
  {
    id: 2,
    type: 'Conference proceedings',
    title: 'Abstracts from United Conference of Hepatogastroenterology and Infectious Disease (UCHID)',
    subtitle: '22–24 September 2022, Cairo, Egypt',
    lastUpdate: 'November 2023',
    bgColor: 'bg-color-2',
  },
  {
    id: 3,
    type: 'Special issue',
    title: 'Food and Drug Interaction with Gut Microbiota',
    subtitle: '22–24 September 2022, Cairo, Egypt',
    editors: ['Prof. Mohamed A. Farag', 'Prof. Esra Capanoglu Güven', 'Prof. Ping Shao', 'Prof. Martin von Bergen'],
    lastUpdate: 'November 2023',
    bgColor: 'bg-color-3',
  },
];

export default function SpecialIssueArticleCollection() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredCollections = useMemo(() => {
    if (activeFilter === 'all') return ALL_COLLECTIONS;
    return ALL_COLLECTIONS.filter((collection) => collection.type === activeFilter);
  }, [activeFilter]);

  return (
    <>
      <section>
        <div className="container py-4">

          <DashboardTopBar />

          <div className="row g-4">
            <CollectionsSidebar
              filterTypes={FILTER_TYPES}
              activeFilter={activeFilter}
              onFilterChange={setActiveFilter}
            />
            <CollectionsList collections={filteredCollections} />
          </div>

          <div className="sd-sic-about-publication d-flex align-items-start gap-3 mt-4">
            <div className="sd-sic-about-icon">
              <img src="/assets/img/about-doc.png" alt="Elsevier logo" className="img-fluid" />
            </div>
            <div>
              <h5 className="mb-2">About this publication</h5>
              <p className="m-0">
                This journal is published on behalf of Cairo University by Elsevier B.V., a leading global academic
                publisher committed to advancing scientific knowledge. All content published within this journal—including
                research articles, reviews, figures, tables, supplementary materials, and editorial content—is protected
                under international copyright laws. All rights reserved. No part of this publication may be reproduced,
                distributed, stored in a retrieval system, transmitted, or adapted in any form or by any means without
                prior written permission from the copyright holder, except where permitted by applicable licensing
                agreements or statutory regulations.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
