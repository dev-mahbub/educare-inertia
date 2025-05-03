import React from 'react';
import FeedbackForm from './FeedbackForm';

const ParentFeedbackInnerLayout = () => {
    return (
        <div className="educare-dashboard-main-content-wrap min-h-[calc(100vh-150px)]">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <FeedbackForm />
                </div>
            </div>
        </div>
    );
};

export default ParentFeedbackInnerLayout;