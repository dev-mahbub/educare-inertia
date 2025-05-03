import ViewAdmissionForm from './ViewAdmissionForm';

const ViewAdmissionInnerLayout = ({
    admissionData,
    states,
    houses,
    genderArr,
    admissionType
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ViewAdmissionForm
                        houses={houses}
                        genderArr={genderArr}
                        states={states}
                        admissionType={admissionType}
                        admissionData={admissionData}
                    />
                </div>
            </div>
        </div>
    );
};

export default ViewAdmissionInnerLayout;
