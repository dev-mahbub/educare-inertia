import EnquiryHeaderMenus from '@/Components/Partials/Menus/Enquiry/EnquiryHeaderMenus';
import React from 'react';
import CreateEnquiryForm from './CreateEnquiryForm';

const CreateEnquiryInnerLayout = ({activeVisitorTypes}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <EnquiryHeaderMenus title="Visitors Enquiry Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <div className='educare-parent-montly-income-area'>
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12">
                                <CreateEnquiryForm activeVisitorTypes={activeVisitorTypes}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateEnquiryInnerLayout;