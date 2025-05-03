import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React from 'react';
import Swal from 'sweetalert2';
import moment from 'moment';


const ClassList = ({ classrooms }) => {

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
                router.delete(route('classroom.time_table_destroy', id));
            }
        });
    }

    console.log(classrooms);

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
                                        <th>Till date</th>
                                        <th>Repeatable days</th>
                                        <th>Class name</th>
                                        <th>Start time</th>
                                        <th>End time</th>
                                        <th>Grade</th>
                                        <th>Subject</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {classrooms?.length ?
                                        classrooms?.map((item) => (
                                            <tr key={item?.id}>
                                                <td>{item?.id}</td>
                                                <td>{moment(item?.end_date_at).format("MMM DD, YYYY")}</td>
                                                <td><span className='repeatable-days'>{item?.class_day}</span></td>
                                                <td>{item?.class_name?.title}</td>
                                                <td>{moment(item?.start_time_at, "HH:mm:ss").format("h:mm A")}</td>
                                                <td>{moment(item?.end_time_at, "HH:mm:ss").format("h:mm A")}</td>
                                                <td>{item?.grade}</td>
                                                <td>{item?.subject?.title}</td>
                                                <td>
                                                    <div className="educare-admission-list-action-btn">
                                                        <div className="educare-list-button-field-styles">
                                                            <Tooltip title="Edit" placement="top" arrow>
                                                                <Link href={route('classroom.time_table_edit', item?.id)} className="bg-supportingB/80 inline-block">
                                                                    <i className="icon-editing"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        <div className="educare-list-button-field-styles">
                                                            <Tooltip title="View" placement="top" arrow>
                                                                <Link href="#" className="bg-supportingC/80 inline-block">
                                                                    <i className="icon-eye"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        <div className="educare-list-button-field-styles">
                                                            <PrimaryButton
                                                                onClick={() => handleDelete(item.id)}
                                                                className="bg-danger/80 "
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </PrimaryButton>

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
                                                                        Dummy
                                                                    </Dropdown.Link>
                                                                    <Dropdown.Link href="#">
                                                                        <i className="icon-notifications text-[20px] text-supportingA"></i>{" "}
                                                                        Dummy
                                                                    </Dropdown.Link>
                                                                </Dropdown.Content>
                                                            </Dropdown>
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
                </div >
            </div >
        </>
    );
};

export default ClassList;