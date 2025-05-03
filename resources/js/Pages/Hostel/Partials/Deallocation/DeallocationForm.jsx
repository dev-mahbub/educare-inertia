import React, { useEffect, useState } from 'react';
import InputError from '@/Components/InputError';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import SelectInput from '@/Components/SelectInput';
import DatePicker from "react-datepicker";
import PrimaryButton from '@/Components/PrimaryButton';
import InputLabel from '@mui/material/InputLabel';


const DeallocationForm = ({
    classrooms = [],
    students = [],
    currentAllocationData = [],
    studentId,
    classroomId,
}) => {

    const [studentData, setStudentData] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        write_note: "",
        deallocation_date_at: new Date(),
        admission_no: "",
        classroom_id: classroomId,
        student_id: studentId,
    });

    const handleInsertData = (e) => {
        e.preventDefault();

        post(route("hostel.deallocation_save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleClassroom = (id) => {
        const filteredStudent = students?.filter((item) => item?.classroom_id == id);
        setStudentData(filteredStudent);
    }

    const handleStudent = (id) => {
        const studentAdm = studentData?.find((item) => item?.id == id);
        setData({
            ...data,
            'student_id': id,
            'admission_no': studentAdm?.admission_no,
        })
        router.post(route('hostel.deallocation'), { 'student_id': id, 'classroom_id': data?.classroom_id });
    }

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('hostel.deallocation'));
    }

    useEffect(() => {
        setData({
            ...data,
            classroom_id: classroomId,
            student_id: studentId,
        })
    }, [studentId, classroomId]);


    return (
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-HouseLine"></i>
                    Student Deallocation
                </h5>
            </div>
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <form onSubmit={handleInsertData}>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 md:col-span-3">
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="admission_no"
                                    value={
                                        data.admission_no
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "admission_no",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={errors.admission_no}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <div className="educare-input-field-styles">
                                <SelectInput
                                    id="classroom_id"
                                    data_label="Class"
                                    data={classrooms}
                                    value={
                                        data.classroom_id
                                    }
                                    onChange={(e) => {
                                        setData(
                                            "classroom_id",
                                            e.target.value
                                        )
                                        handleClassroom(e.target.value);
                                    }
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={errors.classroom_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-5">
                            <div className="educare-input-field-styles">
                                <SelectInput
                                    id="student_id"
                                    data_label="Student"
                                    data={studentData}
                                    value={
                                        data.student_id
                                    }
                                    onChange={(e) => {
                                        handleStudent(e.target.value)
                                    }
                                    }
                                    className="block"
                                />
                                <InputError
                                    message={errors.student_id}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-12">
                            <div className="educare-input-field-styles">
                                <TextInput
                                    id="write_note"
                                    value={
                                        data.write_note
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "write_note",
                                            e.target.value
                                        )
                                    }
                                    placeHolder="write a note"
                                    className="block"
                                />
                                <InputError
                                    message={
                                        errors.write_note
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-4">
                            <div className="educare-input-field-styles">
                                <DatePicker
                                    selected={
                                        data?.deallocation_date_at
                                            && new Date(
                                                data?.deallocation_date_at
                                            )
                                    }
                                    onChange={(date) =>
                                        setData("deallocation_date_at", date)
                                    }
                                    showYearDropdown
                                    showMonthDropdown
                                    useShortMonthInDropdown
                                    showPopperArrow={false}
                                    peekNextMonth
                                    dropdownMode="select"
                                    isClearable
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="End date"
                                    className="w-full"
                                />
                            </div>
                        </div>
                        {currentAllocationData?.is_current_data ? (
                            <div className="col-span-12">
                                <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="submit"
                                        disabled={processing}
                                    >
                                        DeAllocation
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="educare-gray-btn-lg-stroke"
                                        type="button"
                                        disabled={processing}
                                        onClick={(e) => {handleReset(e)}}
                                    >
                                        Reset
                                    </PrimaryButton>
                                </div>
                            </div>
                        ) : ''}
                    </div>
                </form>
            </div>
        </div>
    )
}
export default DeallocationForm;
