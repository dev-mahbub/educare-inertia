import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import RadioInput from '@/Components/RadioInput';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { router, useForm } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import React, { useEffect } from 'react';
import { useRef } from 'react';
import facebookIcon from '../../../../../images/social/facebook.png'
import youtubeIcon from '../../../../../images/social/youtube.png'
import linkedinIcon from '../../../../../images/social/linkedin.png'
import twitterIcon from '../../../../../images/social/twitter.png'
import PrimaryButton from "@/Components/PrimaryButton";

const SocialShareCreateForm = ({
    socialSettings = [],
    socialButtonSettings = [],
}) => {
    const uploadSchoolBanner = useRef();
    const uploadSchoolInfrastructure = useRef();

    const {
        data,
        setData,
        post,
        reset,
        processing,
    } = useForm({
        social_is_facility_enable: socialButtonSettings?.social_is_facility_enable,
        social_is_chat_with_us_enable: socialButtonSettings?.social_is_chat_with_us_enable,
        social_is_online_admission_enable: socialButtonSettings?.social_is_online_admission_enable,
        selected_data: socialSettings,
    });

    const createSocialShareData = (e) => {
        e.preventDefault();
        post(route("social_share.update_or_create"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleSelectedData = (type, key, value) => {
        const isSelected = data?.selected_data?.some((item) => item.key === key);
        const updatedSelectedData = isSelected
            ? data.selected_data.map((item) =>
                item.key === key ? { ...item, value: value } : item
            )
            : [...data.selected_data, { type: type, key: key, value: value }];

        setData({
            ...data,
            selected_data: updatedSelectedData
        });
    };

    const getSelectedDataValue = (key) => {
        const selectedItem = data?.selected_data?.find(item => item.key === key);
        return selectedItem ? selectedItem.value : '';
    };

    // handel radio button
    const handelChecked = (type, key, value) => {
        const sendData = { type, key, value }
        router.post(route('account_setting_create_update'), sendData);
    }

    useEffect(() => {
        setData({
            ...data,
            selected_data: socialSettings
        })
    }, [socialSettings])

    //for textarea
    const editorRef = useRef(null);

    return (
        <div className="educare-social-share-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <form onSubmit={createSocialShareData}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-8">
                        <div className="educare-form-box">
                            <div className="educare-social-share-card border px-[15px] py-[15px]">
                                <div className="educare-social-share-link flex flex-wrap gap-1 mb-2">
                                    <a href="#">Please Share This Page On Social Media To Generate Leads</a>
                                    <a href="#"><span className='badge primary'>https://educarestudy.in/school/socialshare?key=demo</span></a>
                                </div>
                                <div className="educare-social-share-link flex flex-wrap gap-1">
                                    <a href="#"><img src={facebookIcon} alt="category-icon" /></a>
                                    <a href="#"><img src={youtubeIcon} alt="category-icon" /></a>
                                    <a href="#"><img src={linkedinIcon} alt="category-icon" /></a>
                                    <a href="#"><img src={twitterIcon} alt="category-icon" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-form-box">
                            <h3 className='text-[18px] text-headingLight font-semibold mb-[5px]'>Admission Details</h3>
                            <div className="educare-input-field-styles">
                                <Editor
                                    apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
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
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-form-box">
                            <h3 className='text-[18px] text-headingLight font-semibold mb-[5px]'>Our Vision</h3>
                            <div className="educare-input-field-styles">
                                <Editor
                                    apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
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
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-form-box">
                            <h3 className='text-[18px] text-headingLight font-semibold mb-[5px]'>Our Vision</h3>
                            <div className="educare-input-field-styles">
                                <Editor
                                    apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
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
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-form-box">
                            <h3 className='text-[18px] text-headingLight font-semibold mb-[5px]'>Supporting Documents Required With Application</h3>
                            <div className="educare-input-field-styles">
                                <Editor
                                    apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
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
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-form-box">
                            <h3 className='text-[18px] text-headingLight font-semibold mb-[5px]'>School Timing</h3>
                            <div className="educare-input-field-styles">
                                <Editor
                                    apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
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
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-form-box">
                            <h3 className='text-[18px] text-headingLight font-semibold mb-[5px]'>Infrastructure</h3>
                            <div className="educare-input-field-styles">
                                <Editor
                                    apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
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
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-form-box">
                            <h3 className='text-[18px] text-headingLight font-semibold mb-[5px]'>Co-curricular Activities</h3>
                            <div className="educare-input-field-styles">
                                <Editor
                                    apiKey='zro9ygko9tjpaphfwp2puagyldl8ezn6yctbz4oyx8l66bou'
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    initialValue="<p>This is the initial content of the editor.</p>"
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
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
                            <div className="educare-form-box">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="social_title"
                                        value="Title"
                                    />
                                    <TextareaInput
                                        id="social_title"
                                        value={getSelectedDataValue('social_title')}
                                        onChange={(e) => handleSelectedData('Social', 'social_title', e.target.value)}
                                        className="block"
                                        placeHolder="Write title"
                                    />
                                    <span className="text-[15px] text-headingLight">70 character(s) left.</span>
                                </div>
                            </div>
                            <div className="educare-form-box">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="social_description"
                                        value="Description"
                                    />
                                    <TextareaInput
                                        id="social_description"
                                        value={getSelectedDataValue('social_description')}
                                        onChange={(e) => handleSelectedData('Social', 'social_description', e.target.value)}
                                        className="block"
                                        placeHolder="Write description"
                                    />
                                    <span className="text-[15px] text-headingLight">160 character(s) left.</span>
                                </div>
                            </div>
                            <div className="educare-form-box">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="social_keywords"
                                        value="Keywords"
                                    />
                                    <TextareaInput
                                        id="social_keywords"
                                        value={getSelectedDataValue('social_keywords')}
                                        onChange={(e) => handleSelectedData('Social', 'social_keywords', e.target.value)}
                                        className="block"
                                        placeHolder="Write your Keywords"
                                    />
                                    <span className="text-[15px] text-headingLight">200 character(s) left.</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                            <div className="educare-form-box">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="video_chat_link"
                                        value="Video Chat Link"
                                    />
                                    <TextInput
                                        id="video_chat_link"
                                        value={getSelectedDataValue('video_chat_link')}
                                        onChange={(e) => handleSelectedData('Social', 'video_chat_link', e.target.value)}
                                        className="block"
                                        placeHolder="Link here"
                                    />
                                </div>
                            </div>
                            <div className="educare-form-box">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="facebook_link"
                                        value="Facebook Link"
                                    />
                                    <TextInput
                                        id="facebook_link"
                                        value={getSelectedDataValue('facebook_link')}
                                        onChange={(e) => handleSelectedData('Social', 'facebook_link', e.target.value)}
                                        className="block"
                                        placeHolder="Link here"
                                    />
                                </div>
                            </div>
                            <div className="educare-form-box">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="youtube_link"
                                        value="YouTube Link"
                                    />
                                    <TextInput
                                        id="youtube_link"
                                        value={getSelectedDataValue('youtube_link')}
                                        onChange={(e) => handleSelectedData('Social', 'youtube_link', e.target.value)}
                                        className="block"
                                        placeHolder="Link here"
                                    />
                                </div>
                            </div>
                            <div className="educare-form-box">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="google_photo_link"
                                        value="GooglePhoto Link"
                                    />
                                    <TextInput
                                        id="google_photo_link"
                                        value={getSelectedDataValue('google_photo_link')}
                                        onChange={(e) => handleSelectedData('Social', 'google_photo_link', e.target.value)}
                                        className="block"
                                        placeHolder="Link here"
                                    />
                                </div>
                            </div>
                            <div className="educare-form-box">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="instagram_input_link"
                                        value="Instagram Link"
                                    />
                                    <TextInput
                                        id="instagram_input_link"
                                        value={getSelectedDataValue('instagram_input_link')}
                                        onChange={(e) => handleSelectedData('Social', 'instagram_input_link', e.target.value)}
                                        className="block"
                                        placeHolder="Link here"
                                    />
                                </div>
                            </div>
                            <div className="educare-form-box">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="brochure_link"
                                        value="School Brochure"
                                    />
                                    <TextInput
                                        id="brochure_link"
                                        value={getSelectedDataValue('brochure_link')}
                                        onChange={(e) => handleSelectedData('Social', 'brochure_link', e.target.value)}
                                        className="block"
                                        placeHolder="Link here"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="educare-button-field-styles mt-5 text-end">
                            <PrimaryButton
                                disabled={processing}
                                className="educare-primary-btn-lg-fill"
                                type="submit"
                            >
                                Save
                            </PrimaryButton>
                        </div>
                    </div>

                    <div className="col-span-12 xl:col-span-6">
                        <div className="educare-common-card mb-5">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Button Settings
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Enable Facilities</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="social_is_facility_enable"
                                                            value="Yes"
                                                            onChange={() => setData("social_is_facility_enable", "Yes")}
                                                            checked={data?.social_is_facility_enable && data?.social_is_facility_enable === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="social_is_facility_enable"
                                                            value="No"
                                                            checked={data?.social_is_facility_enable && data?.social_is_facility_enable === "No"}
                                                            onChange={() => setData("social_is_facility_enable", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Social', 'social_is_facility_enable', data?.social_is_facility_enable)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Enable Chat With Us</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="social_is_chat_with_us_enable"
                                                            value="Yes"
                                                            onChange={() => setData("social_is_chat_with_us_enable", "Yes")}
                                                            checked={data?.social_is_chat_with_us_enable && data?.social_is_chat_with_us_enable === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="social_is_chat_with_us_enable"
                                                            value="No"
                                                            checked={data?.social_is_chat_with_us_enable && data?.social_is_chat_with_us_enable === "No"}
                                                            onChange={() => setData("social_is_chat_with_us_enable", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Social', 'social_is_chat_with_us_enable', data?.social_is_chat_with_us_enable)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Enable Online Admission Enquiry</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-radio-field-styles flex gap-3">
                                                        <RadioInput
                                                            name="social_is_online_admission_enable"
                                                            value="Yes"
                                                            onChange={() => setData("social_is_online_admission_enable", "Yes")}
                                                            checked={data?.social_is_online_admission_enable && data?.social_is_online_admission_enable === "Yes"}
                                                        />
                                                        <RadioInput
                                                            name="social_is_online_admission_enable"
                                                            value="No"
                                                            checked={data?.social_is_online_admission_enable && data?.social_is_online_admission_enable === "No"}
                                                            onChange={() => setData("social_is_online_admission_enable", "No")}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-list-action-btn">
                                                    <button
                                                        className="educare-success-btn-sm-fill"
                                                        onClick={() => handelChecked('Social', 'social_is_online_admission_enable', data?.social_is_online_admission_enable)}
                                                        type="button"
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-message"></i>
                                        Upload School Images
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Upload School Banner</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-type-file-styles">
                                                        <input
                                                            id="upload_school_banner"
                                                            ref={
                                                                uploadSchoolBanner
                                                            }
                                                            type="file"
                                                            name="upload_school_banner"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "upload_school_banner",
                                                                    e.target
                                                                        .files[0]
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block"></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-create-school-settings-list">
                                                <div className="educare-create-school-settings-list-title">
                                                    <h6>Upload School Infrastructure</h6>
                                                </div>
                                                <div className="educare-create-school-settings-list-check">
                                                    <div className="educare-input-type-file-styles">
                                                        <input
                                                            id="upload_school_infrastructure"
                                                            ref={
                                                                uploadSchoolInfrastructure
                                                            }
                                                            type="file"
                                                            name="upload_school_infrastructure"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "upload_school_infrastructure",
                                                                    e.target
                                                                        .files[0]
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                                <div className="educare-create-school-settings-list-success">
                                                    <i className="icon-check-1 inline-block"></i>
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
        </div>
    );
};

export default SocialShareCreateForm;
