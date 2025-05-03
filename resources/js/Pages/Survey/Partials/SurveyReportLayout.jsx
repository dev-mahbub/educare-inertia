import React, { useRef } from "react";
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from "@/Components/PrimaryButton";
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const SurveyReportLayout = () => {

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        exam_list_check_id_parent: false,
        exam_list_check_id_2: false,
        exam_list_check_id_3: false,
    });

    const assessmentListData = (e) => {
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
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={assessmentListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                Job Code
                                            </th>
                                            <th>Title</th>
                                            <th>Total Opening</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Interview Date</th>
                                            <th>Created Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>#6789</td>
                                            <td>Principal</td>
                                            <td>1</td>
                                            <td>12 Dec, 2023</td>
                                            <td>26 Dec, 2023</td>
                                            <td>5 Jun, 2023</td>
                                            <td>03-Dec-2023 10:47:26 AM</td>
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
                                                                    Send sms
                                                                </Dropdown.Link>
                                                                <Dropdown.Link href="#">
                                                                    <i className="icon-notifications text-[20px] text-supportingA"></i>{" "}
                                                                    Send notification
                                                                </Dropdown.Link>
                                                                <Dropdown.Link href="#">
                                                                    <i className="icon-Notebook text-[20px] text-supportingA"></i>{" "}
                                                                    Student work
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

export default SurveyReportLayout;