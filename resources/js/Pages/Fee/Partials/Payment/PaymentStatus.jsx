

const PaymentStatus = ({
    feeInstallmentsData = [],
    feeVouchersData = [],
    feeTransportVouchersData = [],
    currentDueAmount
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

        // if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
        //     return parseFloat(num).toFixed(2);
        // } else {
        //     return num.toString();
        // }
    }
    // format number end

    return (
        <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12">
                <div className="fee-payment-status mt-4">
                    <ul className="flex flex-wrap gap-2.5 justify-between">
                        <li>
                            <h5 className="text-[15px] font-semibold text-headingLight">
                                Total Paid
                            </h5>
                            <span className="badge success">
                                <i className="icon-CurrencyInr"></i>{formatNumber((feeInstallmentsData?.total_paid ?? 0) + (feeVouchersData?.total_paid ?? 0) + (feeTransportVouchersData?.total_paid ?? 0))}
                            </span>
                        </li>
                        <li>
                            <h5 className="text-[15px] font-semibold text-headingLight">
                                Current Due
                            </h5>
                            <span className="badge info">
                                <i className="icon-CurrencyInr"></i>
                                {/* {formatNumber((feeInstallmentsData?.current_due ?? 0) + (feeVouchersData?.total_due ?? 0) + (feeTransportVouchersData?.total_due ?? 0))} */}
                                {formatNumber(currentDueAmount + (feeVouchersData?.total_due ?? 0) + (feeTransportVouchersData?.total_due ?? 0))}
                            </span>
                        </li>
                        <li>
                            <h5 className="text-[15px] font-semibold text-headingLight">
                                Total Due
                            </h5>
                            <span className="badge warning">
                                <i className="icon-CurrencyInr"></i>{formatNumber(feeInstallmentsData?.total_due ?? 0)}
                            </span>
                        </li>
                        <li>
                            <h5 className="text-[15px] font-semibold text-headingLight">
                                Refund Amount
                            </h5>
                            <span className="badge danger">
                                <i className="icon-CurrencyInr"></i>{formatNumber(feeInstallmentsData?.total_refund ?? 0)}
                            </span>
                        </li>
                        <li>
                            <h5 className="text-[15px] font-semibold text-headingLight">
                                Voucher Due
                            </h5>
                            <span className="badge primary">
                                <i className="icon-CurrencyInr"></i> {formatNumber((feeVouchersData?.total_due ?? 0) + (feeTransportVouchersData?.total_due ?? 0))}
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    );
};

export default PaymentStatus;
