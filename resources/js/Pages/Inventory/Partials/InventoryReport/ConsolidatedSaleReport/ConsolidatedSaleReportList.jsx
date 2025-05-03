import { useEffect, useState } from "react";

const ConsolidatedSaleReportList = ({ consolidatedSaleReport = [] }) => {

    const [consolidatedData, setConsolidatedData] = useState(consolidatedSaleReport);

    useEffect(() => {
        setConsolidatedData(consolidatedSaleReport)
        // setLoading(false);
    }, [consolidatedSaleReport]);

    return (
        <>
            <div className="educare-admission-list-area mb-10">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Invoice No</th>
                                        <th>Invoice Date</th>
                                        <th>Adm No</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Payment Mode</th>
                                        <th>Sale Amount</th>
                                        <th>Sale Returns</th>
                                    </tr>
                                </thead>
                                {/* {loading ? (
                                    <Loader></Loader>
                                ) : ( */}
                                <tbody>
                                    {consolidatedData?.length > 0 ? (
                                        consolidatedData?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.invoice_no}</td>
                                                <td>{item?.sale_date}</td>
                                                <td>{item?.admission_no}</td>
                                                <td>{item?.name}</td>
                                                <td>{item?.classroom_title}</td>
                                                <td>{item?.payment_mode}</td>
                                                <td>{parseFloat(item.sale_amount ?? 0)?.toFixed(2)}</td>
                                                <td>{parseFloat(item.sale_return_amount ?? 0)?.toFixed(2)}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="12">
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                                {/* )} */}

                                {consolidatedData?.length > 0 &&
                                    <tfoot>
                                        <tr>
                                            <td colSpan="5"></td>
                                            <td><h6 className="text-[15px] font-semibold text-heading font-primary">Total</h6></td>
                                            <td>{consolidatedData.reduce((total, item) => total + parseFloat(item.sale_amount ?? 0), 0)?.toFixed(2)}</td>
                                            <td>{consolidatedData.reduce((total, item) => total + parseFloat(item.sale_return_amount ?? 0), 0)?.toFixed(2)}</td>
                                        </tr>
                                    </tfoot>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ConsolidatedSaleReportList;
