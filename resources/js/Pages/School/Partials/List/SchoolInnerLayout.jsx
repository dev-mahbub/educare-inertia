import React from 'react';
import SchoolHeaderMenus from '@/Components/Partials/Menus/School/SchoolHeaderMenus';
import SchoolList from './SchoolList';
import HeaderSeacrhBar from './HeaderSeacrhBar';
import SchoolFilter from '../SchoolFilter';
import SchoolReport from './SchoolReport';
   
const SchoolInnerLayout = ({schools, domain_name, schoolCounts}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <SchoolHeaderMenus />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    {/* <HeaderSeacrhBar schools={schools} /> */}
                    {/* <SchoolFilter schools={schools} /> */}
                    <SchoolReport schoolCounts={schoolCounts} />
                    <SchoolList schools={schools} domain_name={domain_name}  />
                </div>
            </div>
        </div>
    );
};

export default SchoolInnerLayout;
    