import Dropdown from '@/Components/Dropdown';
import { Link, router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import TeacherCredentialPopup from '../Popup/TeacherCredentialPopup';
import PrimaryButton from '@/Components/PrimaryButton';
import Swal from 'sweetalert2';

const Menus = [
    { id: 1, menu: 'All' },
    { id: 2, menu: 'A' },
    { id: 3, menu: 'B' },
    { id: 4, menu: 'C' },
    { id: 5, menu: 'D' },
    { id: 6, menu: 'E' },
    { id: 7, menu: 'F' },
    { id: 8, menu: 'G' },
    { id: 9, menu: 'H' },
    { id: 10, menu: 'I' },
    { id: 11, menu: 'J' },
    { id: 12, menu: 'K' },
    { id: 13, menu: 'L' },
    { id: 14, menu: 'M' },
    { id: 15, menu: 'N' },
    { id: 16, menu: 'O' },
    { id: 17, menu: 'P' },
    { id: 18, menu: 'Q' },
    { id: 19, menu: 'R' },
    { id: 20, menu: 'S' },
    { id: 21, menu: 'T' },
    { id: 22, menu: 'U' },
    { id: 23, menu: 'V' },
    { id: 24, menu: 'W' },
    { id: 25, menu: 'X' },
    { id: 26, menu: 'Y' },
    { id: 27, menu: 'Z' },
];

const TeacherList = ({ teachers }) => {
    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [teacherCredentialPopup, setTeacherCredentialPopup] = useState(false);
    const handleCredentialModalClick = () => {
        setTeacherCredentialPopup(!teacherCredentialPopup);
    };

    const concatTeacherName = (first_name, middle_name, last_name) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(' ');
    };

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
                router.delete(route('teacher.destroy', id));
            }
        });
    }

    console.log(teachers);

    return (
        <>
            <div className="educare-letter-filter-area pt-2">
                <div className="educare-letter-filter">
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                        className='mb-5'
                    >
                        {Menus.map((menu, index) => (
                            <Tab key={index} label={menu.menu} />
                        ))}
                    </Tabs>

                    {Menus.map((menu, index) => (
                        <div key={index} hidden={value !== index}>
                            <div className="educare-admission-list-area">
                                <div className="educare-admission-list-inner">
                                    <div className="educare-admission-list-inner-wrapper">
                                        <div className="educare-admission-list">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Id</th>
                                                        <th>Emp. ID {menu.menu}</th>
                                                        <th>Teacher Name</th>
                                                        <th>Teacher Type</th>
                                                        <th>Department</th>
                                                        <th>Designation</th>
                                                        <th>Role</th>
                                                        <th>Phone</th>
                                                        <th>Actions</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {teachers.map((teacher, index) => (
                                                        <tr key={index}>
                                                            <td>{teacher.id}</td>
                                                            <td>{teacher?.employee_id}</td>
                                                            <td>{concatTeacherName(teacher?.first_name, teacher?.middle_name, teacher?.last_name)}</td>
                                                            <td>{teacher?.teacher_type}</td>
                                                            <td>{teacher?.department_name}</td>
                                                            <td>{teacher?.designation_name}</td>
                                                            <td>{teacher?.user_roll_type}</td>
                                                            <td>{teacher?.phone}</td>
                                                            <td>
                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Inactive Teacher"
                                                                            placement="top"
                                                                            arrow
                                                                            as="button"
                                                                        >
                                                                            <Link
                                                                                href="#"
                                                                                className="educare-danger-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-warning"></i>
                                                                            </Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Edit"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <Link
                                                                                href={route('teacher.edit', teacher.id)}
                                                                                className="educare-warning-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="View"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <Link
                                                                                href="#"
                                                                                className="educare-tertiary-btn-sm-fill"
                                                                            >
                                                                                <i className="icon-eye"></i>
                                                                            </Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div>
                                                                        <PrimaryButton
                                                                            onClick={(e) => handleDelete(teacher.id)}
                                                                            type="button"
                                                                            className="educare-danger-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </PrimaryButton>
                                                                    </div>
                                                                    <div className='relative'>
                                                                        <Dropdown>
                                                                            <Dropdown.Trigger>
                                                                                <div className="educare-dropdown-menu">
                                                                                    <button type="button" className="educare-dark-btn-sm-fill">
                                                                                        <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                    </button>
                                                                                </div>
                                                                            </Dropdown.Trigger>
                                                                            <Dropdown.Content>
                                                                                <Dropdown.Link href="/teacher/details/1">
                                                                                    <i className="icon-man text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                    Teacher Details
                                                                                </Dropdown.Link>
                                                                                <button type="button">
                                                                                    <i className="icon-printer text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                    Print
                                                                                </button>
                                                                                <button type="button" onClick={handleCredentialModalClick}>
                                                                                    <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                    Credential
                                                                                </button>
                                                                            </Dropdown.Content>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <TeacherCredentialPopup
                TeacherCredentialPopup={teacherCredentialPopup}
                setTeacherCredentialPopup={setTeacherCredentialPopup}
            />
        </>
    );
};

export default TeacherList;
