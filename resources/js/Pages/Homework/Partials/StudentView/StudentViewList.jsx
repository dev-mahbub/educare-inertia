import { Link, router, useForm } from '@inertiajs/react';
import { Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';
import AttachmentsPopup from './AttachmentsPopup';

const StudentViewList = ({ students, studentId, homeWorks }) => {

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

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Id</th>
                                        <th>Subject</th>
                                        <th>Homework</th>
                                        <th>Assigned</th>
                                        <th>Submission</th>
                                        <th>Assignment date</th>
                                        <th>Submission date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {homeWorks?.length > 0 ?
                                        homeWorks?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index += 1}</td>
                                                <td>{item?.subject?.title}</td>
                                                <td>{item?.title}</td>
                                                <td>{item?.assigned_to_class ? <span className='badge info'>Assigned</span>  : <span className='badge warning'>Not assigned</span> }</td>
                                                <td>{item?.allow_submission ? <span className='badge info'>submission</span>  : <span className='badge warning'>Not submission</span> }</td>
                                                <td>{moment(item?.start_date_at).format("DD MMM, YYYY")}</td>
                                                <td>{moment(item?.end_date_at).format("DD MMM, YYYY")}</td>
                                                <td>
                                                    <div className="flex gap-2">
                                                        <Tooltip title="Download Attachments" placement="top" arrow>
                                                            <button className="px-3 py-1.5 bg-indigo-800 text-white rounded hover:bg-indigo-600 transition flex items-center gap-1" 
                                                                onClick={() => handleAttachmentsModel(item?.id, item?.title, item?.home_file)}
                                                                type='button'
                                                            >
                                                                <i className="icon-DownloadSimple"></i>
                                                                Download Attachments
                                                            </button>
                                                        </Tooltip>
                                                        <Tooltip title="Submit Your Work" placement="top" arrow>
                                                            <Link 
                                                                href={route('student.homework.show', { student_id: studentId, homework_id: item?.id })} 
                                                                className="px-3 py-1.5 bg-green-500 text-white rounded hover:bg-green-600 transition" 
                                                            >
                                                                Submit Work
                                                            </Link>
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
            <AttachmentsPopup 
                attachmentModalOpen={attachmentModalOpen}
                setAttachmentModalOpen={setAttachmentModalOpen}
                attachmentData={attachmentData}
                homeWorks={homeWorks}
            />
        </>
    );
};

export default StudentViewList;
