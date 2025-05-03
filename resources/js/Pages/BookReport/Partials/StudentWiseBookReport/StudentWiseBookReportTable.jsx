import React, { useEffect } from 'react';
import moment from "moment";
import Loader from "@/Components/Loader";

const StudentWiseBookReportTable = ({
    studentIssusBooks = [],
    loading,
    setLoading,
}) => {

    useEffect(() => {
        setLoading(false);
    }, [studentIssusBooks])

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Status</th>
                                        <th>Acc no</th>
                                        <th>Book Title</th>
                                        <th>Author</th>
                                        <th>Issued Date</th>
                                        <th>Due Date</th>
                                        <th>Return Date</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {studentIssusBooks?.length > 0 ? (
                                            studentIssusBooks?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        {
                                                            item?.book_return ?
                                                                (<span className="badge success">Returned</span>)
                                                                : (<span className="badge warning">Issued</span>)
                                                        }
                                                    </td>
                                                    <td>{item?.book_acc_no?.acc_no}</td>
                                                    <td>{item?.book_item?.book_title}</td>
                                                    <td>{item?.book_item?.author}</td>
                                                    <td>{moment(item?.issued_date_at).format("DD MMM, YYYY")}</td>
                                                    <td>{moment(item?.due_date_at).format("DD MMM, YYYY")}</td>
                                                    <td>{item?.book_return?.return_date_at && moment(item?.book_return?.return_date_at).format("DD MMM, YYYY")}</td>
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

export default StudentWiseBookReportTable;
