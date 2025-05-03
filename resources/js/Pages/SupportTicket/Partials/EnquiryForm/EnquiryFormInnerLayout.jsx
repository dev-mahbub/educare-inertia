import React from 'react';
import FormArea from './FormArea';

const EnquiryFormInnerLayout = ({activeVisitorTypes}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <FormArea activeVisitorTypes = {activeVisitorTypes} />
                </div>
            </div>
        </div>
    );
};

export default EnquiryFormInnerLayout;