import React from 'react';
import ContactUsForm from './ContactUsForm';

const ContactUstInnerLayout = ({auth, siteData, ContactReasons, currentSchoolInfo}) => {
    return (
        <div className="educare-dashboard-main-content-wrap body-height-full">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <ContactUsForm ContactReasons={ContactReasons} auth={auth} siteData={siteData} currentSchoolInfo={currentSchoolInfo}/>
                </div>
            </div>
        </div>
    );
};

export default ContactUstInnerLayout;