import React from 'react';
import StudentMisQuickReport from './StudentMisQuickReport';
import StudentClassGraph from './StudentClassGraph';
import StudentGrowthGraph from './StudentGrowthGraph';
import StudentReligionGraph from './StudentReligionGraph';
import StudentHouseGraph from './StudentHouseGraph';
import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import StudentListTableWithClass from './StudentList/StudentListTableWithClass';
import StudentListTableWithSession from './StudentList/StudentListTableWithSession';
import StudentListTableWithHouse from './StudentList/StudentListTableWithHouse';
import StudentListTableWithReligion from './StudentList/StudentListTableWithReligion';

const StudentMisReportInnerLayout = ( {getStudentCounts, transportCounts,
    getClassroomsWithStudentCount,
    getHouseWiseStudent,
    getReligionWiseStudent,
    getTotalStudentPerSession,
 } ) => {
    const [displayType, setDisplayType] = React.useState('chart');
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle bg-white">
                    <StudentHeaderMenus title="Manage Students" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentMisQuickReport getStudentCounts = {getStudentCounts} transportCounts={transportCounts} />
                    <div className="flex justify-start mb-4">
                        <div className="inline-flex rounded-md shadow-sm">
                            <button
                                type="button"
                                onClick={() => setDisplayType('chart')}
                                className={`px-4 py-2 text-sm font-medium rounded-l-lg ${displayType === 'chart' ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : ''}`}
                            >
                                Display in chart
                            </button>
                            <button
                                type="button"
                                onClick={() => setDisplayType('list')}
                                className={`px-4 py-2 text-sm font-medium text-gray-700 border rounded-r-lg ${displayType === 'list' ? 'bg-blue-600 text-white border-blue-600 hover:bg-blue-700' : ''}`}
                            >
                                Display in list
                            </button>
                        </div>
                    </div>
                    {displayType === 'chart' && (
                    <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                        <div className="col-span-12">
                            <StudentClassGraph getClassroomsWithStudentCount = {getClassroomsWithStudentCount} />
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <StudentGrowthGraph getTotalStudentPerSession ={getTotalStudentPerSession} />
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <StudentReligionGraph getReligionWiseStudent = {getReligionWiseStudent} />
                        </div>
                        <div className="col-span-12 lg:col-span-4">
                            <StudentHouseGraph getHouseWiseStudent = {getHouseWiseStudent} />
                        </div>
                    </div>
                    )}
                    {displayType === 'list' && (
                    <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x-0">
                        <div className="col-span-12 lg:col-span-3">
                            <StudentListTableWithClass getData = {getClassroomsWithStudentCount} />
                        </div>
                        <div className="col-span-12 lg:col-span-3">
                            <StudentListTableWithSession getData = {getTotalStudentPerSession}/>
                        </div>
                        <div className="col-span-12 lg:col-span-3">
                            <StudentListTableWithHouse getData = {getHouseWiseStudent} />
                        </div>
                        <div className="col-span-12 lg:col-span-3">
                            <StudentListTableWithReligion getData = {getReligionWiseStudent} />
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentMisReportInnerLayout;