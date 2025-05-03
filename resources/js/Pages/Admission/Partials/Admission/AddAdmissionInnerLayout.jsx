import AddAdmissionForm from './AddAdmissionForm';

const AddAdmissionInnerLayout = ({
    registrationData,
    states,
    houses,
    categories,
    bloodGroups,
    religions,
    genderArr,
    admissionType,
    admissionProcess,
    classrooms,
    isFeeStructureWithTemplate,
    feeStructures,
    feeStructure
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <AddAdmissionForm
                        houses={houses}
                        genderArr={genderArr}
                        categories={categories}
                        bloodGroups={bloodGroups}
                        religions={religions}
                        states={states}
                        admissionType={admissionType}
                        registrationData={registrationData}
                        admissionProcess={admissionProcess}
                        classrooms={classrooms}
                        isFeeStructureWithTemplate={isFeeStructureWithTemplate}
                        feeStructures={feeStructures}
                        feeStructure={feeStructure}
                    />
                </div>
            </div>
        </div>
    );
};

export default AddAdmissionInnerLayout;
