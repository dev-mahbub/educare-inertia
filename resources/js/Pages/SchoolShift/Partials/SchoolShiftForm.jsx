import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
// import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import moment from 'moment';
import { useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import SchoolShiftEditPopupForm from "./SchoolShiftEditPopupForm";

export default function SchoolShiftForm({ schoolShifts, shiftType }) {

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editData, setEditData] = useState([]);

    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());

    const timeFormet = (date) => {
        return date.toLocaleTimeString('en-US', {
            hour12: false,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    };

    const {
        data,
        setData,
        errors,
        post,
        reset
    } = useForm({
        title: "",
        start_time_at: "",
        end_time_at: "",
    });

    const handleInsert = (e) => {
        e.preventDefault();
        data.start_time_at = startTime ? timeFormet(startTime) : '';
        data.end_time_at = endTime ? timeFormet(endTime) : '';

        post(route("school_shift.save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setStartTime(new Date());
                setEndTime(new Date());
            }
        });
    };

    // update
    const handleEditPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };

    // delete
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
                router.delete(route('school_shift.destroy', id));
            }
        });
    }

    return (
        <>
            <div className="educare-master-create-shift-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-7 col-span-12">
                        <div className="beducare-master-create-shift-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    School Shift
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Shift Name</th>
                                            <th>Start Time</th>
                                            <th>End Time</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schoolShifts?.length ?
                                            schoolShifts?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.title}</td>
                                                    <td>{moment(item?.start_time_at, "HH:mm:ss").format("h:mm A")}</td>
                                                    <td>{moment(item?.end_time_at, "HH:mm:ss").format("h:mm A")}</td>
                                                    <td>
                                                        <div className="educare-button-action-field-wrapper flex justify-center gap-[5px]">
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => handleEditPopup(item)}
                                                                    className="bg-warning/80 "
                                                                >
                                                                    <i className="icon-pen"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => handleDelete(item.id)}
                                                                    className="bg-danger/80"
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="8">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-5 col-span-12">
                        <div className="educare-master-create-shift-form">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add New
                                    </h5>
                                </div>
                                <div className="educare-create-school-form-wrapper-border bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleInsert}>
                                        <div className="educare-school-shift-input-field">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="title"
                                                    value="Shift name*"
                                                />
                                                {/* <SelectInput
                                                    id="title"
                                                    data_label="shift"
                                                    data={shiftType}
                                                    value={data.title}
                                                    onChange={(e) =>
                                                        setData(
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="mt-1 block w-full"
                                                /> */}
                                                <TextInput
                                                    id="title"
                                                    data_label="shift"
                                                    value={data.title}
                                                    onChange={(e) =>
                                                        setData(
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="mt-1 block w-full"
                                                />

                                                <InputError
                                                    message={errors.title}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="educare-school-shift-input-field">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="start_time_at"
                                                    value="Start time*"
                                                />
                                                <DatePicker
                                                    id="start_time_at"
                                                    name="start_time_at"
                                                    selected={startTime}
                                                    onChange={(date) =>
                                                        setStartTime(date)
                                                    }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={1}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    placeholderText="Start time"
                                                    className="w-full"
                                                />

                                                <InputError
                                                    message={errors.start_time_at}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="educare-school-shift-input-field">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="end_time_at"
                                                    value="End time*"
                                                />
                                                <DatePicker
                                                    name="end_time_at"
                                                    id="end_time_at"
                                                    selected={endTime}
                                                    onChange={(date) =>
                                                        setEndTime(date)
                                                    }
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    showTimeSelect
                                                    showTimeSelectOnly
                                                    timeIntervals={1}
                                                    timeCaption="Time"
                                                    dateFormat="h:mm aa"
                                                    placeholderText="End time"
                                                    className="w-full"
                                                />

                                                <InputError
                                                    message={errors.end_time_at}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="educare-master-create-shift-button-wrapper">
                                            <div className="educare-master-create-shift-button flex justify-end gap-[15px]">
                                                <PrimaryButton
                                                    className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                                >
                                                    Add shift
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <SchoolShiftEditPopupForm editPopupOpen={editPopupOpen} setEditPopupOpen={setEditPopupOpen} editData={editData} shiftType={shiftType}></SchoolShiftEditPopupForm>
        </>
    );
}
