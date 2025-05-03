import React from 'react';
import cardIllustrationThumb from "../../../../images/illustration/doctor.png";


const SchoolManager = () => {
    return (
        <div className="educare-school-manager-area educare-dashboard-card relative hidden">
            <div className="card-illustration-thumb">
                <img src={cardIllustrationThumb} alt="card illustration not found" />
            </div>
            <div className="educare-card-header mb-[20px]">
                <h3 className='educare-card-header-title'>School manager: EduCareStudy</h3>
                <div className="educare-card-header-icon">
                    <span><i className="icon-more"></i></span>
                </div>
            </div>
            <div className="educare-school-manager-wrapper">
                <div className="school-manager-item">
                    <div className="icon">
                        <span><i className="icon-schedule"></i></span>
                    </div>
                    <div className="content">
                        <h6><a href="#">Schedule a training / Call back</a></h6>
                        <span>10 minutes ago</span>
                    </div>
                </div>
                <div className="school-manager-item supporting-two">
                    <div className="icon">
                        <span><i className="icon-plan"></i></span>
                    </div>
                    <div className="content">
                        <h6><a href="#">School Implementation plan</a><span className='educare-badge is-supporting-b'>New feature</span></h6>
                        <span>30 minutes ago</span>
                    </div>
                </div>
                <div className="school-manager-item supporting-three">
                    <div className="icon">
                        <span><i className="icon-upload"></i></span>
                    </div>
                    <div className="content">
                        <h6><a href="#">Submit a ticket</a></h6>
                        <span>48 minutes ago</span>
                    </div>
                </div>
                <div className="school-manager-item supporting-four">
                    <div className="icon">
                        <span><i className="icon-wifi"></i></span>
                    </div>
                    <div className="content">
                        <h6><a href="#">Online webinar</a></h6>
                        <span>1 hour ago</span>
                    </div>
                </div>
                <div className="school-manager-item supporting-five">
                    <div className="icon">
                        <span><i className="icon-headphone"></i></span>
                    </div>
                    <div className="content">
                        <h6><a href="#">Customer support & video articles</a></h6>
                        <span>1 hour ago</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SchoolManager;