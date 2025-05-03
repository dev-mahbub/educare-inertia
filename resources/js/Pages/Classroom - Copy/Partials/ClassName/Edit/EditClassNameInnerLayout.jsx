import React from 'react';
import ClassNameHeaderMenus from '@/Components/Partials/Menus/ClassName/ClassNameHeaderMenus';
import EditClassNameForm from './EditClassNameForm';

const EditClassNameInnerLayout = ({ classNames, className, dataSections }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <ClassNameHeaderMenus title="Class name list" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditClassNameForm
                        classNames={classNames}
                        className={className}
                        dataSections={dataSections}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditClassNameInnerLayout;
