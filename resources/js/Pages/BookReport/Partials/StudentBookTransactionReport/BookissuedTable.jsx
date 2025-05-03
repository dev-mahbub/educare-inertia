import React from 'react';
import { concatName } from '@/Hooks/GlobalFunction';
import moment from 'moment';
import Loader from "@/Components/Loader";

const BookissuedTable = ({
    studentIssuesBooks = [],
    loading,
}) => {
    return (
        <div>
            <div className="educare-classroom-table-wrapper">
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-Notebook"></i>
                        Book issued to students
                        <span>
                            (Total : {studentIssuesBooks?.length})
                        </span>
                    </h5>
                </div>
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Student name</th>
                                <th>Acc No.</th>
                                <th>Book Title</th>
                                <th>Issued Date</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <Loader></Loader>
                        ) : (
                            <tbody>
                                {studentIssuesBooks?.length > 0 ? (
                                    studentIssuesBooks?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{concatName(item?.student?.first_name, item?.student?.middle_name, item?.student?.last_name)}</td>
                                            <td>{item?.book_acc_no?.acc_no}</td>
                                            <td>{item?.book_item?.book_title}</td>
                                            <td>{moment(item?.issued_date_at).format("DD MMM, YYYY")}</td>
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
    );
};

export default BookissuedTable;
