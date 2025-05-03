import Loader from "@/Components/Loader";
import { Tooltip } from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Cookies from 'js-cookie';
import { useEffect, useState } from "react";

export default function DailyCollectionReportList({
    dailyFeePaymentReports,
    loading,
    totalPaidByPaymentMode,
    totalPaidByAdmin,
    feeReceiptPageSize,
    feeReceiptCopy,
    regFeeReceiptPageSize,
    regFeeReceiptCopy
}) {

    const [totalPaidAmount, setTotalPaidAmount] = useState(0);
    const [totalPaidByPaymentModeCount, setTotalPaidByPaymentModeCount] = useState(0);
    const [totalPaidByAdminCount, setTotalPaidByAdminCount] = useState(0);


    useEffect(() => {
        setTotalPaidAmount(Object.values(dailyFeePaymentReports)?.map(item => item?.total_paid_amount)?.reduce((total, amount) => total + amount, 0));
    }, [dailyFeePaymentReports])

    useEffect(() => {
        setTotalPaidByPaymentModeCount(Object.values(totalPaidByPaymentMode)?.map(item => item?.total_paid_amount)?.reduce((total, amount) => total + amount, 0));
    }, [totalPaidByPaymentMode])

    useEffect(() => {
        setTotalPaidByAdminCount(Object.values(totalPaidByAdmin)?.map(item => item?.total_paid_amount)?.reduce((total, amount) => total + amount, 0));
    }, [totalPaidByAdmin]);


    // handle payment report pdf prin start
    const handlePaymentReportPdfExport = (id, isCancelled, isRegistrationFee) => {
        let url = "";

        if (isRegistrationFee) {
            Cookies.set('enquiryFeeId', id);

            url = route('admission_pdf_generator.admission_fee');
        }
        else {
            Cookies.set('feeId', id);

            if (isCancelled) {
                if (feeReceiptPageSize == "Small" && feeReceiptCopy != "Single") {
                    url = route('pdf_fee.student_cancelled_office_small');
                }
                else if (feeReceiptPageSize == "Small" && feeReceiptCopy == "Single") {
                    url = route('pdf_fee.student_cancelled_office_single_small');
                }
                else if (feeReceiptPageSize == "Large" && feeReceiptCopy != "Single") {
                    url = route('pdf_fee.student_cancelled_office_large');
                }
                else if (feeReceiptPageSize == "Large" && feeReceiptCopy == "Single") {
                    url = route('pdf_fee.student_cancelled_office_single_large');
                }
            }
            else {
                if (feeReceiptPageSize == "Small" && feeReceiptCopy != "Single") {
                    url = route('pdf_fee.student_paid_small');
                }
                else if (feeReceiptPageSize == "Small" && feeReceiptCopy == "Single") {
                    url = route('pdf_fee.student_paid_single_small');
                }
                else if (feeReceiptPageSize == "Large" && feeReceiptCopy != "Single") {
                    url = route('pdf_fee.student_paid_large');
                }
                else if (feeReceiptPageSize == "Large" && feeReceiptCopy == "Single") {
                    url = route('pdf_fee.student_paid_single_large');
                }
            }
        }

        if (url != "") {
            window.open(url, '_blank')
        }
    }
    // handle payment report pdf prin end

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
        <div className="educare-common-mat-list w-full">
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12">
                    <TableContainer component={Paper}>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Status</TableCell>
                                <TableCell>Student Name</TableCell>
                                <TableCell>Adm No.</TableCell>
                                <TableCell>Class</TableCell>
                                <TableCell>Rcpt No</TableCell>
                                <TableCell>Tot.Amt</TableCell>
                                <TableCell>Concession</TableCell>
                                <TableCell>Pay Amt</TableCell>
                                <TableCell>Paid</TableCell>
                                <TableCell>Due</TableCell>
                                <TableCell>Mode</TableCell>
                                <TableCell>Note</TableCell>
                                <TableCell>Date and Time</TableCell>
                                <TableCell>Taken By</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {loading ?
                            <Loader></Loader>
                        :
                            <TableBody>
                                {Object.keys(dailyFeePaymentReports)?.length > 0 ?
                                    <>
                                        {Object.values(dailyFeePaymentReports)?.map((item, index) => (
                                                <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0, }, }} key={index}>
                                                    <TableCell>
                                                        <div>
                                                            <Tooltip
                                                                title={item?.student_status == 'New' ? 'New' : 'Promoted'}
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button type="button"
                                                                    className={item?.student_status == 'New' ? 'educare-primary-btn-sm-outline' : 'educare-success-btn-sm-outline'}
                                                                >
                                                                    <span>{item?.student_status == 'New' ? 'N' : 'P'}</span>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>{item?.student_name}</TableCell>
                                                    <TableCell>{item?.admission_no}</TableCell>
                                                    <TableCell>{item?.classroom_title}</TableCell>
                                                    <TableCell>
                                                        {item?.receipt_no}
                                                        {item?.is_cancelled == true &&
                                                            <span className="badge bg-danger ml-1">C</span>
                                                        }
                                                    </TableCell>
                                                    <TableCell>{formatNumber(item?.total_amount)}</TableCell>
                                                    <TableCell>{formatNumber(item?.total_discount_amount)}</TableCell>
                                                    <TableCell>{formatNumber(item?.total_payable_amount)}</TableCell>
                                                    <TableCell>{formatNumber(item?.total_paid_amount)}</TableCell>
                                                    <TableCell>{formatNumber(item?.total_due_amount)}</TableCell>
                                                    <TableCell>{item?.payment_mode}</TableCell>
                                                    <TableCell>{item?.payment_note}</TableCell>
                                                    <TableCell>{item?.payment_date_time}</TableCell>
                                                    <TableCell>{item?.created_by}</TableCell>
                                                    <TableCell>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip
                                                                title={Object.values(item?.fee_types)?.join(", ")}
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="educare-tertiary-btn-sm-fill"
                                                                        onClick={() => {
                                                                            handlePaymentReportPdfExport(item?.id, item?.is_cancelled, item?.is_registration_fee)
                                                                        }}
                                                                    >
                                                                        <i className="icon-printer"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                                ))}
                                        < TableRow className="bg-dark">
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell>Total</TableCell>
                                                    <TableCell>{formatNumber(totalPaidAmount)}</TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                            <TableCell></TableCell>
                                        </ TableRow>
                                    </>
                                :
                                    <TableRow>
                                        <TableCell className="!text-center text-red-500" colSpan="15">
                                            Data not found
                                        </TableCell>
                                    </TableRow>
                                }
                            </TableBody>
                        }
                    </Table>
                    </TableContainer>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="educare-default-table xs:overflow-x-auto table-width-full">
                        <table>
                            <thead>
                                <tr>
                                    <th>Payment Mode</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                            {loading ?
                                <Loader></Loader>
                            :
                                <tbody>
                                    {Object.keys(totalPaidByPaymentMode)?.length > 0 &&
                                        Object.values(totalPaidByPaymentMode)?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.payment_mode}</td>
                                                <td>{formatNumber(item?.total_paid_amount)}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td><h5 className="font-bold text-headingLight">Total :</h5></td>
                                        <td>
                                            <h5 className="font-bold text-headingLight">
                                                {formatNumber(totalPaidByPaymentModeCount)}
                                            </h5>
                                        </td>
                                    </tr>
                                </tbody>
                            }
                        </table>
                    </div>
                </div>
                <div className="col-span-12 md:col-span-6">
                    <div className="educare-default-table xs:overflow-x-auto table-width-full">
                        <table>
                            <thead>
                                <tr>
                                    <th>Taken By</th>
                                    <th>Amount</th>
                                </tr>
                            </thead>
                        {loading ?
                            <Loader></Loader>
                        :
                            <tbody>
                                {Object.keys(totalPaidByAdmin)?.length > 0 &&
                                    Object.values(totalPaidByAdmin)?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.created_by}</td>
                                            <td>{formatNumber(item?.total_paid_amount)}</td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td><h5 className="font-bold text-headingLight">Total :</h5></td>
                                        <td>
                                            <h5 className="font-bold text-headingLight">
                                                {formatNumber(totalPaidByAdminCount)}
                                            </h5>
                                        </td>
                                </tr>
                            </tbody>
                        }
                        </table>
                    </div>
                </div>
            </div>
        </div>
      </>
    );
}
