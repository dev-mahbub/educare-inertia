import SurveyHeaderMenus from '@/Components/Partials/Menus/Survey/SurveyHeaderMenus';
import UserSurveyLists from './UserSurveyLists';

const UserSurveyListInnerLayout = ({
    surveys
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <SurveyHeaderMenus title="Survey Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <UserSurveyLists
                        surveys={surveys}
                    />
                </div>
            </div>
        </div>
        </>
    );
};

export default UserSurveyListInnerLayout;
