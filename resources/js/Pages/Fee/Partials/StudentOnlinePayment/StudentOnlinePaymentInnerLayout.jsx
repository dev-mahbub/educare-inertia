import OnlinePaymentSchoolInfo from "./partials/OnlinePaymentSchoolInfo";

const StudentOnlinePaymentInnerLayout = ({
    student,
    school,
    siteData,
    studentFeeInstallments,
    studentFeeVouchers,
    studentFeePaymentReports
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <OnlinePaymentSchoolInfo
                    student={student}
                    school={school}
                    siteData={siteData}
                    studentFeeInstallments={studentFeeInstallments}
                    studentFeeVouchers={studentFeeVouchers}
                    studentFeePaymentReports={studentFeePaymentReports}
                />
            </div>
        </div>
    );
};

export default StudentOnlinePaymentInnerLayout;
