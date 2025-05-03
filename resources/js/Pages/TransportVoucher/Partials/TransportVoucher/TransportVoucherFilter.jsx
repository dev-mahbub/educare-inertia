import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TransportVoucherFilter({
    vouchers = [],
    voucherStatusArray = [],
    selectedClassroomIds,
    transportVoucherReport,
    setLoading
}) {

    const [filteredToVouchers, setFilteredToVouchers] = useState([]);
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
        payment_status: "",
        from_id: "",
        to_id: "",
    });

    useEffect(() => {
        setParams({
            classroom_ids: selectedClassroomIds,
            payment_status: data?.payment_status ?? "",
            from_id: data?.from_id,
            to_id: data?.to_id,
        });
    }, [selectedClassroomIds, data]);

    // handle from voucher change start
    const handleFromVoucherChange = (e) => {
        const selectedVoucher = vouchers?.find(item => item?.id == e.target.value);

        setFilteredToVouchers(vouchers?.filter(item => item?.installment_no >= selectedVoucher?.installment_no));

        setData((prevData) => ({
            ...prevData,
            from_id: selectedVoucher?.id ?? "",
            to_id: ""
        }));
    }
    // handle from voucher change end

    const filterTransportVoucherReport = (e) => {
        e.preventDefault();

        if(data?.from_id == "" || data?.to_id == "") {
            toast.error("Please select from and to voucher", {
                position: 'top-right',
                autoClose: 1500,
            })
        }
        else {
            setLoading(false);

            const form_data = {
                classroom_ids: selectedClassroomIds,
                payment_status: data?.payment_status ?? "",
                from_id: data?.from_id ?? "",
                to_id: data?.to_id ?? ""
            }

            router.post(route('transport.voucher_index'), form_data);
        }
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

        // if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
        //     return parseFloat(num).toFixed(2);
        // } else {
        //     return num.toString();
        // }
    }
    // format number end


    return (
        <>
            <div className="educare-school-form-action-title">
                <h5><i className="icon-info"></i>  Transport Voucher Report</h5>
            </div>
            <div className='educare-admission-filtar-bar-area z-[4] relative'>


                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={filterTransportVoucherReport}>
                            <div className=" educare-header-filtar-bar-inner-main minMaxLg:flex-wrap minMaxLg:justify-end">
                                <div className="educare-admission-filtar-bar-count educare-admission-filtar-bar-count-badge flex gap-1">
                                    <span className="badge primary">Total Paid: {formatNumber(transportVoucherReport?.total_paid ?? 0)}</span>
                                    <span className="badge danger">Total Dues: {formatNumber(transportVoucherReport?.total_due ?? 0)}</span>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="Payment Status"
                                                    data={voucherStatusArray}
                                                    value={data.payment_status}
                                                    onChange={(e) =>
                                                        setData("payment_status", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.payment_status}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="From"
                                                    data={vouchers}
                                                    value={data.from_id}
                                                    onChange={(e) =>
                                                        handleFromVoucherChange(e)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.from_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    data_label="To"
                                                    data={filteredToVouchers}
                                                    value={data.to_id}
                                                    onChange={(e) =>
                                                        setData("to_id", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.to_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                    <div className="educare-button-field-styles">
                                        <Tooltip
                                            title="Search"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                type="submit"
                                                className="educare-secondary-btn-md-fill"
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
                                        </Tooltip>
                                    </div>

                                    {Object.keys(transportVoucherReport)?.length > 0 && Object.keys(transportVoucherReport?.reports)?.length > 0 &&
                                        <div className="educare-button-field-styles">
                                            <Tooltip
                                                title="PDF"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <Link
                                                    href="#"
                                                    className="educare-warning-btn-md-fill"
                                                >
                                                    <i className="icon-FilePdf"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                    }

                                    {Object.keys(transportVoucherReport)?.length > 0 && Object.keys(transportVoucherReport?.reports)?.length > 0 &&
                                        <div className="educare-button-field-styles">
                                            <Tooltip
                                                title="Download Excel"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <a
                                                    href={route('export_excel.transport_voucher_report', params)}
                                                    target="_blank"
                                                    className="educare-success-btn-md-fill"
                                                >
                                                    <i className="icon-FileX"></i>
                                                </a>
                                            </Tooltip>
                                        </div>
                                    }
                                    <div className="educare-button-field-styles">
                                        <Tooltip
                                            title="Reset"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href={route('transport.voucher_index')}
                                                className="educare-gray-btn-md-fill"
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>

    );
}
