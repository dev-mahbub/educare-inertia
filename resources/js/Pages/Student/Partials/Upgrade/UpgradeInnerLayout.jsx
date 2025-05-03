import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import UpgradeSource from './UpgradeSource';
import UpgradeTarget from './UpgradeTarget';

const UpgradeInnerLayout = ({
    academicYearId,
    academicSession,
    classrooms,
    classroomStudents,
    students,
    classroomUpgradeStudents,
    user,
}) => {

    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        academic_year_id: "",
        classroom_id: "",
        target_academic_year_id: "",
        target_classroom_id: "",
        students: "",
        selected_student: [],
        student_all: false,
    });

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('student.upgrade'), data);
        setLoading(false);
    }

    const handleSearch2 = (e) => {
        e.preventDefault();
        router.post(route('student.upgrade'), data);
        setLoading2(true);
    }

    const handelUpgradeStudent = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: `Fee structure of Target academic year is Template based. Fee structure is created for target class/academic year Upgraded student will have fee structure.Do you want to assign fee structure to upgraded students? `,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, update it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.post(route('student_upgrade.save'), data);
            }
        });
    }

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Students" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <form>
                        <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                            <div className="lg:col-span-6 col-span-12">
                                <UpgradeSource
                                    academicYearId={academicYearId}
                                    academicSession={academicSession}
                                    classrooms={classrooms}
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    handleSearch={handleSearch}
                                    classroomStudents={classroomStudents}
                                    students={students}
                                    loading={loading}
                                    setLoading={setLoading}
                                    handelUpgradeStudent={handelUpgradeStudent}
                                />
                            </div>
                            <div className="lg:col-span-6 col-span-12">
                                <UpgradeTarget
                                    academicYearId={academicYearId}
                                    academicSession={academicSession}
                                    classrooms={classrooms}
                                    data={data}
                                    setData={setData}
                                    errors={errors}
                                    handleSearch2={handleSearch2}
                                    classroomUpgradeStudents={classroomUpgradeStudents}
                                    loading2={loading2}
                                    setLoading2={setLoading2}
                                    user={user}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpgradeInnerLayout;
