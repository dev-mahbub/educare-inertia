import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const StudentCompletePaidReportFilter = ({
    setCompletePaidReportData,
    setLoading,
    fees = [],
    totalPaidAmount,
    totalReportCount
}) => {

    const [filteredToFees, setFilteredToFees] = useState([]);
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
        from_fee_id: "",
        to_fee_id: "",
    });

    useEffect(() => {
        setParams({
            from_fee_id: data?.from_fee_id ?? "",
            to_fee_id: data?.to_fee_id ?? "",
        });
    }, [data]);

    // handle from fee change start
    const handleFromFeeChange = (e) => {
        const from_fee_id = e.target.value;

        setFilteredToFees(fees?.filter(item => item?.id >= from_fee_id));

        setData((prevData) => ({
            ...prevData,
            from_fee_id: from_fee_id,
            to_fee_id: "",
        }))
    }
    // handle from fee change end


    // handle reset form and data start
    const handleReset = () => {
        setCompletePaidReportData([]);
        setFilteredToFees([]);
        setLoading(false);
        reset();
    }
    // handle reset form and data end


    // handle filter fee colection start
    const handleFilterCompletePaidReport = (e) => {
        e.preventDefault();

        if (data?.from_fee_id === "" || data?.to_fee_id === "") {
            toast.error("Please select from installment and to installment.", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
        else {
            setLoading(false)

            router.post(route('fee_report.teacher.student_complete_paid_report'), data)
        }
    }
    // handle filter fee colection end


    const CommonHeaderFilterData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

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
            <h5 className="text-[20px] text-headingLight font-primary mb-3 font-semibold">
                <i className="icon-ListBullets"></i>
                Complete Installment Paid Report
            </h5>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={CommonHeaderFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                <div className="educare-header-filtar-bar-count mr-auto flex flex-wrap gap-2">
                                    <span>Total: {totalReportCount}</span>
                                    <span>Amount: {formatNumber(totalPaidAmount)}</span>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="From"
                                                    data={fees}
                                                    value={data.from_fee_id}
                                                    onChange={(e) =>
                                                        handleFromFeeChange(e)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.from_fee_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="To"
                                                    data={filteredToFees}
                                                    value={data.to_fee_id}
                                                    onChange={(e) =>
                                                        setData("to_fee_id", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.to_fee_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                    <div>
                                        <Tooltip
                                            title="Search"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                type="button"
                                                className="educare-secondary-btn-md-fill"
                                                onClick={(e) => {
                                                    handleFilterCompletePaidReport(e)
                                                }}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    {totalReportCount > 0 &&
                                        <div>
                                            <Tooltip
                                                title="Download Excel"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <a
                                                    target="_blank"
                                                    href={route('export_excel.teacher.student_complete_fee_paid_report', params)}
                                                    className="educare-success-btn-md-fill"
                                                >
                                                    <i className="icon-FileX"></i>
                                                </a>
                                            </Tooltip>
                                        </div>
                                    }
                                    {totalReportCount > 0 &&
                                        <div>
                                            <Tooltip
                                                title="Download Report Pdf"
                                                placement="top"
                                                arrow
                                            >
                                                <a
                                                    target="_blank"
                                                    href={route('pdf_fee_demand_slip.teacher.student_complete_fee_paid_report', params)}
                                                    className="educare-warning-btn-md-fill"
                                                >
                                                    <i className="icon-FilePdf"></i>
                                                </a>
                                            </Tooltip>
                                        </div>
                                    }
                                    <div>
                                        <Tooltip
                                            title="Reset"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                type="button"
                                                className="educare-gray-btn-md-fill"
                                                onClick={() => {
                                                    handleReset()
                                                }}
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    {/* Replace changable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default StudentCompletePaidReportFilter;
