import SmsMenuCategory from '../../SmsMenuCategory';
import SmsCreditList from './SmsCreditList';

const SmsCreditInnerLayout = ({
    serviceOrders
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <SmsMenuCategory />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <SmsCreditList
                        serviceOrders={serviceOrders}
                    />
                </div>
            </div>
        </div>
    );
};

export default SmsCreditInnerLayout;
