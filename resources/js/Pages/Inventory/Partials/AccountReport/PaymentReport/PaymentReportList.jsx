import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Cookies from 'js-cookie';
import React, { useMemo, useState } from "react";
import DatePicker from "react-datepicker";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import CancelLedgerPaymentPopup from "./Popup/CancelLedgerPaymentPopup";
import UpdatePaymentDetailsPopupForm from "./Popup/UpdatePaymentDetailsPopupForm";

export default function PaymentReportList({
    paymentReport = [],
    paymentModes
}) {

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [paymentData, setPaymentData] = useState({});
    const [cancelLedgerPaymentPopup, setCancelLedgerPaymentPopup] = useState(false);
    const [ledgerPaymentId, setLedgerPaymentId] = useState(null);
    const [enqInnerActive, setEnqInnerActive] = useState('');

    const {
        data,
        setData,
    } = useForm({
        // payment_mode: "",
        bank_ledger_id: "",
        search_query: "",
        start_date: new Date(),
        end_date: new Date(),
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('ledger_payment_report.list'), data);
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('ledger_payment_report.list'));
    };

    function calculateTotalSum(data) {
        return data.reduce((sum, item) => sum + parseFloat(item?.total_amount), 0);
    }
    const totalSum = calculateTotalSum(paymentReport);

    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    // handle cancel payment start
    const handleCancelPayment = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Ok',
        }).then((result) => {
            if (result.isConfirmed) {
                setLedgerPaymentId(id);
                setCancelLedgerPaymentPopup(true);
            }
        });
    }
    // handle cancel payment end

    // handle update payment details popup start
    const handleEditPopup = (id) => {
        setPaymentData(paymentReport?.find(item => item?.id == id) ?? {});
        setEditPopupOpen(!editPopupOpen);
    };
    // handle update payment details popup end

    // handle print receipt start
    const handlePrintReceipt = (id) => {
        Cookies.set('ledger_payment_id', id);

        const url = route('pdf_account.print_ledger_payment_receipt');

        window.open(url);
    }
    // handle print receipt end

    // filter payment report start
    const filteredPaymentReport = useMemo(() => {
        return paymentReport?.filter(item => {
            const inputText = data?.search_query?.trim()?.toLowerCase();
            const receiptNo = String(item?.receipt_no)?.toLowerCase();
            const ledgerTitle = item?.ledger_title?.toLowerCase();
            const paymentDate = item?.payment_date?.toLowerCase();
            const description = item?.description?.toLowerCase();
            const totalAmount = String(item?.total_amount)?.toLowerCase();

            return (
                receiptNo && receiptNo?.includes(inputText) ||
                ledgerTitle && ledgerTitle?.includes(inputText) ||
                paymentDate && paymentDate?.includes(inputText) ||
                description && description?.includes(inputText) ||
                totalAmount && totalAmount?.includes(inputText)
            );
        });
    }, [data?.search_query, paymentReport]);
    // filter payment report end


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className='educare-header-filtar-bar-area z-[4] relative'>
                                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                                    <div className="educare-header-filtar-bar-main">
                                        <form>
                                            <div className=" educare-header-filtar-bar-inner-main">
                                                {/* delete count if don't need */}
                                                <div className="educare-header-filtar-bar-count mr-auto">
                                                    <div className="educare-card-title pb-none">
                                                        <h5>
                                                            <i className="icon-ListBullets"></i>
                                                            Total ({filteredPaymentReport?.length})
                                                        </h5>
                                                    </div>
                                                </div>
                                                {/* delete count if don't need */}
                                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                                    <div className="educare-header-filtar-bar-fields-area relative">
                                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                                            {/* Replace changable inputs */}
                                                                <div className="educare-select-field-styles">
                                                                    <TextInput
                                                                        id="search_query"
                                                                        value={data.search_query}
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "search_query",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className="block"
                                                                        type="text"
                                                                        placeHolder="Search here"
                                                                    />
                                                                </div>
                                                                <div className="educare-input-field-styles">
                                                                    <DatePicker
                                                                        selected={data?.start_date && new Date(data?.start_date)}
                                                                        onChange={(date) => setData("start_date", date)}
                                                                        showYearDropdown
                                                                        showMonthDropdown
                                                                        useShortMonthInDropdown
                                                                        showPopperArrow={false}
                                                                        peekNextMonth
                                                                        dropdownMode="select"
                                                                        isClearable
                                                                        dateFormat="dd/MM/yyyy"
                                                                        placeholderText="Select Date"
                                                                        className="w-full"
                                                                    />
                                                                </div>
                                                                <div className="educare-input-field-styles">
                                                                    <DatePicker
                                                                        selected={data?.end_date && new Date(data?.end_date)}
                                                                        onChange={(date) => setData("end_date", date)}
                                                                        showYearDropdown
                                                                        showMonthDropdown
                                                                        useShortMonthInDropdown
                                                                        showPopperArrow={false}
                                                                        peekNextMonth
                                                                        dropdownMode="select"
                                                                        isClearable
                                                                        dateFormat="dd/MM/yyyy"
                                                                        placeholderText="Select Date"
                                                                        className="w-full"
                                                                    />
                                                                </div>
                                                                <div className="educare-select-field-styles">
                                                                    <SelectInput
                                                                        id="bank_ledger_id"
                                                                        data_label="Credit Ledger"
                                                                        data={paymentModes}
                                                                        value={data.bank_ledger_id}
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "bank_ledger_id",
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className="block"
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
                                                        >
                                                            <button type="button" onClick={handleSearch}
                                                                className="educare-secondary-btn-md-fill"
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
                                                        >
                                                            <button type="button" onClick={handleReset}
                                                                className="educare-gray-btn-md-fill"
                                                            >
                                                                <i className="icon-ArrowsClockwise"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                    {paymentReport?.length > 0 &&
                                                        <div>
                                                            <Tooltip
                                                                title="Download Pdf"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <a
                                                                    href={route('pdf_account.ledger_payment_report', data)}
                                                                    target="_blank"
                                                                    className="educare-warning-btn-md-fill"
                                                                >
                                                                    <i className="icon-FilePdf"></i>
                                                                </a>
                                                            </Tooltip>
                                                        </div>
                                                    }

                                                    {paymentReport?.length > 0 &&
                                                        <div>
                                                            <Tooltip
                                                                title="Download Excel"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <a
                                                                    href={route('export_excel.inventory.ledger_payment_report', data)}
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

                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>SL No</th>
                                            <th>Receipt No.</th>
                                            <th>Ledger</th>
                                            <th>Payment Date</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredPaymentReport?.length > 0 ?
                                            filteredPaymentReport?.map((item, index) => (
                                                <React.Fragment>
                                                     <tr key={index}>
                                                         <td>
                                                            {++index}
                                                            <button
                                                                type="button"
                                                                className="educare-enq-arrow"
                                                                onClick={() => setEnqInnerActive(enqInnerActive === index ? '' : index)}
                                                            >
                                                                <i className={enqInnerActive === index ? "icon-arrow-up" : "icon-down-arrow"}></i>
                                                            </button>
                                                        </td>
                                                         <td>{item?.receipt_no}</td>
                                                         {/* <td>{item?.payment_mode}</td> */}
                                                         <td>{item?.ledger_title}</td>
                                                         {/* <td>{moment(item?.payment_date_at).format("MMM DD, YYYY")}</td> */}
                                                         <td>{item?.payment_date}</td>
                                                         <td>
                                                             <div className="max-w-[400px]">
                                                                 {item?.description}
                                                             </div>
                                                         </td>
                                                         <td>{item?.total_amount}</td>
                                                         <td>
                                                             {item?.report_type == 'ledger_payment' &&
                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Print Receipt"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                type="button"
                                                                                className="educare-tertiary-btn-sm-fill"
                                                                                onClick={() => {
                                                                                    handlePrintReceipt(item?.id)
                                                                                }}
                                                                            >
                                                                                <i className="icon-printer"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Delete"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                className="educare-danger-btn-sm-fill"
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    handleCancelPayment(item?.id)
                                                                                }}
                                                                            >
                                                                                <i className="icon-TrashSimple"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Update Details"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                className="educare-success-btn-sm-fill"
                                                                                type="button"
                                                                                onClick={() => {
                                                                                    handleEditPopup(item?.id)
                                                                                }}
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr
                                                        className={enqInnerActive === index ? '' : 'hidden'}
                                                    >
                                                        <td colSpan="12" className="educare-admission-list-enq-inner-wrap">
                                                            <table className="educare-admission-list-enq-inner">
                                                                <tbody>
                                                                    {item?.payment_items?.length > 0 ? (
                                                                        item.payment_items.map((paymentItem, subIndex) => (
                                                                            <>
                                                                                <tr key={subIndex}>
                                                                                    <td colSpan="3"></td>
                                                                                    <td className="text-center">{paymentItem?.ledger_title}</td>
                                                                                    <td className="text-center">{parseFloat(paymentItem?.amount ?? 0)?.toFixed(2)}</td>
                                                                                    <td></td>
                                                                                </tr>
                                                                            </>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="10">No product items found</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan={5}><span className="font-bold">Total</span></td>
                                            <td colSpan={2}><span className="font-bold">{totalSum.toFixed(2)}</span></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <UpdatePaymentDetailsPopupForm
                editPopupOpen={editPopupOpen}
                setEditPopupOpen={setEditPopupOpen}
                paymentData={paymentData}
                setPaymentData={setPaymentData}
                formData={data}
            />
            <CancelLedgerPaymentPopup
                cancelLedgerPaymentPopup={cancelLedgerPaymentPopup}
                setCancelLedgerPaymentPopup={setCancelLedgerPaymentPopup}
                ledgerPaymentId={ledgerPaymentId}
                setLedgerPaymentId={setLedgerPaymentId}
                formData={data}
            />
        </>
    );
}
