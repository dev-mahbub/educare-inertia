import { Link, useForm } from '@inertiajs/react';
import React from 'react';
import DatePicker from "react-datepicker";


const TeacherReportForm = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        null_date: null,
    });

    return (
        <div>
            <div className="flex justify-between items-end flex-wrap">
                <div className="educare-card-title card-title-no-padding">
                    <h5>Class Report</h5>
                </div>
                <div className='flex items-center gap-2 flex-wrap'>
                    <div>
                        <div className="educare-input-field-styles max-w-[155px]">
                            <DatePicker
                                selected={
                                    data?.null_date && new Date(data?.null_date)
                                }
                                onChange={(date) =>
                                    setData("null_date", date)
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
            </div>
            <div className="educare-default-table xs:overflow-x-auto mt-4">
                <table>
                    <thead>
                        <tr>
                            <th>Class</th>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>II A</td>
                            <td>demo details</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TeacherReportForm;