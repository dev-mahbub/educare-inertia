import React from 'react';
import StaffMenu from '../Menu/StaffMenu';
import StaffListFilter from './StaffListFilter';
import StaffList from './StaffList';

const StaffListInnerLayout = ({staffs, designations, houses, jobTypes, departments, teachingTypes, userRolls, staffActive}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StaffMenu title="Staffs" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StaffListFilter staffs={staffs} designations={designations} houses={houses} jobTypes={jobTypes} departments={departments} teachingTypes={teachingTypes} userRolls={userRolls} staffActive={staffActive} />
                    <StaffList staffs={staffs}/>
                </div>
            </div>
        </div>
    );
};

export default StaffListInnerLayout;
