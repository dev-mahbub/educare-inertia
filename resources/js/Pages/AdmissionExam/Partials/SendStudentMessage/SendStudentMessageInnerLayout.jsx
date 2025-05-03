import AdmissionHeaderMenus from "@/Components/Partials/Menus/Admission/AdmissionHeaderMenus";
import React from "react";
import SendStudentMessageFilter from "./SendStudentMessageFilter";
import SendStudentMessageList from "./SendStudentMessageList";


const SendStudentMessageInnerLayout = ({ sendMessageData, academicYear, classRoomName, enquiryStatus, statusPrimary }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <AdmissionHeaderMenus title="Admission Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                     <SendStudentMessageFilter 
                     academicYear = {academicYear} 
                     classRoomName = {classRoomName}
                     enquiryStatus = {enquiryStatus}
                     statusPrimary = {statusPrimary}
                     />
                     <SendStudentMessageList sendMessageData = {sendMessageData} 
                     
                     />
                </div>
            </div>
        </div>
    );
};

export default SendStudentMessageInnerLayout;
