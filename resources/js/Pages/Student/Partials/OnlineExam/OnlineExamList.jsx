import { Link, router, useForm } from '@inertiajs/react';
import { Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';

const OnlineExamList = ({ students, studentId, virtualExams }) => {
    
    const [attachmentModalOpen, setAttachmentModalOpen] = useState(false);
    const [attachmentData, setAttachmentData] = useState([]);
    // delete
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
                router.delete(route('homework.destroy', id));
            }
        });
    };

    const handleAttachmentsModel = (id, title, home_file) => {
        setAttachmentData({id, title, home_file});
        setAttachmentModalOpen(!attachmentModalOpen);
    }

    const handleAttemptedExam = (examId, studentId) => {
        if (!studentId) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Please select a student first!'
            });
            return;
        }
        
        router.get(route('student_online_exam.attempted_exam_take', {examId, studentId}));
    }

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Exam</th>
                                        <th>Subject</th>
                                        <th>Start Time</th>
                                        <th>End Time</th>
                                        <th>Exam Code</th>
                                        <th>Exam Mode</th>
                                        <th>Duration</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {virtualExams?.length > 0 ?
                                        virtualExams?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.title}</td>
                                                <td>{item?.subject?.title}</td>
                                                <td>
                                                    {item?.start_date + " " + item?.start_time }
                                                </td>
                                                <td>
                                                    {item?.end_date + " " + item?.end_time}
                                                </td>
                                                <td>
                                                    {item?.exam_code}
                                                </td>
                                                <td>
                                                    {item?.exam_mode}
                                                </td>
                                                <td>
                                                    {item?.duration_hour && `${item?.duration_hour}h`} {item?.duration_minute && `${item?.duration_minute}m`}
                                                </td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <Tooltip title="Attempted Exam" placement="top" arrow>
                                                            <button className="px-3 py-1.5 bg-indigo-800 text-white rounded hover:bg-indigo-600 transition flex items-center gap-1" 
                                                                onClick={() => handleAttemptedExam(item?.id, studentId)}
                                                                type='button'
                                                            >
                                                                Attempte Exam
                                                            </button>
                                                        </Tooltip>
                                                    </div>
                                                </td> 
                                            </tr>
                                        )) :
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
        </>
    );
};

export default OnlineExamList;
