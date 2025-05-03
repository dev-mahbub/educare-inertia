import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import { useEffect, useRef, useState } from 'react';

const SmsCircularForm = ({
    templateCategories,
    templates,
    audienceTypes,
    audienceAttributes,
    selectedSmsCircular,
    setSelectedSmsCircular,
    formMode,
    setFormMode
}) => {
    //for textarea
    const [selectedAttributes, setSelectedAttributes] = useState([]);
    const [audienceWiseAttributes, setAudienceWiseAttributes] = useState([]);
    const editorRef = useRef(null);

    const {
        data,
        setData,
        errors,
        post,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        title: "",
        template_category_id: "",
        template_id: "",
        audience_type: "",
        content: ""
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            title: selectedSmsCircular?.title ?? "",
            template_category_id: selectedSmsCircular?.template_category_id ?? "",
            template_id: selectedSmsCircular?.template_id ?? "",
            audience_type: selectedSmsCircular?.audience_type ?? "",
            content: selectedSmsCircular?.content ?? ""
        }));
    }, [selectedSmsCircular]);

    useEffect(() => {
        setAudienceWiseAttributes((audienceAttributes[data?.audience_type] ?? [])?.map(item => ({
            id: item,
            label: item
        })));

        setSelectedAttributes([]);
    }, [data.audience_type, audienceAttributes]);

    // Handle checkbox selection
    const handleCheckedData = (name, value, id) => {
        let newCheckedIds = [...selectedAttributes];

        if (value) {
            newCheckedIds.push(id);
        } else {
            newCheckedIds = newCheckedIds.filter(checkedId => checkedId !== id);
        }

        setSelectedAttributes(newCheckedIds);
    };

    // handle editor change start
    const handleEditorChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            content: e.target.getContent()
        }));
    }
    // handle editor change end

    // handle reset start
    const handleReset = () => {
        reset();
        setAudienceWiseAttributes([]);
        setSelectedAttributes([]);
        setSelectedSmsCircular({});
        setFormMode('create');
    }
    // handle reset end

    // handle save sms circular start
    const handleSmsCircularSave = (e) => {
        e.preventDefault();

        post(route('sms.circular.save'), {
            onSuccess: () => {
                handleReset();
            },
            onError: () => {

            }
        })
    }
    // handle update sms circular end

    // handle update sms circular start
    const handleSmsCircularUpdate = (e) => {
        e.preventDefault();

        put(route('sms.circular.update', selectedSmsCircular?.id), {
            onSuccess: () => {
                handleReset();
            },
            onError: () => {

            }
        })
    }
    // handle update sms circular end

    // handle select template tag start
    const handleSelectTag = (isSelected, value) => {
        if(isSelected) {
            setData("content", data.content + ' ' + value);
        } else {
            setData("content", data?.content?.replace('<p>'+value+'</p>', ''));
        }
    };
    // handle select template tag end

    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-common-card-title">
                    <h5>
                        <i className="icon-BookBookmark"></i>
                        Design a school circular
                    </h5>
                </div>
                <div className="educare-common-card-wrap-border pt-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 lg:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-field-styles-label-wrap">
                                    <div className="educare-input-field-styles-label">
                                        <InputLabel
                                            value="Title"
                                        />
                                        <sup>*</sup>
                                    </div>
                                </div>
                                <TextInput
                                    value={
                                        data.title
                                    }
                                    onChange={(e) =>
                                        setData(
                                            "title",
                                            e.target.value
                                        )
                                    }
                                    className="block"
                                    placeHolder='Write here...'
                                />
                                <InputError
                                    message={
                                        errors.title
                                    }
                                    className="mt-2"
                                />
                            </div>
                        </div>
                        <div className="col-span-12 lg:col-span-6">
                            <div className='bg-border/20 p-2.5'>
                                <span className='text-headingLight font-semibold'>Select Pre-defined Templates</span>
                                <div className="grid grid-cols-12 gap-5 mt-3">
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                data_label="Template Category"
                                                data={templateCategories}
                                                value={
                                                    data.template_category_id
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "template_category_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.template_category_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                data_label="Template"
                                                data={templates}
                                                value={
                                                    data.template_id
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "template_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.template_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <div className="educare-create-school-settings-list-check min-width-full">
                                <div className="educare-radio-field-styles flex gap-7">
                                    {audienceTypes?.length > 0 &&
                                        audienceTypes.map((item, index) => (
                                            <RadioInput
                                                key={index}
                                                name="audience_type"
                                                value={item?.id}
                                                checked={data.audience_type == item?.id}
                                                onChange={() => setData("audience_type", item?.id)}
                                            />
                                        ))
                                    }
                                    {/* <RadioInput
                                        name="audience_type"
                                        value="School"
                                        checked={data.audience_type === "school"}
                                        onChange={() => setData("audience_type", "school")}
                                    />
                                    <RadioInput
                                        name="audience_type"
                                        value="Staff"
                                        checked={data.audience_type === "staff"}
                                        onChange={() => setData("audience_type", "staff")}
                                    />
                                    <RadioInput
                                        name="audience_type"
                                        value="Student"
                                        checked={data.audience_type === "student"}
                                        onChange={() => setData("audience_type", "student")}
                                    /> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="grid grid-cols-12 gap-5">
                                {audienceWiseAttributes.length > 0 ? (
                                    audienceWiseAttributes.map((item, i) => (
                                        <div key={i} className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3">
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id={`audince_attribute_${item.id}`}
                                                        name={`audince_attribute_${item.id}`}
                                                        checked={selectedAttributes?.includes(item.id)}
                                                        onChange={(e) => {
                                                                handleCheckedData(e.target.name, e.target.checked, item.id)
                                                                handleSelectTag(e.target.checked, item.label)
                                                            }
                                                        }
                                                    />
                                                </div>
                                                <div className="educare-create-school-settings-list-title width-full">
                                                    <InputLabel
                                                        htmlFor={`audince_attribute_${item.id}`}
                                                        value={item.label}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : ('')}
                            </div>
                        </div>
                        <div className="col-span-12">
                            <Editor
                                apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                onInit={(evt, editor) => editorRef.current = editor}
                                // initialValue="<p>This is the initial content of the editor.</p>"
                                value={data?.content}
                                init={{
                                    height: 500,
                                    menubar: false,
                                    plugins: [
                                        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                        'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                    ],
                                    toolbar: 'undo redo | blocks | ' +
                                        'bold italic forecolor | alignleft aligncenter ' +
                                        'alignright alignjustify | bullist numlist outdent indent | ' +
                                        'removeformat | help',
                                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                }}
                                onChange={handleEditorChange}
                            />
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                <PrimaryButton
                                    className="educare-gray-btn-lg-stroke"
                                    type="button"
                                    onClick={handleReset}
                                >
                                    Reset
                                </PrimaryButton>

                                {formMode == 'create' &&
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="button"
                                        onClick={handleSmsCircularSave}
                                    >
                                        Create
                                    </PrimaryButton>
                                }

                                {formMode == 'edit' &&
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="button"
                                        onClick={handleSmsCircularUpdate}
                                    >
                                        Update
                                    </PrimaryButton>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SmsCircularForm;
