import { Link, router, useForm } from '@inertiajs/react';
import { Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';

const StudentAttendanceList = ({ students, studentId, monthlyReport }) => {

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

    const months = Object.keys(monthlyReport).filter(key => key !== 'summary');

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Month</th>
                                        <th>Working Day</th>
                                        <th>Present</th>
                                        <th>Absent</th>
                                        <th>Leave</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {months?.length > 0 ?
                                        months?.map((month, index) => (
                                            <tr key={index}>
                                                <td>{month}</td>
                                                <td></td>
                                                <td>{monthlyReport[month].present_days}</td>
                                                <td>{monthlyReport[month].absent_days}</td>
                                                <td>{monthlyReport[month].leave_days}</td>
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

export default StudentAttendanceList;
