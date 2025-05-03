import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import React from 'react';

const StudentDownloadSelectedColumn = ({ data, setData }) => {
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
                                <th colSpan={2}>Student Attribute</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.student_name ? (
                                    <tr>
                                        <td>{data.student_name_label}</td>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="student_name_orderby"
                                                        name="student_name_orderby"
                                                        checked={
                                                            data.student_name_orderby
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "student_name_orderby",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="student_name_orderby"
                                                        value="Order By"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ) : ""
                            }
                            {
                                data.admission_number ? (
                                    <tr>
                                        <td>{data.admission_number_label}</td>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="admission_number_orderby"
                                                        name="admission_number_orderby"
                                                        checked={
                                                            data.admission_number_orderby
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "admission_number_orderby",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor="admission_number_orderby"
                                                        value="Order By"
                                                    />
                                                </div>
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

export default StudentDownloadSelectedColumn;