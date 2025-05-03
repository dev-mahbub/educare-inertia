import React from 'react';
import SummaryReportForm from './SummaryReportForm';
import SummaryReportChart from './SummaryReportChart';
import AmountCollectionReport from './AmountCollectionReport';
import RegistrationReport from './RegistrationReport';
import SummaryReportCommunication from './SummaryReportCommunication';

const SummaryReportInnerLayout = () => {
    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-dashboard-main-content-body-wrap">
                        <SummaryReportForm />
                        <AmountCollectionReport />
                        <SummaryReportChart />
                        <RegistrationReport />
                        <SummaryReportCommunication />
                    </div>
                </div>
            </div>
        </>
    );
};

export default SummaryReportInnerLayout;