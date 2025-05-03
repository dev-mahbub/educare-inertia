import React from 'react';
import MyDetailMenus from '../../../../Components/Partials/Menus/MyDetail/MyDetailMenus';
import MySalaryTable from './MySalaryTable';

const MySalaryInnerLayout = ({
    salaryPayments
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <MyDetailMenus title="MY DETAIL" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <MySalaryTable
                        salaryPayments={salaryPayments}
                    />
                </div>
            </div>
        </div>
    );
};

export default MySalaryInnerLayout;
