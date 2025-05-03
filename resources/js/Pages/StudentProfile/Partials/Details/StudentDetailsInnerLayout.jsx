import StudentDetailMenus from "@/Components/Partials/Menus/StudentDetail/StudentDetailMenus";
import StudentDetailsForm from "./StudentDetailsForm";

const StudentDetailsInnerLayout = ({
    student,
    fatherData,
    motherData,
    guardianData,
    countries,
    catEmps,
    subCasteArr,
    accountArr,
    states,
    transportData,
    subjectsData
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StudentDetailMenus title="Student Detail" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentDetailsForm
                        student={student}
                        fatherData={fatherData}
                        motherData={motherData}
                        guardianData={guardianData}
                        countries={countries}
                        catEmps={catEmps}
                        subCasteArr={subCasteArr}
                        accountArr={accountArr}
                        states={states}
                        transportData={transportData}
                        subjectsData={subjectsData}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentDetailsInnerLayout;
