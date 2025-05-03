import NewsMenuCategory from '../../NewsMenuCategory';
import NewsList from './NewsList';
import NewsListFilter from './NewsListFilter';
import SearchBar from './SearchBar';

const NewsListInnerLayout = ({
    newsLists,
    newsStatusArr,
    orderByTypes,
    audienceTypes
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <NewsMenuCategory />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SearchBar />
                    <NewsListFilter
                        newsStatusArr={newsStatusArr}
                        orderByTypes={orderByTypes}
                        audienceTypes={audienceTypes}
                        newsLists={newsLists}
                    />
                    <NewsList
                        newsLists={newsLists}
                    />
                </div>
            </div>
        </div>
    );
};

export default NewsListInnerLayout;
