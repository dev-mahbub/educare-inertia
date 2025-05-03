import { Link, useForm } from '@inertiajs/react';
import React from 'react';
import DatePicker from "react-datepicker";
import InputError from '@/Components/InputError';
import SelectInput from '@/Components/SelectInput';


const StudentTeacherReportForm = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        class_date: null,
        select_class: '',
        select_subject: '',
    });

    return (
        <div>
            <div className="flex justify-between items-end flex-wrap">
                <div className="educare-card-title card-title-no-padding">
                    <h5>Student Teacher Report</h5>
                </div>
                <div className='flex items-center gap-2 flex-wrap'>
                    <div className="educare-input-field-styles max-w-[155px]">
                        <DatePicker
                            selected={
                                data?.class_date && new Date(data?.class_date)
                            }
                            onChange={(date) =>
                                setData("class_date", date)
                            }
                            showYearDropdown
                            showMonthDropdown
                            useShortMonthInDropdown
                            showPopperArrow={false}
                            peekNextMonth
                            dropdownMode="select"
                            isClearable
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Class Date"
                            className="w-full"
                        />

                    </div>
                </div>
            </div>
            <div className="educare-default-table xs:overflow-x-auto mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>Sr. No.</th>
                            <th>Grade/Class</th>
                            <th>Subject</th>
                            <th>Class Date</th>
                            <th>Subject Teacher</th>
                            <th>Student</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>II A</td>
                            <td>English</td>
                            <td>25-07-24</td>
                            <td>Sunil Kumar</td>
                            <td>Aditya Kumar</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default StudentTeacherReportForm;