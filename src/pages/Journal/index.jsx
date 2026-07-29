import { useMemo, useState } from 'react';
import HeroSection from '../../components/partials/Journal/HeroSection.jsx';
import FiltersSidebar from '../../components/partials/Journal/FiltersSidebar.jsx';
import PublicationsList from '../../components/partials/Journal/PublicationsList.jsx';
import ExploreResearchSection from '../../components/partials/Journal/ExploreResearchSection.jsx';
import TopBar from '../../components/shared/TopBar/index.jsx';
import Layout from '../../components/layout/Layout.jsx';
import { useInfiniteScroll } from '../../hooks/useInfiniteScroll.js';

// Raw mock database mapping image values precisely
const ALL_PUBLICATIONS = [
  { id: 1, title: "A New Era in Alzheimer's Research", type: "Books", path: "Pathogenesis, Prevention, and Treatment", year: 2024, hasButton: true, isOpenAccess: false },
  { id: 2, title: "A Practical Guide for Finding Interventions That Work for Autistic People", type: "Books", path: "Diversity-Affirming Evidence-Based Practice - Second Edition", year: 2024, hasButton: false, isOpenAccess: false },
  { id: 3, title: "A Practical Guide to Functional Assessment and Treatment for Severe Problem Behavior", type: "Journals", path: "Pathogenesis, Prevention, and Treatment", year: 2024, hasButton: false, isOpenAccess: false },
  { id: 4, title: "A New Era in Alzheimer's Research", type: "Journals", path: "Pathogenesis, Prevention, and Treatment", year: null, hasButton: false, isOpenAccess: true },
  { id: 5, title: "AACE Endocrinology and Diabetes", type: "Journals", path: "Pathogenesis, Prevention, and Treatment", year: null, hasButton: false, isOpenAccess: true },
  { id: 6, title: "AASRI Procedia", type: "Journals", path: "Pathogenesis, Prevention, and Treatment", year: null, hasButton: false, isOpenAccess: true },
  { id: 7, title: "Biolology Advanced Research Tools", type: "Textbooks", path: "Molecular Pathogenesis Trends", year: 2025, hasButton: false, isOpenAccess: false },
  { id: 8, title: "Clinical Neurology Handbook", type: "Handbooks", path: "Neurological Foundations Volume II", year: 2023, hasButton: false, isOpenAccess: true },
  { id: 9, title: "A New Era in Alzheimer's Research", type: "Books", path: "Pathogenesis, Prevention, and Treatment", year: 2024, hasButton: true, isOpenAccess: false },
  { id: 10, title: "A Practical Guide for Finding Interventions That Work for Autistic People", type: "Books", path: "Diversity-Affirming Evidence-Based Practice - Second Edition", year: 2024, hasButton: false, isOpenAccess: false },
  { id: 11, title: "A Practical Guide to Functional Assessment and Treatment for Severe Problem Behavior", type: "Journals", path: "Pathogenesis, Prevention, and Treatment", year: 2024, hasButton: false, isOpenAccess: false },
  { id: 12, title: "A New Era in Alzheimer's Research", type: "Journals", path: "Pathogenesis, Prevention, and Treatment", year: null, hasButton: false, isOpenAccess: true },
  { id: 13, title: "AACE Endocrinology and Diabetes", type: "Journals", path: "Pathogenesis, Prevention, and Treatment", year: null, hasButton: false, isOpenAccess: true },
  { id: 14, title: "AASRI Procedia", type: "Journals", path: "Pathogenesis, Prevention, and Treatment", year: null, hasButton: false, isOpenAccess: true },
  { id: 15, title: "Biolology Advanced Research Tools", type: "Textbooks", path: "Molecular Pathogenesis Trends", year: 2025, hasButton: false, isOpenAccess: false },
  { id: 16, title: "Clinical Neurology Handbook", type: "Handbooks", path: "Neurological Foundations Volume II", year: 2023, hasButton: false, isOpenAccess: true },
];
const CATEGORIES = [
  { name: 'Chemical Engineering' },
  { name: 'Chemistry' },
  { name: 'Computer Science' },
  { name: 'Earth and Planetary Science' },
  { name: 'Energy' },
  { name: 'Engineering' },
  { name: 'Material Science' },
  { name: 'Mathematics' },
  { name: 'Physics and astronomy' },
];

const POPULAR_ARTICLES = [
  {
    id: 1,
    title: 'Artificial intelligence in healthcare: A systematic literature review',
    meta: 'Expert Systems with Applications  •  Volume 242, Part A',
    badgeType: 'open-access',
  },
  {
    id: 2,
    title: 'Artificial intelligence in healthcare: A systematic literature review',
    meta: 'Expert Systems with Applications  •  Volume 242, Part A',
    badgeType: 'research-article',
  },
];

const RECENT_PUBLICATIONS = [
  {
    id: 1,
    title: 'Quantum computing advances in 2024',
    meta: 'Physics Today  ·  Volume 77, Issue 1',
    img: '/assets/img/publication-card-1.png',
  },
  {
    id: 2,
    title: 'Sustainable Material advances in 2024',
    meta: 'Physics Today  ·  Volume 77, Issue 1',
    img: '/assets/img/publication-card-2.png',
  },
  {
    id: 3,
    title: 'Chemical Research advances in 2024',
    meta: 'Physics Today  ·  Volume 77, Issue 1',
    img: '/assets/img/publication-card-3.png',
  },
];

export default function Journal() {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortBy, setSortBy] = useState('A-Z');

  // Filter & Sort Logic Computation
  const filteredPublications = useMemo(() => {
    let result = [...ALL_PUBLICATIONS];

    if (selectedTypes.length > 0) {
      result = result.filter((pub) => selectedTypes.includes(pub.type));
    }

    result.sort((a, b) => (sortBy === 'Z-A' ? b.title.localeCompare(a.title) : a.title.localeCompare(b.title)));

    return result;
  }, [selectedTypes, sortBy]);

  // Load-on-scroll window over the filtered set. The hook resets its window
  // automatically when `filteredPublications` changes (filter / sort).
  const totalItems = filteredPublications.length;
  const { visibleItems, hasMore, loading, sentinelRef } = useInfiniteScroll(filteredPublications);

  const handleFilterChange = (checkedValues) => {
    setSelectedTypes(checkedValues);
  };


  return (
    <Layout>
      <HeroSection />
      <TopBar />
      <ExploreResearchSection
        categories={CATEGORIES}
        popularArticles={POPULAR_ARTICLES}
        recentPublications={RECENT_PUBLICATIONS}
      />

      <section>
        <div className="sd-jl-container py-5">
          <div className="container">
            <div className="row g-4">
              <FiltersSidebar onFilterChange={handleFilterChange} />
              <PublicationsList
                publications={visibleItems}
                totalItems={totalItems}
                sortBy={sortBy}
                onSortChange={setSortBy}
                hasMore={hasMore}
                loading={loading}
                sentinelRef={sentinelRef}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
