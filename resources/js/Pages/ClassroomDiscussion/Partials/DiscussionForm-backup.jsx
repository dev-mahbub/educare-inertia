import React, { useRef } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import { useState } from "react";
import TextareaInput from "@/Components/TextareaInput";
import SelectInput from "@/Components/SelectInput";
import SecondaryButton from "@/Components/SecondaryButton";
import moment from 'moment';
import Swal from "sweetalert2";
import DiscussionEditPopupForm from "./DiscussionEditPopupForm";

export default function DiscussionForm({ class_discussion, subject_titles, subject_grades, topics, choices }) {

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editData, setEditData] = useState([]);

    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        subject_id: "",
        topic_id: "",
        title: "",
        grade: "",
        choice: "",
        start_date_at: "",
        end_date_at: "",
        description: "",
    });

    const handelInsertData = (e) => {
        e.preventDefault();
        data.start_date_at = startDate;
        data.end_date_at = endDate;
        post(route("classroom_discussion.save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setStartDate(new Date());
                setEndDate(new Date());
            }
        });
    };

    // update
    const handleEditPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };

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
                router.delete(route('classroom_discussion.destroy', id));
            }
        });
    }


    return (
        <>
            <div className="educare-master-create-shift-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-12 xl:col-span-5 col-span-12">
                        <div className="educare-master-create-shift-form">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-create-school-form-wrapper-border bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handelInsertData}>
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="grade"
                                                        value="Grade"
                                                    />
                                                    <SelectInput
                                                        id="grade"
                                                        data_label="Grade"
                                                        data={subject_grades}
                                                        value={data.grade}
                                                        onChange={(e) =>
                                                            setData(
                                                                "grade",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        required
                                                    />

                                                    <InputError
                                                        message={errors.grade}
                                                        className="mt-2"
                                                    />

                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="subject_id"
                                                        value="Subject"
                                                    />
                                                    <SelectInput
                                                        id="subject_id"
                                                        data_label="Subject"
                                                        data={subject_titles}
                                                        value={data.subject_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "subject_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        required
                                                    />

                                                    <InputError
                                                        message={errors.subject_id}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="choice"
                                                        value="Choice"
                                                    />
                                                    <SelectInput
                                                        id="choice"
                                                        data_label="Choice"
                                                        data={choices}
                                                        value={data.choice}
                                                        onChange={(e) =>
                                                            setData(
                                                                "choice",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.choice
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="topic_id"
                                                        value="Topic"
                                                    />
                                                    <SelectInput
                                                        id="topic_id"
                                                        data_label="Topic"
                                                        data={topics}
                                                        value={data.topic_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "topic_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.topic_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 hidden">
                                                <div className="educare-button-field-styles warning-button-styles flex items-end min-h-full">
                                                    <SecondaryButton className="focus:ring-supportingB">
                                                        Find Questions
                                                    </SecondaryButton>
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="start_date_at"
                                                        value="Start Date"
                                                    />
                                                    <DatePicker
                                                        id="start_date_at"
                                                        selected={startDate}
                                                        onChange={(date) =>
                                                            setStartDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Start Date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxLg:col-span-6 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="end_date_at"
                                                        value="End Date"
                                                    />
                                                    <DatePicker
                                                        id="end_date_at"
                                                        selected={endDate}
                                                        onChange={(date) =>
                                                            setEndDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="End Date"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 hidden">
                                                <div className="educare-button-field-styles secondary-button-styles flex items-end min-h-full">
                                                    <SecondaryButton className="focus:ring-supportingA">
                                                        Get Asked Question
                                                    </SecondaryButton>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="title"
                                                        value="Discussion Topic"
                                                    />
                                                    <TextInput
                                                        id="title"
                                                        value={data.title}
                                                        onChange={(e) =>
                                                            setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="block"
                                                        placeHolder="Write your topic"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="description"
                                                        value="Discussion Description"
                                                    />
                                                    <TextareaInput
                                                        id="description"
                                                        value={
                                                            data.description
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        placeholder="Write your description"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end">
                                                    <SecondaryButton
                                                        disabled={processing}
                                                        className="educare-warning-btn-fill"
                                                    >
                                                        Reset
                                                    </SecondaryButton>
                                                    <PrimaryButton
                                                        disabled={processing}
                                                        className="educare-educare-primary-btn-fill"
                                                    >
                                                        Post
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-12 xl:col-span-7 col-span-12">
                        <div className="beducare-master-create-shift-table-wrapper">
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Topic</th>
                                            <th>Date</th>
                                            <th>Discussion</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {class_discussion?.length ?
                                            class_discussion?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.id}</td>
                                                    <td>{item?.title}</td>
                                                    <td>
                                                        {moment(item?.start_date_at).format("MMM DD, YYYY")}
                                                        {' -> '}
                                                        {moment(item?.end_date_at).format("MMM DD, YYYY")}
                                                    </td>
                                                    <td>{item?.description.length > 50 ? item?.description.slice(0, 50) + '...' : item?.description}</td>
                                                    <td>
                                                        <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton onClick={(e) => handleEditPopup(item)} className="bg-warning/80 ">
                                                                    <i className="icon-pen"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton onClick={() => handleDelete(item.id)} className="bg-danger/80 ">
                                                                    <i className="icon-TrashSimple"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="8">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <DiscussionEditPopupForm
                editPopupOpen={editPopupOpen}
                setEditPopupOpen={setEditPopupOpen}
                editData={editData}
                class_discussion={class_discussion}
                subject_titles={subject_titles}
                subject_grades={subject_grades}
                topics={topics}
                choices={choices}
            >

            </DiscussionEditPopupForm>

        </>
    );
}