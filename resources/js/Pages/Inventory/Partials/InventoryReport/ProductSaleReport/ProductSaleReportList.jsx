import Loader from '@/Components/Loader';
import { useEffect, useState } from 'react';

const ProductSaleReportList = ({
    ledgerSummary = [],
    partyType,
    ledgerSummaryData,
    ledgerSummaryItemData,
    setLedgerSummaryItemData
}) => {
    const [loading, setLoading] = useState(false);

    const [totalAmount, setTotalAmount] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalTax, setTotalTax] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);
    const [totalRate, setTotalRate] = useState(0);
    const [selectedIndex, setSelectedIndex] = useState(null);

    useEffect(() => {
        setLoading(false);

        const calculateTotals = () => {
            const quantityTotal = ledgerSummaryItemData?.reduce((acc, curr) => acc + parseFloat(curr?.quantity || 0), 0);
            const rateTotal = ledgerSummaryItemData?.reduce((acc, curr) => acc + parseFloat(curr?.rate || 0), 0);
            const amountTotal = ledgerSummaryItemData?.reduce((acc, curr) => acc + parseFloat(curr?.total_amount || 0), 0);
            const discountTotal = ledgerSummaryItemData?.reduce((acc, curr) => acc + parseFloat(curr?.discount_amount || 0), 0);
            const taxTotal = ledgerSummaryItemData?.reduce((acc, curr) => acc + parseFloat(curr?.tax_amount || 0), 0);

            setTotalQuantity(quantityTotal);
            setTotalRate(rateTotal);
            setTotalAmount(amountTotal);
            setTotalDiscount(discountTotal);
            setTotalTax(taxTotal);
        };

        calculateTotals();
    }, [ledgerSummaryItemData]);

    const handelTransactionSummary = (e, index) => {
        e.preventDefault();

        setSelectedIndex(index);

        setLedgerSummaryItemData(ledgerSummaryData[index]?.ledger_summary_items ?? []);
    }



    return (
        <div className='educare-parent-montly-income-area'>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <div className="educare-admission-list-area">
                        <div className="educare-admission-list-inner">
                            <div className="educare-card-title">
                                <h5>Ledger Summary</h5>
                            </div>
                            <div className="educare-admission-list-inner-wrapper">
                                <form>
                                    <div className="educare-admission-list pb-none">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Name</th>
                                                    {partyType == 'Teacher' ?
                                                        <th>Designation</th>
                                                    :
                                                        <>
                                                            <th>Adm No.</th>
                                                            <th>Class</th>
                                                            <th>Father Name</th>
                                                        </>
                                                    }
                                                    <th>Mobile</th>
                                                    <th>Quantity</th>
                                                </tr>
                                            </thead>
                                            {/* {loading ? (
                                            <Loader></Loader>
                                        ) : ( */}
                                            <tbody>
                                                {ledgerSummaryData?.length > 0 ? (
                                                    ledgerSummaryData?.map((item, index) => (
                                                        <tr
                                                            className={index === selectedIndex ? 'educare-table-row-active cursor-pointer' : 'cursor-pointer'}
                                                            key={index}
                                                        >
                                                            <td>{item?.name}</td>
                                                            {partyType == 'Teacher' ?
                                                                <>
                                                                    <td>{item?.father_name}</td>
                                                                </>
                                                            :
                                                                <>
                                                                    <td>{item?.admission_no}</td>
                                                                    <td>{item?.classroom_title}</td>
                                                                    <td>{item?.father_name}</td>
                                                                </>
                                                            }
                                                            <td>{item?.phone}</td>
                                                            <td>
                                                                <button
                                                                    type='button'
                                                                    className="font-semibold text-primary"
                                                                    onClick={(e) => handelTransactionSummary(e, index)}
                                                                >
                                                                    {item?.quantity}
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="12">
                                                            Data not found
                                                        </td>
                                                    </tr>
                                                )}

                                                {ledgerSummaryData?.length > 0 ? <tr>
                                                    <td colSpan={partyType == 'Teacher' ? 3 : 5}>
                                                        <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                            Total
                                                        </h6>
                                                    </td>
                                                    <td><h6 className="text-[15px] font-semibold text-heading font-primary">
                                                        {ledgerSummaryData.reduce((total, item) => total + item.quantity, 0)}
                                                    </h6></td>
                                                </tr> : ''}
                                            </tbody>
                                            {/* )} */}
                                        </table>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-6 lg:col-span-6">
                    <div className="educare-admission-list-area">
                        <div className="educare-admission-list-inner">
                            <div className="educare-card-title">
                                <h5>Transaction Summary</h5>
                            </div>
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Quantity</th>
                                                <th>Rate</th>
                                                <th>Tax</th>
                                                <th>Discount</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        {loading ? (
                                            <Loader></Loader>
                                        ) : (
                                            <tbody>
                                                {ledgerSummaryItemData?.length > 0 ? (
                                                    ledgerSummaryItemData?.map((item2, index2) => (
                                                        <tr key={index2}>
                                                            <td>{item2?.date}</td>
                                                            <td>{item2?.quantity}</td>
                                                            <td>{parseFloat(item2.rate ?? 0)?.toFixed(2)}</td>
                                                            <td>{parseFloat(item2.tax_amount ?? 0)?.toFixed(2)}</td>
                                                            <td>{parseFloat(item2.discount_value ?? 0)?.toFixed(2)}</td>
                                                            <td>{parseFloat(item2.total_amount ?? 0)?.toFixed(2)}</td>
                                                        </tr>
                                                    ))
                                                ) : (
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="12">
                                                            Data not found
                                                        </td>
                                                    </tr>
                                                )}

                                                {ledgerSummaryItemData?.length > 0 ?
                                                    <tr>
                                                        <td>
                                                            <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                                Total
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                                {totalQuantity}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                                {totalRate ? totalRate.toFixed(2) : '0.00'}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                                {totalTax ? totalTax.toFixed(2) : '0.00'}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                                {totalDiscount ? totalDiscount.toFixed(2) : '0.00'}
                                                            </h6>
                                                        </td>
                                                        <td>
                                                            <h6 className="text-[15px] font-semibold text-heading font-primary">
                                                                {totalAmount ? totalAmount.toFixed(2) : '0.00'}
                                                            </h6>
                                                        </td>
                                                    </tr>
                                                    : ''}
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductSaleReportList;
