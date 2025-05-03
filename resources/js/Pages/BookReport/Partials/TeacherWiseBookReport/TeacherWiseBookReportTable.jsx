import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { concatName } from "@/Hooks/GlobalFunction";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment";
import React from "react";

const TeacherWiseBookReportTable = ({
    teacherBookReport = [],
    teacherData = [],
}) => {
    const {
        data,
        setData
    } = useForm({
        staff_id: "",
    });

    const handleStaff = (e, id) => {
        e.preventDefault();
        setData("staff_id", id);
        router.post(route('book_report.teacher_wise_book'), { staff_id: id });
    }

    console.log('teacherBookReport', teacherBookReport);

    return (
        <>
            <form>
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            TEACHER WISE BOOK REPORT
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div>
                            <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                                Total : {teacherBookReport?.length}
                            </span>
                        </div>

                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="staff_id"
                                data_label="teacher"
                                data={teacherData}
                                value={data.staff_id}
                                onChange={(e) => handleStaff(e, e.target.value)}
                                className="block"
                            />
                        </div>
                    </div>
                </div>
            </form>

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
                        <tbody>
                            {teacherBookReport?.length > 0 ? (
                                teacherBookReport?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            {
                                                item?.book_return
                                                    ?
                                                    <span className="badge success">
                                                        Returned
                                                    </span>
                                                    :
                                                    <span className="badge warning">
                                                        Issued
                                                    </span>
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
                        {/* <tbody>
                            <tr>
                                <td>
                                    <span className="badge warning">
                                        Overdue
                                    </span>
                                </td>
                                <td>The Great Gatsby</td>
                                <td>F. Scott Fitzgerald</td>
                                <td>2023-12-01</td>
                                <td>2024-01-15</td>
                                <td>2024-01-10</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="badge warning">
                                        Overdue
                                    </span>
                                </td>
                                <td>002</td>
                                <td>To Kill a Mockingbird</td>
                                <td>Harper Lee</td>
                                <td>2023-11-15</td>
                                <td>2024-01-05</td>
                                <td>-</td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="badge warning">
                                        Issued
                                    </span>
                                </td>

                                <td>003</td>
                                <td>1984</td>
                                <td>George Orwell</td>
                                <td>2024-01-02</td>
                                <td>2024-02-01</td>
                                <td>-</td>
                            </tr>
                        </tbody> */}
                    </table>
                </div>
            </div >
        </>
    );
};

export default TeacherWiseBookReportTable;
