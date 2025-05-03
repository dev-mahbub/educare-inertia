import React from 'react';
import CreateExamForm from './CreateExamForm';

const CreateExamInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateExamForm
                        className=""
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateExamInnerLayout;