import Checkbox from '@/Components/Checkbox';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react';

const ExamList = () => {

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        exam_list_check_id_parent: false,
        exam_list_check_id_2: false,
        exam_list_check_id_3: false,
    });

    const examListData = (e) => {
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

    //handle checkbox start
      const handleExamCheckboxChange = (name, value) => {
        let newFormData;
    
        if (name === 'exam_list_check_id_parent') {
          newFormData = {
            ...data,
            [name]: value,
            exam_list_check_id_2: value,
            exam_list_check_id_3: value,
          };
        } else {
          newFormData = {
            ...data,
            [name]: value,
          };
    
          if (value === false) {
            newFormData.exam_list_check_id_parent = false;
          } else if (
            Object.values(newFormData).slice(1).every(Boolean) &&
            !newFormData.exam_list_check_id_parent
          ) {
            newFormData.exam_list_check_id_parent = true;
          }
        }
    
        setData(newFormData);
      };
    //handle checkbox end
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={examListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-checkbox-styles">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="exam_list_check_id_parent"
                                                            checked={
                                                                data.exam_list_check_id_parent
                                                            }
                                                            onChange={(e) =>
                                                                handleExamCheckboxChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            </th>
                                            <th>Exam</th>
                                            <th>Subject</th>
                                            <th>Exam Time</th>
                                            <th>F/P Marks</th>
                                            <th>Exam Code</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="educare-checkbox-styles">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="exam_list_check_id_2"
                                                            checked={
                                                                data.exam_list_check_id_2
                                                            }
                                                            onChange={(e) =>
                                                                handleExamCheckboxChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className='text-[14px] font-semibold text-headingLight'>Steven</h6>
                                                <span className='text-[14px] block text-headingLight'>Created by - Andrew Tye</span>
                                                <span className="badge danger">
                                                    Not Published
                                                </span>
                                            </td>
                                            <td>English</td>
                                            <td>
                                                2023-10-15 15:55:00 to 2023-10-15 19:55:00
                                            </td>
                                            <td>100/40</td>
                                            <td>99</td>
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
                                            <td>
                                                <div className="educare-checkbox-styles">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="exam_list_check_id_3"
                                                            checked={
                                                                data.exam_list_check_id_3
                                                            }
                                                            onChange={(e) =>
                                                                handleExamCheckboxChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            </td>
                                            <td>
                                                <h6 className='text-[14px] font-semibold text-headingLight'>Peter</h6>
                                                <span className='text-[14px] block text-headingLight'>Created by - Pat Cummins</span>
                                                <span className="badge danger">
                                                    Not Published
                                                </span>
                                            </td>
                                            <td>Biology</td>
                                            <td>
                                                2023-10-15 12:55:00 to 2023-10-15 16:55:00
                                            </td>
                                            <td>100/40</td>
                                            <td>91</td>
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

export default ExamList;