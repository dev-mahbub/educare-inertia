import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { router, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import ContactEditPopupForm from "./AcademicYearEditPopupForm";
import DatePicker from "react-datepicker";
import Checkbox from "@/Components/Checkbox";
import moment from "moment";
import AcademicYearEditPopupForm from "./AcademicYearEditPopupForm";
import { useEffect } from "react";

export default function StudentIssueBookTable({ ebookList, issuedBookLists }) {

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(() => {
        const nextYearDate = new Date();
        nextYearDate.setFullYear(nextYearDate.getFullYear() + 1);
        return nextYearDate;
      });

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editData, setEditData] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        start_date_at: "",
        end_date_at: "",
        academic_session: "",
        display_order: "",
        is_copy_class: "",
        is_copy_admission_criteria: "",
    });

    useEffect(() => {
        if (startDate && endDate) {
            const startYear = moment(startDate).format("YYYY");
            const endYear = moment(endDate).format("YYYY");
            const academicSession = `${startYear}-${endYear}`;
            setData("academic_session", academicSession);
        }
    }, [startDate, endDate]);

    // update
    const handleEditPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };

    const handleFormData = (e) => {
        e.preventDefault();
        data.start_date_at = startDate;
        data.end_date_at = endDate;
        post(route("academic_year.save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setStartDate(new Date());
                setEndDate(new Date());
            }
        });
    };

    const issueDateWithIssueForDay = (issuedDate, issueForDay) => {
        if (issueForDay) {
            return moment(issuedDate).add(issueForDay, 'days').format("DD-MMM-YYYY");
        }
        return "-";
    }

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('academic_year.destroy', id));
            }
        });
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Issued / Returned books
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No</th>
                                            <th>Book Title</th>
                                            <th>Author</th>
                                            <th>Issue Date</th>
                                            <th>Due Date</th>
                                            <th>Return Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {issuedBookLists?.length > 0 ?
                                            issuedBookLists?.map((item, indx) => (
                                                <tr key={item?.id}>
                                                    <td>{item?.book_acc_no_id}</td>
                                                    <td>{item?.book_item?.book_title}</td>
                                                    <td>{item?.book_item?.author}</td>
                                                    <td>{moment(item?.book_item?.issued_date_at).format("DD-MMM-YYYY")}</td>
                                                    <td>{moment(item?.book_item?.due_date_at).format("DD-MMM-YYYY")}</td>
                                                    <td>
                                                        {issueDateWithIssueForDay(item?.issued_date_at, item?.issue_for_day)}
                                                    </td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Ebooks
                                    </h5>
                                </div>
                                <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Title</th>
                                            <th>Author</th>
                                            <th>File</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ebookList?.length > 0 ?
                                            ebookList?.map((item, indx) => (
                                                <tr key={item?.id}>
                                                    <td>{item?.book_title}</td>
                                                    <td>{item?.author}</td>
                                                    <td 
                                                        className="w-[200px] overflow-hidden"
                                                    >
                                                        <a href={item?.file?.path} target="_blank" className="text-blue-500">
                                                            {item?.document_name}
                                                        </a>
                                                    </td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AcademicYearEditPopupForm editPopupOpen={editPopupOpen} setEditPopupOpen={setEditPopupOpen} editData={editData}></AcademicYearEditPopupForm>
        </>
    );
}
