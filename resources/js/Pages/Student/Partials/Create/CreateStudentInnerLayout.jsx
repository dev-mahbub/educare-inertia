import CreateStudentForm from './CreateStudentForm';

const CreateStudentInnerLayout = ({
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
    admissionNo,
    states,
    feeStructures,
    isFeeStructureWithTemplate,
    customFields,
    occupations,
    optionalSubjects
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateStudentForm
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
                        admissionNo={admissionNo}
                        states={states}
                        feeStructures={feeStructures}
                        isFeeStructureWithTemplate={isFeeStructureWithTemplate}
                        customFields={customFields}
                        occupations={occupations}
                        optionalSubjects={optionalSubjects}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateStudentInnerLayout;
