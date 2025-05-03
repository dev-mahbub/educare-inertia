import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import RegistrationReportDayWise from "./RegistrationReportDayWise";

export default function RegistrationReportClassWise({
    academicYears,
    months,
    classWiseReports,
    dayWiseReports
}) {
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


    const handleAdmissionSourceData = (e) => {
        e.preventDefault();

    };

    // handle acadmeic year change start
    const handleAcademicYear = (e) => {
        e.preventDefault();

        const academic_year_id = e.target.value;

        setData({
            academic_year_id: academic_year_id,
        });

        router.post(route('admission_registration_report.registration_report'), { academic_year_id: academic_year_id })
    }
    // handle acadmeic year change end

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;
    }
    // format number end

    return (
        <>
            <form onChange={handleAdmissionSourceData}>
                <div className="educare-classroom-form-area">
                    <div className="educare-input-field-styles max-w-[220px] mb-5">
                        <SelectInput
                            data_label="Academic Year"
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
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="flex justify-between gap-5 mb-2">
                                    <div className="educare-card-title">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Class Wise Report
                                        </h5>
                                    </div>
                                    <div>
                                        {classWiseReports?.reports && Object.keys(classWiseReports?.reports)?.length > 0 &&
                                            <div>
                                                <Tooltip
                                                    title="Download Excel"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <a
                                                        href={route('export_excel.class_wise_registration_report', {academic_year_id: data?.academic_year_id ?? ""})}
                                                        target="_blank"
                                                        className="educare-success-btn-md-fill"
                                                    >
                                                        <i className="icon-FileX"></i>
                                                    </a>
                                                </Tooltip>
                                            </div>
                                        }
                                    </div>
                                </div>
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Class</th>
                                                <th>Total Registration</th>
                                                <th>Taken</th>
                                                <th>Total Fee</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {classWiseReports?.reports && Object.keys(classWiseReports?.reports)?.length > 0 ?
                                                Object.values(classWiseReports?.reports)?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.class_name}</td>
                                                        <td>{item?.total_registration}</td>
                                                        <td>{item?.total_admission}</td>
                                                        <td>{formatNumber(item?.total_fee ?? 0)}</td>
                                                    </tr>
                                                ))
                                            :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                </tr>
                                            }

                                            {classWiseReports?.reports && Object.keys(classWiseReports?.reports)?.length > 0 &&
                                                <tr>
                                                    <td></td>
                                                    <td><h5 className="font-bold text-headingLight">Total: {classWiseReports?.total_registration ?? 0}</h5></td>
                                                    <td><h5 className="font-bold text-headingLight">Total: {classWiseReports?.total_admission ?? 0}</h5></td>
                                                    <td><h5 className="font-bold text-headingLight">Total: {formatNumber(classWiseReports?.total_fee ?? 0)}</h5></td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <RegistrationReportDayWise
                                dayWiseReports={dayWiseReports}
                                months={months}
                                formatNumber={formatNumber}
                                formData={data}
                            />
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
