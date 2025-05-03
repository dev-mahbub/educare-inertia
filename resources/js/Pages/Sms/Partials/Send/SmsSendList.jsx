import Checkbox from '@/Components/Checkbox';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@/Components/InputLabel';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react';

const SmsSendList = () => {

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        exam_list_check_id_parent: false,
        exam_list_check_id_2: false,
        exam_list_check_id_3: false,
        birthday_select_date: "",
        survey_report_audience_id: "",
        select_all_days_id: "",
        monday_id: false,
        tuesday_id: false,
        wednesday_id: false,
        thursday_id: false,
        friday_id: false,
        saturday_id: false,
        sunday_id: false,
    });

    const SmsSendListData = (e) => {
        e.preventDefault();

        post(route('school.save'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset('city', 'zip');
                //     cityInput.current.focus();
                // }
            },
        });
    };
    //form validation end

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "select_all_days_id") {
            newFormData = {
                ...data,
                [name]: value,
                monday_id: value,
                tuesday_id: value,
                wednesday_id: value,
                thursday_id: value,
                friday_id: value,
                saturday_id: value,
                sunday_id: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.select_all_days_id = false;
            }
            // after all child checked, then parent will check
              else if ( newFormData.monday_id === true && 
                        newFormData.tuesday_id === true &&
                        newFormData.wednesday_id === true &&
                        newFormData.thursday_id === true &&
                        newFormData.friday_id === true &&
                        newFormData.saturday_id === true &&
                        newFormData.sunday_id === true 
                ) {
                newFormData.select_all_days_id = true;
              }
        }

        setData(newFormData);
    };
    //handle Checkbox end
    return (
        <>
            <div className="educare-student-birthday-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={SmsSendListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Message </th>
                                            <th>Audience</th>
                                            <th>Total</th>
                                            <th>Sent On</th>
                                            <th>Sent By</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="max-w-[400px]">
                                            ARAA , you are requested to pay the due fee amount 1500 from installment Previous_Due(2022-2023) to July for your ward VANDANA MISHRA of class I A. Kindly ignore paid installment(s)
                                            </td>
                                            <td> Parent</td>
                                            <td>2</td>
                                            <td>Jun 12, 2024</td>
                                            <td>schoolAdmin Admin</td>
                                            <td>
                                                <div className="educare-admission-list-action-btn">
                                                    <div className="educare-list-button-field-styles">
                                                        <Tooltip title="Edit" placement="top" arrow>
                                                            <Link href="#" className="bg-supportingB/80 inline-block">
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
                                                        <Tooltip title="Delete" placement="top" arrow>
                                                            <Link href="#" className="bg-danger/80 inline-block">
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
                                                                    Publish
                                                                </Dropdown.Link>
                                                                <Dropdown.Link href="#">
                                                                    <i className="icon-ShareNetwork text-[20px] text-supportingA"></i>{" "}
                                                                    Share
                                                                </Dropdown.Link>
                                                            </Dropdown.Content>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="max-w-[400px]">
                                            Rahul Raj , you are requested to pay the due fee amount 500 from installment Previous_Due(2022-2023) to July for your ward Utkarsh of class I A. Kindly ignore paid installment(s)
                                            </td>
                                            <td> Parent</td>
                                            <td>2</td>
                                            <td>Jun 12, 2024</td>
                                            <td>schoolAdmin Admin</td>
                                            <td>
                                                <div className="educare-admission-list-action-btn">
                                                    <div className="educare-list-button-field-styles">
                                                        <Tooltip title="Edit" placement="top" arrow>
                                                            <Link href="#" className="bg-supportingB/80 inline-block">
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
                                                        <Tooltip title="Delete" placement="top" arrow>
                                                            <Link href="#" className="bg-danger/80 inline-block">
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
                                                                    Publish
                                                                </Dropdown.Link>
                                                                <Dropdown.Link href="#">
                                                                    <i className="icon-ShareNetwork text-[20px] text-supportingA"></i>{" "}
                                                                    Share
                                                                </Dropdown.Link>
                                                            </Dropdown.Content>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SmsSendList;