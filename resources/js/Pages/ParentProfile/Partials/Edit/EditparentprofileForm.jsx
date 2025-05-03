import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Link, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditparentprofileForm = ({
    parentData,
    states
}) => {

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        //My Details field
        parent_id: "",
        first_name: "",
        middle_name: "",
        last_name: "",
        email: "",
        phone: "",
        highest_qualification: "",
        occupation: "",
        company_name: "",
        department: "",
        aadhar_card_no: "",
        pan_card_no: "",
        //Spouse Details field
        spouse_id: "",
        sp_first_name: "",
        sp_last_name: "",
        sp_email: "",
        sp_phone: "",
        sp_highest_qualification: "",
        sp_occupation: "",
        sp_company_name: "",
        sp_department: "",
        sp_aadhar_card_no: "",
        sp_pan_card_no: "",
        //Present Address field
        present_address: "",
        present_city: "",
        present_state_id: "",
        present_pin_code: "",
        //Permanent Address field
        permanent_address: "",
        permanent_city: "",
        permanent_state_id: "",
        permanent_pin_code: "",

    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            //My Details
            parent_id: parentData?.id ?? "",
            first_name: parentData?.first_name ?? "",
            middle_name: parentData?.middle_name ?? "",
            last_name: parentData?.last_name ?? "",
            email: parentData?.email ?? "",
            phone: parentData?.phone ?? "",
            highest_qualification: parentData?.highest_qualification ?? "",
            occupation: parentData?.occupation ?? "",
            company_name: parentData?.company_name ?? "",
            department: parentData?.department ?? "",
            aadhar_card_no: parentData?.aadhar_card_no ?? "",
            pan_card_no: parentData?.pan_card_no ?? "",
            //Spouse
            spouse_id: parentData?.spouse?.id ?? "",
            sp_first_name: parentData?.spouse?.first_name ?? "",
            sp_last_name: parentData?.spouse?.last_name ?? "",
            sp_email: parentData?.spouse?.email ?? "",
            sp_phone: parentData?.spouse?.phone ?? "",
            sp_highest_qualification: parentData?.spouse?.highest_qualification ?? "",
            sp_occupation: parentData?.spouse?.occupation ?? "",
            sp_company_name: parentData?.spouse?.company_name ?? "",
            sp_department: parentData?.spouse?.department ?? "",
            sp_aadhar_card_no: parentData?.spouse?.aadhar_card_no ?? "",
            sp_pan_card_no: parentData?.spouse?.pan_card_no ?? "",
            //Present  Address
            present_address: parentData?.address ?? "",
            present_city: parentData?.city ?? "",
            present_state_id: "",
            present_pin_code: "",
            //Permanent Address
            permanent_address: parentData?.address ?? "",
            permanent_city: parentData?.city ?? "",
            permanent_state_id: "",
            permanent_pin_code: "",
        }));
    }, [parentData]);


    const updateParentDetailsData = (e) => {
        e.preventDefault();

        put(route('parent_profile.update'), {
            onSuccess: () => {

            },
            onError: (errors) => {
                for (const key in errors) {
                    if (key == 'parent_id' || key == 'spouse_id') {
                        toast.error("Something goes wrong. Try reloading the page.", {
                            position: 'top-right',
                            autoClose: 1500,
                        });

                        break;
                    }
                }
            },
        })
    };


    return (
        <div className="educare-create-school-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={updateParentDetailsData}>
                <div className="grid grid-cols-12 gap-5 font-primary">
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-BookBookmark"></i>
                                        My Details
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
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
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.first_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
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
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.middle_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
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
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.last_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
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
                                                    onChange={(e) =>
                                                        setData(
                                                            "email",
                                                            e.target.value
                                                        )
                                                    }
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
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="phone"
                                                    value="Mobile"
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
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="highest_qualification"
                                                    value="Highest Qualification"
                                                />
                                                <TextInput
                                                    id="highest_qualification"
                                                    value={
                                                        data.highest_qualification
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "highest_qualification",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.highest_qualification
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="occupation"
                                                    value="Occupation"
                                                />
                                                <TextInput
                                                    id="occupation"
                                                    value={
                                                        data.occupation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "occupation",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.occupation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="company_name"
                                                    value="Company Name"
                                                />
                                                <TextInput
                                                    id="company_name"
                                                    value={
                                                        data.company_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "company_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.company_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="department"
                                                    value="Department"
                                                />
                                                <TextInput
                                                    id="department"
                                                    value={
                                                        data.department
                                                    }
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
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="aadhar_card_no"
                                                    value="Aadhar Card No."
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
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.aadhar_card_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="pan_card_no"
                                                    value="Pan Card No."
                                                />
                                                <TextInput
                                                    id="pan_card_no"
                                                    value={
                                                        data.pan_card_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "pan_card_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.pan_card_no
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
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-BookBookmark"></i>
                                        Spouse Details
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_first_name"
                                                    value="First Name"
                                                />
                                                <TextInput
                                                    id="sp_first_name"
                                                    value={
                                                        data.sp_first_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_first_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_first_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_last_name"
                                                    value="Last Name"
                                                />
                                                <TextInput
                                                    id="sp_last_name"
                                                    value={
                                                        data.sp_last_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_last_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_middle_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_email"
                                                    value="Email"
                                                />
                                                <TextInput
                                                    id="sp_email"
                                                    value={
                                                        data.sp_email
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_email",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_email
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_phone"
                                                    value="Mobile"
                                                />
                                                <TextInput
                                                    id="sp_phone"
                                                    value={
                                                        data.sp_phone
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_phone",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_phone
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_highest_qualification"
                                                    value="Highest Qualification"
                                                />
                                                <TextInput
                                                    id="sp_highest_qualification"
                                                    value={
                                                        data.sp_highest_qualification
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_highest_qualification",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_highest_qualification
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_occupation"
                                                    value="Occupation"
                                                />
                                                <TextInput
                                                    id="sp_occupation"
                                                    value={
                                                        data.sp_occupation
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_occupation",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_occupation
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_company_name"
                                                    value="Company Name"
                                                />
                                                <TextInput
                                                    id="sp_company_name"
                                                    value={
                                                        data.sp_company_name
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_company_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_company_name
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_department"
                                                    value="Department"
                                                />
                                                <TextInput
                                                    id="sp_department"
                                                    value={
                                                        data.sp_department
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_department",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_department
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_aadhar_card_no"
                                                    value="Aadhar Card No."
                                                />
                                                <TextInput
                                                    id="sp_aadhar_card_no"
                                                    value={
                                                        data.sp_aadhar_card_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_aadhar_card_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_aadhar_card_no
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="sp_pan_card_no"
                                                    value="Pan Card No."
                                                />
                                                <TextInput
                                                    id="sp_pan_card_no"
                                                    value={
                                                        data.sp_pan_card_no
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "sp_pan_card_no",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.sp_pan_card_no
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
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-BookBookmark"></i>
                                        Present Address
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="present_address"
                                                    value="Address"
                                                />
                                                <TextInput
                                                    id="present_address"
                                                    value={
                                                        data.present_address
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "present_address",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.present_address
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="present_city"
                                                    value="City"
                                                />
                                                <TextInput
                                                    id="present_city"
                                                    value={
                                                        data.present_city
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "present_city",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.present_city
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="present_state_id"
                                                    value="State"
                                                />
                                                <SelectInput
                                                    id="present_state_id"
                                                    data_label="State"
                                                    data={states}
                                                    value={
                                                        data.present_state_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "present_state_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.present_state_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="present_pin_code"
                                                    value="Pin Code"
                                                />
                                                <TextInput
                                                    id="present_pin_code"
                                                    value={
                                                        data.present_pin_code
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "present_pin_code",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.present_pin_code
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
                    <div className="lg:col-span-6 col-span-12">
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-BookBookmark"></i>
                                        Permanent Address
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="permanent_address"
                                                    value="Address"
                                                />
                                                <TextInput
                                                    id="permanent_address"
                                                    value={
                                                        data.permanent_address
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "permanent_address",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.permanent_address
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="permanent_city"
                                                    value="City"
                                                />
                                                <TextInput
                                                    id="permanent_city"
                                                    value={
                                                        data.permanent_city
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "permanent_city",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.permanent_city
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="permanent_state_id"
                                                    value="State"
                                                />
                                                <SelectInput
                                                    id="permanent_state_id"
                                                    data_label="State"
                                                    data={states}
                                                    value={
                                                        data.permanent_state_id
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "permanent_state_id",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.permanent_state_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="permanent_pin_code"
                                                    value="Pin Code"
                                                />
                                                <TextInput
                                                    id="permanent_pin_code"
                                                    value={
                                                        data.permanent_pin_code
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "permanent_pin_code",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block cursor-not-allowed"
                                                    disabled={true}
                                                />
                                                <InputError
                                                    message={
                                                        errors.permanent_pin_code
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
                <div className="educare-button-field-styles mt-5 flex flex-wrap gap-4 justify-end">
                    <Link
                        className="educare-gray-btn-lg-stroke"
                        href={route('parent_profile.edit')}
                    >
                        Reset
                    </Link>
                    <PrimaryButton
                        className="educare-primary-btn-lg-fill"
                        type="submit"
                    >
                        Save
                    </PrimaryButton>
                </div>
            </form>
        </div>
    );
};

export default EditparentprofileForm;
