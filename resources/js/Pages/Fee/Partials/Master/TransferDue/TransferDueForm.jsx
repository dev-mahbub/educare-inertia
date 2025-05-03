import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransferDueForm = ({
    academicYears = [],
    classrooms = [],
    currentAcademicYear = {},
    siteData
}) => {

    const [startDate, setStartDate] = useState(new Date());
    const [filteredClassrooms, setFilteredClassrooms] = useState([]);
    const [checkAllClassroom, setCheckAllClassroom] = useState(false);
    const [selectedClassroomIds, setSelectedClassroomIds] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all_classroom_id: "",
        academic_year_id: "",
        late_fee: "",
        late_fee_date: "",
        classroom_ids: [],
    });


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            late_fee_date: startDate
        }));
    },[startDate])


    // handle classroom select start
    useEffect(() => {
        if (selectedClassroomIds?.length <= 0) {
            setCheckAllClassroom(false);
        }
        else {
            setCheckAllClassroom(selectedClassroomIds?.length === filteredClassrooms?.length);
        }

        setData((prevData) => ({
            ...prevData,
            classroom_ids: selectedClassroomIds,
        }))
    }, [selectedClassroomIds, filteredClassrooms])
    // handle classroom select end

    //handle academic year change start
    const handleAcademicYearChange = (event) => {
        setFilteredClassrooms(classrooms?.filter(classroom => classroom?.academic_year_id == event.target.value));

        setData((prevData) => ({
            ...prevData,
            academic_year_id: event.target.value
        }));
    }
    //handle academic year change end


    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let updatedClassroomIds = [...selectedClassroomIds];

        // parent will check, all child will check
        if (name === "select_all_classroom_id") {
            if(value) {
                updatedClassroomIds = filteredClassrooms?.map(item => item?.id);
            }
            else {
                updatedClassroomIds = [];
            }
        } else if (name = "classroom_id") {
            if (selectedClassroomIds?.includes(value)) {
                updatedClassroomIds = updatedClassroomIds?.filter(item => item != value);
            }
            else {
                updatedClassroomIds = [...updatedClassroomIds, value];
            }
        }

        setSelectedClassroomIds(updatedClassroomIds)

        setData((prevData) => ({
            ...prevData,
            classroom_ids: updatedClassroomIds
        }))
    };
    //handle Checkbox end


    //handle form  reset

    const handleReset = () => {
        reset();
        setFilteredClassrooms([]);
        setSelectedClassroomIds([]);
        setStartDate(new Date());
    }


    //handle transfer due fee form submit
    const handleTransferDueData = (e) => {
        e.preventDefault();

        post(route("fee.transfer_due_fee.save"), {
            preserveScroll: true,
            onSuccess: () => handleReset(),
            onError: (errors) => {
                let count = 0;

                for (let key in errors) {
                    if (key === 'classroom_ids') {
                        count++;

                        toast.error(errors[key], {
                            position: 'top-right',
                            autoClose: 1500,
                        })
                    }

                    if (count >= 1) {
                        break;
                    }
                }
            },
        });
    };

    return (
        <div className="educare-classroom-form-area">
            <form onSubmit={handleTransferDueData}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-BookBookmark"></i>
                                        Transfer Fee Due
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="flex flex-wrap gap-2.5 items-end mb-5 justify-between">
                                                <div className="educare-select-field-styles">
                                                    <InputLabel
                                                        htmlFor="academic_year_id"
                                                        value="From Session"
                                                    />
                                                    <SelectInput
                                                        id="academic_year_id"
                                                        data_label="Academic Year"
                                                        data={academicYears}
                                                        value={data.academic_year_id}
                                                        onChange={(e) =>
                                                            handleAcademicYearChange(e)
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.academic_year_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="educare-select-field-styles">
                                                    <InputLabel
                                                        htmlFor="academic_year_id"
                                                        value="Current Session"
                                                        // value={`Current Session : ${currentAcademicYear?.academic_session}`}
                                                    />
                                                    <SelectInput
                                                        id="academic_year_id"
                                                        data_label="Academic Year"
                                                        data={siteData?.AcademicYears}
                                                        value={currentAcademicYear?.id}
                                                        // onChange={(e) =>
                                                        //     handleAcademicYearChange(e)
                                                        // }
                                                        type="text"
                                                        className="block"
                                                        disabled={true}
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.academic_year_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div>
                                                    <PrimaryButton className="educare-primary-btn-md-fill">
                                                        Transfer Due
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                            <div className="flex flex-wrap gap-2.5 items-center justify-between">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="late_fee"
                                                            name="late_fee"
                                                            checked={
                                                                data.late_fee
                                                            }
                                                            onChange={(e) => {
                                                                setData(
                                                                    "late_fee",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }

                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="late_fee"
                                                            value="Add Late Fee"
                                                        />
                                                    </div>
                                                </div>
                                                {data.late_fee === true ?
                                                    <div>
                                                        <div className="educare-input-field-styles">
                                                            <DatePicker
                                                                selected={startDate}
                                                                onChange={(date) =>
                                                                    setStartDate(
                                                                        date
                                                                    )
                                                                }
                                                                showYearDropdown
                                                                showMonthDropdown
                                                                useShortMonthInDropdown
                                                                showPopperArrow={false}
                                                                peekNextMonth
                                                                dropdownMode="select"
                                                                isClearable
                                                                dateFormat="dd/MM/yyyy"
                                                                placeholderText="Select date"
                                                                className="w-full"
                                                            />
                                                        </div>
                                                        <InputError
                                                            message={
                                                                errors.late_fee_date
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div> : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-input-field-notes">
                            <h6 className="font-bold">Important! Please Read Before Proceeding:</h6>
                            <ul>
                                <li>
                                    1) This is a one-time process: Once executed, it cannot be undone. Proceed with caution.
                                </li>
                                <li className="pt-1">
                                    2) Ensure all students are upgraded: Verify that all students have been promoted to the current session before proceeding.
                                </li>
                                <li className="pt-1">
                                    3) Confirm fee structures: Check that the fee structure for the current session is created and assigned to every class.
                                </li>
                                <li className="pt-1">
                                    <strong>4) Add late fees: If you wish to apply a late fee to previous year installments, make sure to check the relevant checkbox.</strong>
                                </li>
                                <li className="pt-1">
                                    <strong>5) Set the calculation date: Specify the date for calculating the late fee.</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-12 gap-5">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="select_all_classroom_id"
                                                        name="select_all_classroom_id"
                                                        checked={
                                                            checkAllClassroom
                                                        }
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                        }
                                                    />
                                                </div>
                                            </th>
                                            <th>Class</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredClassrooms?.length > 0 &&
                                            filteredClassrooms?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="classroom_id"
                                                                name="classroom_id"
                                                                checked={
                                                                    selectedClassroomIds?.includes(item?.id)
                                                                }
                                                                onChange={(e) =>
                                                                    handleCheckboxSelect(e.target.name, item?.id)
                                                                }
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>{item?.title}</td>
                                                </tr>
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TransferDueForm;
