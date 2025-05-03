import EnquiryHeaderMenus from '@/Components/Partials/Menus/Enquiry/EnquiryHeaderMenus';
import React from 'react';
import EnquiryListFilter from './EnquiryListFilter';
import EnquiryListTable from './EnquiryListTable';

const EnquiryListInnerLayout = ({visitorsEnquiry, visitorEnquiryDetailType}) => {
    return (
        <>
               <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <EnquiryHeaderMenus title="Visitors Enquiry Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                         <EnquiryListFilter visitorsEnquiry={visitorsEnquiry}/>
                         <EnquiryListTable visitorsEnquiry={visitorsEnquiry} visitorEnquiryDetailType={visitorEnquiryDetailType}/>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnquiryListInnerLayout;