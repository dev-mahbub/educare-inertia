import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Cookies from "js-cookie";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import CancelLedgerReceiptPopup from "./Popup/CancelLedgerReceiptPopup";
import UpdateReceiptDetailsPopupForm from "./Popup/UpdateReceiptDetailsPopupForm";

export default function ReceiptReportList({
    receiptReport = [],
    ledgerTitles = [],
}) {

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [receiptData, setReceiptData] = useState({});
    const [cancelLedgerReceiptPopup, setCancelLedgerReceiptPopup] = useState(false);
    const [ledgerReceiptId, setLedgerReceiptId] = useState(null);
    const [receiptType, setReceiptType] = useState('');
    const [enqInnerActive, setEnqInnerActive] = useState('');

    const {
        data,
        setData,
    } = useForm({
        ledger_id: "",
        search_query: "",
        // receipt_date_at: "",
        start_date: new Date(),
        end_date: new Date(),
    });

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('ledger_receipt_report.list'), data);
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('ledger_receipt_report.list'));
    };

    function calculateTotalSum(data) {
        return data.reduce((sum, item) => sum + parseFloat(item.total), 0);
    }
    const totalSum = calculateTotalSum(receiptReport);

    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here

    // handle cancel receipt start
    const handleCancelReceipt = (id, receipt_type) => {
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
                setReceiptType(receipt_type);
                setLedgerReceiptId(id);
                setCancelLedgerReceiptPopup(true);
            }
        });
    }
    // handle cancel receipt end

    // handle update receipt details popup start
    const handleEditPopup = (item, receipt_type) => {
        setReceiptData(item);
        setEditPopupOpen(!editPopupOpen);
        setReceiptType(receipt_type);
    };
    // handle update receipt details popup end

    // handle print receipt start
    const handlePrintReceipt = (id, receipt_type) => {
        let url = route('pdf_account.print_ledger_receipt');

        if (receipt_type == 'sale_ledger_payment') {
            Cookies.set('sale_ledger_payment_id', id);

            url = route('pdf_account.print_sale_ledger_payment_receipt');
        } else {
            Cookies.set('ledger_receipt_id', id);
        }

        if(url != "") {
            window.open(url);
        }
    }
    // handle print receipt end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="mb-5">
                                <h2 className="text-xl font-medium">Receipt Report</h2>
                            </div>
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
                                                            Total ({receiptReport?.length})
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
                                                                {/* <div className="educare-input-field-styles">
                                                                    <DatePicker
                                                                        selected={data?.receipt_date_at && new Date(data?.receipt_date_at)}
                                                                        onChange={(date) => setData("receipt_date_at", date)}
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
                                                                </div> */}
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
                                                                        id="ledger_id"
                                                                        data_label="ledger"
                                                                        data={ledgerTitles}
                                                                        value={data.ledger_id}
                                                                        onChange={(e) =>
                                                                            setData(
                                                                                "ledger_id",
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
                                                    {receiptReport?.length > 0 &&
                                                        <div>
                                                            <Tooltip
                                                                title="Download Pdf"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <a
                                                                    href={route('pdf_account.ledger_receipt_report', data)}
                                                                    target="_blank"
                                                                    className="educare-warning-btn-md-fill"
                                                                >
                                                                    <i className="icon-FilePdf"></i>
                                                                </a>
                                                            </Tooltip>
                                                        </div>
                                                    }

                                                    {receiptReport?.length > 0 &&
                                                        <div>
                                                            <Tooltip
                                                                title="Download Excel"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <a
                                                                    href={route('export_excel.inventory.ledger_receipt_report', data)}
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
                                            <th>Receipt Date</th>
                                            <th>Description</th>
                                            <th>Amount</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {receiptReport?.length > 0 ?
                                            receiptReport?.map((item, index) => (
                                                // <tr key={index}>
                                                //     <td>{++index}</td>
                                                //     <td>{item?.receipt_no}</td>
                                                //     <td>{item?.payment_mode}</td>
                                                //     <td>{item?.receipt_date}</td>
                                                //     <td>
                                                //         <div className="max-w-[400px]">
                                                //             {item?.description}
                                                //         </div>
                                                //     </td>
                                                //     <td>{parseFloat(item?.total ?? 0)?.toFixed(2)}</td>
                                                //     <td>
                                                //         {(item?.receipt_type == 'ledger_receipt' || item?.receipt_type == 'sale_ledger_payment') &&
                                                //             <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                //                 <div>
                                                //                     <Tooltip
                                                //                         title="Print Receipt"
                                                //                         placement="top"
                                                //                         arrow
                                                //                     >
                                                //                         <button
                                                //                             type="button"
                                                //                             className="educare-tertiary-btn-sm-fill"
                                                //                             onClick={() => {
                                                //                                 handlePrintReceipt(item?.id, item?.receipt_type)
                                                //                             }}
                                                //                         >
                                                //                             <i className="icon-printer"></i>
                                                //                         </button>
                                                //                     </Tooltip>
                                                //                 </div>
                                                //                 <div>
                                                //                     <Tooltip
                                                //                         title="Delete"
                                                //                         placement="top"
                                                //                         arrow
                                                //                     >
                                                //                         <button
                                                //                             className="educare-danger-btn-sm-fill"
                                                //                             type="button"
                                                //                             onClick={() => {
                                                //                                 handleCancelReceipt(item?.id, item?.receipt_type)
                                                //                             }}
                                                //                         >
                                                //                             <i className="icon-TrashSimple"></i>
                                                //                         </button>
                                                //                     </Tooltip>
                                                //                 </div>
                                                //                 <div>
                                                //                     <Tooltip
                                                //                         title="Update Details"
                                                //                         placement="top"
                                                //                         arrow
                                                //                     >
                                                //                         <button
                                                //                             className="educare-success-btn-sm-fill"
                                                //                             type="button"
                                                //                             onClick={() => {
                                                //                                 handleEditPopup(item, item?.receipt_type)
                                                //                             }}
                                                //                         >
                                                //                             <i className="icon-editing"></i>
                                                //                         </button>
                                                //                     </Tooltip>
                                                //                 </div>
                                                //             </div>
                                                //         }
                                                //     </td>
                                                // </tr>
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
                                                        <td>{item?.payment_mode}</td>
                                                        <td>{item?.receipt_date}</td>
                                                        <td>
                                                            <div className="max-w-[400px]">
                                                                {item?.description}
                                                            </div>
                                                        </td>
                                                        <td>{parseFloat(item?.total ?? 0)?.toFixed(2)}</td>
                                                        <td>
                                                            {(item?.receipt_type == 'ledger_receipt' || item?.receipt_type == 'sale_ledger_payment') &&
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
                                                                                    handlePrintReceipt(item?.id, item?.receipt_type)
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
                                                                                    handleCancelReceipt(item?.id, item?.receipt_type)
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
                                                                                    handleEditPopup(item, item?.receipt_type)
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
                                                                                    <td className="text-center">{paymentItem?.title}</td>
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
            <UpdateReceiptDetailsPopupForm
                editPopupOpen={editPopupOpen}
                setEditPopupOpen={setEditPopupOpen}
                receiptData={receiptData}
                setReceiptData={setReceiptData}
                formData={data}
                receiptType={receiptType}
                setReceiptType={setReceiptType}
            />
            <CancelLedgerReceiptPopup
                cancelLedgerReceiptPopup={cancelLedgerReceiptPopup}
                setCancelLedgerReceiptPopup={setCancelLedgerReceiptPopup}
                ledgerReceiptId={ledgerReceiptId}
                setLedgerReceiptId={setLedgerReceiptId}
                formData={data}
                receiptType={receiptType}
                setReceiptType={setReceiptType}
            />
        </>
    );
}
