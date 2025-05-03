import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import RadioInput from '@/Components/RadioInput';
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import ToggleCheckboxInput from '@/Components/ToggleCheckboxInput';
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

const AdmissionProcessList = ({
    academicYears,
    admissionDataDetails,
    admissionClassroomDetails,
    academicYearId='',
}) => {
    const [classroomData, setClassroomData] = useState(admissionClassroomDetails);
    const [loading, setLoading] = useState(false);

    const [formFields, setFormFields] = useState([
        {
            class_name_id: "",
            reg_fee: "",
            min_age: "",
            max_age: "",
            on_date_at: "",
            reg_limit: "",
            adm_limit: "",
            adm_prefix: "",
            adm_postfix: "",
            is_open_offline: "",
            is_open_online: "",
            is_result: "",
        },
    ])

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        academic_year_id: academicYearId ?? "",
        title: admissionDataDetails?.title ?? "",
        registration_seed: admissionDataDetails?.registration_seed ?? "",
        start_date_at: admissionDataDetails?.start_date_at ?? "",
        end_date_at: admissionDataDetails?.end_date_at ?? "",
        contact_email: admissionDataDetails?.contact_email ?? "",
        contact_mobile: admissionDataDetails?.contact_mobile ?? "",
        is_open_or_close: admissionDataDetails?.is_open_or_close ?? "",
        is_current: admissionDataDetails?.is_current ?? "",
        is_online_registration: admissionDataDetails?.is_online_registration ?? "",
        items: admissionClassroomDetails ?? [],
    });

    const handleFormChange = (event, index, field, selectedValue) => {
        const updatedFields = [...admissionClassroomDetails];

        if (!updatedFields[index]) {
            updatedFields[index] = {
                class_name_id: "",
                reg_fee: "",
                min_age: "",
                max_age: "",
                on_date_at: "",
                reg_limit: "",
                adm_limit: "",
                adm_prefix: "",
                adm_postfix: "",
                is_open_offline: "",
                is_open_online: "",
                is_result: "",
            };
        }

        if (selectedValue) {
            updatedFields[index][field] = selectedValue;
        } else if (field === 'is_open_offline' || field === 'is_open_online' || field === 'is_result') {
            updatedFields[index][field] = event.target.checked;
        } else {
            updatedFields[index][field] = event.target.value;
        }

        setFormFields(updatedFields);

        setData((prevData) => ({
            ...prevData,
            items: updatedFields,
        }));
    };

    const admissionProcessFormData = (e) => {
        e.preventDefault();
        post(route("admission.process.save"), {
            preserveScroll: true,
            onSuccess: () => resetFormData(),
        });
    };

    const handleAcademicYear = (academic_year_id) => {
        router.post(route('admission.process'), { 'academic_year_id': academic_year_id });
        setLoading(false)
    }

    const resetFormData = () => {
        reset();
        setFormFields(
            [
                {
                    class_name_id: "",
                    reg_fee: "",
                    min_age: "",
                    max_age: "",
                    on_date_at: "",
                    reg_limit: "",
                    adm_limit: "",
                    adm_prefix: "",
                    adm_postfix: "",
                    is_open_offline: "",
                    is_open_online: "",
                    is_result: "",
                },
            ]
        );
    };

    useEffect(() => {
        reset();

        setData((prevData) => ({
            ...prevData,
            ...admissionDataDetails
        }));

        setClassroomData(admissionClassroomDetails);

        setLoading(false)
    }, [admissionDataDetails, admissionClassroomDetails]);

    return (
        <>
            <form onSubmit={admissionProcessFormData}>
                <div className='mb-5'>
                    <div className='flex-col max-w-64'>
                        <div className="educare-input-field-styles-label-wrap mb-2">
                            <div className="educare-input-field-styles-label">
                                <InputLabel
                                    htmlFor="academic_year_id"
                                    value="Academic year"
                                />
                                <sup>*</sup>
                            </div>
                        </div>
                        <div className="educare-input-field-styles">
                            <SelectInput
                                id="academic_year_id"
                                data_label="academic year"
                                data={academicYears}
                                value={
                                    data.academic_year_id
                                }
                                onChange={(e) => handleAcademicYear(e.target.value)}
                                className="block"
                            />
                            <InputError
                                message={errors.academic_year_id}
                                className="mt-2"
                            />
                        </div>
                    </div>
                </div>
                <div className="educare-common-card">
                    <div className="bg-white/50 shadow-[0_1px_2px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-wrap-border">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    htmlFor="title"
                                                    value="Admission Title"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <TextInput
                                            id="title"
                                            value={data?.title}
                                            onChange={(e) =>
                                                setData(
                                                    "title",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.title}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="registration_seed"
                                            value="Registration Seed"
                                        />
                                        <TextInput
                                            id="registration_seed"
                                            value={data?.registration_seed}
                                            onChange={(e) =>
                                                setData(
                                                    "registration_seed",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.registration_seed}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel value="Start Date" />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={data?.start_date_at && new Date(data?.start_date_at)}
                                            onChange={(date) => setData("start_date_at", date)}
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="Start date"
                                            className="w-full"
                                        />
                                        <InputError
                                            message={errors.start_date_at}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel value="End Date" />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <DatePicker
                                            selected={data?.end_date_at && new Date(data?.end_date_at)}
                                            onChange={(date) => setData("end_date_at", date)}
                                            showYearDropdown
                                            showMonthDropdown
                                            useShortMonthInDropdown
                                            showPopperArrow={false}
                                            peekNextMonth
                                            dropdownMode="select"
                                            isClearable
                                            dateFormat="dd/MM/yyyy"
                                            placeholderText="End Date"
                                            className="w-full"
                                        />
                                        <InputError
                                            message={errors.end_date_at}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="contact_email"
                                            value="Contact Email"
                                        />
                                        <TextInput
                                            id="contact_email"
                                            value={data.contact_email}
                                            onChange={(e) =>
                                                setData(
                                                    "contact_email",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.contact_email}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="contact_mobile"
                                            value="Contact mobile"
                                        />
                                        <TextInput
                                            id="contact_mobile"
                                            value={data.contact_mobile}
                                            onChange={(e) =>
                                                setData(
                                                    "contact_mobile",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.contact_mobile}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                    <div className="educare-create-school-settings-list-check">
                                        <div className="educare-radio-field-styles flex gap-3">
                                            <RadioInput
                                                name="is_open_or_close"
                                                value="Open"
                                                checked={
                                                    data.is_open_or_close === "open"
                                                }
                                                onChange={() =>
                                                    setData(
                                                        "is_open_or_close",
                                                        "open"
                                                    )
                                                }
                                            />
                                            <RadioInput
                                                name="is_open_or_close"
                                                value="Close"
                                                checked={
                                                    data.is_open_or_close === "close"
                                                }
                                                onChange={() =>
                                                    setData(
                                                        "is_open_or_close",
                                                        "close"
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 xl:col-span-4 minMaxMd:col-span-6">
                                    <div className="flex flex-wrap gap-5 sm:gap-x-10">
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="is_current"
                                                    value="Is Current :"
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="is_current"
                                                    name="is_current"
                                                    checked={data.is_current}
                                                    onChange={(e) =>
                                                        setData(
                                                            "is_current",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="is_online_registration"
                                                    value="Is Online Registration without Payment :"
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="is_online_registration"
                                                    name="is_online_registration"
                                                    checked={
                                                        data.is_online_registration
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "is_online_registration",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="educare-admission-list-area">
                    <div className="educare-admission-list-inner">
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Class Name</th>
                                            <th>Min Age</th>
                                            <th>Max Age</th>
                                            <th>On Date</th>
                                            <th>Reg. Fee</th>
                                            <th>Reg Limit</th>
                                            <th>Adm. Limit</th>
                                            <th>Adm. Prefix</th>
                                            <th>Adm. Postfix</th>
                                            <th>Is Open? (Offline)</th>
                                            <th>Is Open? (Online)</th>
                                            <th>Is Result Publish</th>
                                        </tr>
                                    </thead>

                                    {loading ?
                                        <Loader></Loader>
                                        :
                                        <tbody>
                                            {classroomData?.length > 0 ? (
                                                classroomData?.map((item, index) => (
                                                    <tr key={index} onClick={(event) => handleFormChange(event, index, "class_name_id", item.class_name_id)}>
                                                        <td>
                                                            {item.class_title}
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="min_age"
                                                                        className="block"
                                                                        value={item.min_age}
                                                                        onChange={(event) => handleFormChange(event, index, "min_age")}
                                                                        type="number"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="max_age"
                                                                        value={item.max_age}
                                                                        onChange={(event) => handleFormChange(event, index, "max_age")}
                                                                        className="block"
                                                                        type="number"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="min-w-[120px]">
                                                                <div className="educare-input-field-styles">
                                                                    <DatePicker
                                                                        selected={item.on_date_at && new Date(item.on_date_at)}
                                                                        onChange={(date) => handleFormChange(null, index, "on_date_at", date)}
                                                                        showYearDropdown
                                                                        showMonthDropdown
                                                                        useShortMonthInDropdown
                                                                        showPopperArrow={false}
                                                                        peekNextMonth
                                                                        dropdownMode="select"
                                                                        isClearable
                                                                        dateFormat="dd/MM/yyyy"
                                                                        placeholderText="On date"
                                                                        className="w-full disabled"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="reg_fee"
                                                                        value={item.reg_fee}
                                                                        onChange={(event) => handleFormChange(event, index, "reg_fee")}
                                                                        className="block"
                                                                        type="number"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="reg_limit"
                                                                        value={item.reg_limit}
                                                                        onChange={(event) => handleFormChange(event, index, "reg_limit")}
                                                                        className="block"
                                                                        type="number"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="adm_limit"
                                                                        value={item.adm_limit}
                                                                        onChange={(event) => handleFormChange(event, index, "adm_limit")}
                                                                        className="block"
                                                                        type="number"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="adm_prefix"
                                                                        value={item.adm_prefix}
                                                                        onChange={(event) => handleFormChange(event, index, "adm_prefix")}
                                                                        className="block"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div>
                                                                <div className="educare-input-field-styles">
                                                                    <TextInput
                                                                        id="adm_postfix"
                                                                        value={item.adm_postfix}
                                                                        onChange={(event) => handleFormChange(event, index, "adm_postfix")}
                                                                        className="block"
                                                                    />
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-toggle-checkbox-button-styles">
                                                                <ToggleCheckboxInput
                                                                    id={`is_open_offline_${index}`}
                                                                    name={`is_open_offline_${index}`}
                                                                    checked={item.is_open_offline}
                                                                    onChange={(event) => handleFormChange(event, index, "is_open_offline")}
                                                                />
                                                                <label htmlFor={`is_open_offline_${index}`}>
                                                                    <span className="on">Yes</span>
                                                                    <span className="off">No</span>
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-toggle-checkbox-button-styles">
                                                                <ToggleCheckboxInput
                                                                    id={`is_open_online_${index}`}
                                                                    name={`is_open_online_${index}`}
                                                                    checked={item.is_open_online}
                                                                    onChange={(event) => handleFormChange(event, index, "is_open_online")}
                                                                />
                                                                <label htmlFor={`is_open_online_${index}`}>
                                                                    <span className="on">Yes</span>
                                                                    <span className="off">No</span>
                                                                </label>
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <div className="educare-toggle-checkbox-button-styles">
                                                                <ToggleCheckboxInput
                                                                    id={`is_result_${index}`}
                                                                    name={`is_result_${index}`}
                                                                    checked={item.is_result}
                                                                    onChange={(event) => handleFormChange(event, index, "is_result")}
                                                                />
                                                                <label htmlFor={`is_result_${index}`}>
                                                                    <span className="on">Yes</span>
                                                                    <span className="off">No</span>
                                                                </label>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td
                                                        className="text-center text-red-500"
                                                        colSpan="12"
                                                    >
                                                        Data not found
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    }
                                </table>
                            </div>
                            <div className="text-end mt-5">
                                <PrimaryButton
                                    type="submit"
                                    disabled={processing}
                                    className="educare-primary-btn-lg-fill"
                                >
                                    Save
                                </PrimaryButton>
                            </div>

                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AdmissionProcessList;
