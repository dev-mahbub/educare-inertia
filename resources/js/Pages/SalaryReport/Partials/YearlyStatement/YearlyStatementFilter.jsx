import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect } from "react";

const YearlyStatementFilter = ({
    staffs,
    totalReportCount,
    setParams
}) => {

    const {
        data,
        setData
    } = useForm({
        staff_id: "",
    });

    useEffect(() => {
        setParams({
            staff_id: data.staff_id
        });
    },[data.staff_id]);

    // handle change staff start
    const handleChangeStaff = (value) => {
        setData((prevData) => ({
            ...prevData,
            staff_id: value
        }));

        const form_data = {
            staff_id: value
        }

        router.post(route('salary_report.yearlystatement'), form_data);
    }
    // handle change staff end

    const headerTopData = (e) => {
        e.preventDefault();
    };

    return (
        <form onSubmit={headerTopData}>
            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                <div className="educare-card-title pb-none">
                    <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                        Total : {totalReportCount}
                    </span>
                </div>
                <div className="flex flex-wrap gap-2.5 items-center">
                    <div className="educare-input-field-styles">
                        <SelectInput
                            id="staff_id"
                            data_label="Staff"
                            data={staffs}
                            value={data.staff_id}
                            onChange={(e) =>
                                handleChangeStaff(e.target.value)
                            }
                            type="text"
                            className="block"
                        />
                    </div>
                </div>
            </div>
        </form>
    );
};

export default YearlyStatementFilter;
