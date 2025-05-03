import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import PreDefinedDownloadForm from './PreDefinedDownloadForm';
const PreDefinedDownloadInnerLayout = ({
    classNames,
    classrooms,
    statusArray
}) => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="STUDENTS" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                     <PreDefinedDownloadForm
                        classNames={classNames}
                        classrooms={classrooms}
                        statusArray={statusArray}
                     />
                </div>
            </div>
        </div>
        </>
    );
};

export default PreDefinedDownloadInnerLayout;
