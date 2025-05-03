import TransportHeaderMenus from '@/Components/Partials/Menus/Transport/TransportHeaderMenus';
import AllocationTransport from './AllocationTransport';

const AllcationInnerLayout = ({
    classrooms,
    vouchers,
    routes,
    transportTypeArr,
    stoppages,
    teachers,
    availableSeats,
    studentDetailsData,
    teacherDetailsData,
    prevStudentDetailsData,
    prevTeacherDetailsData,
    transportFeeStructureSetting,
    allStudentData,
    student,
    staff
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <TransportHeaderMenus title="Transport Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <AllocationTransport
                        classrooms={classrooms}
                        vouchers={vouchers}
                        routes={routes}
                        transportTypeArr={transportTypeArr}
                        stoppages={stoppages}
                        teachers={teachers}
                        availableSeats={availableSeats}
                        studentDetailsData={studentDetailsData}
                        teacherDetailsData={teacherDetailsData}
                        prevStudentDetailsData={prevStudentDetailsData}
                        prevTeacherDetailsData={prevTeacherDetailsData}
                        transportFeeStructureSetting={transportFeeStructureSetting}
                        allStudentData={allStudentData}
                        student={student}
                        staff={staff}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllcationInnerLayout;
