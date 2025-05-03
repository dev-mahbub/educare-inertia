import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import placeholderImage from "../../../../../images/icon/placeholder.jpg";
import Checkbox from "@/Components/Checkbox";
import DatePicker from "react-datepicker";
import Autocomplete from "@mui/material/Autocomplete";
import { TextField } from "@mui/material";
import RadioInput from "@/Components/RadioInput";
import TextareaInput from "@/Components/TextareaInput";

const StaffCreateForm = ({
    auth,
    siteData,
    userRolls,
    genders,
    teachingTypes,
    states,
    houses,
    categories,
    empCats,
    staffCats,
    religions,
    jobTypes,
    departments,
    designations,
    bloodGroups,
}) => {
    const [birthDate, setBirthDate] = useState(null);
    const [joinDate, setJoinDate] = useState(null);
    const [leaveDate, setLeaveDate] = useState(null);

    const { data, setData, errors, post, reset, processing } = useForm({
        first_name: "",
        last_name: "",
        email: "",
        father_name: "",
        spouse_name: "",
        role: "",
        gender: "",
        phone: "",
        staffType: "",
        state: "",
        city: "",
        date_of_join: "",
        date_of_leave: "",
        date_of_birth: "",
        category: "",
        religion: "",
        job_type: "",
        department: "",
        designation: "",
        blood_group: "",
        pan_number: "",
        employee_id: "",
        qualification: "",
        voter_card_no: "",
        adhar_card_no: "",
        employment_category: "",
        staff_category: "",
        staff_sub_category: "",
        oasis_id: "",
        address: "",
        experience_details: "",
        bank_name: "",
        bank_account_no: "",
        uan_id: "",
        ifsc_id: "",
        pf_account_no: "",
        year_of_experience: "",
        esic_no: "",
    });
    const createStaffData = (e) => {
        e.preventDefault();
        data.date_of_join = joinDate;
        data.date_of_leave = leaveDate;
        data.date_of_birth = birthDate;
        post(route("student.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };
    console.log(staffCats);

    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={createStaffData}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="col-span-12">
                        <div className="educare-create-school-details">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-school-form-action-title">
                                        <h5>
                                            <i className="icon-man"></i>
                                            Create Staff
                                        </h5>
                                    </div>
                                    <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="first_name"
                                                                    value="First Name"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="first_name"
                                                            value={
                                                                data.first_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "first_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.first_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="last_name"
                                                            value="Last Name"
                                                        />
                                                        <TextInput
                                                            id="last_name"
                                                            value={
                                                                data.last_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "last_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.last_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="email"
                                                            value="Email"
                                                        />
                                                        <TextInput
                                                            id="email"
                                                            value={data.email}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "email",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            type="email"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.email
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="father_name"
                                                            value="Father Name"
                                                        />
                                                        <TextInput
                                                            id="father_name"
                                                            value={
                                                                data.father_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "father_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.father_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="spouse_name"
                                                            value="Spouse's Name"
                                                        />
                                                        <TextInput
                                                            id="spouse_name"
                                                            value={
                                                                data.spouse_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "spouse_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.spouse_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="role"
                                                                value="Role"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="role"
                                                        data_label="Role"
                                                        data={[]}
                                                        value={data.role}
                                                        onChange={(e) =>
                                                            setData(
                                                                "role",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.role}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="gender"
                                                                value="Gender"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="gender"
                                                        data_label="Gender"
                                                        data={[]}
                                                        value={data.gender}
                                                        onChange={(e) =>
                                                            setData(
                                                                "gender",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.gender}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="phone"
                                                            value="Phone"
                                                        />
                                                        <TextInput
                                                            id="phone"
                                                            value={data.phone}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "phone",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.phone
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="grid grid-cols-12 gap-5">
                                                    <div className="col-span-6">
                                                        <div className="educare-checkbox-field-styles">
                                                            <InputLabel value="Teaching" />
                                                            <RadioInput
                                                                name="staffType"
                                                                value=""
                                                                checked={
                                                                    data.staffType ===
                                                                    "teaching"
                                                                }
                                                                onChange={() =>
                                                                    setData(
                                                                        "staffType",
                                                                        "teaching"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-6">
                                                        <div className="educare-checkbox-field-styles">
                                                            <InputLabel value="Non Teaching" />
                                                            <RadioInput
                                                                name="staffType"
                                                                value=""
                                                                checked={
                                                                    data.staffType ===
                                                                    "non_teaching"
                                                                }
                                                                onChange={() =>
                                                                    setData(
                                                                        "staffType",
                                                                        "non_teaching"
                                                                    )
                                                                }
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12"></div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="state"
                                                        value="State"
                                                    />
                                                    <SelectInput
                                                        id="state"
                                                        data_label="state"
                                                        data={[]}
                                                        value={data.state}
                                                        onChange={(e) =>
                                                            setData(
                                                                "state",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.state}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="city"
                                                            value="City"
                                                        />
                                                        <TextInput
                                                            id="city"
                                                            value={data.city}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "city",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.city
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="house"
                                                                value="House"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="#"
                                                            className="educare-secondary-btn-sm-stroke"
                                                        >
                                                            <i className="icon-PlusCircle"></i>{" "}
                                                            Add
                                                        </Link>
                                                    </div>
                                                    <SelectInput
                                                        id="house"
                                                        data_label="house"
                                                        data={[]}
                                                        value={data.house}
                                                        onChange={(e) =>
                                                            setData(
                                                                "house",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.house}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Date of Join" />
                                                    <DatePicker
                                                        id="date_of_join"
                                                        selected={joinDate}
                                                        onChange={(date) =>
                                                            setJoinDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Date of Join"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel value="Date of Leave" />
                                                        <DatePicker
                                                            id="date_of_leave"
                                                            selected={leaveDate}
                                                            onChange={(date) =>
                                                                setLeaveDate(
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
                                                            placeholderText="Date of Leave"
                                                            className="w-full"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Date of Birth" />
                                                    <DatePicker
                                                        id="date_of_birth"
                                                        selected={birthDate}
                                                        onChange={(date) =>
                                                            setBirthDate(date)
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Date of Birth"
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="category"
                                                                value="Category"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="#"
                                                            className="educare-secondary-btn-sm-stroke"
                                                        >
                                                            <i className="icon-PlusCircle"></i>{" "}
                                                            Add
                                                        </Link>
                                                    </div>
                                                    <SelectInput
                                                        id="category"
                                                        data_label="Category"
                                                        data={[]}
                                                        value={data.category}
                                                        onChange={(e) =>
                                                            setData(
                                                                "category",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.category
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="religion"
                                                                value="Religion"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="#"
                                                            className="educare-secondary-btn-sm-stroke"
                                                        >
                                                            <i className="icon-PlusCircle"></i>{" "}
                                                            Add
                                                        </Link>
                                                    </div>
                                                    <SelectInput
                                                        id="religion"
                                                        data_label="Religion"
                                                        data={[]}
                                                        value={data.religion}
                                                        onChange={(e) =>
                                                            setData(
                                                                "religion",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.religion
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="job_type"
                                                        value="Job Type"
                                                    />
                                                    <SelectInput
                                                        id="job_type"
                                                        data_label="Job Type"
                                                        data={[]}
                                                        value={data.job_type}
                                                        onChange={(e) =>
                                                            setData(
                                                                "job_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.job_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="department"
                                                                value="Department"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="#"
                                                            className="educare-secondary-btn-sm-stroke"
                                                        >
                                                            <i className="icon-PlusCircle"></i>{" "}
                                                            Add
                                                        </Link>
                                                    </div>
                                                    <SelectInput
                                                        id="department"
                                                        data_label="Department"
                                                        data={[]}
                                                        value={data.department}
                                                        onChange={(e) =>
                                                            setData(
                                                                "department",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.department
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="designation"
                                                                value="Designation"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="#"
                                                            className="educare-secondary-btn-sm-stroke"
                                                        >
                                                            <i className="icon-PlusCircle"></i>{" "}
                                                            Add
                                                        </Link>
                                                    </div>
                                                    <SelectInput
                                                        id="designation"
                                                        data_label="Designation"
                                                        data={[]}
                                                        value={data.designation}
                                                        onChange={(e) =>
                                                            setData(
                                                                "designation",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.designation
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="blood_group"
                                                                value="Blood Group"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="#"
                                                            className="educare-secondary-btn-sm-stroke"
                                                        >
                                                            <i className="icon-PlusCircle"></i>{" "}
                                                            Add
                                                        </Link>
                                                    </div>
                                                    <SelectInput
                                                        id="blood_group"
                                                        data_label="Blood Group"
                                                        data={[]}
                                                        value={data.blood_group}
                                                        onChange={(e) =>
                                                            setData(
                                                                "blood_group",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.blood_group
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="pan_number"
                                                            value="Pan Number"
                                                        />
                                                        <TextInput
                                                            id="pan_number"
                                                            value={
                                                                data.pan_number
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "pan_number",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.pan_number
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="employee_id"
                                                            value="Employee Id"
                                                        />
                                                        <TextInput
                                                            id="employee_id"
                                                            value={
                                                                data.employee_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "employee_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.employee_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="qualification"
                                                            value="Qualification"
                                                        />
                                                        <TextInput
                                                            id="qualification"
                                                            value={
                                                                data.qualification
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "qualification",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.qualification
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="voter_card_no"
                                                            value="Voter Card No"
                                                        />
                                                        <TextInput
                                                            id="voter_card_no"
                                                            value={
                                                                data.voter_card_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "voter_card_no",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.voter_card_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="adhar_card_no"
                                                            value="Adhar Card No"
                                                        />
                                                        <TextInput
                                                            id="adhar_card_no"
                                                            value={
                                                                data.adhar_card_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "adhar_card_no",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.adhar_card_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="employment_category"
                                                                value="Employment Category"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="#"
                                                            className="educare-secondary-btn-sm-stroke"
                                                        >
                                                            <i className="icon-PlusCircle"></i>{" "}
                                                            Add
                                                        </Link>
                                                    </div>
                                                    <SelectInput
                                                        id="employment_category"
                                                        data_label="Employment"
                                                        data={[]}
                                                        value={
                                                            data.employment_category
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "employment_category",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.employment_category
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="staff_category"
                                                                value="Staff Category"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="#"
                                                            className="educare-secondary-btn-sm-stroke"
                                                        >
                                                            <i className="icon-PlusCircle"></i>{" "}
                                                            Add
                                                        </Link>
                                                    </div>
                                                    <SelectInput
                                                        id="staff_category"
                                                        data_label="Employment"
                                                        data={[]}
                                                        value={
                                                            data.staff_category
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "staff_category",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.staff_category
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="staff_sub_category"
                                                                value="Staff Sub Category"
                                                            />
                                                        </div>
                                                        <Link
                                                            href="#"
                                                            className="educare-secondary-btn-sm-stroke"
                                                        >
                                                            <i className="icon-PlusCircle"></i>{" "}
                                                            Add
                                                        </Link>
                                                    </div>
                                                    <SelectInput
                                                        id="staff_sub_category"
                                                        data_label="Sub Category"
                                                        data={[]}
                                                        value={
                                                            data.staff_sub_category
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "staff_sub_category",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.staff_sub_category
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="oasis_id"
                                                            value="OASIS ID"
                                                        />
                                                        <TextInput
                                                            id="oasis_id"
                                                            value={
                                                                data.oasis_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "oasis_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.oasis_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="address"
                                                            value="Address"
                                                        />
                                                        <TextInput
                                                            id="address"
                                                            value={data.address}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "address",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.address
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="experience_details"
                                                            value="Experience Details"
                                                        />
                                                        <TextareaInput
                                                            id="experience_details"
                                                            value={
                                                                data.experience_details
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "experience_details",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.experience_details
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="bank_name"
                                                            value="Bank Name"
                                                        />
                                                        <TextInput
                                                            id="bank_name"
                                                            value={
                                                                data.bank_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "bank_name",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.bank_name
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="bank_account_no"
                                                            value="Bank Account No."
                                                        />
                                                        <TextInput
                                                            id="bank_account_no"
                                                            value={
                                                                data.bank_account_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "bank_account_no",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.bank_account_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="uan_id"
                                                            value="UAN"
                                                        />
                                                        <TextInput
                                                            id="uan_id"
                                                            value={data.uan_id}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "uan_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.uan_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="ifsc_id"
                                                            value="IFSC"
                                                        />
                                                        <TextInput
                                                            id="ifsc_id"
                                                            value={data.ifsc_id}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "ifsc_id",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.ifsc_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="pf_account_no"
                                                            value="PF Account Number"
                                                        />
                                                        <TextInput
                                                            id="pf_account_no"
                                                            value={
                                                                data.pf_account_no
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "pf_account_no",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.pf_account_no
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="year_of_experience"
                                                            value="Year of Experience"
                                                        />
                                                        <TextInput
                                                            id="year_of_experience"
                                                            value={
                                                                data.year_of_experience
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "year_of_experience",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.year_of_experience
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <InputLabel
                                                            htmlFor="esic_no"
                                                            value="ESIC No."
                                                        />
                                                        <TextInput
                                                            id="esic_no"
                                                            value={data.esic_no}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "esic_no",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.esic_no
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
                        </div>
                    </div>
                </div>
                <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end border-t border-grayLight/20 pt-5">
                    <PrimaryButton
                        disabled={processing}
                        className="educare-gray-btn-lg-stroke"
                    >
                        Reset
                    </PrimaryButton>
                    <PrimaryButton
                        disabled={processing}
                        className="educare-primary-btn-lg-fill"
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default StaffCreateForm;
