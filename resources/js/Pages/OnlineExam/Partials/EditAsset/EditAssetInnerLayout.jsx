import React from 'react';
import OnlineExamHeaderMenu from '../../../../Components/Partials/Menus/OnlineExam/OnlineExamHeaderMenu';
import EditAssetForm from './EditAssetForm';


const EditAssetInnerLayout = ({
    subjects,
    classNames,
    onlineTopics,
    virtualAssetTypes,
    asset
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
                    <EditAssetForm 
                        subjects={subjects}
                        classNames={classNames}
                        onlineTopics={onlineTopics}
                        virtualAssetTypes={virtualAssetTypes}
                        asset={asset} />
                </div>
            </div>
        </div>
    );
};

export default EditAssetInnerLayout;