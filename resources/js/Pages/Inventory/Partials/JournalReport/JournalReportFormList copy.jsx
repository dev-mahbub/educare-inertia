import { Link } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react';

const JournalReportFormList = () => {

    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState([false, false, false])
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end

    const AdmissionListData = (e) => {
        e.preventDefault();

    };
    //form validation end
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={AdmissionListData}>
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
                                        <tr>

                                            <td>
                                                {" "}
                                                <button
                                                    type="button"
                                                    className="educare-enq-arrow"
                                                    onClick={() =>
                                                        handleEnqToggle(0)
                                                    }
                                                >
                                                    <i
                                                        className={`${enqInnerActive[0]
                                                            ? "icon-arrow-up"
                                                            : "icon-down-arrow"
                                                            }`}
                                                    ></i>
                                                </button>
                                            </td>
                                            <td>Discount,Tax Amount</td>
                                            <td>17-Dec-2024</td>
                                            <td>Journal</td>
                                            <td>1</td>
                                            <td>50</td>
                                            <td>
                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                    <div>
                                                        <Tooltip
                                                            title="Print Check"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <Link
                                                                href="#"
                                                                className="educare-success-btn-sm-fill"
                                                            >
                                                                <i className="icon-printer"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                    <div>
                                                        <Tooltip
                                                            title="Cancel"
                                                            placement="top"
                                                            arrow
                                                            as="button"
                                                        >
                                                            <Link
                                                                href="#"
                                                                className="educare-danger-btn-sm-fill"
                                                            >
                                                                X
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr
                                            className={`${enqInnerActive[0]
                                                ? ""
                                                : "hidden"
                                                }`}
                                        >
                                            <td
                                                colSpan="12"
                                                className="educare-admission-list-enq-inner-wrap"
                                            >
                                                <table className="educare-admission-list-enq-inner">
                                                    <thead>
                                                        <tr>
                                                            <th>
                                                                Particulars
                                                            </th>
                                                            <th>
                                                                Debit
                                                            </th>
                                                            <th>
                                                                Credit
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                <span>Discount</span>
                                                                <span>Tax Amount</span>
                                                            </td>
                                                            <td>
                                                                50
                                                            </td>
                                                            <td>
                                                                50
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default JournalReportFormList;