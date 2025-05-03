import React from 'react';
import joinImageOne from '../../../../images/Joining-group/01.jpg'
import joinImageTwo from '../../../../images/Joining-group/02.jpg'
import joinImageThree from '../../../../images/Joining-group/03.jpg'
import joinImageFour from '../../../../images/Joining-group/04.jpg'
import joinImageFive from '../../../../images/Joining-group/05.jpg'

const GroupTrainingReports = () => {
    return (
        <div>
            <div className="educare-Joining-group educare-dashboard-card hidden">
                <div className="educare-card-header mb-[20px]">
                    <h3 className='educare-card-header-title'>Join group training</h3>
                    <div className="educare-card-header-icon">
                        <span><i className="icon-more"></i></span>
                    </div>
                </div>
                <div className="educare-Joining-group-wrapper overflow-x-auto flex flex-col gap-[16px]">
                <div className="educare-Joining-group-item">
                        <div className="educare-Joining-group-inner">
                            <div className="educare-Joining-group-thumb">
                                <span><img src={joinImageOne} alt="report icon not found" /></span>
                            </div>
                            <div className="educare-Joining-group-content">
                                <h6><a href="#">Student core module</a></h6>
                                <span>Monday</span>
                            </div>
                        </div>
                        <div className="educare-Joining-link">
                            <button className='join-btn'>Join now</button>
                        </div>
                    </div>
                    <div className="educare-Joining-group-item">
                        <div className="educare-Joining-group-inner">
                            <div className="educare-Joining-group-thumb">
                                <span><img src={joinImageTwo} alt="report icon not found" /></span>
                            </div>
                            <div className="educare-Joining-group-content">
                                <h6><a href="#">Academic seminar</a></h6>
                                <span>Tuesday</span>
                            </div>
                        </div>
                        <div className="educare-Joining-link">
                            <button className='join-btn'>Join now</button>
                        </div>
                    </div>
                    <div className="educare-Joining-group-item">
                        <div className="educare-Joining-group-inner">
                            <div className="educare-Joining-group-thumb">
                                <span><img src={joinImageThree} alt="report icon not found" /></span>
                            </div>
                            <div className="educare-Joining-group-content">
                                <h6><a href="#">Communication and service</a></h6>
                                <span>Wednesday</span>
                            </div>
                        </div>
                        <div className="educare-Joining-link">
                            <button className='join-btn'>Join now</button>
                        </div>
                    </div>
                    <div className="educare-Joining-group-item">
                        <div className="educare-Joining-group-inner">
                            <div className="educare-Joining-group-thumb">
                                <span><img src={joinImageOne} alt="report icon not found" /></span>
                            </div>
                            <div className="educare-Joining-group-content">
                                <h6><a href="#">Student core module</a></h6>
                                <span>Thursday</span>
                            </div>
                        </div>
                        <div className="educare-Joining-link">
                            <button className='join-btn'>Join now</button>
                        </div>
                    </div>
                    <div className="educare-Joining-group-item">
                        <div className="educare-Joining-group-inner">
                            <div className="educare-Joining-group-thumb">
                                <span><img src={joinImageFour} alt="report icon not found" /></span>
                            </div>
                            <div className="educare-Joining-group-content">
                                <h6><a href="#">Academic seminar</a></h6>
                                <span>Wednesday</span>
                            </div>
                        </div>
                        <div className="educare-Joining-link">
                            <button className='join-btn'>Join now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GroupTrainingReports;