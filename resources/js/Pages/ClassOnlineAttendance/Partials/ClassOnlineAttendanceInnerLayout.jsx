import ClassroomHeaderMenus from '@/Components/Partials/Menus/Classroom/ClassroomHeaderMenus';
import ClassOnlineAttendanceList from './ClassOnlineAttendanceList';

const OnlineClassAttendanceInnerLayout = ({
    classrooms,
    subjects,
    studentAttendances,
    currentDate
 }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle bg-white">
                    <ClassroomHeaderMenus title="Online Class" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ClassOnlineAttendanceList
                        classrooms={classrooms}
                        subjects={subjects}
                        studentAttendances={studentAttendances}
                        currentDate={currentDate}
                    />
                </div>
            </div>
        </div>
    );
};

export default OnlineClassAttendanceInnerLayout;
