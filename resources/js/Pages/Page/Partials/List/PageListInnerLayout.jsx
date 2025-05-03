import NoMenusHeaderMenus from '../../../../Components/Partials/Menus/NoMenus/NoMenusHeaderMenus';
import PageList from './PageList';
import SearchBar from './SearchBar';

const PageListInnerLayout = ({
    lists,
    newsStatusArr,
    orderByTypes,
    audienceTypes
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <NoMenusHeaderMenus title="Pages" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SearchBar />
                    <PageList
                        lists={lists}
                    />
                </div>
            </div>
        </div>
    );
};

export default PageListInnerLayout;
