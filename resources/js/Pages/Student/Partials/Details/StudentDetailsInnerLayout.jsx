import React from "react";
import StudentDetailsForm from "./StudentDetailsForm";

const StudentDetailsInnerLayout = ({
    countries,
    states,
    status,
    student,
    fatherData,
    motherData,
    guardianData,
    classNames,
    houses,
    admissionNumbers,
    schBoaArr,
    casteArr,
    genderArr,
    categories,
    bloodGroups,
    religions,
    catEmps,
    subCasteArr,
    accountArr,
    banks,
    fatherUserData,
    stuSibling,
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <StudentDetailsForm
                        countries={countries}
                        states={states}
                        status={status}
                        student={student}
                        fatherData={fatherData}
                        motherData={motherData}
                        guardianData={guardianData}
                        classNames={classNames}
                        houses={houses}
                        admissionNumbers={admissionNumbers}
                        schBoaArr={schBoaArr}
                        casteArr={casteArr}
                        genderArr={genderArr}
                        categories={categories}
                        bloodGroups={bloodGroups}
                        religions={religions}
                        catEmps={catEmps}
                        subCasteArr={subCasteArr}
                        accountArr={accountArr}
                        banks={banks}
                        fatherUserData={fatherUserData}
                        stuSibling={stuSibling}
                    />
                </div>
            </div>
        </div>
    );
};

export default StudentDetailsInnerLayout;
