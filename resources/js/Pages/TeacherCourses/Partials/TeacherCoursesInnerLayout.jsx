import TeacherOnlyTitleMenu from '@/Components/Partials/Header/TeacherOnlyTitleMenu';
import TeacherCoursesForm from './TeacherCoursesForm';
import TeachingCoursesHeader from './TeachingCoursesHeader';

const TeacherCoursesInnerLayout = ({
    siteData,
    classrooms,
    subjects,
    classroomLearningMaterials,
    currentDate
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <TeacherOnlyTitleMenu title="Teacher Courses" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <TeachingCoursesHeader
                        siteData={siteData}
                        classrooms={classrooms}
                        subjects={subjects}
                        currentDate={currentDate}
                    />
                    <TeacherCoursesForm
                        classroomLearningMaterials={classroomLearningMaterials}
                    />
                </div>
            </div>
        </div>
    );
};

export default TeacherCoursesInnerLayout;
