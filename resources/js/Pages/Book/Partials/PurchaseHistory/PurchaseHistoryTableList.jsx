import React, { useEffect, useState } from 'react';
import { Tooltip } from '@mui/material';
import { Link } from '@inertiajs/react';
import Loader from "@/Components/Loader";
import PurchaseHistoryPopup from './PurchaseHistoryPopup';

const PurchaseHistoryTableList = ({
    bookPurchase = [],
    loading,
    setLoading,
}) => {

    const [listPopup, setListPopup] = useState(false);
    const [bookList, setBookList] = useState([]);

    const handleHistoryPopup = (e, bookList) => {
        e.preventDefault();
        setBookList(bookList);
        setListPopup(!listPopup);
    };

    useEffect(() => {
        setLoading(false);
    }, [bookPurchase]);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr.</th>
                                        <th>Bill No.</th>
                                        <th>Date</th>
                                        <th>Payment Mode</th>
                                        <th>Grace Total</th>
                                        <th>Tax</th>
                                        <th>Discount</th>
                                        <th>Grand Total</th>
                                        <th>Vendor</th>
                                        <th>Purchase By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>

                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {bookPurchase?.length > 0 ? (
                                            bookPurchase?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{++index}</td>
                                                    <td>{item?.bill_number}</td>
                                                    <td>{item?.purchase_date_at}</td>
                                                    <td>{item?.payment_mode}</td>
                                                    <td>{item?.grace_total_price}</td>
                                                    <td>{item?.tax_amount}</td>
                                                    <td>{item?.discount}</td>
                                                    <td>{item?.total}</td>
                                                    <td>{item?.vendor?.vendor_name}</td>
                                                    <td>{item?.purchase_by}</td>
                                                    <td>
                                                        <div className='educare-filter-action-btn'>
                                                            <Tooltip
                                                                title="Info"
                                                                placement="top"
                                                                arrow
                                                                as="button"
                                                            >
                                                                <button
                                                                    className="educare-gray-btn-md-fill"
                                                                    onClick={(e) => handleHistoryPopup(e, item?.purchase_books)}
                                                                >
                                                                    <i className="icon-info"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
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
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <PurchaseHistoryPopup
                listPopup={listPopup}
                setListPopup={setListPopup}
                bookList={bookList}
            />
        </>

    );
};

export default PurchaseHistoryTableList;
