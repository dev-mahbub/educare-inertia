import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import RadioInput from "@/Components/RadioInput";
import TextareaInput from "@/Components/TextareaInput";
import placeholderImage from "../../../../../images/icon/placeholder.jpg";
import SelectInput2 from "@/Components/SelectInput2";

const TeacherEditForm = ({
    teacher,
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
    const [birthDate, setBirthDate] = useState(new Date(teacher.birth_date_at));
    const [joinDate, setJoinDate] = useState(new Date(teacher.join_date_at));
    const [leaveDate, setLeaveDate] = useState(new Date(teacher.leave_date_at));

    const { data, setData, errors, put, reset, processing } = useForm({
        state_id: teacher.state_id,
        house_id: teacher.house_id,
        category_id: teacher.category_id,
        religion_id: teacher.religion_id,
        department_id: teacher.department_id,
        designation_id: teacher.designation_id,
        blood_group_id: teacher.blood_group_id,
        employee_id: teacher.employee_id,
        employment_category_id: teacher.employment_category_id,
        teacher_category_id: teacher.teacher_category_id,
        teacher_sub_category_id: teacher.teacher_sub_category_id,
        teacher_type: teacher.teacher_type,
        first_name: teacher.first_name,
        middle_name: teacher.middle_name,
        last_name: teacher.last_name,
        phone: teacher.phone,
        email: teacher.email,
        father_name: teacher.father_name,
        spouse_name: teacher.spouse_name,
        gender: teacher.gender,
        city: teacher.city,
        join_date_at: teacher.join_date_at,
        leave_date_at: teacher.leave_date_at,
        birth_date_at: teacher.birth_date_at,
        job_type: teacher.job_type,
        pan_number: teacher.pan_number,
        qualification: teacher.qualification,
        voter_card_no: teacher.voter_card_no,
        aadhar_card_no: teacher.aadhar_card_no,
        oasis_id: teacher.oasis_id,
        address: teacher.address,
        description: teacher.description,
        bank_name: teacher.bank_name,
        bank_account_no: teacher.bank_account_no,
        uan: teacher.uan,
        ifsc: teacher.ifsc,
        pf_account_number: teacher.pf_account_number,
        experience_year: teacher.experience_year,
        esic_no: teacher.esic_no,

        //
        new_password: "",
        confirm_password: "",
        //
        old_user_name: "",
        new_user_name: "",
        //
        update_profile_image: null,
    });
    const updateTeacherData = (e) => {
        e.preventDefault();
        data.join_date_at = joinDate;
        data.leave_date_at = leaveDate;
        data.birth_date_at = birthDate;
        put(route("teacher.update", teacher.id), data, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };
    const updatePasswordData = (e) => {
        e.preventDefault();
        post(route("student.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };
    const updateProfileImageData = (e) => {
        e.preventDefault();
        post(route("student.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };
    const updateUserData = (e) => {
        e.preventDefault();
        post(route("student.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleCancel = () => {
        router.get(route("teacher.list"));
    };

    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 minMax2Xl:col-span-8 lg:col-span-8">
                    <form onSubmit={updateTeacherData}>
                        <div className="grid grid-cols-12 sm:gap-5 font-primary">
                            <div className="col-span-12">
                                <div className="educare-create-school-details">
                                    <div className="educare-create-school-details-form-wrap">
                                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                            <div className="educare-school-form-action-title">
                                                <h5>
                                                    <i className="icon-man"></i>
                                                    Edit Teacher
                                                </h5>
                                            </div>
                                            <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                                <div className="grid grid-cols-12 gap-5">
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="first_name"
                                                                            value="First Name"
                                                                        />
                                                                        <sup>
                                                                            *
                                                                        </sup>
                                                                    </div>
                                                                </div>
                                                                <TextInput
                                                                    id="first_name"
                                                                    value={
                                                                        data.first_name
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "first_name",
                                                                            e
                                                                                .target
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
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
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
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "last_name",
                                                                            e
                                                                                .target
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
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="email"
                                                                    value="Email"
                                                                />
                                                                <TextInput
                                                                    id="email"
                                                                    value={
                                                                        data.email
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "email",
                                                                            e
                                                                                .target
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

                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
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
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "father_name",
                                                                            e
                                                                                .target
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
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
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
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "spouse_name",
                                                                            e
                                                                                .target
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

                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
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
                                                            <SelectInput2
                                                                id="gender"
                                                                data_label="Gender"
                                                                data={genders}
                                                                value={
                                                                    data.gender
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "gender",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                selectedData={
                                                                    data.gender
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.gender
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="phone"
                                                                    value="Phone"
                                                                />
                                                                <TextInput
                                                                    id="phone"
                                                                    value={
                                                                        data.phone
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "phone",
                                                                            e
                                                                                .target
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
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="grid grid-cols-12 gap-5">
                                                            {teachingTypes?.map(
                                                                (
                                                                    item,
                                                                    index
                                                                ) => (
                                                                    <div
                                                                        className="col-span-6"
                                                                        key={
                                                                            index
                                                                        }
                                                                    >
                                                                        <div className="educare-checkbox-field-styles">
                                                                            <InputLabel
                                                                                value={
                                                                                    item.title
                                                                                }
                                                                                htmlFor={
                                                                                    item.title
                                                                                }
                                                                            />
                                                                            <RadioInput
                                                                                id={
                                                                                    item.title
                                                                                }
                                                                                name="teacher_type"
                                                                                checked={
                                                                                    data.teacher_type ===
                                                                                    item.title
                                                                                }
                                                                                onChange={() =>
                                                                                    setData(
                                                                                        "teacher_type",
                                                                                        item.title
                                                                                    )
                                                                                }
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            )}
                                                            <div className="col-span-12"></div>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="state_id"
                                                                value="State"
                                                            />
                                                            <SelectInput2
                                                                id="state_id"
                                                                data_label="state_id"
                                                                data={states}
                                                                value={
                                                                    data.state_id
                                                                }
                                                                selectedData={
                                                                    data.state_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "state",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.state
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="city"
                                                                    value="City"
                                                                />
                                                                <TextInput
                                                                    id="city"
                                                                    value={
                                                                        data.city
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "city",
                                                                            e
                                                                                .target
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
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="house_id"
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
                                                                id="house_id"
                                                                data_label="house"
                                                                data={houses}
                                                                value={
                                                                    data.house_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "house_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.house_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel value="Date of Join" />
                                                            <DatePicker
                                                                id="date_of_join"
                                                                selected={
                                                                    joinDate
                                                                }
                                                                onChange={(
                                                                    date
                                                                ) =>
                                                                    setJoinDate(
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
                                                                placeholderText="Date of Join"
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel value="Date of Leave" />
                                                                <DatePicker
                                                                    id="date_of_leave"
                                                                    selected={
                                                                        leaveDate
                                                                    }
                                                                    onChange={(
                                                                        date
                                                                    ) =>
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
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel value="Date of Birth" />
                                                            <DatePicker
                                                                id="date_of_birth"
                                                                selected={
                                                                    birthDate
                                                                }
                                                                onChange={(
                                                                    date
                                                                ) =>
                                                                    setBirthDate(
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
                                                                placeholderText="Date of Birth"
                                                                className="w-full"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="category_id"
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
                                                                id="category_id"
                                                                data_label="Category"
                                                                data={
                                                                    categories
                                                                }
                                                                value={
                                                                    data.category_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "category_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.category_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="religion_id"
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
                                                                id="religion_id"
                                                                data_label="Religion"
                                                                data={religions}
                                                                value={
                                                                    data.religion_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "religion_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.religion_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="job_type"
                                                                value="Job Type"
                                                            />
                                                            <SelectInput
                                                                id="job_type"
                                                                data_label="Job Type"
                                                                data={jobTypes}
                                                                value={
                                                                    data.job_type
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "job_type",
                                                                        e.target
                                                                            .value
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

                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="department_id"
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
                                                                id="department_id"
                                                                data_label="Department"
                                                                data={
                                                                    departments
                                                                }
                                                                value={
                                                                    data.department_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "department_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.department_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="designation_id"
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
                                                                id="designation_id"
                                                                data_label="Designation"
                                                                data={
                                                                    designations
                                                                }
                                                                value={
                                                                    data.designation_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "designation_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.designation_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="blood_group_id"
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
                                                                id="blood_group_id"
                                                                data_label="Blood Group"
                                                                data={
                                                                    bloodGroups
                                                                }
                                                                value={
                                                                    data.blood_group_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "blood_group_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.blood_group_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
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
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "pan_number",
                                                                            e
                                                                                .target
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
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
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
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "employee_id",
                                                                            e
                                                                                .target
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
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
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
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "qualification",
                                                                            e
                                                                                .target
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

                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
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
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "voter_card_no",
                                                                            e
                                                                                .target
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
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="aadhar_card_no"
                                                                    value="Adhar Card No"
                                                                />
                                                                <TextInput
                                                                    id="aadhar_card_no"
                                                                    value={
                                                                        data.aadhar_card_no
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "aadhar_card_no",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.aadhar_card_no
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="employment_category_id"
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
                                                                id="employment_category_id"
                                                                data_label="Employment"
                                                                data={empCats}
                                                                value={
                                                                    data.employment_category_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "employment_category_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.employment_category_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="teacher_category_id"
                                                                        value="Teacher Category"
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
                                                                id="teacher_category_id"
                                                                data_label="Employment"
                                                                data={staffCats}
                                                                value={
                                                                    data.teacher_category_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "teacher_category_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.teacher_category_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="teacher_sub_category_id"
                                                                        value="Teacher Sub Category"
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
                                                                id="teacher_sub_category_id"
                                                                data_label="Sub Category"
                                                                data={staffCats}
                                                                value={
                                                                    data.teacher_sub_category_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "teacher_sub_category_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.teacher_sub_category_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
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
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "oasis_id",
                                                                            e
                                                                                .target
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
                                                                    value={
                                                                        data.address
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "address",
                                                                            e
                                                                                .target
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
                                                                    htmlFor="description"
                                                                    value="Experience Details"
                                                                />
                                                                <TextareaInput
                                                                    id="description"
                                                                    value={
                                                                        data.description
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "description",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.description
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
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
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "bank_name",
                                                                            e
                                                                                .target
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
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
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
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "bank_account_no",
                                                                            e
                                                                                .target
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
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="uan"
                                                                    value="UAN"
                                                                />
                                                                <TextInput
                                                                    id="uan"
                                                                    value={
                                                                        data.uan
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "uan",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.uan
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="ifsc"
                                                                    value="IFSC"
                                                                />
                                                                <TextInput
                                                                    id="ifsc"
                                                                    value={
                                                                        data.ifsc
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "ifsc",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.ifsc
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="pf_account_number"
                                                                    value="PF Account Number"
                                                                />
                                                                <TextInput
                                                                    id="pf_account_number"
                                                                    value={
                                                                        data.pf_account_number
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "pf_account_number",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.pf_account_number
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="experience_year"
                                                                    value="Year of Experience"
                                                                />
                                                                <TextInput
                                                                    id="experience_year"
                                                                    value={
                                                                        data.experience_year
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "experience_year",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.experience_year
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 xxxl:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="esic_no"
                                                                    value="ESIC No."
                                                                />
                                                                <TextInput
                                                                    id="esic_no"
                                                                    value={
                                                                        data.esic_no
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "esic_no",
                                                                            e
                                                                                .target
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
                        <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end">
                            <PrimaryButton
                                onClick={handleCancel}
                                type="button"
                                className="educare-gray-btn-lg-stroke"
                            >
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton
                                type="submit"
                                disabled={processing}
                                className="educare-primary-btn-lg-fill"
                            >
                                Update
                            </PrimaryButton>
                        </div>
                    </form>
                </div>
                <div className="col-span-12 minMax2Xl:col-span-4 lg:col-span-4">
                    <form onSubmit={updatePasswordData}>
                        <div className="grid grid-cols-12 sm:gap-5 font-primary">
                            <div className="col-span-12">
                                <div className="educare-create-school-details">
                                    <div className="educare-create-school-details-form-wrap">
                                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                            <div className="educare-school-form-action-title">
                                                <h5>
                                                    <i className="icon-man"></i>
                                                    Change Password
                                                </h5>
                                            </div>
                                            <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                                <div className="grid grid-cols-12 gap-5">
                                                    <div className="col-span-12">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="new_password"
                                                                        value="New Password"
                                                                    />
                                                                    <sup>*</sup>
                                                                </div>
                                                            </div>
                                                            <TextInput
                                                                id="new_password"
                                                                value={
                                                                    data.new_password
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "new_password",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                type="password"
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.new_password
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
                                                                        htmlFor="confirm_password"
                                                                        value="Confirm Password"
                                                                    />
                                                                    <sup>*</sup>
                                                                </div>
                                                            </div>
                                                            <TextInput
                                                                id="confirm_password"
                                                                value={
                                                                    data.confirm_password
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "confirm_password",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                type="text"
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.confirm_password
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12">
                                                        <div className="flex flex-wrap gap-4 justify-end">
                                                            <PrimaryButton
                                                                disabled={
                                                                    processing
                                                                }
                                                                className="educare-gray-btn-md-stroke"
                                                            >
                                                                Cancel
                                                            </PrimaryButton>
                                                            <PrimaryButton
                                                                disabled={
                                                                    processing
                                                                }
                                                                className="educare-primary-btn-md-fill"
                                                            >
                                                                Update
                                                            </PrimaryButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form onSubmit={updateProfileImageData}>
                        <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                            <div className="col-span-12">
                                <div className="educare-create-school-details">
                                    <div className="educare-create-school-details-form-wrap">
                                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                            <div className="educare-school-form-action-title">
                                                <h5>
                                                    <i className="icon-man"></i>
                                                    Change Profile Image
                                                </h5>
                                            </div>
                                            <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                                <div className="grid grid-cols-12 gap-5">
                                                    <div className="col-span-12">
                                                        <div className="educare-student-parent-profile-image">
                                                            <label htmlFor="update_profile_image">
                                                                <img
                                                                    src={
                                                                        placeholderImage
                                                                    }
                                                                    alt="img not found"
                                                                />
                                                            </label>
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-type-file-styles">
                                                                    <input
                                                                        id="update_profile_image"
                                                                        type="file"
                                                                        name="update_profile_image"
                                                                        onChange={(
                                                                            e
                                                                        ) =>
                                                                            setData(
                                                                                "update_profile_image",
                                                                                e
                                                                                    .target
                                                                                    .files[0]
                                                                            )
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12">
                                                        <div className="flex flex-wrap gap-4 justify-end">
                                                            <PrimaryButton
                                                                disabled={
                                                                    processing
                                                                }
                                                                className="educare-gray-btn-md-stroke"
                                                            >
                                                                Cancel
                                                            </PrimaryButton>
                                                            <PrimaryButton
                                                                disabled={
                                                                    processing
                                                                }
                                                                className="educare-primary-btn-md-fill"
                                                            >
                                                                Update
                                                            </PrimaryButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <form onSubmit={updateUserData}>
                        <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                            <div className="col-span-12">
                                <div className="educare-create-school-details">
                                    <div className="educare-create-school-details-form-wrap">
                                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                            <div className="educare-school-form-action-title">
                                                <h5>
                                                    <i className="icon-man"></i>
                                                    Change User Name
                                                </h5>
                                            </div>
                                            <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                                <div className="grid grid-cols-12 gap-5">
                                                    <div className="col-span-12">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="old_user_name"
                                                                        value="Old User Name"
                                                                    />
                                                                    <sup>*</sup>
                                                                </div>
                                                            </div>
                                                            <TextInput
                                                                id="old_user_name"
                                                                value={
                                                                    data.old_user_name
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "old_user_name",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.old_user_name
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
                                                                        htmlFor="new_user_name"
                                                                        value="New User Name"
                                                                    />
                                                                    <sup>*</sup>
                                                                </div>
                                                            </div>
                                                            <TextInput
                                                                id="new_user_name"
                                                                value={
                                                                    data.new_user_name
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "new_user_name",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.new_user_name
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12">
                                                        <div className="flex flex-wrap gap-4 justify-end">
                                                            <PrimaryButton
                                                                disabled={
                                                                    processing
                                                                }
                                                                className="educare-gray-btn-md-stroke"
                                                            >
                                                                Cancel
                                                            </PrimaryButton>
                                                            <PrimaryButton
                                                                disabled={
                                                                    processing
                                                                }
                                                                className="educare-primary-btn-md-fill"
                                                            >
                                                                Update
                                                            </PrimaryButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default TeacherEditForm;
