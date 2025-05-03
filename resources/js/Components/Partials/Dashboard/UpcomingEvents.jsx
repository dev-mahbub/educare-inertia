import React from 'react';

const UpcomingEvents = () => {
    return (
        <div className="educare-upcoming-event-area educare-dashboard-card">
            <div className="educare-card-header mb-[20px]">
                <h3 className='educare-card-header-title'>Upcoming Events</h3>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="educare-upcoming-event-wrapper">
                <div className="educare-upcoming-event-item mb-[25px] hidden">
                    <div className="educare-upcoming-event-date mb-[20px]">
                        <span className="event-date-tag">20 Feb</span>
                    </div>
                    <div className="educare-upcoming-event-list educare-list-rounded">
                        <ul>
                            <li>
                                <span className="educare-upcoming-list-title"><a href="#">Teacher meeting</a></span>
                                <small className="educare-upcoming-list-timeline">08:00 - 09:00 am</small>
                            </li>
                            <li>
                                <span className="educare-upcoming-list-title"><a href="#">Parent meeting</a></span>
                                <small className="educare-upcoming-list-timeline">10:00 - 11:00 am</small>
                            </li>
                            <li>
                                <span className="educare-upcoming-list-title"><a href="#">Lunch time</a></span>
                                <small className="educare-upcoming-list-timeline">01:00 - 02:00 pm</small>
                            </li>
                            <li>
                                <span className="educare-upcoming-list-title"><a href="#">Sports time</a></span>
                                <small className="educare-upcoming-list-timeline">03:00 - 04:00 pm</small>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="educare-upcoming-event-item">
                    <div className="educare-upcoming-event-date mb-[20px] hidden">
                        <span className="event-date-tag">16 Mar</span>
                    </div>
                    <div className="educare-upcoming-event-list educare-list-rounded">
                        <p className='text-red'>Not Found</p>
                        <ul className='hidden'>
                            <li>
                                <span className="educare-upcoming-list-title"><a href="#">Teacher meeting</a></span>
                                <small className="educare-upcoming-list-timeline">08:00 - 09:00 am</small>
                            </li>
                            <li>
                                <span className="educare-upcoming-list-title"><a href="#">Parent meeting</a></span>
                                <small className="educare-upcoming-list-timeline">10:00 - 11:00 am</small>
                            </li>
                            <li>
                                <span className="educare-upcoming-list-title"><a href="#">Lunch time</a></span>
                                <small className="educare-upcoming-list-timeline">01:00 - 02:00 pm</small>
                            </li>
                            <li>
                                <span className="educare-upcoming-list-title"><a href="#">Sports time</a></span>
                                <small className="educare-upcoming-list-timeline">03:00 - 04:00 pm</small>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpcomingEvents; 