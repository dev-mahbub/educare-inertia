import NoMenusHeaderMenus from '../../../../Components/Partials/Menus/NoMenus/NoMenusHeaderMenus';
import PageForm from './PageForm';

const PageFromInnerLayout = ({
    statusArr,
    pageTypes,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <NoMenusHeaderMenus title="Create Page" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <PageForm
                        statusArr={statusArr}
                        pageTypes={pageTypes}
                    />
                </div>
            </div>
        </div>
    );
};

export default PageFromInnerLayout;
