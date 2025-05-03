import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from "@/Components/TextareaInput";
import RadioInput from '@/Components/RadioInput';
import { useForm  } from '@inertiajs/react';
import { Tooltip } from '@mui/material'
import React from 'react';
import { useRef } from 'react';
import CheckboxA from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const SmsNewListData = [
    { title: 'The Shawshank Redemption' },
    { title: 'The Godfather' },
    { title: 'The Godfather: Part II' },
    { title: 'The Dark Knight' },
    { title: '12 Angry Men' },
    { title: "Schindler's List" },
    { title: 'Pulp Fiction' },
  ];

const SmsNewList = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleSelectChange = (event, value) => {
      setSelectedOptions(value);
    };
    const handleRemoveOption = (optionToRemove) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter((option) => option !== optionToRemove)
        );
    };
    
    const ComSmsAudienceInput = useRef();
    const ComSmsMessageFormatInput = useRef();
    const ComSmsNoticeInput = useRef();
    const ComSmsTemplatesInput = useRef();
    const ComSmsMessageInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        com_sms_audience: "",
        com_sms_message_format: "",
        com_sms_templates: "",
        com_sms_message: "",
        com_sms_notice: "",
    });
    
    const smsListData = (e) => {
        e.preventDefault();

        post(route('school.save'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset('city', 'zip');
                //     cityInput.current.focus();
                // }
            },
        });
    };
    return (
        <div className="educare-create-school-area">
            <form onSubmit={smsListData}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-5">
                        <div className="educare-common-card mb-5">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-school-form-action-title">
                                    <h5>
                                        <i className="icon-PaperPlaneTilt"></i>
                                        Send Bulk Messages (SMS)
                                    </h5>
                                </div>
                                <div className="grid grid-cols-12 gap-5 border-t border-grayLight/20 pt-5">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="com_sms_audience"
                                                        value="Audience"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="com_sms_audience"
                                                data_label="Class"
                                                data={[]}
                                                ref={
                                                    ComSmsAudienceInput
                                                }
                                                value={
                                                    data.com_sms_audience
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "com_sms_audience",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.com_sms_audience
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="com_sms_message_format"
                                                        value="Message Format"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="com_sms_message_format"
                                                data_label="Class"
                                                data={[]}
                                                ref={
                                                    ComSmsMessageFormatInput
                                                }
                                                value={
                                                    data.com_sms_message_format
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "com_sms_message_format",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.com_sms_message_format
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="com_sms_notice"
                                                        value="Notice"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="com_sms_notice"
                                                data_label="Class"
                                                data={[]}
                                                ref={
                                                    ComSmsNoticeInput
                                                }
                                                value={
                                                    data.com_sms_notice
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "com_sms_notice",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.com_sms_notice
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="com_sms_templates"
                                                        value="Templates"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="com_sms_templates"
                                                data_label="Class"
                                                data={[]}
                                                ref={
                                                    ComSmsTemplatesInput
                                                }
                                                value={
                                                    data.com_sms_templates
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "com_sms_templates",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.com_sms_templates
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
                                                        htmlFor="com_sms_message"
                                                        value="Message"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <TextareaInput
                                                id="com_sms_message"
                                                ref={
                                                    ComSmsMessageInput
                                                }
                                                value={
                                                    data.com_sms_message
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "com_sms_message",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                                placeholder="Message Template"
                                            />
                                            <InputError
                                                message={
                                                    errors.com_sms_message
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className="educare-common-notes-list">
                                <h6>Note :</h6>
                                <ul>
                                    <li className='text-danger'>
                                        1. The above message is approved by DLT for sender ID -ESTUDY. We will send this message with a dynamic username, password and link. In case if your sender id is different. Please approve the same message in your DLT (if school sender id is different)
                                    </li>
                                    <li>
                                        2. If english sms characters is 160 or less then sms count will be 1 otherwise sms count will be increased at multiple of 153 characters.
                                    </li>
                                    <li>
                                        3. Non english sms characters is 70 or less then sms count will be 1 otherwise sms count will be increased at multiple of 64 characters.
                                    </li>
                                    <li>
                                         4. Message length also includes your SMS Signature. You Can also send messages in your local languages.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-7">
                        <div className="educare-create-school-details-form-wrap">
                            <div className="educare-radio-field-styles flex gap-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 justify-between gap-2 w-full mb-3">
                                <RadioInput
                                    name="dummy_radio_enable"
                                    value="Send Class wise"
                                    checked={
                                        data.dummy_radio_enable_a
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "dummy_radio_enable_a",
                                            e.target
                                                .checked
                                        )
                                    }
                                />
                                <RadioInput
                                    name="dummy_radio_enable"
                                    value="Send to individuals"
                                    checked={
                                        data.dummy_radio_enable_b
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "dummy_radio_enable_b",
                                            e.target
                                                .checked
                                        )
                                    }
                                />
                                </div>
                            </div>
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-school-form-action-title">
                                    <h5>
                                        <i className="icon-PaperPlaneTilt"></i>
                                        Send To
                                    </h5>
                                </div>
                                <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-type-file-styles">
                                                    <Autocomplete
                                                        multiple
                                                        id="checkboxes-tags-demo"
                                                        options={SmsNewListData}
                                                        disableCloseOnSelect
                                                        getOptionLabel={(option) => option.title}
                                                        value={selectedOptions}
                                                        onChange={handleSelectChange}
                                                        renderOption={(props, option, { selected }) => (
                                                        <li {...props}>
                                                            <CheckboxA
                                                                icon={icon}
                                                                checkedIcon={checkedIcon}
                                                                style={{ marginRight: 8 }}
                                                                checked={selected}
                                                            />
                                                            {option.title}
                                                        </li>
                                                        )}
                                                        renderInput={(params) => <TextField {...params} placeholder="Classes" />}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                            <div className='educare-multiple-check-item'>
                                                <ul>
                                                    {selectedOptions.map((option,index) => (
                                                        <li key={index}>
                                                            <span>{option.title}</span>
                                                            <div>
                                                                <Tooltip
                                                                    title="Delete"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button type='button' className="educare-danger-btn-sm-fill" onClick={() => handleRemoveOption(option)}>
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </li>
                                                    ))}
                                                </ul>
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
    );
};

export default SmsNewList;