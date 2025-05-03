import React from 'react';
import EditparentprofileForm from "./EditparentprofileForm";

const EditParentDetailsInnerLayout = ({
    parentData,
    states
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditparentprofileForm
                        parentData={parentData}
                        states={states}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditParentDetailsInnerLayout;
