import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import CreateJournalFormList from "./CreateJournalFormList";

const CreateJournalInnerLayout = ({
    ledgers,
    modeOptions,
    nextVoucherNo
}) => {
    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <CreateJournalFormList
                        ledgers={ledgers}
                        modeOptions={modeOptions}
                        nextVoucherNo={nextVoucherNo}
                    />
                </div>
            </div>
        </div>
    );
};

export default CreateJournalInnerLayout;
