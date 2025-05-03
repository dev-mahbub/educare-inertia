import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from "@/Components/RadioInput";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { Link, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const StaffCreateForm = ({
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
    const [birthDate, setBirthDate] = useState(null)
    const [joinDate, setJoinDate] = useState(null)
    const [leaveDate, setLeaveDate] = useState(null)

    const [customFieldData, setCustomFieldData] = useState(customFields?.map(item => ({
        ...item,
        value: ''
    })));
    const [customFieldErrors, setCustomFieldErrors] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        'user_roll_type': '',
        'state_id': '',
        'house_id': '',
        'category_id': '',
        'religion_id': '',
        'department_id': '',
        'designation_id': '',
        'blood_group_id': '',
        'employee_id': '',
        'employment_category_id': '',
        'staff_category_id': '',
        'staff_sub_category_id': '',
        'staff_type': '',
        'first_name': '',
        'middle_name': '',
        'last_name': '',
        'phone': '',
        'email': '',
        'father_name': '',
        'spouse_name': '',
        'gender': '',
        'city': '',
        'join_date_at': '',
        'leave_date_at': '',
        'birth_date_at': '',
        'job_type': '',
        'pan_number': '',
        'qualification': '',
        'voter_card_no': '',
        'aadhar_card_no': '',
        'oasis_id': '',
        'address': '',
        'description': '',
        'bank_name': '',
        'bank_account_no': '',
        'uan': '',
        'ifsc': '',
        'pf_account_number': '',
        'experience_year': '',
        'esic_no': '',

        // custom fields
        custom_fields: [],
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

    const createStaffData = (e) => {
        e.preventDefault();

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
            data.join_date_at = joinDate;
            data.leave_date_at = leaveDate;
            data.birth_date_at = birthDate;

            post(route("staff.save"), {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    setBirthDate(new Date());
                    setJoinDate(new Date());
                    setLeaveDate(new Date());
                }
            });
        }
    };

    const handleReset = () => {
        reset();
        setBirthDate(new Date());
        setJoinDate(new Date());
        setLeaveDate(new Date());
    }

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
            <form onSubmit={createStaffData}>
                <div className="grid grid-cols-12 sm:gap-[20px] font-primary">
                    <div className="col-span-12">
                        <div className="educare-create-school-details">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="flex justify-between items-end">
                                        <div className="educare-school-form-action-title">
                                            <h5> <i className="icon-man"></i> Create staff</h5>
                                        </div>
                                        <div className="educare-card-back-btn text-end mb-[12px]">
                                            <Link href={route('staff.mis_report')}><i className="icon-ArrowLeft"></i> Back</Link>
                                        </div>
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
                                                            required={true}
                                                            value={
                                                                data.first_name
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "first_name",
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "middle_name",
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "last_name",
                                                                    e.target.value
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
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="email"
                                                                    value="Email"
                                                                />
                                                                {/* <sup>*</sup> */}
                                                            </div>
                                                        </div>
                                                        <TextInput
                                                            id="email"
                                                            value={
                                                                data.email
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "email",
                                                                    e.target.value
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
                                                                    e.target.value
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
                                                                    e.target.value
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
                                                        required={true}
                                                        onChange={(e) =>
                                                            setData(
                                                                "user_roll_type",
                                                                e.target.value
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
                                                                e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "phone",
                                                                    e.target.value
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
                                                    {teachingTypes?.map((item, index) => (
                                                        <div className="col-span-6" key={index}>
                                                            <div className="educare-checkbox-field-styles">
                                                                <InputLabel
                                                                    value={item.title}
                                                                    htmlFor={item.title}
                                                                />
                                                                <RadioInput
                                                                    id={item.title}
                                                                    name="staff_type"
                                                                    checked={data.staff_type === item.title}
                                                                    onChange={() => setData("staff_type", item.title)}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}
                                                    <div className="col-span-12">

                                                    </div>
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
                                                                e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "city",
                                                                    e.target.value
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
                                                                e.target.value
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
                                                    <InputLabel
                                                        value="Date of Join"
                                                    />
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
                                                        <InputLabel
                                                            value="Date of Leave"
                                                        />
                                                        <DatePicker
                                                            id="date_of_leave"
                                                            selected={leaveDate}
                                                            onChange={(date) =>
                                                                setLeaveDate(date)
                                                            }
                                                            showYearDropdown
                                                            showMonthDropdown
                                                            useShortMonthInDropdown
                                                            showPopperArrow={false}
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
                                                    <InputLabel
                                                        value="Date of Birth"
                                                    />
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
                                                        data={categories}
                                                        value={
                                                            data.category_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "category_id",
                                                                e.target.value
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
                                                                e.target.value
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
                                                        data={departments}
                                                        value={
                                                            data.department_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "department_id",
                                                                e.target.value
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
                                                        data={designations}
                                                        value={
                                                            data.designation_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "designation_id",
                                                                e.target.value
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
                                                        data={bloodGroups}
                                                        value={
                                                            data.blood_group_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "blood_group_id",
                                                                e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "pan_number",
                                                                    e.target.value
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
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "qualification",
                                                                    e.target.value
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
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "aadhar_card_no",
                                                                    e.target.value
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
                                                        <a
                                                            href={route('category.employment_create_list')}
                                                            className="educare-secondary-btn-sm-stroke"
                                                            target="_blank" >
                                                            <i className="icon-PlusCircle"></i>{" "}
                                                            Add
                                                        </a>
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
                                                                e.target.value
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
                                                                e.target.value
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
                                                                e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "oasis_id",
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "address",
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "description",
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "bank_name",
                                                                    e.target.value
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
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "uan",
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "ifsc",
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "pf_account_number",
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "experience_year",
                                                                    e.target.value
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
                                                            onChange={(e) =>
                                                                setData(
                                                                    "esic_no",
                                                                    e.target.value
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
                <div className="educare-button-field-styles mt-2.5 flex flex-wrap gap-4 justify-end border-t border-grayLight/20 pt-5">
                    <PrimaryButton
                        onClick={handleReset}
                        type="button"
                        disabled={processing}
                        className="educare-gray-btn-lg-stroke"
                    >
                        Reset
                    </PrimaryButton>
                    <PrimaryButton
                        className="educare-primary-btn-lg-fill"
                        type="submit"
                        disabled={processing}
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default StaffCreateForm;
