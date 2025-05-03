import React from 'react';
import CreateForm from './CreateForm';
import AlumniHeaderMenus from '@/Components/Partials/Menus/Alumni/AlumniHeaderMenus';

const CreateInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <AlumniHeaderMenus  title="ALUMNI MANAGEMENT"/>
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <CreateForm/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateInnerLayout;