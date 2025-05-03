import React from 'react';
const QuickReports = ({studentCounts, staffCounts, transportCounts}) => {
    return (
        <div className='educare-quick-report-area mb-[20px]'>
            <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x[0]">
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-report-item">
                        <div className='content'>
                            <span>Students</span>
                            <h3>{studentCounts?.active_students}+</h3>
                        </div>
                        <div className='icon'>
                            <span className="educare-quick-report-icon bg-supportingA"><i className="icon-student"></i></span>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-report-item">
                        <div className='content'>
                            <span>Staff</span>
                            <h3>{staffCounts?.active_staff_count}+</h3>
                        </div>
                        <div className='icon'>
                            <span className="educare-quick-report-icon bg-supportingB"><i className="icon-teacher"></i></span>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-report-item">
                        <div className='content'>
                            <span>Events</span>
                            <h3>0</h3>
                        </div>
                        <div className='icon'>
                            <span className="educare-quick-report-icon bg-supportingC"><i className="icon-event"></i></span>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-report-item">
                        <div className='content'>
                            <span>Transport(Vehicles)</span>
                            <h3>{transportCounts?.vehicle_count}+</h3>
                        </div>
                        <div className='icon'>
                            <span className="educare-quick-report-icon bg-supportingD"><i className="icon-bus"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuickReports;