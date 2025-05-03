import InventoryHeaderMenus from "@/Components/Partials/Menus/Inventory/InventoryHeaderMenus";
import { useForm } from "@inertiajs/react";
import JournalHeaderFilter from "./JournalHeaderFilter";
import JournalReportFormList from "./JournalReportFormList";

const JournalReportInnerLayout = ({
    journals
}) => {

    const {
        data,
        setData
    } = useForm({
        start_date: new Date(),
        end_date: new Date()
    });

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header">
                <div className="educare-bottom-header-middle">
                    <InventoryHeaderMenus title="Accounts Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <JournalHeaderFilter
                        journals={journals}
                        data={data}
                        setData={setData}
                    />
                    <JournalReportFormList
                        journals={journals}
                        data={data}
                    />
                </div>
            </div>
        </div>
    );
};

export default JournalReportInnerLayout;
