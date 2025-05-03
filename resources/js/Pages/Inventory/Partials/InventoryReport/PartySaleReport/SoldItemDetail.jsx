import Loader from "@/Components/Loader";
import { useEffect, useState } from "react";

const PendingItemDetail = ({
    paidSaleItem = [],
    loading,
    setLoading,
}) => {

    const [paidSaleItemData, setPaidSaleItemData] = useState(paidSaleItem);

    const totalRate = paidSaleItemData?.reduce((acc, curr) => acc + parseFloat(curr?.rate || 0), 0);
    const totalQuantity = paidSaleItemData?.reduce((acc, curr) => acc + parseFloat(curr?.quantity || 0), 0);
    const totalTax = paidSaleItemData?.reduce((acc, curr) => acc + parseFloat(curr?.tax_amount || 0), 0);
    const totalDiscount = paidSaleItemData?.reduce((acc, curr) => acc + parseFloat(curr?.discount_amount || 0), 0);
    const totalAmount = paidSaleItemData?.reduce((acc, curr) => acc + parseFloat(curr?.total_amount || 0), 0);

    useEffect(() => {
        setPaidSaleItemData(paidSaleItem)
        setLoading(false);
    }, [paidSaleItem]);

    return (
        <>
            <div className="educare-admission-list-area mb-5">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title">
                        <h5>
                            Sold Product Detail
                        </h5>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list pb-none">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Product</th>
                                        <th>Rate</th>
                                        <th>Qty.</th>
                                        <th>Tax</th>
                                        <th>Discount</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <>
                                        <tbody>
                                            {paidSaleItemData?.length > 0 ? (
                                                paidSaleItemData?.map((item, index) => (
                                                    <tr key={index}>
                                                        {/* <td>{item?.product?.title}</td> */}
                                                        <td>{item?.product_title}</td>
                                                        <td>{parseFloat(item.rate ?? 0)?.toFixed(2)}</td>
                                                        <td>{item.quantity ?? 1}</td>
                                                        <td>{parseFloat(item.tax_amount ?? 0)?.toFixed(2)}</td>
                                                        <td>{parseFloat(item.discount_amount ?? 0)?.toFixed(2)}</td>
                                                        <td>{parseFloat(item.total_amount ?? 0)?.toFixed(2)}</td>
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
                                        {paidSaleItemData?.length > 0 ? (
                                            <tfoot>
                                                <tr>
                                                    <td><h5 className='font-bold text-headingLight'>Total</h5></td>
                                                    <td><h5 className='font-bold text-headingLight'>{totalRate ? totalRate.toFixed(2) : '0.00'}</h5></td>
                                                    <td><h5 className='font-bold text-headingLight'>{totalQuantity.toFixed(2) ? totalQuantity.toFixed(2) : '0.00'}</h5></td>
                                                    <td><h5 className='font-bold text-headingLight'>{totalTax ? totalTax.toFixed(2) : '0.00'}</h5></td>
                                                    <td><h5 className='font-bold text-headingLight'>{totalDiscount ? totalDiscount.toFixed(2) : '0.00'}</h5></td>
                                                    <td><h5 className='font-bold text-headingLight'>{totalAmount ? totalAmount.toFixed(2) : '0.00'}</h5></td>
                                                </tr>
                                            </tfoot>
                                        ) : ''}
                                    </>
                                )}

                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PendingItemDetail;
