import StudentHeaderMenus from "@/Components/Partials/Menus/Student/StudentHeaderMenus";
import { useEffect, useState } from "react";
import EwsReportFilter from "./EwsReportFilter";
import EwsReportFilterTopbar from "./EwsReportFilterTopbar";
import EwsReportTable from "./EwsReportTable";
const EwsReportInnerLayout = ({
    classrooms,
    ewsReports
}) => {

    const [filteredReports, setFilteredReports] = useState([]);

    useEffect(() => {
        setFilteredReports(ewsReports);
    }, [ewsReports]);

    // handle filter report start
    const hanldeFilterReport = (event) => {
        const filterText = event.target.value.trim();

        if (filterText != '') {
            setFilteredReports(ewsReports?.filter(item => {
                const studentName = item?.student_name?.toLowerCase();
                const admissionNo = item?.admission_no?.toLowerCase();
                const rollNo = item?.roll_no?.toLowerCase();
                const classroomTitle = item?.guardian_email?.toLowerCase();
                const birthDate = item?.birth_date?.toLowerCase();
                const fatherName = item?.father_name?.toLowerCase();
                const fatherPhone = item?.father_phone?.toLowerCase();

                return (
                    (studentName && studentName.includes(filterText)) ||
                    (admissionNo && admissionNo.includes(filterText)) ||
                    (rollNo && rollNo.includes(filterText)) ||
                    (classroomTitle && classroomTitle.includes(filterText)) ||
                    (birthDate && birthDate.includes(filterText)) ||
                    (fatherName && fatherName.includes(filterText)) ||
                    (fatherPhone && fatherPhone.includes(filterText))
                );
            }));
        }
        else {
            setFilteredReports(ewsReports);
        }
    }
    // handle filter report end

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
                        <EwsReportFilterTopbar
                            ewsReport={filteredReports}
                        />
                        <EwsReportFilter
                            classrooms={classrooms}
                            ewsReports={filteredReports}
                            hanldeFilterReport={hanldeFilterReport}
                        />
                        <EwsReportTable
                            ewsReports={filteredReports}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default EwsReportInnerLayout;
