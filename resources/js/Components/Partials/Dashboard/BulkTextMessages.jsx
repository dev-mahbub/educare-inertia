import React from 'react';
import BdPieChart from './BdPieChart';

 
const BulkTextMessages = () => {
    return (
        <div className="educare-bulk-messages-area educare-dashboard-card">
            <div className="educare-card-header mb-[20px]">
                <h3 className='educare-card-header-title'>Bulk text message</h3>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="educare-bulk-messages-wrapper mb-[25px]">
                <div className="educare-bulk-messages-item">
                    <span>SMS avilable</span>
                    <h6>0</h6>
                </div>
                <div className="educare-bulk-messages-item">
                    <span>SMS sent</span>
                    <h6>0</h6>
                </div>
            </div>
            <div className="educare-bulk-chart flex justify-center">
                <BdPieChart/>
            </div>
        </div>
    );
};

export default BulkTextMessages; 