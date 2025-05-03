import React, { useEffect } from 'react';
import Loader from "@/Components/Loader";
import moment from "moment";

const InactiveBooksTableList = ({
    inactiveBookList = [],
    loading,
    setLoading,
}) => {

    useEffect(() => {
        setLoading(false);
    }, [inactiveBookList]);

    console.log('inactiveBookList', inactiveBookList);

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>AccNo</th>
                                        <th>Book Title</th>
                                        <th>Author</th>
                                        <th>Category</th>
                                        <th>W/D date</th>
                                        <th>W/D By</th>
                                        <th>Reason</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {inactiveBookList?.length > 0 ? (
                                            inactiveBookList?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>123456</td>
                                                    <td>{item?.book_item?.book_title}</td>
                                                    <td>{item?.book_item?.author}</td>
                                                    <td>{item?.book_item?.category?.title}</td>
                                                    <td>{moment(item?.damage_lost_date_at).format("DD-MMM-YYYY")}</td>
                                                    <td>{item?.book_item?.user?.username}</td>
                                                    <td>{item?.reason}</td>
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
        </>

    );
};

export default InactiveBooksTableList;
