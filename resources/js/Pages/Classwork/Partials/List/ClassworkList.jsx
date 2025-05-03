import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';
import moment from 'moment';
import Swal from 'sweetalert2';

const ClassworkList = ({ classWorks }) => {
    // delete
    console.log(classWorks);
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
                router.delete(route('classwork.destroy', id));
            }
        });
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
                                        <th>Class</th>
                                        <th>Subject</th>
                                        <th>Assigned</th>
                                        <th>Submission</th>
                                        <th>Class work date</th>
                                        <th>Submission date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classWorks?.length > 0 ?
                                        classWorks?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{item?.id}</td>
                                                <td>{item?.classrooms.map((classroom) => classroom?.title ).join(', ')}</td>
                                                <td>{item?.subject?.title}</td>
                                                <td>{item?.assigned_to_class ? <span className='badge info'>Assigned</span>  : <span className='badge warning'>Not assigned</span> }</td>
                                                <td>{item?.allow_submission ? <span className='badge info'>submission</span>  : <span className='badge warning'>Not submission</span> }</td>
                                                <td>{moment(item?.start_date_at).format("DD MMM, YYYY")}</td>
                                                <td>{moment(item?.end_date_at).format("DD MMM, YYYY")}</td>
                                                <td>
                                                    <div className="educare-admission-list-action-btn">
                                                        <div className="educare-list-button-field-styles">
                                                            <Tooltip title="Edit" placement="top" arrow>
                                                                <Link href={route('classwork.edit', item.id)} className="bg-supportingB/80 inline-block">
                                                                    <i className="icon-editing"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        <div className="educare-list-button-field-styles">
                                                            <Tooltip title="Delete" placement="top" arrow>
                                                                <Link onClick={() => handleDelete(item.id)} href="#" className="bg-danger/80 inline-block">
                                                                    <i className="icon-TrashSimple"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        <div className="educare-list-button-field-styles">
                                                            <Dropdown>
                                                                <Dropdown.Trigger>
                                                                    <div
                                                                        type="button"
                                                                        className="educare-dropdown-menu"
                                                                    >
                                                                        <PrimaryButton className="bg-dark/80 inline-block">
                                                                            <i className="icon-DotsThreeOutlineVertical"></i>
                                                                        </PrimaryButton>
                                                                    </div>
                                                                </Dropdown.Trigger>
                                                                <Dropdown.Content>
                                                                    <Dropdown.Link href="#">
                                                                        <i className="icon-UploadSimple text-[20px] text-supportingA"></i>{" "}
                                                                        Send sms
                                                                    </Dropdown.Link>
                                                                    <Dropdown.Link href="#">
                                                                        <i className="icon-notifications text-[20px] text-supportingA"></i>{" "}
                                                                        Send notification
                                                                    </Dropdown.Link>
                                                                    <Dropdown.Link href={route("classwork.activity", item.id)}>
                                                                        <i className="icon-Notebook text-[20px] text-supportingA"></i>{" "}
                                                                        Student work
                                                                    </Dropdown.Link>
                                                                    <Dropdown.Link href="#">
                                                                        <i className="icon-DownloadSimple text-[20px] text-supportingA"></i>{" "}
                                                                        Download
                                                                    </Dropdown.Link>
                                                                </Dropdown.Content>
                                                            </Dropdown>
                                                        </div>
                                                    </div>
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
        </>
    );
};

export default ClassworkList;
