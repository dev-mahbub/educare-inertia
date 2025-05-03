
const DateWisePaymentTable = ({
    headWisePaymentReport,
    ledgerTitles,
    headWiseSummary
}) => {

    return (
        <>
            <div className="table-container">
                <div className="educare-admission-list-area">
                    <div className="educare-admission-list-inner">
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list educare-full-container-scrollable-table">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            {Object.keys(ledgerTitles)?.length > 0 &&
                                                Object.values(ledgerTitles)?.map((ledgerTitle, index) => (
                                                    <th key={index} >{ledgerTitle}</th>
                                                ))
                                            }
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {headWisePaymentReport?.length > 0 ?
                                            headWisePaymentReport?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.payment_date}</td>
                                                    {Object.keys(ledgerTitles)?.length > 0 &&
                                                        Object.keys(ledgerTitles)?.map((key, innerIndex) => (
                                                            <td key={innerIndex}>{parseFloat(item['head_wise_data'][key] ?? 0)?.toFixed(2)}</td>
                                                        ))
                                                    }
                                                    <td>{parseFloat(item?.total ?? 0)?.toFixed(2)}</td>
                                                </tr>
                                            ))
                                        :
                                            <tr>
                                                <td
                                                    className="text-center text-red-500"
                                                    colSpan="7"
                                                >
                                                    Data not found
                                                </td>
                                            </tr>
                                         }

                                        {Object.keys(ledgerTitles)?.length > 0 &&
                                            <tr>
                                                <td>
                                                    <h6 className="text-[14px] font-semibold text-heading font-primary">
                                                        Total
                                                    </h6>
                                                </td>
                                                    {Object.keys(ledgerTitles)?.map((key, innerIndex) => (
                                                        <td key={innerIndex}>
                                                            <h6 className="text-[14px] font-semibold text-heading font-primary">
                                                                {parseFloat(headWiseSummary[key] ?? 0)?.toFixed(2)}
                                                            </h6>
                                                        </td>
                                                    ))}
                                                <td>
                                                    <h6 className="text-[14px] font-semibold text-heading font-primary">
                                                        {parseFloat(headWiseSummary['total'] ?? 0)?.toFixed(2)}
                                                    </h6>
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DateWisePaymentTable;
