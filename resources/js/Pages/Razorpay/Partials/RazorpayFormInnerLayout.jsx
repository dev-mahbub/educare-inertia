import CreateRazorpayForm from './CreateRazorpayForm';

const RazorpayFormInnerLayout = ({orderId, keyId}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateRazorpayForm orderId={orderId} keyId={keyId} />
                </div>
            </div>
        </div>
    );
};

export default RazorpayFormInnerLayout;
