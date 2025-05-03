import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

export default function SetExamDateForm({
    classNames = [],
    exams = [],
    classroomExamDateData = []
}) {

    const [nullDate, setNullDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);

    const [filteredClassNames, setFilteredClassNames] = useState([]);
    const [formFields, setFormFields] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        class_name_id: "",
        exam_id: "",
        classroom_ids: [],
        classroom_exam_date_array: formFields,
    });


    useEffect(() => {
        setFormFields(Object.values(classroomExamDateData)?.map(item => ({
            classroom_subject_id: item?.id,
            exam_date_id: item?.exam_date?.id,
            classroom_id: item?.classroom_id,
            subject_id: item?.subject?.id,
            subject_title: item?.subject?.title,
            classroom_section_title: item?.classroom_section_title,
            is_marking: item?.is_marking,
            date_at: item?.exam_date?.date_at && new Date(item?.exam_date?.date_at),
            start_time_at: item?.exam_date?.start_time_at && moment(item?.exam_date?.start_time_at, "HH:mm:ss").toDate(),
            end_time_at: item?.exam_date?.end_time_at && moment(item?.exam_date?.end_time_at, "HH:mm:ss").toDate(),
        })))
    }, [classroomExamDateData]);


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            classroom_exam_date_array: formFields
        }))
    }, [formFields])


    const handleFormChange = (value, index, field) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = value
        setFormFields(updatedFields);
    }

    const handleFormReset = (index) => {
        const updatedFields = [...formFields];
        updatedFields[index] = {
            ...updatedFields[index],
            date_at: null,
            start_time_at: null,
            end_time_at: null,
        };
        setFormFields(updatedFields);
    };


    const handleExamChange = (id) => {
        setFilteredClassNames(Object.values(classNames).filter(item => item.exam_ids.includes(parseInt(id))));
        setData((prevData) => ({
            ...prevData,
            exam_id: id,
            class_name_id: "",
            classroom_ids: [],
        }))
    }


    const getClassroomExamData = (e) => {
        e.preventDefault();

        const selectedClassName = Object.values(classNames)?.find(item => item?.id == e.target.value);

        setData((prevData) => ({
            ...prevData,
            class_name_id: selectedClassName?.id,
            classroom_ids: selectedClassName?.classroom_ids
        }));

        const form_data = {
            exam_id: data?.exam_id,
            class_name_id: selectedClassName?.id,
            classroom_ids: selectedClassName?.classroom_ids
        }

        router.post(route('exam_date.list'), form_data);
    }

    const handleSetExamRoasterData = (e) => {
        e.preventDefault();
        post(route("exam_date.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    // const { flash } = usePage().props;
    // useEffect(() => {
    //     reset();
    // }, [flash]);

    return (
        <>
            <div className="educare-classroom-form-area">
                <form onSubmit={handleSetExamRoasterData}>
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-4 col-span-12">
                            <div className="educare-class-form-box-wrapper">
                                <div className="educare-create-school-details-form-wrap">
                                    <div className="educare-card-title mb-1">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Set Exam Date
                                        </h5>
                                    </div>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="exam_id"
                                                                value="Exam"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Exam"
                                                        data={exams}
                                                        value={data.exam_id}
                                                        onChange={(e) =>
                                                            handleExamChange(e.target.value)
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.exam_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="class_name_id"
                                                                value="Class"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="Class"
                                                        data={Object.values(filteredClassNames)}
                                                        value={
                                                            data.class_name_id
                                                        }
                                                        onChange={(e) => {
                                                            getClassroomExamData(e);
                                                        }
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="lg:col-span-8 col-span-12">
                            <div className="educare-admission-list-area">
                                <div className="educare-admission-list-inner">
                                    <div className="flex justify-between gap-5 mb-1">
                                        <div className="educare-card-title">
                                            <h5>
                                                <i className="icon-ListBullets"></i>
                                                Exam Date
                                            </h5>
                                        </div>
                                        {formFields?.length > 0 ? <div>
                                            <PrimaryButton
                                                disabled={processing}
                                                className="educare-primary-btn-md-fill"
                                            >
                                                Save
                                            </PrimaryButton>
                                        </div> : ''}

                                    </div>
                                    <div className="educare-default-table xs:overflow-x-auto pb-[250px]">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Subject Name</th>
                                                    <th>Date</th>
                                                    <th>Start Time</th>
                                                    <th>End Time</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {formFields?.length > 0 ?
                                                    formFields?.map((item, index) => (
                                                        <tr key={index}>
                                                            {item?.is_marking ?
                                                                <td>{item?.subject_title}</td>
                                                            :
                                                                <td>
                                                                    {`${item?.subject_title} - ( ${item?.classroom_section_title} )`}
                                                                    <span className="text-danger ml-2">Non Marking</span>
                                                                </td>
                                                            }
                                                            <td>
                                                                <div className="educare-input-field-styles">
                                                                    <DatePicker
                                                                        selected={item?.date_at}
                                                                        onChange={(date) => handleFormChange(date, index, 'date_at')}
                                                                        showYearDropdown
                                                                        showMonthDropdown
                                                                        useShortMonthInDropdown
                                                                        showPopperArrow={false}
                                                                        peekNextMonth
                                                                        dropdownMode="select"
                                                                        isClearable
                                                                        dateFormat="dd/MM/yyyy"
                                                                        placeholderText="Date"
                                                                        className="w-full"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="educare-input-field-styles">
                                                                    <DatePicker
                                                                        selected={item?.start_time_at}
                                                                        onChange={(date) => handleFormChange(date, index, 'start_time_at')}
                                                                        dropdownMode="select"
                                                                        isClearable
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={1}
                                                                        timeCaption="Time"
                                                                        dateFormat="h:mm aa"
                                                                        placeholderText="Time"
                                                                        className="w-full"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="educare-input-field-styles">
                                                                    <DatePicker
                                                                        selected={item?.end_time_at}
                                                                        onChange={(date) => handleFormChange(date, index, 'end_time_at')}
                                                                        dropdownMode="select"
                                                                        isClearable
                                                                        showTimeSelect
                                                                        showTimeSelectOnly
                                                                        timeIntervals={1}
                                                                        timeCaption="Time"
                                                                        dateFormat="h:mm aa"
                                                                        placeholderText="Time"
                                                                        className="w-full"
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <PrimaryButton
                                                                    // disabled={processing}
                                                                    type="button"
                                                                    className="educare-gray-btn-md-fill"
                                                                    onClick={(e) => handleFormReset(index)}
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
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}
