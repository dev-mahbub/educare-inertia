import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import CustomIdDownloadForm from './CustomIdDownloadForm';

const CustomIdCardInnerLayout = ({
    classrooms,
    classNames,
    academicYears,
    statusArray,
    attributes
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
                        <CustomIdDownloadForm
                            classrooms={classrooms}
                            classNames={classNames}
                            academicYears={academicYears}
                            statusArray={statusArray}
                            attributes={attributes}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default CustomIdCardInnerLayout;
