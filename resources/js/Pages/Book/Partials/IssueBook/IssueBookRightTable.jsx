import InputError from "@/Components/InputError";
import DatePicker from "react-datepicker";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import React, { useEffect } from "react";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import moment from "moment";

const IssueBookRightTable = ({
    activeBookData = [],
    bookTypeUser = [],
    classrooms = [],
    students = [],
    teacherData = [],
    bookListData = [],
    issueBookList = [],
}) => {
    const [filterStudentData, setFilterStudentData] = useState([]);
    const [issueStudentTeacherData, setIssueStudentTeacherData] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        book_item_id: activeBookData?.id,
        book_acc_no_id: "",
        book_title: activeBookData?.book_title,
        acc_no: "",
        issued_date_at: new Date(),
        issue_for_day: "",
        book_user_type: "",
        admission_no: "",
        classroom_id: "",
        student_id: "",
        staff_id: "",
    });

    const handleSelectedAccNo = (e, id, accNo, is_available) => {
        e.preventDefault();
        if (is_available === 1) {
            setData({
                ...data,
                book_acc_no_id: id,
                acc_no: accNo,
            })
        }
    }

    const handleClassroom = (e, id) => {
        e.preventDefault();
        setData({
            ...data,
            classroom_id: id,
        });
        const filteredStudent = students?.filter(item => item.classroom_id == id);
        setFilterStudentData(filteredStudent);
    }

    const handleAdmissionNo = (e, id) => {
        e.preventDefault();
        const admissionNo = filterStudentData?.find(item => item?.id == id);
        setData({
            ...data,
            student_id: id,
            admission_no: admissionNo?.admission_no,
        });

        const issueStudentBook = issueBookList?.filter(item => item?.student_id == id);
        setIssueStudentTeacherData(issueStudentBook);
    }

    const handleTeacher = (id) => {
        const issueTeacherBook = issueBookList?.filter(item => item?.staff_id == id);
        setIssueStudentTeacherData(issueTeacherBook);
    }

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("book.issue_save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    useEffect(() => {
        setData({
            ...data,
            book_item_id: activeBookData?.id,
            book_acc_no_id: "",
            book_title: activeBookData?.book_title,
            acc_no: "",
            issued_date_at: new Date(),
            issue_for_day: "",
            book_user_type: "Student",
            admission_no: "",
            classroom_id: "",
            student_id: "",
            staff_id: "",
        });
        setIssueStudentTeacherData([]);
    }, [activeBookData, bookListData]);

    return (
        <>
            {
                activeBookData?.id ? (
                    <>
                        <form onSubmit={handleFormDataInsert}>
                            <div className="educare-common-card">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-BookBookmark"></i>
                                        Issue Book
                                    </h5>
                                </div>
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-common-card-wrap-border">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-5 maxXs:flex-wrap">
                                                    <div className="educare-input-field-styles maxXs:w-full">
                                                        <TextInput
                                                            id="book_title"
                                                            value={data.book_title}
                                                            placeHolder="Book title"
                                                            disabled={true}
                                                            className="block disabled"
                                                        />
                                                        <InputError
                                                            message={errors.book_title}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    {
                                                        data?.book_acc_no_id ? <button type="submit" disabled={processing} className="transition ease-in-out duration-150 undefined educare-success-btn-md-stroke">
                                                            Allocate Book
                                                        </button> : ''
                                                    }

                                                </div>

                                            </div>
                                            <div className="col-span-12  md:col-span-6 xl:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        value="Acc no"
                                                    />
                                                    <TextInput
                                                        value={data?.acc_no}
                                                        placeHolder="Acc no"
                                                        disabled={true}
                                                        className="block disabled"
                                                    />
                                                    <InputError
                                                        message={errors.acc_no}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12  md:col-span-6 xl:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        value="Date"
                                                    />
                                                    <DatePicker
                                                        selected={
                                                            data?.issued_date_at
                                                            && new Date(data?.issued_date_at)
                                                        }
                                                        onChange={(date) =>
                                                            setData("issued_date_at", date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="End date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12  md:col-span-6 xl:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        value="Issue For Day"
                                                    />
                                                    <TextInput
                                                        id="issue_for_day"
                                                        value={data.issue_for_day}
                                                        placeHolder="Issue For Day"
                                                        onChange={(e) =>
                                                            setData(
                                                                "issue_for_day",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                        required
                                                    />
                                                    <InputError
                                                        message={errors.issue_for_day}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12  md:col-span-6 xl:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        value="User"
                                                    />
                                                    <SelectInput
                                                        data_label="User Type"
                                                        data={bookTypeUser}
                                                        value={data.book_user_type}
                                                        onChange={(e) =>
                                                            setData({
                                                                ...data,
                                                                book_user_type: e.target.value,
                                                                staff_id: "",
                                                                classroom_id: "",
                                                                student_id: "",
                                                                admission_no: "",
                                                            })
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.book_user_type}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {
                                                data.book_user_type === "Teacher" ? (
                                                    <div className="col-span-6  md:col-span-6 xl:col-span-4">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                value="Teacher"
                                                            />
                                                            <SelectInput
                                                                data_label="Teacher"
                                                                data={teacherData}
                                                                value={data.staff_id}
                                                                onChange={(e) => {
                                                                    handleTeacher(e.target.value);
                                                                    setData(
                                                                        "staff_id",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={errors.staff_id}
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                ) : ""
                                            }
                                        </div>

                                        {
                                            data.book_user_type === "Student" ? (
                                                <div className="grid grid-cols-12 gap-5 mt-5">
                                                    <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="admission_no"
                                                                value="Adm.Number"
                                                            />
                                                            <TextInput
                                                                id="admission_no"
                                                                value={data.admission_no}
                                                                placeHolder="Admission no"
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "admission_no",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={errors.admission_no}
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="classroom_id"
                                                                value="Class"
                                                            />
                                                            <SelectInput
                                                                id="classroom_id"
                                                                data_label="Class"
                                                                data={classrooms}
                                                                onClick={(e) => handleClassroom(e, e.target.value)}
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={errors.classroom_id}
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-span-12  md:col-span-6 xl:col-span-4 ">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="student_id"
                                                                value="Student"
                                                            />
                                                            <SelectInput
                                                                id="student_id"
                                                                data_label="Student"
                                                                data={filterStudentData}
                                                                onChange={(e) => handleAdmissionNo(e, e.target.value)}
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={errors.student_id}
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : ""
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        Select Acc no for book issue
                                    </h5>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Acc no</th>
                                            <th>Is Available ?</th>
                                            <th>Is Allocated ?</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {activeBookData?.active_book_acc_nos?.length > 0 ? (
                                            activeBookData?.active_book_acc_nos?.map((item, index) => (
                                                <tr className={data?.book_acc_no_id === item?.book_acc_no_id ? 'educare-table-row-active' : ''} key={index}>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            disabled={item?.is_available === 0}
                                                            className={`font-semibold ${item?.is_available === 0 ? 'cursor-not-allowed' : 'text-primary'} `}
                                                            onClick={(e) => handleSelectedAccNo(e, item?.book_acc_no_id, item?.acc_no, item?.is_available)}
                                                        >
                                                            {item?.acc_no}
                                                        </button>
                                                    </td>
                                                    <td>
                                                        {
                                                            item?.is_available === 1 ?
                                                                (<span className="badge success">Available</span>)
                                                                : (<span className="badge warning">Issued</span>)
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            item?.is_allocated === 1 ?
                                                                (<span className="badge success">Yes</span>)
                                                                : (<span className="badge warning">No</span>)
                                                        }
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
                                        {/* {
                                        sampleData?.map((item, index) =>
                                            <tr key={index}>
                                                <td colSpan={2}>
                                                    <button
                                                        type="button"
                                                        className="font-semibold text-primary"
                                                        onClick={() => handleGetRowData(index)}
                                                    >
                                                        {item?.accno}
                                                    </button>
                                                </td>
                                                <td>
                                                    {
                                                        item?.isAvialable === "Available" ?
                                                            (<span className="badge success">{item?.isAvialable}</span>)
                                                            : (<span className="badge warning">{item?.isAvialable}</span>)
                                                    }
                                                </td>
                                                <td>{item?.isAllocated}</td>
                                            </tr>)
                                    } */}
                                    </tbody>
                                </table>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <div className="educare-common-card-title">
                                    <h5>
                                        Already Issued Books
                                    </h5>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Acc no</th>
                                            <th>Book Title</th>
                                            <th>Issued Date</th>
                                            <th>Due Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {issueStudentTeacherData?.length > 0 ? (
                                            issueStudentTeacherData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.book_acc_no?.acc_no}</td>
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
                                </table>
                            </div>
                        </form>
                    </>
                ) : ""
            }
        </>
    );
};

export default IssueBookRightTable;
