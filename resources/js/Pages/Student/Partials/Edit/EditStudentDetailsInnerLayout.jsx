import EditStudentDetailsForm from './EditStudentDetailsForm';

const EditStudentDetailsInnerLayout = ({
    siteData,
    student,
    fatherData,
    motherData,
    guardianData,
    classNames,
    houses,
    status,
    admissionNumbers,
    schBoaArr,
    casteArr,
    genderArr,
    categories,
    bloodGroups,
    religions,
    countries,
    catEmps,
    subCasteArr,
    accountArr,
    banks,
    states,
    fatherUserData,
    stuSibling,
    customFields,
    occupations,
    optionalSubjects,
    optionalActiveSubjects
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditStudentDetailsForm
                        siteData={siteData}
                        student={student}
                        fatherData={fatherData}
                        motherData={motherData}
                        guardianData={guardianData}
                        classNames={classNames}
                        houses={houses}
                        status={status}
                        admissionNumbers={admissionNumbers}
                        schBoaArr={schBoaArr}
                        casteArr={casteArr}
                        genderArr={genderArr}
                        categories={categories}
                        bloodGroups={bloodGroups}
                        religions={religions}
                        countries={countries}
                        catEmps={catEmps}
                        subCasteArr={subCasteArr}
                        accountArr={accountArr}
                        banks={banks}
                        states={states}
                        fatherUserData={fatherUserData}
                        stuSibling={stuSibling}
                        customFields={customFields}
                        occupations={occupations}
                        optionalSubjects={optionalSubjects}
                        optionalActiveSubjects={optionalActiveSubjects}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditStudentDetailsInnerLayout;
