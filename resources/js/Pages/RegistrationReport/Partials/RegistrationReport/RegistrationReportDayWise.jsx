import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from "react";

const RegistrationReportDayWise = ({
    dayWiseReports,
    months,
    formatNumber,
    formData
}) => {
    const [filteredData, setFilteredData] = useState([]);
    const [totalRegistration, setTotalRegistration] = useState(0);
    const [totalFee, setTotalFee] = useState(0);
    const [params, setParams] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        month: "",
    });

    useEffect(() => {
        setParams({
            academic_year_id: formData?.academic_year_id ?? "",
            month: data?.month ?? "",
        })
    }, [formData, data?.month]);

    useEffect(() => {
        setFilteredData(dayWiseReports);
    }, [dayWiseReports]);

    useEffect(() => {
        const total_registration = Object.values(filteredData)?.reduce((total, item) => item?.total_registration + total, 0);
        const total_fee = Object.values(filteredData)?.reduce((total, item) => item?.total_fee + total, 0);

        setTotalRegistration(total_registration);
        setTotalFee(total_fee);
    }, [filteredData]);

    // handle change month start
    const handleChangeMonth = (e) =>{
        const month = e.target.value;

        setData((prevData) => ({
            ...prevData,
            month: month
        }));

        const filtered_data = Object.values(dayWiseReports)?.filter(item => {
            if(month != "") {
                return item?.month?.toLowerCase() == month?.toLowerCase();
            }

            return true;
        });

        setFilteredData(filtered_data);
    }
    // handle change month end


    return (
        <div>
            <div className="educare-classroom-table-wrapper">
                <div className="flex justify-between flex-wrap mb-2">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Day Wise Report
                        </h5>
                    </div>
                    <div className='flex gap-2'>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                data_label="Month"
                                data={months}
                                value={
                                    data.month
                                }
                               onChange={(e) => {
                                   handleChangeMonth(e)
                                }}
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.month
                                }
                                className="mt-2"
                            />
                        </div>
                        <div>
                            {Object.keys(filteredData)?.length > 0 &&
                                <div>
                                    <Tooltip
                                        title="Download Excel"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <a
                                            href={route('export_excel.day_wise_registration_report', params)}
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
                </div>
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Registarion Date</th>
                                <th>Qty</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(filteredData)?.length > 0 ?
                                Object.values(filteredData)?.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.registration_date}</td>
                                        <td>{item?.total_registration ?? 0}</td>
                                        <td>{formatNumber(item?.total_fee ?? 0)}</td>
                                    </tr>
                                ))
                            :
                                <tr>
                                    <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                </tr>
                            }

                            {Object.keys(filteredData)?.length > 0 &&
                                <tr>
                                    <td></td>
                                    <td><h5 className="font-bold text-headingLight">Total: {totalRegistration}</h5></td>
                                    <td><h5 className="font-bold text-headingLight">Total: {formatNumber(totalFee)}</h5></td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RegistrationReportDayWise;
