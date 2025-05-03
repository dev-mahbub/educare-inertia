import NoticeMenuCategory from '../../NoticeMenuCategory';
import NoticeList from './NoticeList';
import NoticeListFilter from './NoticeListFilter';
import SearchBar from './SearchBar';

const NoticeListInnerLayout = ({
    noticeLists,
    noticeStatusArr,
    orderByTypes,
    audienceTypes
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <NoticeMenuCategory />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SearchBar />
                    <NoticeListFilter
                        noticeStatusArr={noticeStatusArr}
                        orderByTypes={orderByTypes}
                        audienceTypes={audienceTypes}
                        noticeLists={noticeLists}
                    />
                    <NoticeList
                        noticeLists={noticeLists}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoticeListInnerLayout;
