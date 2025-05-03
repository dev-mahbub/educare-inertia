
const ErpPaidInvoiceList = ({
    paidInvoices
}) => {

    // total paid amount
    const totalPaidAmount = paidInvoices?.reduce((total, item) => total + parseFloat(item?.paid_amount ?? 0), 0);

    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (num != '' && !isNaN(num) && !Number.isInteger(parseFloat(num))) {
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
        <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12">
                                <div className="educare-admission-list pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Invoice Date</th>
                                                <th>Invoice Number</th>
                                                <th>Invoice Description</th>
                                                <th>Balance Due</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {paidInvoices?.length > 0 ?
                                                <>
                                                    {paidInvoices.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item?.invoice_date}</td>
                                                            <td>{item?.invoice_no}</td>
                                                            <td>{item?.invoice_description}</td>
                                                            <td>
                                                                <div className='inline-flex items-center'><i className='icon-CurrencyInr'></i>{formatNumber(item?.paid_amount ?? 0)}</div>
                                                            </td>
                                                            <td><span className='badge primary'>{item?.payment_status}</span></td>
                                                        </tr>
                                                    ))}

                                                    <tr>
                                                        <td colSpan={3}><b>Total</b></td>
                                                        <td colSpan={2}>
                                                            <div><b className='inline-flex items-center'><i className='icon-CurrencyInr'></i>{formatNumber(totalPaidAmount)}</b></div>
                                                        </td>
                                                    </tr>
                                                </>
                                            :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="9">Data not found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );
};

export default ErpPaidInvoiceList;
