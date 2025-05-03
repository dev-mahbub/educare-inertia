import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import placeholderImage from "../../../../../images/icon/placeholder.jpg";

const StaffEditForm = ({
    staff,
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
    customFields
}) => {
    const [birthDate, setBirthDate] = useState(new Date(staff.birth_date_at));
    const [joinDate, setJoinDate] = useState(new Date(staff.join_date_at));
    const [leaveDate, setLeaveDate] = useState(new Date(staff.leave_date_at));
    const [passErr, setPassErr] = useState("");
    const [selectedImage, setSelectedImage] = useState(staff?.staff_profile_image?.path);

    const [customFieldData, setCustomFieldData] = useState(customFields);
    const [customFieldErrors, setCustomFieldErrors] = useState({});

    const { data, setData, errors, put, reset, processing } = useForm({
        user_roll_type: staff.user_roll_type,
        state_id: staff.state_id,
        house_id: staff.house_id,
        category_id: staff.category_id,
        religion_id: staff.religion_id,
        department_id: staff.department_id,
        designation_id: staff.designation_id,
        blood_group_id: staff.blood_group_id,
        employee_id: staff.employee_id,
        employment_category_id: staff.employment_category_id,
        staff_category_id: staff.staff_category_id,
        staff_sub_category_id: staff.staff_sub_category_id,
        staff_type: staff.staff_type,
        first_name: staff.first_name,
        middle_name: staff.middle_name,
        last_name: staff.last_name,
        phone: staff.phone,
        email: staff.email,
        father_name: staff.father_name,
        spouse_name: staff.spouse_name,
        gender: staff.gender,
        city: staff.city,
        join_date_at: staff.join_date_at,
        leave_date_at: staff.leave_date_at,
        birth_date_at: staff.birth_date_at,
        job_type: staff.job_type,
        pan_number: staff.pan_number,
        qualification: staff.qualification,
        voter_card_no: staff.voter_card_no,
        aadhar_card_no: staff.aadhar_card_no,
        oasis_id: staff.oasis_id,
        address: staff.address,
        description: staff.description,
        bank_name: staff.bank_name,
        bank_account_no: staff.bank_account_no,
        uan: staff.uan,
        ifsc: staff.ifsc,
        pf_account_number: staff.pf_account_number,
        experience_year: staff.experience_year,
        esic_no: staff.esic_no,
        user_id: staff.user_id,
        old_username: staff.username,
        username: "",
        update_profile_image: "",

        // custom fields
        custom_fields: customFieldData
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            custom_fields: customFieldData?.map(item => ({
                id: item?.id,
                value: item?.value
            }))
        }));
    }, [customFieldData]);

    const updateStaffData = (e) => {
        e.preventDefault();
        data.join_date_at = joinDate;
        data.leave_date_at = leaveDate;
        data.birth_date_at = birthDate;
        put(route("staff.update", staff.id), data, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    // update password
    const [passwordData, setPasswordData] = useState({
        user_id: staff.user_id,
        new_password: "",
        confirm_password: "",
    });

    const cancelPassword = (e) => {
        e.preventDefault();
        setPasswordData({
            ...passwordData,
            new_password: "",
            confirm_password: "",
        });
    }

    const updatePasswordData = () => {
        if (passwordData.new_password.length < 1) {
            setPassErr("Password required");
            return;
        }
        if (passwordData.new_password.length < 8) {
            setPassErr("Password at least 8 characters");
            return;
        }
        if (passwordData.new_password !== passwordData.confirm_password) {
            setPassErr("Password and confirm password are not match");
            return;
        }
        router.post(route("staff.update_password"), passwordData);
        setPassErr(" ");
    };

    const updateProfileImageData = (e) => {
        e.preventDefault();
        post(route("student.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    //update user
    const [userData, setUserData] = useState({
        user_id: staff.user_id,
        old_user_name: staff.username,
        new_user_name: "",
    });

    const handleUserCancel = (e) => {
        setUserData({
            ...userData,
            new_user_name: "",
        });
    }

    // Function to handle file input change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCancelImage = (e) => {
        e.preventDefault();
        setSelectedImage(null);
        setData({
            ...data,
            update_profile_image: null,
        })
    }

    const handleUpdateImage = (e) => {
        e.preventDefault();
        router.post(route('staff.update_profile_image'), { image: data.update_profile_image, staff_id: staff.id });
    }

    const updateUserNameData = (e) => {
        e.preventDefault();
        router.post(route("staff.update_user"), userData);
    };

    useEffect(() => {
        setUserData({
            ...userData,
            old_user_name: staff.username,
            new_user_name: "",
        });
    }, [staff.username]);

    const updateUserData = (e) => {
        let hasError = false;
        const custom_field_errors = {};

        customFieldData?.forEach(item => {
            if (item?.is_required && item?.value == '') {
                hasError = true;

                custom_field_errors[`${item?.id}_${item?.name}`] = 'required';
            }
        });

        setCustomFieldErrors(custom_field_errors);

        if (hasError == false) {
            router.post(route("staff.update_user"), userData);
        }
    };

    const handleCancel = () => {
        router.get(route("staff.list"));
    };

    // handle change custom field value start
    const handleChangeCustomFieldValue = (id, value) => {
        setCustomFieldData(customFieldData?.map(item => ({
            ...item,
            value: item?.id == id ? value : item?.value
        })));
    }
    // handle change custom field value end

    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 minMax2Xl:col-span-8 lg:col-span-8">
                    <form onSubmit={updateStaffData}>
                        <div className="grid grid-cols-12 sm:gap-5 font-primary">
                            <div className="col-span-12">
                                <div className="educare-create-school-details">
                                    <div className="educare-create-school-details-form-wrap">
                                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                            <div className="educare-school-form-action-title">
                                                <h5>
                                                    <i className="icon-man"></i>
                                                    Edit Staff
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="middle_name"
                                                                    value="Middle Name"
                                                                />
                                                                <TextInput
                                                                    id="middle_name"
                                                                    value={
                                                                        data.middle_name
                                                                    }
                                                                    onChange={(
                                                                        e
                                                                    ) =>
                                                                        setData(
                                                                            "middle_name",
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.middle_name
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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
                                                    {/* hg */}
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="user_roll_type"
                                                                        value="Role"
                                                                    />
                                                                    <sup>*</sup>
                                                                </div>
                                                            </div>
                                                            <SelectInput
                                                                id="user_roll_type"
                                                                data_label="Role"
                                                                data={userRolls}
                                                                value={
                                                                    data.user_roll_type
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "user_roll_type",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.user_roll_type
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
                                                                        htmlFor="gender"
                                                                        value="Gender"
                                                                    />
                                                                    <sup>*</sup>
                                                                </div>
                                                            </div>
                                                            <SelectInput
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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
                                                                                name="staff_type"
                                                                                checked={
                                                                                    data.staff_type ===
                                                                                    item.title
                                                                                }
                                                                                onChange={() =>
                                                                                    setData(
                                                                                        "staff_type",
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

                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="state_id"
                                                                value="State"
                                                            />
                                                            <SelectInput
                                                                id="state_id"
                                                                data_label="state"
                                                                data={states}
                                                                value={
                                                                    data.state_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "state_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.state_id
                                                                }
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="house_id"
                                                                        value="House"
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('house.list')}
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                    target="_blank"
                                                                >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add
                                                                </a>
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

                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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

                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="category"
                                                                        value="Category"
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('category_caste.list')}
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                    target="_blank"
                                                                >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add
                                                                </a>
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="house_id"
                                                                        value="Religion"
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('religion.list')}
                                                                    target="_blank"
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add
                                                                </a>
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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

                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="department_id"
                                                                        value="Department"
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('department.list')}
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                    target="_blank"
                                                                >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add
                                                                </a>
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="designation_id"
                                                                        value="Designation"
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('designation.list')}
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                    target="_blank"
                                                                >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add
                                                                </a>
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="blood_group_id"
                                                                        value="Blood Group"
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('blood_group.list')}
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                    target="_blank"
                                                                >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add
                                                                </a>
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
                                                                    type="number"
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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

                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="staff_category_id"
                                                                        value="Staff Category"
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('category.staff_create_list')}
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                    target="_blank" >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add
                                                                </a>
                                                            </div>
                                                            <SelectInput
                                                                id="staff_category_id"
                                                                data_label="Employment"
                                                                data={staffCats}
                                                                value={
                                                                    data.staff_category_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "staff_category_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.staff_category_id
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
                                                                        htmlFor="staff_sub_category_id"
                                                                        value="Staff Sub Category"
                                                                    />
                                                                </div>
                                                                <a
                                                                    href={route('category.staff_create_list')}
                                                                    className="educare-secondary-btn-sm-stroke"
                                                                    target="_blank" >
                                                                    <i className="icon-PlusCircle"></i>{" "}
                                                                    Add
                                                                </a>
                                                            </div>
                                                            <SelectInput
                                                                id="staff_sub_category_id"
                                                                data_label="Sub Category"
                                                                data={staffCats}
                                                                value={
                                                                    data.staff_sub_category_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "staff_sub_category_id",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.staff_sub_category_id
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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

                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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
                                                    <div className="col-span-12 lg:col-span-4 md:col-span-6">
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

                                                    {customFieldData?.map((item, index) => (
                                                        <div className="col-span-12 lg:col-span-4 md:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor={item?.name}
                                                                            value={item?.name}
                                                                        />
                                                                    </div>
                                                                    <a
                                                                        href={route('custom_field.list')}
                                                                        className="educare-secondary-btn-sm-stroke"
                                                                        target="_blank"
                                                                    >
                                                                        <i className="icon-PlusCircle"></i>{" "}
                                                                        Add Custom Field
                                                                    </a>
                                                                </div>

                                                                {item?.data_type == 'List' &&
                                                                    <SelectInput
                                                                        id={item?.name}
                                                                        data_label={item?.name}
                                                                        data={item?.list_values}
                                                                        value={
                                                                            item?.value
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleChangeCustomFieldValue(
                                                                                item?.id,
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        className="block"
                                                                    />
                                                                }

                                                                {item?.data_type == 'Date' &&
                                                                    <DatePicker
                                                                        selected={item?.value ? new Date(item?.value) : null}
                                                                        onChange={(date) =>
                                                                            handleChangeCustomFieldValue(item?.id, date)
                                                                        }
                                                                        showYearDropdown
                                                                        showMonthDropdown
                                                                        useShortMonthInDropdown
                                                                        showPopperArrow={false}
                                                                        peekNextMonth
                                                                        dropdownMode="select"
                                                                        isClearable
                                                                        dateFormat="dd/MM/yyyy"
                                                                        id={item?.name}
                                                                        className="w-full"
                                                                    />
                                                                }

                                                                {(item?.data_type == 'Numeric' || item?.data_type == 'Alphanumeric') &&
                                                                    <TextInput
                                                                        id={item?.name}
                                                                        value={item?.value}
                                                                        onChange={(e) =>
                                                                            handleChangeCustomFieldValue(
                                                                                item?.id,
                                                                                e.target.value
                                                                            )
                                                                        }
                                                                        type={item?.data_type == 'Numeric' ? 'number' : 'text'}
                                                                        className="block"
                                                                    />
                                                                }

                                                                <InputError
                                                                    message={
                                                                        customFieldErrors[`${item?.id}_${item?.name}`] ?? ''
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end">
                            <PrimaryButton
                                type="button"
                                onClick={handleCancel}
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
                                                    {passErr && (
                                                        <InputError
                                                            message={passErr}
                                                            className="mt-2"
                                                        />
                                                    )}

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
                                                            value={passwordData?.new_password}
                                                            onChange={(e) =>
                                                                setPasswordData({ ...passwordData, 'new_password': e.target.value })
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
                                                            value={passwordData?.confirm_password}
                                                            onChange={(e) =>
                                                                setPasswordData({ ...passwordData, 'confirm_password': e.target.value })
                                                            }
                                                            type="password"
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
                                                            type="button"
                                                            onClick={(e) => cancelPassword(e)}
                                                            className="educare-gray-btn-md-stroke"
                                                        >
                                                            Cancel
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            type="button"
                                                            onClick={
                                                                updatePasswordData
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
                                                                {
                                                                    selectedImage ? <img
                                                                        src={
                                                                            selectedImage
                                                                        }
                                                                        alt="img not found"
                                                                    />
                                                                        :
                                                                        <img
                                                                            src={
                                                                                placeholderImage
                                                                            }
                                                                            alt="img not found"
                                                                        />
                                                                }
                                                            </label>
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-type-file-styles">
                                                                    <input
                                                                        id="update_profile_image"
                                                                        type="file"
                                                                        name="update_profile_image"
                                                                        defaultValue={data?.update_profile_image}
                                                                        onChange={(e) => {
                                                                            setData(
                                                                                "update_profile_image",
                                                                                e.target
                                                                                    .files[0]
                                                                            )
                                                                            handleImageChange(e);
                                                                        }
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12">
                                                        <div className="flex flex-wrap gap-4 justify-end">
                                                            <PrimaryButton
                                                                type="button"
                                                                disabled={processing}
                                                                className="educare-gray-btn-md-stroke"
                                                                onClick={(e) => handleCancelImage(e)}
                                                            >
                                                                Cancel
                                                            </PrimaryButton>
                                                            <PrimaryButton
                                                                disabled={processing}
                                                                className="educare-primary-btn-md-fill"
                                                                type="button"
                                                                onClick={(e) => handleUpdateImage(e)}
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
                                            <form onSubmit={updateUserNameData}>
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
                                                                value={userData.old_user_name}
                                                                className="block disabled"
                                                                disabled
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.username
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
                                                                    userData.new_user_name
                                                                }
                                                                onChange={(e) =>
                                                                    setUserData(
                                                                        (
                                                                            prevUserData
                                                                        ) => ({
                                                                            ...prevUserData,
                                                                            new_user_name:
                                                                                e
                                                                                    .target
                                                                                    .value,
                                                                        })
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
                                                                type="button"
                                                                onClick={(e) => handleUserCancel(e)}
                                                                className="educare-gray-btn-md-stroke"
                                                            >
                                                                Cancel
                                                            </PrimaryButton>
                                                            <PrimaryButton
                                                                type="submit"
                                                                onClick={
                                                                    updateUserData
                                                                }
                                                                className="educare-primary-btn-md-fill"
                                                            >
                                                                Update
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
                </div>
            </div>
        </div>
    );
};

export default StaffEditForm;
