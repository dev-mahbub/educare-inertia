import Checkbox from "@/Components/Checkbox";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import UpdateFormNumber from "./RegPopup/UpdateFormNumber";
import UpdateRegNumber from "./RegPopup/UpdateRegNumber";
import UpdateRegStatus from "./RegPopup/UpdateRegStatus";

const UpdateDetailsList = ({
    students,
    genders,
    houses,
    categories,
    selectedStudentIds,
    setSelectedStudentIds,
    setFormData,
    reset
}) => {
    const [formNumberPopup, setFormNumberPopup] = useState(false);
    const [regNumberPopup, setRegNumberPopup] = useState(false);
    const [regStatusPopup, setRegStatusPopup] = useState(false);

    const handleFormNumberModalClick = () => {
        setFormNumberPopup(!formNumberPopup);
    };
    const handleRegNumberModalClick = () => {
        setRegNumberPopup(!regNumberPopup);
    };
    const handleRegStatusModalClick = () => {
        setRegStatusPopup(!regStatusPopup);
    };

    // new code
    const [initialFormData, setInitialFormData] = useState([]);

    // old code
    // const initialFormData = students?.map((item) => ({
    //     // student
    //     id: item.id || "",
    //     is_checked: false,
    //     gender: item.gender || "",
    //     aadhar_card_no: item.aadhar_card_no || "",
    //     birth_date_at: item.birth_date_at || "",
    //     admission_date_at: item.admission_date_at || "",
    //     remark: item.remark || "",
    //     // category
    //     student_category_id: item.student_category_id || "",
    //     category_id: item.category_id || "",
    //     // house
    //     house_id: item.house_id || "",
    //     student_house_id: item.student_house_id || "",
    //     // father
    //     student_father_id: item.student_father_id || "",
    //     father_phone: item.father_phone || "",
    //     father_sms_phone: item.father_sms_phone || "",
    // }));

    const [data, setData] = useState(initialFormData);
    const [selectAllChecked, setSelectAllChecked] = useState(false);

    // new code
    useEffect(() => {
        setInitialFormData(students?.map((item) => ({
            // student
            id: item.id || "",
            admission_no: item.admission_no || "",
            roll_no: item.roll_no || "",
            first_name: item.first_name || "",
            middle_name: item.middle_name || "",
            last_name: item.last_name || "",
            is_checked: false,
            gender: item.gender || "",
            aadhar_card_no: item.aadhar_card_no || "",
            birth_date_at: item.birth_date_at || "",
            admission_date_at: item.admission_date_at || "",
            remark: item.remark || "",
            // category
            student_category_id: item.student_category_id || "",
            category_id: item.category_id || "",
            // house
            house_id: item.house_id || "",
            student_house_id: item.student_house_id || "",
            // father
            student_father_id: item.student_father_id || "",
            father_phone: item.father_phone || "",
            father_sms_phone: item.father_sms_phone || "",
        })));
    }, [students]);

    useEffect(() => {
        setData(initialFormData);
    }, [initialFormData]);


    useEffect(() => {
        setFormData(data?.filter(item => selectedStudentIds?.includes(item?.id) && item?.is_checked == true));
    }, [data, selectedStudentIds]);


    //checkbox start
    useEffect(() => {
        if (selectedStudentIds?.length <= 0) {
            setSelectAllChecked(false)
        }
        else {
            setSelectAllChecked(selectedStudentIds?.length === students?.length)
        }
    }, [students, selectedStudentIds]);

    // ... (other state and functions)

    const handleSelectAllCheckboxChange = (checked) => {
        setSelectAllChecked(checked);
        // Update the state of all index checkboxes
        setData((prevData) =>
            prevData.map((item) => ({ ...item, is_checked: checked }))
        );

        if(checked) {
            setSelectedStudentIds(students?.map(item => item?.id));
        }
        else {
            setSelectedStudentIds([]);
        }
    };
    const handleCheckboxSelect = (index, checked) => {
        // Update the state of the clicked index checkbox
        setData((prevData) => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], is_checked: checked };
            return newData;
        });

        // Check if all index checkboxes are checked
        const allChecked = data.every((item) => item.is_checked);

        // Update the state of the outsider checkbox
        setSelectAllChecked(allChecked);
    };

    const setSelectedStudentId = (id) => {
        let updateSelectedStudentIds = [...selectedStudentIds];

        if ([...selectedStudentIds]?.includes(id)) {
            updateSelectedStudentIds = [...selectedStudentIds].filter((item) => item != id);
        }
        else {
            updateSelectedStudentIds = [
                ...selectedStudentIds,
                id,
            ];
        }

        setSelectedStudentIds(updateSelectedStudentIds);
    }
    //checkbox end

    //calender start
    const handleInputChange = (index, field, value) => {
        setData((prevData) => {
            const newData = [...prevData];
            newData[index] = { ...newData[index], [field]: value };
            return newData;
        });
    };
    //calender end

    const handleUpdateDetails = (e) => {
        e.preventDefault();
        router.post(route("student.update_details_save"), data, {
            onSuccess: () => {
                reset()
            }
        });
    };

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={handleUpdateDetails}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="select_all_student_id"
                                                        name="select_all_student_id"
                                                        checked={
                                                            selectAllChecked
                                                        }
                                                        onChange={(e) =>
                                                            handleSelectAllCheckboxChange(
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                                Student
                                            </th>
                                            <th>
                                                {/* <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="dummy_checkbox_1"
                                                        name="dummy_checkbox_1"
                                                        checked={
                                                            data.dummy_checkbox_1
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "dummy_checkbox_1",
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div> */}
                                                Gender
                                            </th>
                                            <th>Aadhar</th>
                                            <th>Category</th>
                                            <th>DOB</th>
                                            <th>DOA</th>
                                            <th>House</th>
                                            <th>Mobile No.</th>
                                            <th>SMS No.</th>
                                            <th>Remark</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data?.length > 0 ? (
                                            data?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id={`is_checked_${index}`}
                                                                name={`is_checked_${index}`}
                                                                checked={
                                                                    data[index]
                                                                        ?.is_checked ||
                                                                    false
                                                                }
                                                                onChange={(e) => {
                                                                    handleCheckboxSelect(index, e.target.checked, item?.id)
                                                                    setSelectedStudentId(item?.id)
                                                                }
                                                                }
                                                            />
                                                        </div>
                                                        <span className="font-bold">
                                                            {`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}
                                                        </span>
                                                        <span className="block">
                                                            {`Adm No. - ${item?.admission_no ?? ""}`}
                                                        </span>
                                                        <span className="block">
                                                            {`Roll No. - ${item?.roll_no ?? ""}`}
                                                        </span>
                                                    </td>
                                                    <td>
                                                        <div className="educare-input-field-styles">
                                                            <SelectInput
                                                                id="gender"
                                                                data_label="gender"
                                                                data={genders}
                                                                defaultValue={
                                                                    data[index]?.gender || ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(index, "gender", e.target.value)
                                                                }
                                                                type="text"
                                                                className="mt-1 block w-full"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                id="aadhar_card_no"
                                                                defaultValue={
                                                                    data[index]
                                                                        ?.aadhar_card_no ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        index,
                                                                        "aadhar_card_no",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeHolder="Aadhar No"
                                                                className="block"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-input-field-styles">
                                                            <SelectInput
                                                                id="category_id"
                                                                defaultValue={
                                                                    data[index]
                                                                        ?.category_id ||
                                                                    ""
                                                                }
                                                                data={
                                                                    categories
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        index,
                                                                        "category_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <DatePicker
                                                                    selected={
                                                                        data[
                                                                            index
                                                                        ]
                                                                            ?.birth_date_at
                                                                            ? new Date(
                                                                                  data[
                                                                                      index
                                                                                  ]?.birth_date_at
                                                                              )
                                                                            : null
                                                                    }
                                                                    onChange={(
                                                                        date
                                                                    ) =>
                                                                        handleInputChange(
                                                                            index,
                                                                            "birth_date_at",
                                                                            date
                                                                        )
                                                                    }
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={
                                                                        false
                                                                    }
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    dateFormat="dd/MM/yyyy"
                                                                    placeholderText="Select Date"
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="col-span-12 md:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <DatePicker
                                                                    selected={
                                                                        data[
                                                                            index
                                                                        ]
                                                                            ?.admission_date_at
                                                                            ? new Date(
                                                                                  data[
                                                                                      index
                                                                                  ]?.admission_date_at
                                                                              )
                                                                            : null
                                                                    }
                                                                    onChange={(
                                                                        date
                                                                    ) =>
                                                                        handleInputChange(
                                                                            index,
                                                                            "admission_date_at",
                                                                            date
                                                                        )
                                                                    }
                                                                    showYearDropdown
                                                                    showMonthDropdown
                                                                    useShortMonthInDropdown
                                                                    showPopperArrow={
                                                                        false
                                                                    }
                                                                    peekNextMonth
                                                                    dropdownMode="select"
                                                                    isClearable
                                                                    dateFormat="dd/MM/yyyy"
                                                                    placeholderText="Select Date"
                                                                    className="w-full"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-input-field-styles">
                                                            <SelectInput
                                                                id="house_id"
                                                                data={houses}
                                                                defaultValue={
                                                                    data[index]
                                                                        ?.house_id ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        index,
                                                                        "house_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                id="father_phone"
                                                                defaultValue={
                                                                    data[index]
                                                                        ?.father_phone ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        index,
                                                                        "father_phone",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeHolder="Mobile No"
                                                                className="block"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                id="father_sms_phone"
                                                                defaultValue={
                                                                    data[index]
                                                                        ?.father_sms_phone ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        index,
                                                                        "father_sms_phone",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                placeHolder="SMS No"
                                                                className="block"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                id="remark"
                                                                defaultValue={
                                                                    data[index]
                                                                        ?.remark ||
                                                                    ""
                                                                }
                                                                onChange={(e) =>
                                                                    handleInputChange(
                                                                        index,
                                                                        "remark",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {/* <Tooltip title="Edit" placement="top" arrow> */}
                                                        <button
                                                            type="submit"
                                                            className="educare-create-school-settings-list-success"
                                                        >
                                                            <i className="inline-block icon-check-1"></i>
                                                        </button>
                                                        {/* </Tooltip> */}
                                                        {/* <div className="educare-admission-list-action-btn">
                                                            <div className="educare-list-button-field-styles">

                                                            </div>
                                                            {/* <div className="educare-list-button-field-styles">
                                                                <Tooltip title="View" placement="top" arrow>
                                                                    <Link href="#" className="bg-supportingC/80 inline-block">
                                                                        <i className="icon-eye"></i>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div>
                                                            <div className="educare-list-button-field-styles">
                                                                <Tooltip title="Delete" placement="top" arrow>
                                                                    <Link href="#" className="bg-danger/80 inline-block">
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div>
                                                            <div className="educare-list-button-field-styles">
                                                                <Dropdown>
                                                                    <Dropdown.Trigger>
                                                                        <div
                                                                            type="button"
                                                                            className="educare-dropdown-menu"
                                                                        >
                                                                            <PrimaryButton className="bg-dark/80 inline-block">
                                                                                <i className="icon-DotsThreeOutlineVertical"></i>
                                                                            </PrimaryButton>
                                                                        </div>
                                                                    </Dropdown.Trigger>

                                                                    <Dropdown.Content>
                                                                        <Dropdown.Link href="#">
                                                                            Registration Form
                                                                        </Dropdown.Link>
                                                                        <Dropdown.Link href="#">
                                                                            Admission Process
                                                                        </Dropdown.Link>
                                                                        <Dropdown.Link href="#">
                                                                            Receipt
                                                                        </Dropdown.Link>
                                                                        <button
                                                                            type="button"
                                                                            onClick={handleRegStatusModalClick}
                                                                        >
                                                                            Update Registration Status
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={handleFormNumberModalClick}
                                                                        >
                                                                            Update Form Number
                                                                        </button>
                                                                        <button
                                                                            type="button"
                                                                            onClick={handleRegNumberModalClick}
                                                                        >
                                                                            Update Registration No.
                                                                        </button>
                                                                    </Dropdown.Content>
                                                                </Dropdown>
                                                            </div> */}
                                                        {/* </div> */}
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td
                                                    className="text-center text-red-500"
                                                    colSpan="11"
                                                >
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <UpdateFormNumber
                formNumberPopup={formNumberPopup}
                setFormNumberPopup={setFormNumberPopup}
            />
            <UpdateRegNumber
                regNumberPopup={regNumberPopup}
                setRegNumberPopup={setRegNumberPopup}
            />
            <UpdateRegStatus
                regStatusPopup={regStatusPopup}
                setRegStatusPopup={setRegStatusPopup}
            />
        </>
    );
};

export default UpdateDetailsList;
