import InputError from '@/Components/InputError';
import InputLabel from "@/Components/InputLabel";
import SelectInput from '@/Components/SelectInput';
import { router, useForm } from '@inertiajs/react';
import DatePicker from "react-datepicker";


const ExamScheduleFilter = ({
    virtualExamModes,
    classNames,
    subjects
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        class_name_id: "",
        subject_id: "",
        start_date: new Date(),
        end_date: new Date(),
        exam_mode: "",
    });

    const handleFormSubmit = (e) => {
        e.preventDefault();
    };

    // handle change class start
    const handleChangeClass = (value) => {
        setData((prevData) => ({
            ...prevData,
            class_name_id: value,
            subject_id: ""
        }));

        const form_data = {
            ...data,
            class_name_id: value,
            subject_id: ""
        }

        router.post(route('online_exam.exam_schedule'), form_data);
    }
    // handle change class end

    // handle filter exam data start
    const handleFilterExamData = (e) => {
        e.preventDefault();

        router.post(route('online_exam.exam_schedule'), data);
    }
    // handle filter exam data end

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className='grid grid-cols-12 gap-5'>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                value="Class"
                            />
                            <SelectInput
                                data_label="Class"
                                data={classNames}
                                value={
                                    data.class_name_id
                                }
                                onChange={(e) =>
                                    handleChangeClass(e.target.value)
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.class_name_id
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                value="Subject"
                            />
                            <SelectInput
                                data_label="Subject"
                                data={subjects}
                                value={
                                    data.subject_id
                                }
                                onChange={(e) =>
                                    setData(
                                        "subject_id",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.subject_id
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <div className="educare-input-field-styles">
                            <InputLabel value="Start Date" />
                            <DatePicker
                                selected={
                                    data?.start_date && new Date(data?.start_date)
                                }
                                onChange={(date) =>
                                    setData("start_date", date)
                                }
                                showYearDropdown
                                showMonthDropdown
                                useShortMonthInDropdown
                                showPopperArrow={false}
                                peekNextMonth
                                dropdownMode="select"
                                isClearable
                                dateFormat="dd/MM/yyyy"
                                placeholderText="Start date"
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <div className="educare-input-field-styles">
                            <InputLabel value="End Date" />
                            <DatePicker
                                selected={
                                    data?.end_date && new Date(data?.end_date)
                                }
                                onChange={(date) =>
                                    setData("end_date", date)
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
                    <div className="col-span-12 md:col-span-6 lg:col-span-4">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                value="Exam Mode"
                            />
                            <SelectInput
                                data_label="Mode"
                                data={virtualExamModes}
                                value={
                                    data.exam_mode
                                }
                                onChange={(e) =>
                                    setData(
                                        "exam_mode",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.exam_mode
                                }
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className='flex justify-end'>
                            <button
                                type="button"
                                className="educare-primary-btn-md-fill"
                                onClick={handleFilterExamData}
                            >
                                Get Schedules
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default ExamScheduleFilter;
