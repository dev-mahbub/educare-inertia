import React from 'react';

const TodaysTaskReports = () => {
    return (
        <div className="educare-notice-card-area educare-dashboard-card">
            <div className="educare-card-header mb-[20px]">
                <h3 className='educare-card-header-title'>Current Task</h3>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="educare-notice-card-wrapper">
                <div className="d-notice-card-item">
                    <div className="educare-notice-list educare-list-rounded">
                        <ul>
                            <li>
                                <span className="educare-notice-list-title">1. <a href="#">Students Fees Task</a></span>
                                <h6 className='count-badge'>0</h6>
                            </li>
                            <li>
                                <span className="educare-notice-list-title"><a href="#">2. Today Students Birthday Task</a></span>
                                <h6 className='count-badge'>0</h6>
                            </li>
                            <li>
                                <span className="educare-notice-list-title"><a href="#">3. Today Staffs Birthday Task</a></span>
                                <h6 className='count-badge'>0</h6>
                            </li>
                            <li>
                                <span className="educare-notice-list-title"><a href="#">4. Enrollment Enquiry Task</a></span>
                                <h6 className='count-badge'>0</h6>
                            </li>
                            <li>
                                <span className="educare-notice-list-title"><a href="#">5. Visitor Enquiry Task</a></span>
                                <h6 className='count-badge'>0</h6>
                            </li>
                            <li>
                                <span className="educare-notice-list-title"><a href="#">6. Gate Pass Task</a></span>
                                <h6 className='count-badge'>0</h6>
                            </li>
                            <li>
                                <span className="educare-notice-list-title"><a href="#">7. Complaints Task</a></span>
                                <h6 className='count-badge'>0</h6>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TodaysTaskReports;