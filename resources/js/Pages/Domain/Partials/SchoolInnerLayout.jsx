import React from 'react';
import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import DomainList from './DomainList';
import SchoolFilterBar from './SchoolFilterBar';
import HeaderSeacrhBar from '@/Components/Partials/Header/HeaderSeacrhBar';

const SchoolInnerLayout = ({domain_name, schools}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">

                    <DomainList domain_name={domain_name} schools={schools}  />
                </div>
            </div>
        </div>
    );
};

export default SchoolInnerLayout;