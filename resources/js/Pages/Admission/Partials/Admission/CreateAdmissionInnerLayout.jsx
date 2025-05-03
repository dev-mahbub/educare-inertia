import CreateAdmissionForm from './CreateAdmissionForm';

const CreateAdmissionInnerLayout = ({
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
    // banks,
    admissionNo,
    states,
    paymentModes,
    banks,
    academicYears,
    users,
    admissionSources,
    paymentMode,
    referenceTypeArr,
    alumniTypeArr,
    staffs,
    admissionProcess,
    enquiry,
    students,
    academicYearId,
    customFields
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateAdmissionForm
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
                        paymentModes={paymentModes}
                        academicYears={academicYears}
                        users={users}
                        admissionSources={admissionSources}
                        paymentMode={paymentMode}
                        referenceTypeArr={referenceTypeArr}
                        alumniTypeArr={alumniTypeArr}
                        staffs={staffs}
                        admissionProcess={admissionProcess}
                        enquiry={enquiry}
                        students={students}
                        academicYearId={academicYearId}
                        customFields={customFields}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateAdmissionInnerLayout;
