import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { Tooltip } from '@mui/material';
import React from 'react';

const TeacherDownloadSelectedColumn = ({ data, setData }) => {
    
   const handleRemoveSelectedRow = () => {
    
   }

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className='flex flex-wrap gap-2 justify-between items-end'>
                    <div className="educare-card-title pb-none">
                        <h5>
                            Selected Column
                        </h5>
                    </div>
                    <div>
                        {
                            data.select_all_student_id || data.student_one_id || data.student_two_id ? (
                                <PrimaryButton
                                    // disabled={processing}
                                    className="educare-primary-btn-md-fill"
                                >
                                    Download Student Details
                                </PrimaryButton>
                            ) : ""
                        }
                    </div>
                </div>
                <div className="educare-default-table xs:overflow-x-auto mt-2.5">
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={3}>
                                    <div className='flex flex-wrap justify-between items-center gap-2 pr-1'>
                                        <h5 className='text-headingLight'>Teacher's Attribute</h5>
                                        <PrimaryButton
                                            className="educare-primary-btn-md-fill"
                                        >
                                            <i className="icon-DownloadSimple mr-1"></i>
                                            Download Excel
                                        </PrimaryButton>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.teacher_biometric_code ? (
                                    <tr>
                                        <td>{data.teacher_biometric_code_label}</td>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="teacher_biometric_code_order_by"
                                                        name="teacher_biometric_code_order_by"
                                                        checked={
                                                            data.teacher_biometric_code_order_by
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "teacher_biometric_code_order_by",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="teacher_biometric_code_order_by"
                                                        value="Order By"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <Tooltip
                                                    title="Cancel"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <button
                                                        className="educare-danger-btn-sm-fill"
                                                        onClick={handleRemoveSelectedRow}
                                                    >
                                                        X
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ) : ""
                            }
                            {
                                data.teacher_first_name ? (
                                    <tr>
                                        <td>{data.teacher_first_name_label}</td>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="teacher_first_name_order_by"
                                                        name="teacher_first_name_order_by"
                                                        checked={
                                                            data.teacher_first_name_order_by
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "teacher_first_name_order_by",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="teacher_first_name_order_by"
                                                        value="Order By"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <Tooltip
                                                    title="Cancel"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <button
                                                        className="educare-danger-btn-sm-fill"
                                                        onClick={handleRemoveSelectedRow}
                                                    >
                                                        X
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ) : ""
                            }
                            {
                                data.teacher_last_name ? (
                                    <tr>
                                        <td>{data.teacher_last_name_label}</td>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="teacher_last_name_order_by"
                                                        name="teacher_last_name_order_by"
                                                        checked={
                                                            data.teacher_last_name_order_by
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "teacher_last_name_order_by",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="teacher_last_name_order_by"
                                                        value="Order By"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <Tooltip
                                                    title="Cancel"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <button
                                                        className="educare-danger-btn-sm-fill"
                                                        onClick={handleRemoveSelectedRow}
                                                    >
                                                        X
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ) : ""
                            }
                            {
                                data.teacher_full_name ? (
                                    <tr>
                                        <td>{data.teacher_full_name_label}</td>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="teacher_full_name_order_by"
                                                        name="teacher_full_name_order_by"
                                                        checked={
                                                            data.teacher_full_name_order_by
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "teacher_full_name_order_by",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="teacher_full_name_order_by"
                                                        value="Order By"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className='educare-list-action-btn'>
                                                <Tooltip
                                                    title="Cancel"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <button
                                                        className="educare-danger-btn-sm-fill"
                                                        onClick={handleRemoveSelectedRow}
                                                    >
                                                        X
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ) : ""
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default TeacherDownloadSelectedColumn;