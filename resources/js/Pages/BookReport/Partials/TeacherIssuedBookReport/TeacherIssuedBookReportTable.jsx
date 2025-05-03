import Loader from "@/Components/Loader";
import SelectInput from "@/Components/SelectInput";
import { concatName } from "@/Hooks/GlobalFunction";
import { router, useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";


const TeacherIssuedBookReportTable = ({
    teacherIssuesBook = [],
    teacherData = [],
}) => {
    const [loading, setLoading] = useState(false);
    const {
        data,
        setData,
    } = useForm({
        staff_id: "",
    });

    const handleTeacher = (e, staff_id) => {
        e.preventDefault();
        setData("staff_id", staff_id);
        router.post(route('book_report.teacher_issue_book'), { staff_id });
        setLoading(false);
    }

    useEffect(() => {
        setLoading(false);
    }, [teacherIssuesBook]);

    return (
        <>
            <form>
                <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                    <div className="educare-card-title pb-none">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Book issued report
                        </h5>
                    </div>
                    <div className="flex flex-wrap gap-2.5 items-center">
                        <div>
                            <span className="min-h-[30px] inline-block border px-4 leading-7 border-supportingA whitespace-nowrap rounded-2xl text-[14px] text-supportingA">
                                Total : {teacherIssuesBook?.length}
                            </span>
                        </div>

                        <div className="educare-input-field-styles">

                            <SelectInput
                                id="staff_id"
                                data_label="Teacher"
                                data={teacherData}
                                onChange={(e) => handleTeacher(e, e.target.value)}
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
                                <th>Acc no</th>
                                <th>Teacher Name</th>
                                <th>Book Title</th>
                                <th>Issued Date</th>
                                <th>Due Date</th>
                            </tr>
                        </thead>
                        {loading ? (
                            <Loader></Loader>
                        ) : (
                            <tbody>
                                {teacherIssuesBook?.length > 0 ? (
                                    teacherIssuesBook?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item?.book_acc_no?.acc_no}</td>
                                            <td>{concatName(item?.staff?.first_name, item?.staff?.middle_name, item?.staff?.last_name)}</td>
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
        </>
    );
};

export default TeacherIssuedBookReportTable;
