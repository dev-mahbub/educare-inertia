import React from "react";
import SmsMenuCategory from '../../SmsMenuCategory';
import SmsDeliverySummaryFilter from "./SmsDeliverySummaryFilter";
import SmsDeliverySummeryList from "./SmsDeliverySummeryList";

const SmsDeliverySummaryInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <SmsMenuCategory />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SmsDeliverySummaryFilter />
                    <SmsDeliverySummeryList />
                </div>
            </div>
        </div>
        </>
    );
};

export default SmsDeliverySummaryInnerLayout;
