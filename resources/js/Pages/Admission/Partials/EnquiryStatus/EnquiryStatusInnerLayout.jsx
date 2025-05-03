import React from "react";
import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";
import EnquiryStatusForm from "./EnquiryStatusForm";

export default function EnquiryStatusInnerLayout({enquiryStatus}) {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EnquiryStatusForm enquiryStatus={enquiryStatus}/>
                </div>
            </div>
        </div>
    );
}
