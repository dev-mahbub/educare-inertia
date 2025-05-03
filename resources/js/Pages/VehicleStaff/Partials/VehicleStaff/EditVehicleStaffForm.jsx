import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextareaInput from "@/Components/TextareaInput";
import TextInput from "@/Components/TextInput";
import { concatName } from "@/Hooks/GlobalFunction";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import Swal from "sweetalert2";
import placeholderImage from "../../../../../images/icon/placeholder.jpg";
import VehicleStaffCredentialPopup from "./Popup/VehicleStaffCredentialPopup";

export default function EditVehicleStaffForm({
    driverType,
    driverProofType,
    genderArr,
    drivers,
    driverId
}) {

    const [staffCredentialPopup, setStaffCredentialPopup] = useState(false);
    const handleCredentialModalClick = () => {
        setStaffCredentialPopup(!staffCredentialPopup);
    };

    const [imageSrc, setImageSrc] = useState(driverId?.vehicle_staff_image?.path);

    const status = [
        { id: 'Active', title: 'Active' },
        { id: 'Inactive', title: 'Inactive' },
    ];

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        id: driverId?.id,
        first_name: driverId?.first_name,
        last_name: driverId?.last_name,
        type: driverId?.type,
        birth_date_at: driverId?.birth_date_at,
        gender: driverId?.gender,
        age: driverId?.age,
        blood_group: driverId?.blood_group,
        contact: driverId?.contact,
        emergency_no: driverId?.emergency_no,
        driving_license: driverId?.driving_license,
        proof_type: driverId?.proof_type,
        proof_no: driverId?.proof_no,
        experience: driverId?.experience,
        relative_name: driverId?.relative_name,
        pincode: driverId?.pincode,
        city: driverId?.city,
        state: driverId?.state,
        address: driverId?.address,
        status: driverId?.status,
        image: "image",
        driver_image: null,
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            id: driverId?.id ?? '',
            first_name: driverId?.first_name ?? '',
            last_name: driverId?.last_name ?? '',
            type: driverId?.type ?? '',
            birth_date_at: driverId?.birth_date_at ?? '',
            gender: driverId?.gender ?? '',
            age: driverId?.age ?? '',
            blood_group: driverId?.blood_group ?? '',
            contact: driverId?.contact ?? '',
            emergency_no: driverId?.emergency_no ?? '',
            driving_license: driverId?.driving_license ?? '',
            proof_type: driverId?.proof_type ?? '',
            proof_no: driverId?.proof_no ?? '',
            experience: driverId?.experience ?? '',
            relative_name: driverId?.relative_name ?? '',
            pincode: driverId?.pincode ?? '',
            city: driverId?.city ?? '',
            state: driverId?.state ?? '',
            address: driverId?.address ?? '',
            status: driverId?.status ?? '',
            image: "image",
            driver_image: null
        }));

        setImageSrc(driverId?.vehicle_staff_image?.path)
    }, [driverId]);

    const handleAdmissionSourceData = (e) => {
        e.preventDefault();
        post(route("vehicle_staff.update"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageSrc(reader.result);
            };
            reader.readAsDataURL(file);
        }
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
                router.delete(route('vehicle_staff.destroy', id));
            }
        });
    }

    const handleReset = () => {
        // setData({
        //     first_name: "",
        //     last_name: "",
        //     type: "",
        //     birth_date_at: "",
        //     gender: "",
        //     age: "",
        //     blood_group: "",
        //     contact: "",
        //     emergency_no: "",
        //     driving_license: "",
        //     proof_type: "",
        //     proof_no: "",
        //     experience: "",
        //     relative_name: "",
        //     pincode: "",
        //     city: "",
        //     state: "",
        //     address: "",
        //     status: "",
        //     driver_image: "",
        // })
        router.get(route('vehicle_staff.list'));
    }

    //  handle edit start
    const handleEdit = (id) => {
        router.post(route('vehicle_staff.edit'), { id: id });
    }
    //  handle edit end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-7 xl:col-span-7 col-span-12">
                        <div className="grid grid-cols-12 gap-2.5">
                            <div className="sm:col-span-4 minMax2Xl:col-span-6 minMaxLg:col-span-6 col-span-12">
                                <div className="educare-card-title leading-none">
                                    <h5>
                                        <i className="icon-UserRectangle"></i>
                                        Edit Vehicle Staff
                                    </h5>
                                </div>
                            </div>
                            {/* <div className="sm:col-span-4 minMax2Xl:col-span-3 minMaxLg:col-span-3 col-span-12">
                                <div className="educare-input-field-styles">
                                    <SelectInput
                                        id="all_type"
                                        data_label="All Type"
                                        data={[]}
                                        value={
                                            data.all_type
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "all_type",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.all_type
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="sm:col-span-4 minMax2Xl:col-span-3 minMaxLg:col-span-3 col-span-12">
                                <div className="educare-input-field-styles">
                                    <SelectInput
                                        id="all_status"
                                        data_label="All Status"
                                        data={[]}
                                        value={
                                            data.all_status
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "all_status",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.all_status
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div> */}
                        </div>
                        <div className="educare-admission-list pb-none mt-2">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Gender</th>
                                        <th>Type</th>
                                        <th>Contact No.</th>
                                        <th>DOB</th>
                                        <th>Blood group</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {drivers?.length > 0 ?
                                        drivers?.map((item, index) => (
                                            <tr key={index}>
                                                <td className="flex items-center">
                                                    <span className="mr-3">{concatName(item?.first_name, item?.last_name)}</span>

                                                    {item?.vehicle_staff_image?.path != null &&
                                                        <img src={item.vehicle_staff_image.path} className="w-[40px] h-[40px]" />
                                                    }
                                                </td>
                                                <td>{item?.gender}</td>
                                                <td>{item?.type}</td>
                                                <td>{item?.contact}</td>
                                                <td>{item?.birth_date_at && moment(item?.birth_date_at).format("DD MMM, YYYY")}</td>
                                                <td>{item?.blood_group}</td>
                                                <td>
                                                    <span className='badge success'>{item?.status}</span>
                                                </td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Edit"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    onClick={() => {
                                                                        handleEdit(item?.id)
                                                                    }}
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-editing"></i>
                                                                </button>
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
                                                                    onClick={() => handleDelete(item.id)}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>

                                                    </div>
                                                </td>
                                            </tr>

                                        )) :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="12">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="lg:col-span-5 xl:col-span-5 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="grid grid-cols-12 gap-4 mb-3">
                                    <div className="col-span-12">
                                        <div className="educare-card-title leading-none">
                                            <h5>
                                                <i className="icon-UserRectangle"></i>
                                                Edit Vehicle Staff
                                            </h5>
                                        </div>
                                    </div>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAdmissionSourceData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12">
                                                <div className="educare-student-parent-profile-image w-[66%] maxXs:w-full">
                                                    <label htmlFor="image">
                                                        {
                                                            imageSrc ?
                                                                <img
                                                                    src={imageSrc}
                                                                    alt="img not found"
                                                                /> : <img
                                                                    src={placeholderImage}
                                                                    alt="img not found"
                                                                />
                                                        }
                                                    </label>
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-type-file-styles">
                                                            <input
                                                                id="driver_image"
                                                                type="file"
                                                                name="driver_image"
                                                                accept="image/*"
                                                                onChange={(e) => {
                                                                    setData(
                                                                        "driver_image",
                                                                        e.target
                                                                            .files[0]
                                                                    )
                                                                    handleImageChange(e);
                                                                }
                                                                }
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.driver_image
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
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
                                                            data?.first_name
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
                                                            errors?.first_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="last_name"
                                                                value="Last Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="last_name"
                                                        value={
                                                            data?.last_name
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
                                                            errors?.last_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="type"
                                                                value="Type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="type"
                                                        data_label="Class"
                                                        data={driverType}
                                                        value={
                                                            data?.type
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="birth_date_at"
                                                                value="DOB"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={data.birth_date_at && new Date(data.birth_date_at)}
                                                        onChange={(date) =>
                                                            setData(
                                                                "birth_date_at",
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
                                                        className="w-full"
                                                        required
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.birth_date_at
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
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
                                                        data_label="Class"
                                                        data={genderArr}
                                                        value={
                                                            data?.gender
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
                                                            errors?.gender
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="age"
                                                                value="Age"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="age"
                                                        value={
                                                            data?.age
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "age",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.age
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="blood_group"
                                                                value="Blood Group"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="blood_group"
                                                        value={
                                                            data?.blood_group
                                                        }
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
                                                            errors?.blood_group
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="contact"
                                                                value="Contact No"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="contact"
                                                        value={
                                                            data?.contact
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "contact",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.contact
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="emergency_no"
                                                        value="Emergency No."
                                                    />
                                                    <TextInput
                                                        id="emergency_no"
                                                        value={
                                                            data?.emergency_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "emergency_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.emergency_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="status"
                                                                value="Status"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="status"
                                                        data_label="status"
                                                        data={status}
                                                        value={
                                                            data?.status
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "status",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.status
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="driving_license"
                                                        value="Driving License"
                                                    />
                                                    <TextInput
                                                        id="driving_license"
                                                        value={
                                                            data?.driving_license
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "driving_license",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.driving_license
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="proof_type"
                                                                value="Proof Type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="proof_type"
                                                        data_label="Class"
                                                        data={driverProofType}
                                                        value={
                                                            data?.proof_type
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "proof_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.proof_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="proof_no"
                                                                value="Proof No."
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="proof_no"
                                                        value={
                                                            data?.proof_no
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "proof_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.proof_no
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="experience"
                                                        value="Experience"
                                                    />
                                                    <TextInput
                                                        id="experience"
                                                        value={
                                                            data?.experience
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "experience",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.experience
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="relative_name"
                                                        value="Relative Name"
                                                    />
                                                    <TextInput
                                                        id="relative_name"
                                                        value={
                                                            data?.relative_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "relative_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.relative_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="pincode"
                                                        value="Pincode"
                                                    />
                                                    <TextInput
                                                        id="pincode"
                                                        value={
                                                            data?.pincode
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "pincode",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.pincode
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="city"
                                                                value="City"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="city"
                                                        value={
                                                            data?.city
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
                                                            errors?.city
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 sm:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="state"
                                                                value="State"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="state"
                                                        value={
                                                            data?.state
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "state",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.state
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="address"
                                                        value="Address"
                                                    />
                                                    <TextareaInput
                                                        id="address"
                                                        value={
                                                            data?.address
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
                                                            errors?.address
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                        type="submit"
                                                        disabled={processing}
                                                    >
                                                        Update
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                        onClick={(e) => handleReset()}
                                                        type="button"

                                                    >
                                                        Reset
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
            <VehicleStaffCredentialPopup
                staffCredentialPopup={staffCredentialPopup}
                setStaffCredentialPopup={setStaffCredentialPopup}
            />
        </>
    );
}
