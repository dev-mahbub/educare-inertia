import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import MonthlyReport from "./MonthlyReport";

export default function MonthWiseReport({
    academicYears,
    monthWiseRegistrationReport
 }) {

    const [filteredData, setFilteredData] = useState([]);
    const [totalReport, setTotalReport] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        academic_year_id: "",
    });

    useEffect(() => {
        setTotalReport(Object.values(monthWiseRegistrationReport)?.reduce((total, item) => total + Object.keys(item).length, 0))
    }, [monthWiseRegistrationReport]);

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
    };

    // handle academic year change start
    const handleAcademicYear = (e) => {
        e.preventDefault();

        const academic_year_id = e.target.value;

        setData((prevData) => ({
            ...prevData,
            academic_year_id: academic_year_id,
        }));

        setFilteredData([]);

        router.post(route('admission_registration_report.monthly_collection'),{academic_year_id: academic_year_id})
    }
    // handle academic year change end

    // handle filter month wise start
    const handleFilterMonthWiseData = (month) => {
        const month_wise_data = monthWiseRegistrationReport[month] ?? [];

        setFilteredData(month_wise_data);
    }
    // handle filter month wise end


    return (
        <>
            <form onChange={handleAdmissionSourceData}>
                <div className="educare-classroom-form-area">
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-3 xl:col-span-3 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="flex justify-between  flex-wrap">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Month Wise Report
                                        </h5>
                                    </div>
                                    <div>
                                        <div className="educare-input-field-styles max-w-[200px] ">
                                            <SelectInput
                                                data_label="Year"
                                                data={academicYears}
                                                value={
                                                    data.academic_year_id
                                                }
                                                onChange={(e) =>
                                                   handleAcademicYear(e)
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.academic_year_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="educare-default-table xs:overflow-x-auto mt-2">
                                    <table>
                                        <thead>

                                            <tr>
                                                <th>Month</th>
                                                <th>Students</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Object.keys(monthWiseRegistrationReport)?.length > 0 ?
                                                monthWiseRegistrationReport && Object.entries(monthWiseRegistrationReport).map(([month, item]) => (
                                                    <tr key={month}>
                                                        <td>{month}</td>
                                                        <td>
                                                            <button type="button" onClick={() => {
                                                                handleFilterMonthWiseData(month)
                                                            }}>
                                                                {Object.keys(item)?.length}
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="2">Data not found</td>
                                                </tr>
                                            }

                                            {Object.keys(monthWiseRegistrationReport)?.length > 0 &&
                                                <tr>
                                                    <td>
                                                        <h5 className="font-bold text-headingLight">Total: </h5>
                                                    </td>
                                                    <td>
                                                        <h5 className="font-bold text-headingLight">
                                                            {totalReport}
                                                        </h5>
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-9 xl:col-span-9 col-span-12">
                            <MonthlyReport
                                monthWiseData = {filteredData}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
