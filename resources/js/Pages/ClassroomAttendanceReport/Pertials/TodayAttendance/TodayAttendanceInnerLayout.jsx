import StudentAttendanceHeaderMenus from '@/Components/Partials/Menus/StudentAttendance/StudentAttendanceHeaderMenus';
import { useState } from 'react';
import TodayAttendanceFilter from './TodayAttendanceFilter';
import TodayAttendanceNotTakenTableList from './TodayAttendanceNotTakenTableList';
import TodayAttendanceTableList from './TodayAttendanceTableList';

const TodayAttendanceInnerLayout = ({
    getTodayAttendanceClassroom,
    classrooms,
}) => {

    const [loading, setLoading] = useState(false);
    const [params, setParams] = useState({});


    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentAttendanceHeaderMenus title="STUDENT ATTENDANCE" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <div className='educare-parent-montly-income-area'>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 xl:col-span-8 lg:col-span-7">
                                <TodayAttendanceFilter
                                    setLoading={setLoading}
                                    params={params}
                                    setParams={setParams}
                                />
                                <TodayAttendanceTableList
                                    getTodayAttendanceClassroom={getTodayAttendanceClassroom}
                                    loading={loading}
                                    setLoading={setLoading}
                                />
                            </div>
                            <div className="col-span-12 xl:col-span-4 lg:col-span-5">
                                <TodayAttendanceNotTakenTableList
                                    classrooms={classrooms}
                                    params={params}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodayAttendanceInnerLayout;
