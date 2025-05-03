import PrimaryButton from "@/Components/PrimaryButton";
import SuccessButton from "@/Components/SuccessButton";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { router, useForm } from "@inertiajs/react";


export default function AttendanceDateRangeList({ examAttendances = [] }) {

    const [formFields, setFormData] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        exam_id: "",
        start_date_at: "",
        end_date_at: "",
        // classroom_exam_date_array: formFields,
    });

    useEffect(() => {
        setFormData(examAttendances?.map(item => ({
            exam_id: item?.id,
            title: item?.title,
            start_date_at: item?.start_date_at && new Date(item?.start_date_at),
            end_date_at: item?.end_date_at && new Date(item?.end_date_at),
        })))
    }, [examAttendances]);

    const handleFormChange = (value, index, field) => {
        const updatedFields = [...formFields];

        updatedFields[index][field] = value

        setFormData(updatedFields);
    }

    const handleExamReset = (e, index) => {
        e.preventDefault();
        const updatedFields = [...formFields];
        updatedFields[index] = {
            ...updatedFields[index],
            start_date_at: "",
            end_date_at: "",
        };
        setFormData(updatedFields);
    };

    const handleExamDataSaveClick = (e, exam_id, start_date_at, end_date_at) => {
        e.preventDefault();
        router.post(route('exam_date_range.save'), { exam_id, start_date_at, end_date_at });
    }

    return (
        <>
            <div className="educare-admission-list-area">
                <form>
                    <div className="educare-admission-list-inner">
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list">
                                <table>
                                    <thead>

                                        <tr>
                                            <th>S.No</th>
                                            <th>Exam Name</th>
                                            <th>Start Date</th>
                                            <th>End Date</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {formFields?.length > 0 ?
                                            formFields?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{item.title}</td>
                                                    <td>
                                                        <div className="educare-input-field-styles">
                                                            <DatePicker
                                                                selected={item?.start_date_at && item?.start_date_at}
                                                                onChange={(date) => handleFormChange(date, index, 'start_date_at')}
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={false}
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                placeholderText="Select Date"
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-input-field-styles">
                                                            <DatePicker
                                                                selected={item?.end_date_at && item?.end_date_at}
                                                                onChange={(date) => handleFormChange(date, index, 'end_date_at')}
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={false}
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                placeholderText="Select Date"
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <SuccessButton
                                                            type="button"
                                                            className="educare-primary-btn-md-fill"
                                                            onClick={(e) => {
                                                                handleExamDataSaveClick(e, item?.exam_id, item?.start_date_at, item?.end_date_at)
                                                            }}
                                                        >
                                                            Save
                                                        </SuccessButton>
                                                        <PrimaryButton
                                                            className="educare-gray-btn-md-fill"
                                                            type="button"
                                                            onClick={(e) => handleExamReset(e, index)}
                                                        >
                                                            Reset
                                                        </PrimaryButton>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td
                                                    className="text-center text-red-500"
                                                    colSpan="7"
                                                >
                                                    Data not found
                                                </td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
