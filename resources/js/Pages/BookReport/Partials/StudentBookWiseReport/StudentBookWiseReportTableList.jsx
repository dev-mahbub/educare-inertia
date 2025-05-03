import { concatName } from '@/Hooks/GlobalFunction';
import moment from 'moment';
import React from 'react';
import Loader from "@/Components/Loader";

const StudentBookWiseReportTableList = ({
    studentBooks = [],
    loading,
}) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Acc no</th>
                                        <th>Class</th>
                                        <th>Roll Number</th>
                                        <th>Student Name</th>
                                        <th>Book Title</th>
                                        <th>Issued Date</th>
                                        <th>Due Date</th>
                                    </tr>
                                </thead>
                                {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {studentBooks?.length > 0 ? (
                                            studentBooks?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.book_acc_no?.acc_no}</td>
                                                    <td>{item?.student?.classroom?.title}</td>
                                                    <td>{item?.student?.classroom_roll?.roll_no}</td>
                                                    <td>{concatName(item?.student?.first_name, item?.student?.middle_name, item?.student?.last_name)}</td>
                                                    <td>{item?.book_item?.book_title}</td>
                                                    <td>{moment(item?.issued_date_at).format("DD MMM, YYYY")}</td>
                                                    <td>{moment(item?.due_date_at).format("DD MMM, YYYY")}</td>
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

export default StudentBookWiseReportTableList;
