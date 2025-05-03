import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DateWisePaymentReceiptForm = ({
    paymentTypes,
    ledgers,
    headWisePaymentReport
}) => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        payment_type: "Payment",
        start_date: new Date(),
        end_date: new Date(),
        ledger_id: "",
    });

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

    // handle filter report start
    const handleFilterReport = (e) => {
        e.preventDefault();
        if (data?.payment_type == "") {
            toast.error("Please select payment type", {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            const form_data = {
                payment_type: data?.payment_type,
                start_date: data?.start_date,
                end_date: data?.end_date,
                ledger_id: data?.ledger_id
            }

            router.post(route('date_wise_payment_receipt.list'), form_data);
        }
    }
    // handle filter report end


    return (
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={CommonHeaderFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-card-title mr-auto pb-none">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    {data.payment_type == 'Receipt' ? 'Head Wise Receipt Report' : 'Head Wise Payment Report'}
                                </h5>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                    <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="payment_type"
                                                data_label="Payment"
                                                data={paymentTypes}
                                                value={data.payment_type}
                                                onChange={(e) =>
                                                    setData("payment_type", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.payment_type}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={
                                                    data?.start_date
                                                        ? new Date(
                                                            data?.start_date
                                                        )
                                                        : new Date()
                                                }
                                                onChange={(date) =>
                                                    setData("start_date", date)
                                                }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="End date"
                                                className="w-ful" />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <DatePicker
                                                selected={
                                                    data?.end_date
                                                        ? new Date(
                                                            data?.end_date
                                                        )
                                                        : new Date()
                                                }
                                                onChange={(date) =>
                                                    setData("end_date", date)
                                                }
                                                showYearDropdown
                                                showMonthDropdown
                                                useShortMonthInDropdown
                                                showPopperArrow={false}
                                                peekNextMonth
                                                dropdownMode="select"
                                                isClearable
                                                dateFormat="dd/MM/yyyy"
                                                placeholderText="End date"
                                                className="w-ful" />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                id="ledger_id"
                                                data_label="Credit Ledger"
                                                data={ledgers}
                                                value={data.ledger_id}
                                                onChange={(e) =>
                                                    setData("ledger_id", e.target.value)
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.ledger_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        {/* Replace changable inputs */}
                                    </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                            </div>
                            <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                {/* Replace changable buttons */}
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
                                            onClick={handleFilterReport}
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
                                            href={route('date_wise_payment_receipt.list')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>

                                {headWisePaymentReport?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Pdf"
                                            placement="top"
                                            arrow
                                        >
                                            <a
                                                href={route('pdf_account.head_wise_payment_report', data)}
                                                target="_blank"
                                                className="educare-warning-btn-md-fill"
                                            >
                                                <i className="icon-FilePdf"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }

                                {headWisePaymentReport?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Download Excel"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('export_excel.inventory.head_wise_payment_report', data)}
                                                target="_blank"
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }
                                {/* Replace changable buttons */}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DateWisePaymentReceiptForm;
