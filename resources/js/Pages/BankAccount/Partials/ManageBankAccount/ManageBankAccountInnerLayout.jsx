import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import ManageBankAccount from './ManageBankAccount';

const ManageBankAccountInnerLayout = ({ bankAccounts = [], banks = [] }) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <ManageBankAccount bankAccounts={bankAccounts} banks={banks} />
                </div>
            </div>
        </div>
    );
};

export default ManageBankAccountInnerLayout;
