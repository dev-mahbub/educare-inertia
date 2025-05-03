import React, { useState } from 'react';
import TextareaInput from '@/Components/TextareaInput';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import SuccessButton from '@/Components/SuccessButton';
import Swal from 'sweetalert2';
import moment from "moment";

const Activity = ({ assessment, students, classworkTypes, comments }) => {
    const studentsData = students;
    const [hideDesc, setHideDesc] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        asses_desc: assessment?.description,
        classwork_id: assessment?.id,
        file: "download file",
        enter_mark: "",
        enter_mark_desc: "",
        mark_file: "",
        select_status: "",
        current_student_id: "",
        assessment_status: "",
        commented_by: 1,
    });

    //handle display description
    const handleHideDesc = () => {
        setHideDesc(!hideDesc)
    }
    const [showEnterMarks, setShowEnterMarks] = useState(true);
    const [showEnterDetail, setShowEnterDetail] = useState(true);
    const [activeRow, setActiveRow] = useState('');
    //handle handle Enter Marks
    const handleEnterMark = (markId) => {
        setShowEnterMarks(true);
        setShowEnterDetail(false);
        const rowData = studentsData.find(student => student.id === markId);
        setActiveRow(rowData);
        setData({
            ...data,
            enter_mark: rowData?.student_assessment?.map((mark) => mark.mark) ?? '',
            current_student_id: markId
        });
    }

    //handle handle Enter Details 
    const handleDetailStudent = (detailId) => {
        setShowEnterDetail(true);
        setShowEnterMarks(false);
        const rowData = studentsData.find(student => student.id === detailId);
        setActiveRow(rowData);
        setData({
            ...data,
            enter_mark: rowData?.student_assessment?.map((mark) => mark.mark) ?? '',
            current_student_id: detailId
        });

        router.post(route('classwork.activity', { id: assessment.id }), { current_student_id: detailId });
    }

    //handle store marks
    const handleMarkStore = (e) => {
        e.preventDefault();
        post(route('assessment.activity.mark.save'), data);
    }

    const handleCommentsStore = (e) => {
        e.preventDefault();
        post(route('classwork.activity.comment.save'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            },
            onError: () => {
                console.log(errors);
            }
        });
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
                router.delete(route('classwork.activity.delete', id));
            }
        });
    }

    return (
        <div className='educare-common-card'>
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title mb-5">
                    <h5>Classwork Instructions</h5>
                </div>
                <div className='educare-common-card'>
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <h3 className='text-headingLight font-semibold text-[16px] mb-2'>
                            <i className='icon-Notepad text-[20px] mr-1'></i>
                            {assessment?.title}
                        </h3>
                        <div className='assesment-activity flex justify-between gap-0 sm:gap-5 flex-wrap'>
                            <div className='assesment-acitvity-info'>
                            <p>Created By: <span>{`${assessment?.user?.first_name ?? ''} ${assessment?.user?.middle_name ?? ''} ${assessment?.user?.last_name ?? ''}`}</span></p>
                                <p>Classwork Type: <span> {assessment?.type}</span></p>
                            </div>
                            <div className='assesment-acitvity-info'>
                                <p>Assignment Date: <span> {assessment?.start_date_at}</span></p>
                                <p>Submission Date: <span> {assessment?.end_date_at}</span></p>
                                <p>Subject: <span> {assessment?.subject?.title}</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-12">
                        <div className='flex justify-end mb-2'>
                            <button
                                onClick={handleHideDesc}
                                className='text-info font-semibold underline'
                            >
                                {
                                    hideDesc ? 'Show' : 'Hide'
                                }
                            </button>
                        </div>
                        {
                            !hideDesc ? (
                                <div className="educare-input-field-styles">
                                    <TextareaInput
                                        value={
                                            data.asses_desc
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "asses_desc",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.asses_desc
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            ) : ''
                        }
                    </div>
                    {assessment?.ass_file && (
                        <div className="col-span-6">
                            <div className='flex items-center mb-7 mt-2'>
                                <div className='educare-filter-action-btn'>
                                    <div>
                                        <Tooltip
                                            title="Download File"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <Link
                                                href="#"
                                                className="educare-gray-btn-md-fill"
                                            >
                                                <i className="icon-FileText"></i>
                                            </Link>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className='border border-border rounded-md px-3 py-[7px]  min-w-[220px] max-w-[600px] w-[100%] h-[38px] overflow-hidden'>
                                    <Link href={assessment?.ass_file}>
                                        <p className='text-headingLight text-[15px] hover:text-info'>
                                            {assessment?.ass_file}
                                        </p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <div className='flex justify-center'>
                        <div className="educare-common-card-title mb-2 mt-3">
                            <h5>
                                Click link- "Details" for Progress Report of a student
                            </h5>
                        </div>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list bg-slate-200 pb-none max-h-[400px] overflow-y-scroll">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            Adm No.
                                        </th>
                                        <th>Roll No.</th>
                                        <th>Student</th>
                                        <th>Status</th>
                                        <th>Last Comment</th>
                                        <th>Review Progress</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        studentsData.length > 0 ? (
                                            studentsData.map((student, index) => <tr key={index} className={activeRow?.id === student.id ? 'bg-supportingA/40' : 'bg-transparent'}>
                                                <td>{index + 1}</td>
                                                <td>{student.classroom_roll?.roll_no}</td>
                                                <td>
                                                    <button
                                                        className='text-info hover:underline'
                                                        onClick={() => handleEnterMark(student.id)}
                                                    >
                                                        {student.first_name + ' ' + student.middle_name + ' ' + student.last_name}
                                                    </button>
                                                </td>
                                                <td>{student?.classwork_student_assessment_comment?.assessment_status ?? 'InProgress'}</td>
                                                <td>{student?.classwork_student_assessment_comment?.comment}</td>
                                                <td>
                                                    <button
                                                        className='text-info hover:underline'
                                                        onClick={() => handleDetailStudent(student.id)}
                                                    >
                                                        Details
                                                    </button>
                                                </td>
                                            </tr>)
                                        ) : <tr>
                                            <td colSpan={7} className='text-center'>Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {
                    (showEnterMarks || showEnterDetail) && (
                        <div>
                            
                            <div className='mt-2'>
                                <div className="educare-common-card-title mt-7">
                                    <h5>
                                        Attach Your File
                                    </h5>
                                </div>
                                <form onSubmit={handleCommentsStore}>
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    data_label="Status"
                                                    data={classworkTypes}
                                                    value={
                                                        data.select_status
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "select_status",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.select_status
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-type-file-styles">
                                                    <input
                                                        id="mark_file"
                                                        type="file"
                                                        name="mark_file"
                                                        onChange={(e) =>
                                                            setData(
                                                                "mark_file",
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-span-12 lg:col-span-4'>
                                            <div className='flex gap-2'>
                                                <SuccessButton
                                                    // disabled={processing}
                                                    className="educare-secondary-btn-md-fill"
                                                >
                                                    Browse
                                                </SuccessButton>
                                                <PrimaryButton
                                                    // disabled={processing}
                                                    className="educare-primary-btn-md-fill"
                                                >
                                                    Post
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <TextareaInput
                                                    id="enter_mark_desc"
                                                    value={
                                                        data.enter_mark_desc
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "enter_mark_desc",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                    placeholder="Enter your comments"
                                                />
                                                <InputError
                                                    message={
                                                        errors.enter_mark_desc
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )

                }

                {
                    showEnterDetail && (
                        <div className='mt-[40px]'>
                            <div className="activity-chatbox">
                                {comments?.map((comment, index) => (
                                    <div className="chat-message user-message" key={index}>
                                        <div className="user-activity-message-box">
                                            <div className="activity-message-info">
                                                <div className='flex items-center gap-2 px-5'>
                                                    <div className="flex items-center">
                                                        <i className="icon-ClockAfternoon mr-[2px]"></i>
                                                        <span>
                                                            {moment(comment.created_at).format('MMM DD, hh:mm A')}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="message-box relative">
                                                <p>{comment.comment}</p>
                                                <div className='absolute top-[13px] right-[15px]'>
                                                    <div className='educare-list-action-btn'>
                                                        <button
                                                            onClick={() => handleDelete(comment.id)}
                                                        >
                                                            <i className="icon-XCircle text-[22px]"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Activity;