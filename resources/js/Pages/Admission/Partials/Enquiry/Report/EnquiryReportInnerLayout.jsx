import AdmissionHeaderMenus from '@/Components/Partials/Menus/Admission/AdmissionHeaderMenus';
import { useState } from 'react';
import EnquiryReportFilter from './EnquiryReportFilter';
import EnquiryReportList from './EnquiryReportList';

const EnquiryReportInnerLayout = ({ enqueryReportList, landmarks, classes, status, schoolAdmin, enquiryStatusArray }) => {
    const [formData, setFormData] = useState([]);

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EnquiryReportFilter
                        landmarks = {landmarks}
                        classes = {classes}
                        status = {status}
                        schoolAdmin = {schoolAdmin}
                        enqueryReportList = {enqueryReportList}
                        setFormData={setFormData}
                    />
                    <EnquiryReportList
                        enqueryReportList = {enqueryReportList}
                        enquiryStatusArray = {enquiryStatusArray}
                        formData = {formData}
                    />
                </div>
            </div>
        </div>
    );
};

export default EnquiryReportInnerLayout;
