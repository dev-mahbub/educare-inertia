import React from 'react';
import CreateClassworkForm from './CreateClassworkForm';

const CreateClassworkInnerLayout = ({ subjects, classNames, classRoom }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateClassworkForm
                        subjects={subjects}
                        classNames={classNames}
                        classRoom={classRoom}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateClassworkInnerLayout;
