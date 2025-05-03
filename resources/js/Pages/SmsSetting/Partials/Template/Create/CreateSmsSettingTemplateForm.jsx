import InputError from '@/Components/InputError';
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from '@/Components/TextInput';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from "@/Components/TextareaInput";
import Dropdown from '@/Components/Dropdown';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material'
import React from 'react';
import Swal from 'sweetalert2';
import Checkbox from '@/Components/Checkbox';
import TemplateList from '../List/TemplateList';

const CreateSmsSettingTemplateForm = ({ templates, smsAudiences, smsAudienceContexts, smsAudienceTags }) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        title: "",
        audience: "",
        context: "",
        description: "",
        web_page_message: "",
        use_tagsArr: [],
    });

    const handleClassCheckbox = (tag, is_checked) => {
        setData((data) => ({ ...data, [tag]: is_checked }));
        setData((data) => {
            const existingTags = data.use_tagsArr.find((item) => item.tag === tag);
            if (existingTags) {
                return {
                    ...data,
                    use_tagsArr: data.use_tagsArr.map((item) =>
                        item.tag === tag ? { ...item, is_checked } : item
                    ),
                };
            } else {
                return {
                    ...data,
                    use_tagsArr: [...data.use_tagsArr, { tag, is_checked }],
                };
            }
        });
    };

    // handle insert data
    const handleInsert = (e) => {
        e.preventDefault();
        post(route("sms_setting.save_template"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const handelReset = (e) => {
        reset();
    }

    // delete
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
                router.delete(route('sms_setting.destroy', id));
            }
        });
    }

    return (
        <>
            <div className="educare-create-school-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 lg:col-span-7">
                        <div className="educare-card-title"><h5><i className="icon-ListBullets"></i>Approved DLT Templates list</h5></div>
                        <div className="educare-admission-list-area">
                            <div className="educare-admission-list-inner">
                                <div className="educare-admission-list-inner-wrapper">
                                    <TemplateList templates={templates} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 lg:col-span-5">
                        <div className="educare-card-title"><h5><i className="icon-ListBullets"></i>Add DLT Templates</h5></div>
                        <div className="educare-common-card mb-5">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5><i className="icon-settting"></i> SMS</h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <form onSubmit={handleInsert}>
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="title"
                                                                value="Title"
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
                                                        message={
                                                            errors?.title
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
                                                                htmlFor="audience"
                                                                value="Audience"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="audience"
                                                        data_label="Class"
                                                        data={smsAudiences}
                                                        value={data?.audience}
                                                        onChange={(e) =>
                                                            setData(
                                                                "audience",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.audience
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {data.audience === 'Teachers' || data.audience === 'Parents' ?
                                                <div className="col-span-12">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="context"
                                                                    value="Context"
                                                                />
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="context"
                                                            data_label="context"
                                                            data={smsAudienceContexts}
                                                            value={data?.context}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "context",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors?.context
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                : ''
                                            }

                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="description"
                                                                value="Approved DLT SMS Template"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="description"
                                                        value={data?.description}
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        placeholder="Message"
                                                        type="text"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.description
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
                                                                htmlFor="web_page_message"
                                                                value="Message in Web Page"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="web_page_message"
                                                        value={data?.web_page_message}
                                                        onChange={(e) =>
                                                            setData(
                                                                "web_page_message",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        placeholder="Message"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.web_page_message
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {data.audience === 'Teachers' || data.audience === 'Parents' ? <div className="col-span-12">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            value="Use Tags"
                                                        />
                                                    </div>
                                                </div>
                                            </div> : ''}

                                            {data.audience === 'Teachers' || data.audience === 'Parents' ?
                                                <div className="col-span-12">
                                                    {smsAudienceTags.map((item, index) => (
                                                        <div key={index} className="educare-create-school-settings-list educare-create-school-settings-list-document mr-7 mb-4">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={item.title}
                                                                    name={item.title}
                                                                    onChange={(e) =>
                                                                        handleClassCheckbox(e.target.name, e.target.checked)
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor={item.title}
                                                                    value={item.title}
                                                                />
                                                            </div>
                                                        </div>
                                                    ))}

                                                </div>
                                                : ''
                                            }

                                            <div className="col-span-12">
                                                <div className="educare-button-field-styles mt-2.5 text-end">

                                                    <PrimaryButton
                                                        disabled={processing}
                                                        type="submit"
                                                        className="educare-primary-btn-md-fill mr-5"
                                                    >
                                                        Save
                                                    </PrimaryButton>

                                                    <PrimaryButton
                                                        onClick={handelReset}
                                                        type="button"
                                                        className="educare-primary-btn-md-stroke"
                                                    >
                                                        reset
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
        </>
    );
};

export default CreateSmsSettingTemplateForm;
