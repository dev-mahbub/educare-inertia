import { Tooltip } from "@mui/material";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

const MonthlyReport = ({
    monthWiseData
 }) => {

    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        setTotalAmount(Object.values(monthWiseData)?.reduce((total, item) => total + item?.fee_amount, 0))
    }, [monthWiseData]);

    // handle print registration receipt start
    const handlePrintRegistrationReceipt = (id) => {
        Cookies.set('enquiryFeeId', id);

        const url = route('admission_pdf_generator.admission_fee');

        if (url != "") {
            window.open(url, '_blank')
        }
    }
    // handle print registration receipt end

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
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="flex justify-between flex-wrap ">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Monthly Report
                            </h5>
                        </div>
                        <div className="educare-header-filtar-bar-count">
                            {/* Calculate and display the total amount */}
                            <span>Total Amount: {formatNumber(totalAmount)}</span>
                        </div>
                    </div>
                    <div className="educare-admission-list-inner-wrapper mt-2">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Reg No.</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Amount</th>
                                        <th>Pay Date</th>
                                        <th>Pay Mode</th>
                                        <th>Reg Mode</th>
                                        <th>Receipt No.</th>
                                        <th>Print</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {monthWiseData &&
                                        Object.values(monthWiseData)?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item?.registration_no}</td>
                                                <td>{item?.student_name}</td>
                                                <td>{item?.class_title}</td>
                                                <td>{formatNumber(item?.fee_amount ?? 0)}</td>
                                                <td>{item?.payment_date}</td>
                                                <td>{item?.payment_mode}</td>
                                                <td>{item?.registration_mode}</td>
                                                <td>{item?.receipt_no}</td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Print"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type='button'
                                                                    onClick={() => {
                                                                        handlePrintRegistrationReceipt(item?.id)
                                                                    }}
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-printer"></i>
                                                                </button>
                                                                {/* <a
                                                                    target="_blank"
                                                                    href={route('admission_pdf_generator.admission_fee', item?.id)}
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-printer"></i>
                                                                </a> */}
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export default MonthlyReport;
