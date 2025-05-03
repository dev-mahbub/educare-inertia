import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";
import EditEnquiryStatusForm from "./EditEnquiryStatusForm";

export default function EnquiryStatusInnerLayout({enquiryStatus,enquiryStatusId}) {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditEnquiryStatusForm
                        enquiryStatus={enquiryStatus}
                        enquiryStatusId={enquiryStatusId}
                    />
                </div>
            </div>
        </div>
    );
}
