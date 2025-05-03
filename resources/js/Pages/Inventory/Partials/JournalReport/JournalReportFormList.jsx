import { Tooltip } from '@mui/material';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import CancelPopup from './Popup/CancelPopup';

const JournalReportFormList = ({
    journals,
    data
}) => {

    const [enqInnerActive, setEnqInnerActive] = useState(
        new Array(journals?.length).fill(false)
    );

    const [selectedJournal, setSelectedJournal] = useState({});
    const [cancelPopup, setCancelPopup] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleCancelPopupClick = (id) => {
        setCancelPopup(!cancelPopup);

        setSelectedJournal(journals?.find(item => item?.id == id) ?? {});
    };

    useEffect(() => {
        setEnqInnerActive(new Array(journals?.length).fill(false));
        setTotalAmount(journals?.reduce((total, item) => total + parseFloat(item?.total_amount ?? 0), 0));
    }, [journals]);

    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    }

    // handle print receipt start
    const handlePrintReceipt = (id) => {
        Cookies.set('journal_id', id);

        window.open(route('pdf_account.journal_receipt'));
    }
    // handle print receipt end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list bg-supportingA/10">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Particulars</th>
                                        <th>Transection Date</th>
                                        <th>Vch Type</th>
                                        <th>Vch No</th>
                                        <th>Total</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {journals?.length > 0 ?
                                        <React.Fragment>
                                            {journals?.map((item, index) => (
                                                <React.Fragment key={index}>
                                                    <tr key={item?.id}>
                                                        <td>
                                                            <button
                                                                type="button"
                                                                className="educare-enq-arrow"
                                                                onClick={() => handleEnqToggle(index)}
                                                            >
                                                                <i
                                                                    className={`${enqInnerActive[index]
                                                                        ? "icon-arrow-up"
                                                                        : "icon-down-arrow"
                                                                        }`}
                                                                ></i>
                                                            </button>
                                                        </td>
                                                        <td>{item?.ledger_titles}</td>
                                                        <td>{item?.journal_date}</td>
                                                        <td>{item?.type}</td>
                                                        <td>{item?.voucher_no}</td>
                                                        <td>{item?.total_amount}</td>
                                                        <td>
                                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Print Receipt"
                                                                        placement="top"
                                                                        arrow
                                                                        as="button"
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="educare-warning-btn-sm-fill"
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
                                                                        title="Cancel"
                                                                        placement="top"
                                                                        arrow
                                                                        as="button"
                                                                    >
                                                                        <button
                                                                            type="button"
                                                                            className="educare-danger-btn-sm-fill"
                                                                            onClick={() => {
                                                                                handleCancelPopupClick(item?.id)
                                                                            }}
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </button>
                                                                    </Tooltip>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr
                                                        className={`${enqInnerActive[index]
                                                            ? ""
                                                            : "hidden"
                                                            }`}
                                                    >
                                                        <td colSpan="12" className="educare-admission-list-enq-inner-wrap">
                                                            <table className="educare-admission-list-enq-inner">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Particulars</th>
                                                                        <th>Debit</th>
                                                                        <th>Credit</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item?.journal_ledgers?.map((journalLedger, innerIndex) => (
                                                                        <tr key={innerIndex}>
                                                                            <td>{journalLedger?.ledger_title}</td>
                                                                            <td>{journalLedger?.debit_amount}</td>
                                                                            <td>{journalLedger?.credit_amount}</td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))}
                                            <tr>
                                                <td colSpan="4"></td>
                                                <td>Total</td>
                                                <td>{totalAmount}</td>
                                                <td></td>
                                            </tr>
                                        </React.Fragment>
                                    :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="7">
                                                Data not found
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <CancelPopup
                cancelPopup={cancelPopup}
                setCancelPopup={setCancelPopup}
                selectedJournal={selectedJournal}
                setSelectedJournal={setSelectedJournal}
                formData={data}
            />
        </>
    );
};

export default JournalReportFormList;
