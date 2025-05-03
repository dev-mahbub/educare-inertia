import SalaryHeaderMenu from "@/Components/Partials/Menus/Salary/SalaryHeaderMenu";
import { useState } from "react";
import EarningForm from "./EarningForm";
import EarningTable from "./EarningTable";

const EarninglnnerLayout = ({
    earningTypes
}) => {

    const [selectedData, setSelectedData] = useState({});
    const [formMode, setFormMode] = useState('create');

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <SalaryHeaderMenu title="Salary Management" />
                        </div>
                    </div>
                    <div className="educare-dashboard-main-content-body-wrap">
                        <div className="educare-parent-montly-income-area">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                                    <EarningForm
                                        selectedData={selectedData}
                                        setSelectedData={setSelectedData}
                                        formMode={formMode}
                                        setFormMode={setFormMode}
                                    />
                                </div>
                                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                                    <EarningTable
                                        setSelectedData={setSelectedData}
                                        setFormMode={setFormMode}
                                        earningTypes={earningTypes}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EarninglnnerLayout;
