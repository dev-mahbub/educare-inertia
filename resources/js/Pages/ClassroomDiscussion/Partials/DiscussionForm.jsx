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

export default function DiscussionForm({
    class_discussion,
    subject_titles,
    subject_grades,
    topics,
    choices,
    classrooms,
    subjects,
    onlineTopics
}) {
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
        classroom_id: "",
        subject_id: "",
        topic_id: "",
        title: "",
        choice: "",
        // start_date_at: "",
        // end_date_at: "",
        description: "",
    });

    //handle classroom change start
    const handleClassroomChange = (id) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            subject_id: "",
            topic_id: ""
        }));

        const form_data = {
            classroom_id: id
        }

        router.post(route('classroom_discussion.list'), form_data);
    }
    //handle classroom change end

    //handle subject change start
    const handleSubjectChange = (id) => {
        setData((prevData) => ({
            ...prevData,
            subject_id: id,
            topic_id: ""
        }));

        const form_data = {
            classroom_id: data?.classroom_id,
            subject_id: id
        }

        router.post(route('classroom_discussion.list'), form_data);
    }
    //handle subject change end

    const handelInsertData = (e) => {
        e.preventDefault();
        // data.start_date_at = startDate;
        // data.end_date_at = endDate;
        post(route("classroom_discussion.save"), {
            preserveScroll: true,
            onSuccess: () => {
                setData((prevData) => ({
                    ...prevData,
                    topic_id: "",
                    title: "",
                    choice: "",
                    description: ""
                }));

                const form_data = {
                    classroom_id: data?.classroom_id,
                    subject_id: data?.subject_id
                }
                router.post(route('classroom_discussion.list'), form_data);

                // reset();
                // setStartDate(new Date());
                // setEndDate(new Date());
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
                router.delete(route('classroom_discussion.destroy', id), {
                    onSuccess: () => {
                        const form_data = {
                            classroom_id: data?.classroom_id,
                            subject_id: data?.subject_id
                        }
                        router.post(route('classroom_discussion.list'), form_data);
                    }
                });
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
                                                        value="Class"
                                                    />
                                                    <SelectInput
                                                        id="classroom_id"
                                                        data_label="Class"
                                                        data={classrooms}
                                                        value={data.classroom_id}
                                                        onChange={(e) =>
                                                            handleClassroomChange(e.target.value)
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                        required
                                                    />

                                                    <InputError
                                                        message={errors.classroom_id}
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
                                                        data={subjects}
                                                        value={data.subject_id}
                                                        onChange={(e) =>
                                                            handleSubjectChange(e.target.value)
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
                                                        data={onlineTopics}
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
                                            {/* <div className="col-span-12 hidden">
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
                                            </div> */}
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
                                                    <PrimaryButton
                                                        disabled={processing}
                                                        className="educare-gray-btn-md-fill"
                                                    >
                                                        Reset
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        disabled={processing}
                                                        className="educare-primary-btn-md-fill"
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
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="class-discussion-chatbox">
                                    {
                                        class_discussion.length > 0 ? (
                                            class_discussion.map((discussion, index) => <div key={index} className="chat-message">
                                                <div className="user-message-box">
                                                    <div>
                                                        <div className="message-info">
                                                            <span>{discussion.user.first_name + " " + discussion.user.middle_name + " " + discussion.user.last_name},</span>
                                                            <span>{discussion.title},</span>
                                                            <div className="flex items-center">
                                                                <i className="icon-ClockAfternoon mr-[2px]"></i>
                                                                <span>{discussion.discussion_date},</span>
                                                            </div>
                                                            <button
                                                                className="delete-text-btn"
                                                                onClick={() => handleDelete(discussion.id)}
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                                <span>Delete</span>
                                                            </button>
                                                        </div>
                                                        <div className="message-box">
                                                            <p>{discussion.description}</p>
                                                        </div>
                                                    </div>
                                                    {
                                                        discussion.user.profile_image ? (
                                                            <div className="message-user-logo">
                                                                <img src={discussion.user.profile_image} alt="" />
                                                            </div>
                                                        ) : (
                                                            <div className="message-user-logo">
                                                                <img src="../../../../images/user/person.png" alt="" />
                                                            </div>
                                                        )
                                                    }

                                                </div>
                                            </div>)
                                        ) :
                                            <div className="educare-input-field-notes note-danger my-2">
                                                <ul>
                                                    <li>Class discussion is not started yet.Post your question and started duscussing with class</li>
                                                </ul>
                                            </div>
                                    }
                                </div>
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