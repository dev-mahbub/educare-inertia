import Loader from '@/Components/Loader';
import { Tooltip } from '@mui/material';
import moment from 'moment/moment';
import React, { useEffect, useState } from 'react';

const PaidSales = ({
    paidSale = [],
    loading,
    setLoading,
    params
}) => {

    const [paidSaleData, setPaidSaleData] = useState(paidSale);
    const [enqInnerActive, setEnqInnerActive] = useState('');

    const amountTotal = paidSaleData?.reduce((acc, curr) => acc + parseFloat(curr?.total || 0), 0);
    const paidTotal = paidSaleData?.reduce((acc, curr) => acc + parseFloat(curr?.paid_amount || 0), 0);
    const dueTotal = paidSaleData?.reduce((acc, curr) => acc + parseFloat(curr?.due_amount || 0), 0);

    useEffect(() => {
        setPaidSaleData(paidSale)
        setLoading(false);
    }, [paidSale]);


    return (
        <>
            <div className="flex justify-between mt-5">
                <div className="educare-card-title">
                    <h5>
                        Paid Sales
                    </h5>
                </div>
                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                    {paidSaleData?.length > 0 &&
                        <div>
                            <Tooltip
                                title="PDF"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <a
                                    href={route('pdf_account.party_wise_sale_report', {sale_type: 'paid', ...params})}
                                    target='_blank'
                                    className="educare-warning-btn-md-fill"
                                >
                                    <i className="icon-FilePdf"></i>
                                </a>
                            </Tooltip>
                        </div>
                    }
                </div>
            </div>
            <div className="educare-admission-list-area mt-2.5">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form>
                            <div className="educare-admission-list pb-none">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sr.</th>
                                            <th>Title</th>
                                            <th>Total</th>
                                            <th>Paid</th>
                                            <th>Due</th>
                                        </tr>
                                    </thead>
                                    {loading ? (
                                        <Loader></Loader>
                                    ) : (
                                    <tbody>
                                        {paidSaleData?.length > 0 ? (
                                            paidSaleData?.map((item, index) => (
                                                <React.Fragment>
                                                    <tr key={index}>
                                                        <td>
                                                            {++index}
                                                            <button
                                                                type="button"
                                                                className="educare-enq-arrow"
                                                                onClick={() => setEnqInnerActive(enqInnerActive === index ? '' : index)}
                                                            >
                                                                <i className={enqInnerActive === index ? "icon-arrow-up" : "icon-down-arrow"}></i>
                                                            </button>
                                                        </td>
                                                        <td>Sale, Recept No - {item?.receipt_no}, {moment(item?.sale_date_at).format("DD-MMM-YYYY")}</td>
                                                        <td>{parseFloat(item?.total ?? 0)?.toFixed(2)}</td>
                                                        <td>{parseFloat(item?.paid_amount ?? 0)?.toFixed(2)}</td>
                                                        <td>{parseFloat(item?.due_amount ?? 0)?.toFixed(2)}</td>
                                                    </tr>
                                                    <tr
                                                        className={enqInnerActive === index ? '' : 'hidden'}
                                                    >
                                                        <td colSpan="5" className="educare-admission-list-enq-inner-wrap">
                                                            <table className="educare-admission-list-enq-inner">
                                                                <thead>
                                                                    <tr>
                                                                        <th colSpan="1">Product name</th>
                                                                        <th>Rate</th>
                                                                        <th>Quantity</th>
                                                                        <th>Tax amount</th>
                                                                        <th>Discount</th>
                                                                        <th>Amount</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item?.sale_ledger_products?.length > 0 ? (
                                                                        item?.sale_ledger_products.map((productItem, subIndex) => (
                                                                            <>
                                                                                <tr key={subIndex}>
                                                                                    <td colSpan="1">{productItem?.product?.title}</td>
                                                                                    <td>{parseFloat(productItem.rate ?? 0)?.toFixed(2)}</td>
                                                                                    <td>{productItem.quantity ?? 1}</td>
                                                                                    <td>{parseFloat(productItem.tax_amount ?? 0)?.toFixed(2)}</td>
                                                                                    <td>{parseFloat(productItem.discount_amount ?? 0)?.toFixed(2)}</td>
                                                                                    <td>{parseFloat(productItem.total_amount ?? 0)?.toFixed(2)}</td>
                                                                                </tr>
                                                                            </>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="10">No product items found</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="12">
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                        {paidSaleData?.length > 0 ? <tr>
                                            <td></td>
                                            <td>
                                                <h5 className='font-bold text-headingLight'>Total</h5>
                                            </td>
                                            <td>
                                                <h5 className='font-bold text-headingLight'>{amountTotal ? amountTotal?.toFixed(2) : '0.00'}</h5>
                                            </td>
                                            <td>
                                                <h5 className='font-bold text-headingLight'>{paidTotal ? paidTotal?.toFixed(2) : '0.00'}</h5>
                                            </td>
                                            <td>
                                                <h5 className='font-bold text-headingLight'>{dueTotal ? dueTotal?.toFixed(2) : '0.00'}</h5>
                                            </td>
                                        </tr> : ''}
                                    </tbody>
                                    )}
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaidSales;
