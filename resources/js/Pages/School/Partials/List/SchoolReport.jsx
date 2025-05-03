import React from 'react';
const SchoolReport = ({schoolCounts}) => {
    return (
        <div className='educare-quick-report-area mb-[20px]'>
            <div className="grid grid-cols-12 gap-[20px] maxXs:gap-x[0]">
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-report-item">
                        <div className='content'>
                            <span>Total Schools</span>
                            <h3>{schoolCounts?.allSchoolsCount}</h3>
                        </div>
                        <div className='icon'>
                            <span className="educare-quick-report-icon bg-supportingA"><i className="icon-HouseLine"></i></span>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-report-item">
                        <div className='content'>
                            <span>Active Schools</span>
                            <h3>{schoolCounts?.activeSchoolsCount}</h3>
                        </div>
                        <div className='icon'>
                            <span className="educare-quick-report-icon bg-supportingB"><i className="icon-FolderSimpleUser"></i></span>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-report-item">
                        <div className='content'>
                            <span>inctive Schools</span>
                            <h3>{schoolCounts?.inactiveSchoolsCount}</h3>
                        </div>
                        <div className='icon'>
                            <span className="educare-quick-report-icon bg-supportingC"><i className="icon-UserMinus"></i></span>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 minMaxXl:col-span-3 maxXl:col-span-6 maxXs:col-span-12">
                    <div className="educare-quick-report-item">
                        <div className='content'>
                            <span>Schools Logged In Today</span>
                            <h3>10</h3>
                        </div>
                        <div className='icon'>
                            <span className="educare-quick-report-icon bg-supportingD"><i className="icon-Keyhole"></i></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolReport;