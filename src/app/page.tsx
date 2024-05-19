import {
    Banner,
    Ads,
    ListPost,
} from '@/components';

export default function Home() {
    return (
        <div>
            <Banner />
            <div className="md:pt-20 pt-4 pb-24">
                <div className="max-w-7xl mx-auto md:px-8 px-4">
                    <Ads />
                    <div className="md:py-20 py-4">
                        <h2 className="font-bold text-2xl text-[#181A2A] md:mb-8 mb-4">
                            Latest Post
                        </h2>
                        <ListPost />
                    </div>
                    <Ads />
                </div>
            </div>
        </div>
    );
}
