import ArticlesCarouselSection from "../../../components/partials/News/ArticlesCarouselSection";
import Layout from "../../../components/layout/Layout";
import TopBar from "../../../components/shared/TopBar";

const CAROUSEL_ARTICLES = [
    {
        id: 1,
        title: 'New technology awarness.',
        desc: 'Ameliorative Effects of Honey on Petrol Vapor-Induced Oxidative Stress in the Reproductive System of Female Wistar Rats',
        author: 'Jane Cooper',
        date: '2nd January,2022',
        img: '/assets/img/slider-img.png',
        isActive: false,
    },
    {
        id: 2, // Center Card - Dark Variant
        title: 'New technology awarness.',
        desc: 'Ameliorative Effects of Honey on Petrol Vapor-Induced Oxidative Stress in the Reproductive System of Female Wistar Rats',
        author: 'Jane Cooper',
        date: '2nd January,2022',
        img: '/assets/img/slider-img.png',
        isActive: true,
    },
    {
        id: 3,
        title: 'New technology awarness.',
        desc: 'Ameliorative Effects of Honey on Petrol Vapor-Induced Oxidative Stress in the Reproductive System of Female Wistar Rats',
        author: 'Jane Cooper',
        date: '2nd January,2022',
        img: '/assets/img/slider-img.png',
        isActive: false,
    },
    {
        id: 4,
        title: 'New technology awarness.',
        desc: 'Ameliorative Effects of Honey on Petrol Vapor-Induced Oxidative Stress in the Reproductive System of Female Wistar Rats',
        author: 'Jane Cooper',
        date: '2nd January,2022',
        img: '/assets/img/slider-img.png',
        isActive: false,
    },
];

const News = () => {
    return (


        <Layout>
            <TopBar />
            <section>
                <ArticlesCarouselSection title="Newz" articles={CAROUSEL_ARTICLES} />
            </section>
        </Layout>



    );
};

export default News;
