import StudentHeaderMenus from '@/Components/Partials/Menus/Student/StudentHeaderMenus';
import moment from "moment";
import { useEffect, useMemo, useState } from 'react';
import StudentDocumentReportFilter from './StudentDocumentReportFilter';
import StudentDocumentReportTable from './StudentDocumentReportTable';


const StudentDocumentInnerLayout = ({ students, classrooms }) => {

    const [loading, setLoading] = useState(false);
    const [filterText, setFilterText] = useState("");
    const [studentData, setStudentData] = useState([]);

    // filter students data
    const filteredStudents = useMemo(() => {
        return Object.values(students).filter((item) => {
            const inputText = filterText?.toLowerCase().trim();

            const admissionNo = item?.student?.admission_no?.toLowerCase();
            const studentName = `${item?.student?.first_name ?? ""} ${item?.student?.middle_name ?? ""} ${item?.student?.last_name ?? ""}`.toLowerCase();
            const classroomTitle = item?.student?.classroom?.title?.toLowerCase();
            const birthDate = item?.birth_date_at != null ? moment(item?.birth_date_at).format("DD MMM, YYYY")?.toLowerCase() : "";
            const fatherName = `${item?.student?.father?.first_name ?? ""} ${item?.student?.father?.middle_name ?? ""} ${item?.student?.father?.last_name ?? ""}`.toLowerCase();
            const attachedDocuments = item?.attached_documents?.toLowerCase();
            const unattachedDocuments = item?.unattached_documents?.toLowerCase();

            return (
                (admissionNo && admissionNo.includes(inputText)) ||
                (studentName && studentName.includes(inputText)) ||
                (classroomTitle && classroomTitle.includes(inputText)) ||
                (birthDate && birthDate.includes(inputText)) ||
                (fatherName && fatherName.includes(inputText)) ||
                (attachedDocuments && attachedDocuments.includes(inputText)) ||
                (unattachedDocuments && unattachedDocuments.includes(inputText))
            );

        });
    }, [students, filterText])
    //filter students data

    useEffect(() => {
        setStudentData(filteredStudents)
    }, [filteredStudents]);

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
                        <StudentDocumentReportFilter
                            studentCount={studentData?.length}
                            setLoading={setLoading}
                            classrooms={classrooms}
                            setFilterText={setFilterText}
                        />
                        <StudentDocumentReportTable
                            studentData={studentData}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentDocumentInnerLayout;
