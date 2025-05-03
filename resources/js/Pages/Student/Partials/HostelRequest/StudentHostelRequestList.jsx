import { Link, router, useForm } from '@inertiajs/react';
import { Button, Tooltip } from '@mui/material';
import React, { useState } from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';

const StudentHostelRequestList = ({ students, studentId, hostelRequests}) => {

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sn.</th>
                                        <th>Student</th>
                                        <th>Applied Date</th>
                                        <th>Start Date</th>
                                        <th>Note</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {hostelRequests?.length > 0 ?
                                        hostelRequests?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>
                                                    {item?.student?.first_name} {item?.student?.middle_name} {item?.student?.last_name}
                                                </td>
                                                <td>
                                                    {moment(item?.applied_date).format('YYYY-MM-DD')}
                                                </td>
                                                <td>
                                                    {moment(item?.start_date).format('YYYY-MM-DD')}
                                                </td>
                                                <td>
                                                    {item?.note}
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

export default StudentHostelRequestList;
