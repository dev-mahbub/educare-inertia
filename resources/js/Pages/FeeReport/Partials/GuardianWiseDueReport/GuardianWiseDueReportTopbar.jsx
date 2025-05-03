import { Tooltip } from '@mui/material';

const GuardianWiseDueReportTopbar = ({
    totalAmount,
    totalDiscount,
    totalPayable,
    totalPaid,
    totalDue,
    params,
    guardianWiseReport
}) => {

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
            <div className='mb-2.5'>
                <div className='educare-header-filter-topbar flex flex-wrap gap-2.5 items-center'>
                    <div className="educare-card-title mr-auto pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Guardian Wise Due and Deposit Report
                        </h5>
                    </div>
                    <div className='flex flex-wrap gap-4'>
                        <span className='badge primary'>Amount : {formatNumber(totalAmount)}</span>
                        <span className='badge info'>Discount : {formatNumber(totalDiscount)}</span>
                        <span className='badge warning'>Payable : {formatNumber(totalPayable)}</span>
                        <span className='badge success'>Paid : {formatNumber(totalPaid)}</span>
                        <span className='badge danger'>Due : {formatNumber(totalDue)}</span>
                    </div>
                    <div className="educare-filter-action-btn inline-flex gap-2">
                        {Object.keys(guardianWiseReport)?.length > 0 &&
                            <div>
                                <Tooltip
                                    title="Download Excel"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        target="_blank"
                                        href={route('export_excel.guardian_wise_due_report', params)}
                                        className="educare-success-btn-md-fill"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        }

                        {Object.keys(guardianWiseReport)?.length > 0 &&
                            <div>
                                <Tooltip
                                    title="Download Pdf"
                                    placement="top"
                                    arrow
                                >
                                    <a
                                        target="_blank"
                                        href={route('pdf_fee_demand_slip.guardian_wise_due_report', params)}
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
        </>
    );
};

export default GuardianWiseDueReportTopbar;
