import React from 'react';
import EditClassworkForm from './EditClassworkForm';

const EditClassworkInnerLayout = ({ classWork, subjects, classNames, classRoom }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditClassworkForm
                        classWork={classWork}
                        subjects={subjects}
                        classNames={classNames}
                        classRoom={classRoom}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditClassworkInnerLayout;
