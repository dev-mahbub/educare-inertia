import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from '@/Components/TextInput';
import Checkbox from '@/Components/Checkbox';
import { router, useForm } from '@inertiajs/react';
import React, { useState, useRef } from "react";
import { Editor } from '@tinymce/tinymce-react';

const CreateAssetForm = ({
    subjects,
    classNames,
    onlineTopics,
    virtualAssetTypes
}) => {
    const [selectedFiles, setSelectedFiles] = useState({
        selected_file: null,
        selected_file_name: null,
    });
    const importQuestion = []
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        class_name_id: "",
        subject_id: "",
        online_topic_id: "",
        asset_type: "Passage",
        title: "",
        is_publish: "",
        image_file: null,
        audio_file: null,
        video_link: null,
    });

    //for textarea
    const editorRef = useRef(null);

    // handle editor change start
    const handleEditorChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            description: e.target.getContent()
        }));
    }
    // handle editor change end

    const handleReset = (e) => {
        e.preventDefault();
        reset();
    };

    // handle change class start
    const handleChangeClass = (value) => {
        setData((prevData) => ({
            ...prevData,
            class_name_id: value,
            subject_id: "",
            online_topic_id: ""
        }));

        const form_data = {
            class_name_id: value
        }

        router.post(route('online_exam.create_asset'), form_data);
    }
    // handle change class end

    // handle change subject start
    const handleChangeSubject = (value) => {
        setData((prevData) => ({
            ...prevData,
            subject_id: value,
            online_topic_id: ""
        }));

        const form_data = {
            class_name_id: data?.class_name_id,
            subject_id: value
        }

        router.post(route('online_exam.create_asset'), form_data);
    }
    // handle change subject end

    // handle insert data
    const handleInsert = (e) => {
        e.preventDefault();
        post(route("online_exam.save_asset"), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
            }
        });
    };

    return (
        <div className="educare-common-card">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                <div className='flex justify-between flex-wrap gap-5'>
                    <div className="educare-common-card-title">
                        <h5>
                            Add Asset
                        </h5>
                    </div>
                    <a href="#" className='text-info flex items-center'>
                        <p>Help</p>
                        <i className='icon-ArrowCircleRight ml-1'></i>
                    </a>
                </div>
                <form onSubmit={handleInsert}>
                    <div className="educare-common-card-wrap-border">
                        <div className="grid grid-cols-12 gap-5">
                            <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Class"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="Class"
                                        data={classNames}
                                        value={
                                            data.class_name_id
                                        }
                                        onChange={(e) =>
                                            handleChangeClass(e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.class_name_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 xl:col-span-4 ">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Subject"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="Subject"
                                        data={subjects}
                                        value={
                                            data.subject_id
                                        }
                                        onChange={(e) =>
                                            handleChangeSubject(e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.subject_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 xl:col-span-4 ">
                                <div className="educare-input-field-styles">
                                    <div className="educare-input-field-styles-label-wrap">
                                        <div className="educare-input-field-styles-label">
                                            <InputLabel
                                                value="Type"
                                            />
                                            <sup>*</sup>
                                        </div>
                                    </div>
                                    <SelectInput
                                        data_label="Type"
                                        data={virtualAssetTypes}
                                        value={
                                            data.asset_type
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "asset_type",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.asset_type
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 xl:col-span-4 ">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Topic"
                                    />
                                    <SelectInput
                                        data_label="Topic"
                                        data={onlineTopics}
                                        value={
                                            data.online_topic_id
                                        }
                                        onChange={(e) =>
                                            setData(
                                                "online_topic_id",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={
                                            errors.online_topic_id
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 xl:col-span-4 ">
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
                                    />
                                    <InputError
                                        message={
                                            errors.title
                                        }
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            {/* passage start*/}
                            <div className="col-span-12"></div>
                            {
                                data.asset_type === "Passage" && (<div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <Editor
                                            apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            // initialValue="<p>This is the initial content of the editor.</p>"
                                            value={data?.content}
                                            init={{
                                                height: 500,
                                                menubar: true,
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
                                </div>)
                            }
                            {
                                (data.asset_type === "Passage" || data.asset_type === "Image") && (
                                    <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel value="Attach Image" />
                                            <div className="educare-input-type-file-styles">
                                                <input
                                                    id="image_file"
                                                    type="file"
                                                    name="image_file"
                                                    onChange={(e) =>
                                                        setData(
                                                            "image_file",
                                                            e.target
                                                                .files[0]
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {
                                (data.asset_type === "Passage" || data.asset_type === "Video") && (
                                    <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="Video Link"
                                            />
                                            <TextInput
                                                value={
                                                    data.video_link
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "video_link",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.video_link
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>)
                            }
                            {
                                data.asset_type === "Audio" && (
                                    <div className="col-span-12 md:col-span-6 xl:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel value="Attach Audio" />
                                            <div className="educare-input-type-file-styles">
                                                <input
                                                    id="audio_file"
                                                    type="file"
                                                    name="audio_file"
                                                    onChange={(e) =>
                                                        setData(
                                                            "audio_file",
                                                            e.target
                                                                .files[0]
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )
                            }

                            {/* passage end*/}
                            <div className="col-span-12">
                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                    <div className="educare-create-school-settings-list-check width-full">
                                        <Checkbox
                                            id="is_publish"
                                            name="is_publish"
                                            checked={
                                                data.is_publish
                                            }
                                            onChange={(e) =>
                                                setData(
                                                    "is_publish",
                                                    e.target.checked
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="is_publish"
                                            value="Publish"
                                        />
                                    </div>
                                </div>
                                <p className='text-headingLight text-[14px] italic'>You need to publish this passage, if you want to assign questions.</p>
                            </div>
                            <div className="col-span-12">
                                <div className="flex flex-wrap justify-end gap-2.5 mt-2">
                                    <PrimaryButton
                                        className="educare-gray-btn-lg-stroke"
                                        onClick={(e) =>
                                            handleReset(e)
                                        }
                                        type="button"
                                    >
                                        Reset
                                    </PrimaryButton>
                                    <PrimaryButton
                                        className="educare-primary-btn-lg-fill"
                                        type="submit"
                                    >
                                        Save
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateAssetForm;