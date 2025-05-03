import OnlinePaymentForm from "./OnlinePaymentForm";
import OnlinePaymentSchoolInfo from "./OnlinePaymentSchoolInfo";
import OnlinePaymentTopHeader from "./OnlinePaymentTopHeader";

const OnlinePaymentInnerLayout = ({
    school,
    siteData
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap min-h-[calc(100vh-72px)]">
            <div className="educare-dashboard-main-content-body">
                <OnlinePaymentTopHeader
                    school={school}
                />
                <OnlinePaymentSchoolInfo
                    school={school}
                    siteData={siteData}
                />
                <OnlinePaymentForm
                    school={school}
                />
            </div>
        </div>
    );
};

export default OnlinePaymentInnerLayout;
