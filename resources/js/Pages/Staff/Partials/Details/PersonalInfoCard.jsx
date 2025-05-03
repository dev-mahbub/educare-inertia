import React from 'react';
import { useState } from 'react';
import staffImg from "../../../../../images/user/user-1.png"
import { Link, useForm } from '@inertiajs/react';
import CheckboxA from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Tooltip } from '@mui/material';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;


const PersonalInfoCard = ({staff, subjects}) => {
    const multipleSelectorData = subjects;
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [selectedOptions2, setSelectedOptions2] = useState([]);
    const handleSelectChange = (event, value) => {
      setSelectedOptions(value);
    };
    const handleRemoveOption = (optionToRemove) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter((option) => option !== optionToRemove)
        );
    };
    const handleSelectChange2 = (event, value) => {
        setSelectedOptions2(value);
      };
      const handleRemoveOption2 = (optionToRemove2) => {
          setSelectedOptions2((prevSelectedOptions2) =>
              prevSelectedOptions2.filter((option) => option !== optionToRemove2)
          );
      };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        main_subject: "",
        class_group: "",
    });

    const updateStaffSubjectData = (e) => {
        e.preventDefault();
    
        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset("city", "zip");
                //     cityInput.current.focus();
                // }
            },
        });
    };
    const updateStaffClassGroupData = (e) => {
        e.preventDefault();
    
        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset("city", "zip");
                //     cityInput.current.focus();
                // }
            },
        });
    };

    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-info"></i>
                            Personal Info
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="educare-staff-info-wrap">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 md:col-span-6 minMaxSm:col-span-7">
                                    <div className="educare-staff-info flex gap-2.5">
                                        <img
                                            src={staffImg}
                                            className="min-w-[80px] object-cover"
                                            alt="profile not found"
                                        />
                                        <div>
                                            <h5 className="text-[16px] text-headingLight font-semibold font-primary">
                                                {[staff?.first_name, staff?.middle_name, staff?.last_name].filter(Boolean).join(' ')}
                                            </h5>
                                            <Link
                                                className="text-[16px] font-medium font-primary text-headingLight block hover:text-primary transition"
                                                href={`mailto:${staff?.email}`}
                                            >
                                                <i className="icon-envelope translate-y-[2px] inline-block"></i>{" "}
                                                {staff?.email}
                                            </Link>
                                            <Link
                                                className="text-[16px] font-medium font-primary text-headingLight block hover:text-primary transition"
                                                href={`tel:${staff?.phone}`}
                                            >
                                                <i className="icon-PhoneCall translate-y-[2px] inline-block"></i>{" "}
                                                {staff?.phone}
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-6 minMaxSm:col-span-5">
                                    <div className="educare-staff-info">
                                        <div className="flex items-center gap-6">
                                            <span className="text-[16px] text-headingLight font-semibold font-primary">
                                                Blood Group :
                                            </span>
                                            <span className="text-[16px] text-headingLight font-medium font-primary">
                                                {staff?.blood_group?.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-[16px] text-headingLight font-semibold font-primary">
                                                Religion :
                                            </span>
                                            <span className="text-[16px] text-headingLight font-medium font-primary">
                                                {staff?.religion?.name}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-6">
                                            <span className="text-[16px] text-headingLight font-semibold font-primary">
                                                Caste :
                                            </span>
                                            <span className="text-[16px] text-headingLight font-medium font-primary"></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="educare-create-school-details-form-wrap">
                <form onSubmit={updateStaffSubjectData}>
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-school-form-action-title">
                            <h5>
                                <i className="icon-info"></i>
                                Subject Detail
                            </h5>
                        </div>
                        <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 lg:col-span-6 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="main_subject"
                                            value="Main Subject"
                                        />
                                        <SelectInput
                                            id="main_subject"
                                            data_label="Subject"
                                            data={subjects}
                                            value={data.main_subject}
                                            onChange={(e) =>
                                                setData(
                                                    "main_subject",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.main_subject}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-6 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-type-file-styles">
                                            <InputLabel value="Add Other Subject" />
                                            <Autocomplete
                                                multiple
                                                id="checkboxes-tags-demo"
                                                options={multipleSelectorData}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) =>
                                                    option.title
                                                }
                                                value={selectedOptions}
                                                onChange={handleSelectChange}
                                                renderOption={(
                                                    props,
                                                    option,
                                                    { selected }
                                                ) => (
                                                    <li {...props}>
                                                        <CheckboxA
                                                            icon={icon}
                                                            checkedIcon={
                                                                checkedIcon
                                                            }
                                                            style={{
                                                                marginRight: 8,
                                                            }}
                                                            checked={selected}
                                                        />
                                                        {option.title}
                                                    </li>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Select Subject"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="educare-multiple-check-item mt-2.5">
                                        <ul>
                                            {selectedOptions.map(
                                                (option, index) => (
                                                    <li key={index}>
                                                        <span>
                                                            {option.title}
                                                        </span>
                                                        <div>
                                                            <Tooltip
                                                                title="Delete"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-danger-btn-sm-fill"
                                                                    onClick={() =>
                                                                        handleRemoveOption(
                                                                            option
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div>
                                        <PrimaryButton
                                            className="educare-primary-btn-md-fill"
                                        >
                                            Add Subject
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="educare-create-school-details-form-wrap">
                <form onSubmit={updateStaffClassGroupData}>
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-school-form-action-title">
                            <h5>
                                <i className="icon-info"></i>
                                Class Group
                            </h5>
                        </div>
                        <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12 lg:col-span-6 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="class_group"
                                            value="Main Class Group"
                                        />
                                        <SelectInput
                                            id="class_group"
                                            data_label="Subject"
                                            data={[]}
                                            value={data.class_group}
                                            onChange={(e) =>
                                                setData(
                                                    "class_group",
                                                    e.target.value
                                                )
                                            }
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.class_group}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 lg:col-span-6 minMaxMd:col-span-6">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-type-file-styles">
                                            <InputLabel value="Add Other Subject" />
                                            <Autocomplete
                                                multiple
                                                id="checkboxes-tags-demo2"
                                                options={multipleSelectorData}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) =>
                                                    option.title
                                                }
                                                value={selectedOptions2}
                                                onChange={handleSelectChange2}
                                                renderOption={(
                                                    props,
                                                    option,
                                                    { selected }
                                                ) => (
                                                    <li {...props}>
                                                        <CheckboxA
                                                            icon={icon}
                                                            checkedIcon={
                                                                checkedIcon
                                                            }
                                                            style={{
                                                                marginRight: 8,
                                                            }}
                                                            checked={selected}
                                                        />
                                                        {option.title}
                                                    </li>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Select Subject"
                                                    />
                                                )}
                                            />
                                        </div>
                                    </div>
                                    <div className="educare-multiple-check-item mt-2.5">
                                        <ul>
                                            {selectedOptions2.map(
                                                (option, index) => (
                                                    <li key={index}>
                                                        <span>
                                                            {option.title}
                                                        </span>
                                                        <div>
                                                            <Tooltip
                                                                title="Delete"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-danger-btn-sm-fill"
                                                                    onClick={() =>
                                                                        handleRemoveOption2(
                                                                            option
                                                                        )
                                                                    }
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div>
                                        <PrimaryButton
                                            className="educare-primary-btn-md-fill"
                                        >
                                            Add Class Group
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PersonalInfoCard;