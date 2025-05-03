
const BulkFeePaymentTopbar = ({
    selectedStudentIds,
    feeTypeAmountData
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
        <div className='flex flex-wrap gap-2.5 justify-between items-center mb-2.5'>
            <div className="educare-card-title pb-none">
                <h5>
                    <i className="icon-CurrencyInr"></i>
                    Take Bulk Fees
                </h5>
            </div>
                {(Object.keys(selectedStudentIds)?.length > 0 && Object.keys(feeTypeAmountData)?.length > 0) &&
                    <div className='flex flex-wrap gap-2.5 items-center'>
                        <div>
                            <span className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>
                                {`Total Fee : ${formatNumber(Object.values(feeTypeAmountData)?.reduce((total, amount) => total + amount, 0) ?? 0)}`}
                            </span>
                        </div>

                        {Object.keys(feeTypeAmountData)?.map((feeType, index) => (
                            <div key={index}>
                                <span className='min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA'>
                                    {`${feeType} : ${formatNumber(feeTypeAmountData[feeType] ?? 0)}`}
                                </span>
                            </div>
                        ))}
                    </div>
                }
        </div>
    );
};

export default BulkFeePaymentTopbar;
