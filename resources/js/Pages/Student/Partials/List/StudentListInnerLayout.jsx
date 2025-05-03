import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import StudentList from './StudentList';
import StudentListFilter from './StudentListFilter';

const StudentListInnerLayout = ({
    students,
    classrooms,
    boardingType,
    contextStatus
}) => {
    const [loading, setLoading] = useState(false);
    const [studentData, setStudentData] = useState(students);

    const {
        data,
        setData,
    } = useForm({
        student_custom_field_id: "",
        classroom_id: "",
        student_search: "",
        classroom_id_id: "",
    });

    useEffect(() => {
        setStudentData(students);
        setLoading(false);
    }, [students]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentHeaderMenus title="Students" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    {/* <SearchBar /> */}
                    <StudentListFilter
                        students={students}
                        classrooms={classrooms}
                        boardingType={boardingType}
                        setLoading={setLoading}
                        data={data}
                        setData={setData}
                        studentData={studentData}
                        setStudentData={setStudentData}
                    />
                    <StudentList
                        students={students}
                        loading={loading}
                        setLoading={setLoading}
                        data={data}
                        setData={setData}
                        studentData={studentData}
                        setStudentData={setStudentData}
                        contextStatus={contextStatus}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentListInnerLayout;
