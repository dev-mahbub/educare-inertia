import FeeHeaderMenus from '@/Components/Partials/Menus/Fee/FeeHeaderMenus';
import EditBankAccount from './EditBankAccount';

const ManageBankAccountInnerLayout = ({ fees = "", fee = "", banks = [], bankAccounts = [], bankAccount = ""}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-dashboard-main-content-body">
                <div className="educare-bottom-header z-10 relative">
                    <div className="educare-bottom-header-middle bg-white">
                        <FeeHeaderMenus title="Fee Management" />
                    </div>
                </div>
                <div className="educare-dashboard-main-content-body-wrap">
                    <EditBankAccount banks={banks} bankAccounts={bankAccounts} bankAccount={bankAccount} />
                </div>
            </div>
        </div>
    );
};

export default ManageBankAccountInnerLayout;
