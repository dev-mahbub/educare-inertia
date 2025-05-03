import NoticeMenuCategory from '../../NoticeMenuCategory';
import NoticeForm from './NoticeForm';

const NoticeFromInnerLayout = ({
    statusArr,
    noticeTypes,
    audienceTypes,
    classrooms
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
                    <NoticeForm
                        statusArr={statusArr}
                        noticeTypes={noticeTypes}
                        audienceTypes={audienceTypes}
                        classrooms={classrooms}
                    />
                </div>
            </div>
        </div>
    );
};

export default NoticeFromInnerLayout;
