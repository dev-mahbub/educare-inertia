import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
// import PublishExamPopUp from "./AddExamPopUp/PublishExamPopUp";
import PublishExamPopUp from "@/Components/Partials/Exam/PublishExamPopUp";


import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import Autocomplete from '@mui/material/Autocomplete';
import CheckboxA from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function AddExamForm({ exams = [], classrooms = []}) {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [publishExamPopUp, setPublishExamPopUp] = useState(false);
    const [selectedClassroomIds, setSelectedClassroomIds] = useState([]);
    const [examData, setExamData] = useState([]);

    const handlePublishExamModalClick = () => {
        setPublishExamPopUp(!publishExamPopUp);
    };

    //multiple selector
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [showSelector, setShowSelector] = useState(false);
    const [showSelectorBadge, setShowSelectorBadge] = useState(false);

    const handleShowSelectrorClick = () => {
        setShowSelector(!showSelector);
    };

    const handleShowSelectrorBadgeClick = () => {
        setShowSelectorBadge(!showSelectorBadge);
    };

    const handleSelectChange = (event, value) => {
        setSelectedOptions(value);

        setSelectedClassroomIds(value.map(classroom => classroom.id));
    };

    const handleRemoveOption = (optionToRemove) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter((option) => option !== optionToRemove)
        );

        setSelectedClassroomIds((prevData) => prevData.filter((id) => id !== optionToRemove.id));
    };

    //
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        classroom_ids: selectedClassroomIds,
        title: "",
        display_order: "",
        start_date_at: "",
        end_date_at: "",
        is_display_on_calender: false,
        is_registration: false,
    });

    useEffect(() => {
        setData('classroom_ids', selectedClassroomIds);
    }, [selectedClassroomIds]);


    const handleExamData = (e) => {
        e.preventDefault();
        data.start_date_at = startDate;
        data.end_date_at = endDate;
        post(route("exam.save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setSelectedOptions([]);
            }
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('exam.destroy', id));
            }
        });
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Exams
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Exam Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        { exams?.length > 0 ? (
                                            exams.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.title}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    {/* <button type="button"
                                                                        className="educare-warning-btn-sm-fill"
                                                                        onClick={handleShowSelectrorBadgeClick}
                                                                    >
                                                                        <i className="icon-editing"></i>
                                                                    </button> */}
                                                                    <Link
                                                                        href={route(
                                                                            "exam.edit",
                                                                            item?.id
                                                                        )}
                                                                        className="educare-warning-btn-sm-fill"
                                                                    >
                                                                        <i className="icon-editing"></i>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <Tooltip
                                                                    title="Delete"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => handleDelete(item?.id)}
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <button
                                                                    onClick={() => {
                                                                        handlePublishExamModalClick();
                                                                        setExamData(...exams?.filter(exam => exam.id === item?.id));
                                                                    }}
                                                                >
                                                                    <span className='badge info'>Publish Exam</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                                <tr>
                                                    <td
                                                        className="text-center text-red-500"
                                                        colSpan="7"
                                                    >
                                                        Data not found
                                                    </td>
                                                </tr>
                                        )

                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>Add Exam
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleExamData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                value="Exam Title"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        value={
                                                            data.title
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="display_order"
                                                        value="Display Order"
                                                    />
                                                    <TextInput
                                                        value={
                                                            data.display_order
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "display_order",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.display_order
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Start Date" />
                                                    <DatePicker
                                                        selected={startDate}
                                                        onChange={(date) => setStartDate(date)}
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
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="End Date" />
                                                    <DatePicker
                                                        selected={endDate}
                                                        onChange={(date) => setEndDate(date)}
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
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="is_display_on_calender"
                                                            name="is_display_on_calender"
                                                            checked={
                                                                data.is_display_on_calender
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_display_on_calender",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="is_display_on_calender"
                                                            value="Display Exam On Calendar?"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="is_registration"
                                                            name="is_registration"
                                                            checked={
                                                                data.is_registration
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_registration",
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="is_registration"
                                                            value="Is Registration Exam?"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="inline-flex items-center gap-1.5">
                                                    <button type="button"
                                                        className="educare-secondary-btn-md-fill"
                                                        onClick={handleShowSelectrorClick}
                                                    >
                                                        <i className='icon-PlusCircle'></i> Add Class
                                                    </button>

                                                    {showSelectorBadge &&
                                                        <div className="flex flex-wrap gap-1">
                                                            {selectedOptions.map((option,index) => (
                                                                <span className='badge primary' key={index}>{option.title}</span>
                                                            ))}
                                                        </div>
                                                    }
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                {showSelector &&
                                                    <div className='educare-multiple-check-item educare-multiple-add-exam-check-item'>
                                                        <ul className="inline-flex flex-wrap gap-1.5">
                                                            {selectedOptions.map((option,index) => (
                                                                <li key={index}>
                                                                    <span className="gap-2.5">{option.title}</span>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Delete"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button type='button' className="educare-danger-btn-sm-fill" onClick={() => handleRemoveOption(option)}>
                                                                                <i className="icon-TrashSimple"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                }
                                            </div>
                                            {showSelector &&
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-type-file-styles">
                                                            <Autocomplete
                                                                multiple
                                                                options={classrooms}
                                                                disableCloseOnSelect
                                                                getOptionLabel={(option) => option.title}
                                                                value={selectedOptions}
                                                                onChange={handleSelectChange}
                                                                renderOption={(props, option, { selected }) => (
                                                                <li {...props}>
                                                                    <CheckboxA
                                                                        icon={icon}
                                                                        checkedIcon={checkedIcon}
                                                                        style={{ marginRight: 8 }}
                                                                        checked={selected}
                                                                    />
                                                                    {option.title}
                                                                </li>
                                                                )}
                                                                renderInput={(params) => <TextField {...params} placeholder="Classes" />}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            }
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                        type="button"
                                                        onClick={()=> {
                                                            reset()
                                                            setSelectedOptions([])
                                                            setStartDate(new Date())
                                                            setEndDate(new Date())
                                                            setShowSelector(false)
                                                        }}
                                                    >
                                                        Reset
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                        type="submit"
                                                    >
                                                        Save
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <PublishExamPopUp
                publishExamPopUp={publishExamPopUp}
                setPublishExamPopUp={setPublishExamPopUp}
                examData={examData}
            />
        </>
    );
}
