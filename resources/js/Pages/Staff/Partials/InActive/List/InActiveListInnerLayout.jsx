import React from 'react';
import StaffMenu from '../../Menu/StaffMenu';
import StaffListFilter from '../../List/StaffListFilter';
import InActiveList from './InActiveList';

const InActiveListInnerLayout = ({ inactiveStaffs, designations = '', houses = '', jobTypes = '', departments = '', teachingTypes = '', userRolls = '', staffActive }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <StaffMenu title="Staffs" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <StaffListFilter inactiveStaffs={inactiveStaffs} designations={designations} houses={houses} jobTypes={jobTypes} departments={departments} teachingTypes={teachingTypes} userRolls={userRolls} staffActive={staffActive} />
                    <InActiveList inactiveStaffs={inactiveStaffs} />
                </div>
            </div>
        </div>
    );
};

export default InActiveListInnerLayout;
