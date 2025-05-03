import SelectInput from "@/Components/SelectInput";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EsiReportPopupForm from "./EsiReportPopupForm";

const EsiReportFilter = ({
    paymentMonths,
    earningTypes,
    totalReportCount
}) => {

    const [listPopup, setListPopup] = useState(false);
    const [params, setParams] = useState([]);

    const {
        data,
        setData
    } = useForm({
        payment_month_id: "",
        earning_type_ids: [],
        employees_value: "",
        employers_value: "",
        income: ""
    });

    useEffect(() => {
        setParams({
            payment_month_id: data?.payment_month_id,
            earning_type_ids: JSON.stringify(data?.earning_type_ids),
            employees_value: data?.employees_value,
            employers_value: data?.employers_value,
            income: data?.income
        });
    }, [data]);

    const handleListPopupClick = () => {
        if (data?.payment_month_id == '') {
            toast.error("Please select month!", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            setListPopup(!listPopup);
        }
    };

    const headerTopData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <div>
                <div className="educare-card-title pb-none  mb-2.5">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        ESI Calculator
                    </h5>
                </div>
                <form onSubmit={headerTopData}>
                    <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
                        {/* delete count if don't need */}
                        <div className="educare-header-filtar-bar-count mr-auto">
                            <span> Total Count : {totalReportCount}</span>
                        </div>
                        {/* delete count if don't need */}
                        <div className='flex flex-wrap gap-2.5 items-center'>
                            <div className="educare-select-field-styles">
                                <SelectInput
                                    id="payment_month_id"
                                    data_label="Month"
                                    data={paymentMonths}
                                    value={data.payment_month_id}
                                    onChange={(e) =>
                                        setData("payment_month_id", e.target.value)
                                    }
                                    type="text"
                                    className="block"
                                />
                            </div>
                            <div className='educare-filter-action-btn flex flex-wrap gap-2'>
                                <div>
                                    <Tooltip
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            className="educare-secondary-btn-md-fill"
                                            type="button"
                                            onClick={handleListPopupClick}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href={route('salary_report.esi')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                                {(data?.payment_month_id != '' && data?.earning_type_ids?.length > 0 && totalReportCount > 0) &&
                                    <div>
                                        <Tooltip
                                            title="Download Pdf"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('pdf_salary.esi_report', params)}
                                                target="_blank"
                                                className="educare-warning-btn-md-fill"
                                            >
                                                <i className="icon-FilePdf"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <EsiReportPopupForm
                listPopup={listPopup}
                setListPopup={setListPopup}
                earningTypes={earningTypes}
                data={data}
                setData={setData}
            />
        </>
    );
};

export default EsiReportFilter;
