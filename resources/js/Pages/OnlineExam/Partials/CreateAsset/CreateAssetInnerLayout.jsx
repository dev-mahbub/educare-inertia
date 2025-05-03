import React from 'react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import CreateAssetForm from './CreateAssetForm';


const CreateAssetInnerLayout = ({
    subjects,
    classNames,
    onlineTopics,
    virtualAssetTypes
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <OnlineExamHeaderMenu title="Add Asset" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateAssetForm 
                        subjects={subjects}
                        classNames={classNames}
                        onlineTopics={onlineTopics}
                        virtualAssetTypes={virtualAssetTypes} />
                </div>
            </div>
        </div>
    );
};

export default CreateAssetInnerLayout;