import AlumniHeaderMenus from '@/Components/Partials/Menus/Alumni/AlumniHeaderMenus';
import React from 'react';
import AlumniPaymentFilter from './AlumniPaymentFilter';
import AlumniPaymentTable from './AlumniPaymentTable';

const AlumniPaymentInnerLayout = () => {
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
                       <AlumniPaymentFilter/>
                       <AlumniPaymentTable/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AlumniPaymentInnerLayout;