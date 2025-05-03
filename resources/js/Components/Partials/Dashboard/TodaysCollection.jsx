import React from 'react';
import BdColumnCharts from './BdColumnCharts';


const TodaysCollection = () => {
    return (
        <div className="educare-today-collection-area educare-dashboard-card">
            <div className="educare-card-header mb-[20px]">
                <h3 className='educare-card-header-title'>Collection Overview</h3>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="educare-today-collection-chart">
                <BdColumnCharts/>
            </div>
        </div>
    );
};

export default TodaysCollection; 