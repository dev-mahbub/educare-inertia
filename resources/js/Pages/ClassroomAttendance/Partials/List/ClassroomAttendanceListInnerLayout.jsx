import React from 'react';
import ClassroomAttendanceList from './ClassroomAttendanceList';
import ClassroomAttendanceListFilter from './ClassroomAttendanceListFilter';
import SearchBar from './SearchBar';
import StudentAttendanceHeaderMenus from '@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus';

const ClassroomAttendanceListInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentAttendanceHeaderMenus title="Online Class" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SearchBar />
                    <ClassroomAttendanceListFilter />
                    <ClassroomAttendanceList />
                </div>
            </div>
        </div>
    );
};

export default ClassroomAttendanceListInnerLayout;