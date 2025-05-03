
const PSRItemReport = ({
    itemReport,
    selectedLedgerReport
}) => {
    return (
        <>
             <div className="educare-card-title mr-auto pb-none mb-2.5">
                <h5>
                    <i className="icon-CurrencyInr"></i>
                    Item Report
                </h5>
            </div>

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty.</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itemReport?.length > 0 ?
                            <>
                                {itemReport.map((item, index) => (
                                    <tr key={index}>
                                        <td>{item?.product_title}</td>
                                        <td>{item.quantity ?? 1}</td>
                                        <td>{parseFloat(item.rate ?? 0)?.toFixed(2)}</td>
                                        <td>{parseFloat(item.amount ?? 0)?.toFixed(2)}</td>
                                    </tr>
                                ))}

                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Amount:</td>
                                    <td>{itemReport.reduce((total, item) => total + parseFloat(item.amount ?? 0), 0)?.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Discount:</td>
                                    <td>{parseFloat(selectedLedgerReport.discount_amount ?? 0)?.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Tax:</td>
                                    <td>{parseFloat(selectedLedgerReport.tax_amount ?? 0)?.toFixed(2)}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>Total:</td>
                                    {/* <td>{itemReport.reduce((total, item) => total + parseFloat(item.amount ?? 0), 0)?.toFixed(2)}</td> */}
                                    <td>{parseFloat(selectedLedgerReport.amount ?? 0)?.toFixed(2)}</td>
                                    {/* <td>{parseFloat(((selectedLedgerReport.sub_total ?? 0) - (selectedLedgerReport.discount_amount ?? 0)) + (selectedLedgerReport.tax_amount ?? 0))?.toFixed(2)}</td> */}
                                </tr>
                            </>
                            :
                            <tr>
                                <td className="text-center text-red-500" colSpan="4">Data not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default PSRItemReport;
