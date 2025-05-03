import SalaryHeaderMenu from "@/Components/Partials/Menus/Salary/SalaryHeaderMenu";
import { useForm } from "@inertiajs/react";
import BasicSalaryReportFilter from "./BasicSalaryReportFilter";
import BasicSalaryReportTable from "./BasicSalaryReportTable";

const BasicSalaryReportInnerLayout = ({
    staffEarnings
}) => {

    const {
        data,
        setData
    } = useForm({
        search: "",
    });

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
                        <BasicSalaryReportFilter
                            staffEarnings={staffEarnings}
                            data={data}
                            setData={setData}
                        />
                        <BasicSalaryReportTable
                            staffEarnings={staffEarnings}
                            data={data}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BasicSalaryReportInnerLayout;
