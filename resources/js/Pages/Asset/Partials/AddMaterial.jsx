import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SelectInput from '@/Components/SelectInput';
import TextareaInput from '@/Components/TextareaInput';
import TextInput from "@/Components/TextInput";
import { router } from '@inertiajs/react';
import { Editor } from '@tinymce/tinymce-react';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddNewTopicPopup from './popup/AddNewTopicPopup';

const AddMaterial = ({
    data,
    setData,
    errors,
    formFields,
    setFormFields,
    onlineTopics,
    selectedLearningMaterialGroup,
    resourceTypes,
    handleFilterLearningMaterial
}) => {
    //add new topic popup
    const [addNewTopic, setAddNewTopic] = useState(false);
    const handleAddNewTopicPopupClick = () => {
        setAddNewTopic(!addNewTopic);
    };

    //for textarea
    const editorRef = useRef(null);

    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = field == 'worksheet' || field == 'document' || field == 'upload_picture' || field == 'upload_audio' ? event.target.files[0] : event.target.value;
        // setData(prevData => ({
        //     ...prevData,
        //     items: updatedFields,
        // }));

        setFormFields(updatedFields);
    }


    //add field
    const addFields = () => {
        setFormFields([...formFields,
            {
                resourse_type: "",
                title: "",
                link: "",
                youtube_link: "",
                worksheet: "",
                document: "",
                upload_picture: "",
                upload_audio: "",
                description: "",
            }
        ]);
    }
    //remove specific field
    const removeFields = (index) => {
        const remainingField = formFields.filter((field, i) => i !== index);
        setFormFields(remainingField)
    }

    // handle editor change start
    const handleEditorChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            content: e.target.getContent()
        }));
    }
    // handle editor change end

    // handle learning material save
    const handleLearningMaterialSave = (e) => {
        e.preventDefault();

        const form_data = {
            learning_material_group_id: selectedLearningMaterialGroup?.id,
            title: data?.title,
            online_topic_id: data?.online_topic_id,
            content: data?.content,
            resources: data?.resources
        }

        router.post(route('asset.learning_material.save'), form_data, {
            onSuccess: () => {
                handleFilterLearningMaterial()
                handleReset();
            },
            onError: (errors) => {
                for (const key in errors) {
                    if (key == 'title' || key.includes('resources')) {
                        toast.error("Required fields cannot be empty and should be in valid format.", {
                            position: 'top-right',
                            autoClose: 1500,
                        });

                        break;
                    }
                }

                handleFilterLearningMaterial()
            }
        });
    }
    // handle learning material end

    // handle reset start
    const handleReset = () => {
        setFormFields([]);

        setData((prevData) => ({
            ...prevData,
            title: "",
            online_topic_id: "",
            content: "",
        }));
    }
    // handle reset end

    return (
        <>
            <div className="educare-academic-content-management-form">
                <div className="grid grid-cols-12 gap-[20px] mb-[20px]">
                    <div className="col-span-4 maxSm:col-span-12">
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
                                id="title"
                                value={data?.title}
                                onChange={(e) =>
                                    setData(
                                        "title",
                                        e.target.value
                                    )
                                }
                                type="text"
                                className="block"
                            />

                            <InputError
                                message={errors.title}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-4 maxSm:col-span-12">
                        <div className="educare-input-field-styles">
                            <InputLabel
                                htmlFor="online_topic_id"
                                value="Topic"
                            />
                            <SelectInput
                                id="online_topic_id"
                                data_label="Topic"
                                data={onlineTopics}
                                value={data?.online_topic_id}
                                onChange={(e) =>
                                    setData(
                                        "online_topic_id",
                                        e.target.value
                                    )
                                }
                                type="textarea"
                                className="mt-1 block w-full"
                            />

                            <InputError
                                message={errors.online_topic_id}
                                className="mt-2"
                            />
                        </div>
                    </div>
                    <div className="col-span-4 maxSm:col-span-12 flex items-center pt-0 md:pt-6">
                        <button
                            type='button'
                            className='flex items-center text-supportingA hover:text-primary'
                            onClick={handleAddNewTopicPopupClick}
                        >
                            <i className='icon-plus mr-1 text-[12px] font-bold'></i>
                            <span>Add a new topic</span>
                        </button>
                    </div>
                    <div className="col-span-12">
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
                    </div>
                </div>
            </div>
            <div className="educare-academic-content-management-resource mb-[25px]">
                <div className="educare-academic-content-management-resource-list flex flex-wrap gap-x-[20px] gap-y-[10px] items-center pb-[10px] mb-[20px] border-b-[1px]">
                    <div className="educare-academic-content-management-resource-item">
                        <button type="button" className="flex items-center gap-[5px]">
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M21.4334 15.7765L23.5544 13.6545C26.6764 10.5325 26.6764 5.4635 23.5544 2.3415C20.4324 -0.7805 15.3624 -0.7805 12.2404 2.3415L10.1194 4.4625C9.7294 4.8525 9.7294 5.4865 10.1194 5.8765C10.5094 6.2675 11.1434 6.2675 11.5334 5.8765L13.6544 3.7555C15.9964 1.4135 19.7984 1.4135 22.1404 3.7555C24.4814 6.0975 24.4814 9.8995 22.1404 12.2405L20.0184 14.3625C19.6284 14.7525 19.6284 15.3865 20.0184 15.7765C20.4094 16.1665 21.0424 16.1665 21.4334 15.7765Z" fill="#0096FF" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M4.4625 10.1195L2.3415 12.2405C-0.7805 15.3625 -0.7805 20.4325 2.3415 23.5545C5.4635 26.6765 10.5325 26.6765 13.6545 23.5545L15.7765 21.4335C16.1665 21.0425 16.1665 20.4095 15.7765 20.0185C15.3865 19.6285 14.7525 19.6285 14.3625 20.0185L12.2405 22.1405C9.8995 24.4815 6.0975 24.4815 3.7555 22.1405C1.4135 19.7985 1.4135 15.9965 3.7555 13.6545L5.8765 11.5335C6.2675 11.1435 6.2675 10.5095 5.8765 10.1195C5.4865 9.72953 4.8525 9.72953 4.4625 10.1195Z" fill="#0096FF" />
                                <path fillRule="evenodd" clipRule="evenodd" d="M7.99852 19.3115L19.3115 7.99852C19.7025 7.60752 19.7025 6.97452 19.3115 6.58352C18.9215 6.19352 18.2875 6.19352 17.8975 6.58352L6.58352 17.8975C6.19352 18.2875 6.19352 18.9215 6.58352 19.3115C6.97452 19.7025 7.60752 19.7025 7.99852 19.3115Z" fill="#0096FF" />
                            </svg>
                            link
                        </button>
                    </div>
                    <div className="educare-academic-content-management-resource-item">
                        <button type="button" className="flex items-center gap-[5px]">
                            <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.37543 9.87265C8.98414 9.87262 8.60165 9.75656 8.27633 9.53915C7.951 9.32173 7.69745 9.01273 7.54774 8.65122C7.39803 8.28971 7.35889 7.89192 7.43526 7.50816C7.51162 7.1244 7.70007 6.7719 7.97678 6.49524C8.25348 6.21858 8.60601 6.03019 8.98979 5.95389C9.37356 5.87759 9.77135 5.9168 10.1328 6.06658C10.4943 6.21635 10.8033 6.46995 11.0206 6.79531C11.238 7.12068 11.354 7.50319 11.3539 7.89447C11.3534 8.41902 11.1448 8.92193 10.7739 9.2928C10.4029 9.66368 9.89997 9.87222 9.37543 9.87265ZM9.37543 4.35327C8.67514 4.35333 7.9906 4.56105 7.40836 4.95015C6.82612 5.33925 6.37234 5.89226 6.10438 6.53925C5.83642 7.18624 5.76632 7.89816 5.90296 8.58499C6.03959 9.27181 6.37681 9.9027 6.87198 10.3979C7.36716 10.8931 7.99804 11.2303 8.68487 11.3669C9.37169 11.5036 10.0836 11.4335 10.7306 11.1655C11.3776 10.8976 11.9306 10.4438 12.3197 9.86158C12.7088 9.27935 12.9166 8.59481 12.9166 7.89452C12.9157 6.95564 12.5422 6.05549 11.8784 5.3916C11.2145 4.7277 10.3143 4.3543 9.37543 4.35332V4.35327ZM16.04 2.95591C16.0399 3.16306 15.9575 3.36168 15.811 3.50816C15.6645 3.65464 15.4659 3.737 15.2588 3.73715H13.3638C13.1566 3.73715 12.9579 3.65484 12.8114 3.50833C12.6649 3.36182 12.5826 3.16311 12.5826 2.95591C12.5826 2.74871 12.6649 2.54999 12.8114 2.40348C12.9579 2.25697 13.1566 2.17466 13.3638 2.17466H15.2588C15.466 2.17466 15.6647 2.25697 15.8112 2.40348C15.9577 2.54999 16.04 2.74871 16.04 2.95591ZM23.4375 12.6737L18.751 9.9682V5.53749L23.4375 2.83208V12.6737ZM17.1883 13.7424V1.76328C17.1876 1.71038 17.1664 1.65982 17.1291 1.62231C17.0917 1.58481 17.0413 1.5633 16.9884 1.56235H1.76313C1.71011 1.56314 1.65949 1.58456 1.62203 1.62209C1.58456 1.65961 1.5632 1.71026 1.5625 1.76328V13.7424C1.56322 13.7954 1.58458 13.846 1.62204 13.8835C1.65951 13.9209 1.71011 13.9423 1.76308 13.943H16.9884C17.0413 13.9421 17.0917 13.9207 17.129 13.8832C17.1663 13.8458 17.1876 13.7953 17.1883 13.7424ZM24.2431 1.43642C24.0135 1.30212 23.7523 1.23134 23.4863 1.23134C23.2203 1.23134 22.9591 1.30212 22.7295 1.43642L18.751 3.73344V1.76328C18.7506 1.29583 18.5648 0.84762 18.2343 0.517031C17.9039 0.186441 17.4557 0.000491411 16.9883 0H1.76313C1.29566 0.000542833 0.847496 0.186495 0.516957 0.517061C0.186419 0.847626 0.000503996 1.29581 0 1.76328V13.7424C0.000491144 14.2099 0.186421 14.6581 0.516992 14.9887C0.847563 15.3193 1.29577 15.5052 1.76328 15.5057H16.9884C17.4559 15.5052 17.904 15.3193 18.2345 14.9887C18.565 14.6581 18.7508 14.2099 18.7511 13.7424V11.7723L22.7295 14.0693C22.9596 14.2021 23.2206 14.2721 23.4864 14.2721C23.7521 14.2721 24.0132 14.2021 24.2433 14.0692C24.4734 13.9363 24.6645 13.7452 24.7973 13.515C24.9301 13.2849 25 13.0238 25 12.7581V2.74731C25.0016 2.48129 24.9323 2.21964 24.7993 1.98926C24.6663 1.75887 24.4743 1.56806 24.2431 1.43642Z" fill="#0291F7" />
                            </svg>
                            Video
                        </button>
                    </div>
                    <div className="educare-academic-content-management-resource-item">
                        <button type="button" className="flex items-center gap-[5px]">
                            <svg width="25" height="16" viewBox="0 0 25 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M9.37543 9.87265C8.98414 9.87262 8.60165 9.75656 8.27633 9.53915C7.951 9.32173 7.69745 9.01273 7.54774 8.65122C7.39803 8.28971 7.35889 7.89192 7.43526 7.50816C7.51162 7.1244 7.70007 6.7719 7.97678 6.49524C8.25348 6.21858 8.60601 6.03019 8.98979 5.95389C9.37356 5.87759 9.77135 5.9168 10.1328 6.06658C10.4943 6.21635 10.8033 6.46995 11.0206 6.79531C11.238 7.12068 11.354 7.50319 11.3539 7.89447C11.3534 8.41902 11.1448 8.92193 10.7739 9.2928C10.4029 9.66368 9.89997 9.87222 9.37543 9.87265ZM9.37543 4.35327C8.67514 4.35333 7.9906 4.56105 7.40836 4.95015C6.82612 5.33925 6.37234 5.89226 6.10438 6.53925C5.83642 7.18624 5.76632 7.89816 5.90296 8.58499C6.03959 9.27181 6.37681 9.9027 6.87198 10.3979C7.36716 10.8931 7.99804 11.2303 8.68487 11.3669C9.37169 11.5036 10.0836 11.4335 10.7306 11.1655C11.3776 10.8976 11.9306 10.4438 12.3197 9.86158C12.7088 9.27935 12.9166 8.59481 12.9166 7.89452C12.9157 6.95564 12.5422 6.05549 11.8784 5.3916C11.2145 4.7277 10.3143 4.3543 9.37543 4.35332V4.35327ZM16.04 2.95591C16.0399 3.16306 15.9575 3.36168 15.811 3.50816C15.6645 3.65464 15.4659 3.737 15.2588 3.73715H13.3638C13.1566 3.73715 12.9579 3.65484 12.8114 3.50833C12.6649 3.36182 12.5826 3.16311 12.5826 2.95591C12.5826 2.74871 12.6649 2.54999 12.8114 2.40348C12.9579 2.25697 13.1566 2.17466 13.3638 2.17466H15.2588C15.466 2.17466 15.6647 2.25697 15.8112 2.40348C15.9577 2.54999 16.04 2.74871 16.04 2.95591ZM23.4375 12.6737L18.751 9.9682V5.53749L23.4375 2.83208V12.6737ZM17.1883 13.7424V1.76328C17.1876 1.71038 17.1664 1.65982 17.1291 1.62231C17.0917 1.58481 17.0413 1.5633 16.9884 1.56235H1.76313C1.71011 1.56314 1.65949 1.58456 1.62203 1.62209C1.58456 1.65961 1.5632 1.71026 1.5625 1.76328V13.7424C1.56322 13.7954 1.58458 13.846 1.62204 13.8835C1.65951 13.9209 1.71011 13.9423 1.76308 13.943H16.9884C17.0413 13.9421 17.0917 13.9207 17.129 13.8832C17.1663 13.8458 17.1876 13.7953 17.1883 13.7424ZM24.2431 1.43642C24.0135 1.30212 23.7523 1.23134 23.4863 1.23134C23.2203 1.23134 22.9591 1.30212 22.7295 1.43642L18.751 3.73344V1.76328C18.7506 1.29583 18.5648 0.84762 18.2343 0.517031C17.9039 0.186441 17.4557 0.000491411 16.9883 0H1.76313C1.29566 0.000542833 0.847496 0.186495 0.516957 0.517061C0.186419 0.847626 0.000503996 1.29581 0 1.76328V13.7424C0.000491144 14.2099 0.186421 14.6581 0.516992 14.9887C0.847563 15.3193 1.29577 15.5052 1.76328 15.5057H16.9884C17.4559 15.5052 17.904 15.3193 18.2345 14.9887C18.565 14.6581 18.7508 14.2099 18.7511 13.7424V11.7723L22.7295 14.0693C22.9596 14.2021 23.2206 14.2721 23.4864 14.2721C23.7521 14.2721 24.0132 14.2021 24.2433 14.0692C24.4734 13.9363 24.6645 13.7452 24.7973 13.515C24.9301 13.2849 25 13.0238 25 12.7581V2.74731C25.0016 2.48129 24.9323 2.21964 24.7993 1.98926C24.6663 1.75887 24.4743 1.56806 24.2431 1.43642Z" fill="#0291F7" />
                            </svg>
                            worksheet
                        </button>
                    </div>
                    <div className="educare-academic-content-management-resource-item">
                        <button type="button" className="flex items-center gap-[5px]">
                            <svg width="25" height="22" viewBox="0 0 25 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12.6603 7.73376C11.2519 7.73376 10.1101 8.87548 10.1101 10.2839C10.1101 11.6923 11.2518 12.8341 12.6603 12.8341C14.0686 12.8341 15.2104 11.6923 15.2104 10.2839C15.2104 8.87548 14.0687 7.73376 12.6603 7.73376ZM12.6603 11.6196C11.9225 11.6196 11.3245 11.0216 11.3245 10.2838C11.3245 9.54611 11.9225 8.94806 12.6603 8.94806C13.398 8.94806 13.996 9.54611 13.996 10.2838C13.996 11.0216 13.398 11.6196 12.6603 11.6196Z" fill="#0291F7" />
                                <path d="M22.8305 1.90487L6.25473 0.0226781C5.61141 -0.0687844 4.95961 0.119022 4.4636 0.538797C3.96765 0.923358 3.64973 1.4934 3.5832 2.11743L3.27964 4.60685H2.33846C1.00267 4.60685 0.000820427 5.7908 0.000820427 7.1266V19.5433C-0.0328243 20.817 0.972508 21.877 2.24636 21.9106C2.27704 21.9115 2.30778 21.9116 2.33846 21.9112H19.0053C20.3411 21.9112 21.5555 20.879 21.5555 19.5433V19.0575C21.9696 18.9775 22.3625 18.8121 22.7091 18.5718C23.201 18.1577 23.5159 17.5712 23.5895 16.9324L24.986 4.60685C25.1284 3.26797 24.1676 2.06356 22.8305 1.90487ZM20.3411 19.5433C20.3411 20.2111 19.6732 20.6969 19.0053 20.6969H2.33846C1.73512 20.7146 1.23167 20.2399 1.21395 19.6365C1.21302 19.6054 1.21343 19.5743 1.21517 19.5433V17.2967L5.92078 13.8358C6.48606 13.4018 7.28226 13.4404 7.80303 13.9269L11.1121 16.8413C11.6146 17.2633 12.2472 17.4991 12.9033 17.5092C13.4163 17.5155 13.9209 17.3789 14.3606 17.1146L20.3412 13.6537V19.5433H20.3411ZM20.3411 12.2268L13.7229 16.0824C13.1546 16.4191 12.4353 16.3581 11.9317 15.9306L8.59232 12.9858C7.63521 12.1634 6.23631 12.1129 5.2225 12.8643L1.21517 15.7788V7.1266C1.21517 6.4587 1.67056 5.82119 2.33846 5.82119H19.0053C19.7189 5.85077 20.2952 6.41396 20.3411 7.1266V12.2268ZM23.7728 4.44292C23.7724 4.44693 23.7721 4.451 23.7716 4.45501L22.3448 16.7806C22.3472 17.1002 22.2015 17.4029 21.9501 17.6003C21.8286 17.7217 21.5554 17.7825 21.5554 17.8432V7.1266C21.5075 5.74356 20.3888 4.63817 19.0053 4.60685H4.49393L4.76716 2.23887C4.82643 1.93224 4.98675 1.65436 5.22255 1.44953C5.48881 1.26544 5.81073 1.17962 6.13334 1.20664L22.6788 3.11921C23.3464 3.18261 23.8362 3.77526 23.7728 4.44292Z" fill="#0291F7" />
                            </svg>
                            Picture
                        </button>
                    </div>
                    <div className="educare-academic-content-management-resource-item">
                        <button type="button" className="flex items-center gap-[5px]">
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.33325 17.9167H7.49992C7.26981 17.9167 7.08325 18.1032 7.08325 18.3334C7.08325 18.5635 7.26981 18.75 7.49992 18.75H8.33325C8.56336 18.75 8.74992 18.5635 8.74992 18.3334C8.74992 18.1032 8.56336 17.9167 8.33325 17.9167Z" fill="#0291F7" />
                                <path d="M19.9999 17.9167H9.99992C9.76981 17.9167 9.58325 18.1032 9.58325 18.3334C9.58325 18.5635 9.76981 18.75 9.99992 18.75H19.9999C20.23 18.75 20.4166 18.5635 20.4166 18.3334C20.4166 18.1032 20.23 17.9167 19.9999 17.9167Z" fill="#0291F7" />
                                <path d="M8.33325 15.4167H7.49992C7.26981 15.4167 7.08325 15.6032 7.08325 15.8334C7.08325 16.0635 7.26981 16.25 7.49992 16.25H8.33325C8.56336 16.25 8.74992 16.0635 8.74992 15.8334C8.74992 15.6032 8.56336 15.4167 8.33325 15.4167Z" fill="#0291F7" />
                                <path d="M19.9999 15.4167H9.99992C9.76981 15.4167 9.58325 15.6032 9.58325 15.8334C9.58325 16.0635 9.76981 16.25 9.99992 16.25H19.9999C20.23 16.25 20.4166 16.0635 20.4166 15.8334C20.4166 15.6032 20.23 15.4167 19.9999 15.4167Z" fill="#0291F7" />
                                <path d="M8.33325 12.9167H7.49992C7.26981 12.9167 7.08325 13.1032 7.08325 13.3334C7.08325 13.5635 7.26981 13.75 7.49992 13.75H8.33325C8.56336 13.75 8.74992 13.5635 8.74992 13.3334C8.74992 13.1032 8.56336 12.9167 8.33325 12.9167Z" fill="#0291F7" />
                                <path d="M19.9999 12.9167H9.99992C9.76981 12.9167 9.58325 13.1032 9.58325 13.3334C9.58325 13.5635 9.76981 13.75 9.99992 13.75H19.9999C20.23 13.75 20.4166 13.5635 20.4166 13.3334C20.4166 13.1032 20.23 12.9167 19.9999 12.9167Z" fill="#0291F7" />
                                <path d="M8.33325 10.4167H7.49992C7.26981 10.4167 7.08325 10.6032 7.08325 10.8334C7.08325 11.0635 7.26981 11.25 7.49992 11.25H8.33325C8.56336 11.25 8.74992 11.0635 8.74992 10.8334C8.74992 10.6032 8.56336 10.4167 8.33325 10.4167Z" fill="#0291F7" />
                                <path d="M19.9999 10.4167H9.99992C9.76981 10.4167 9.58325 10.6032 9.58325 10.8334C9.58325 11.0635 9.76981 11.25 9.99992 11.25H19.9999C20.23 11.25 20.4166 11.0635 20.4166 10.8334C20.4166 10.6032 20.23 10.4167 19.9999 10.4167Z" fill="#0291F7" />
                                <path d="M8.33325 7.91669H7.49992C7.26981 7.91669 7.08325 8.10325 7.08325 8.33335C7.08325 8.56346 7.26981 8.75002 7.49992 8.75002H8.33325C8.56336 8.75002 8.74992 8.56346 8.74992 8.33335C8.74992 8.10325 8.56336 7.91669 8.33325 7.91669Z" fill="#0291F7" />
                                <path d="M19.9999 7.91669H9.99992C9.76981 7.91669 9.58325 8.10325 9.58325 8.33335C9.58325 8.56346 9.76981 8.75002 9.99992 8.75002H19.9999C20.23 8.75002 20.4166 8.56346 20.4166 8.33335C20.4166 8.10325 20.23 7.91669 19.9999 7.91669Z" fill="#0291F7" />
                                <path d="M22.9112 6.22375C22.9091 6.18724 22.902 6.1512 22.8899 6.11667C22.8853 6.10333 22.882 6.09042 22.8762 6.0775C22.8559 6.03219 22.8277 5.99083 22.7928 5.95542L16.9595 0.122083C16.9241 0.0872396 16.8827 0.0590104 16.8374 0.03875C16.8245 0.0329167 16.8116 0.0295833 16.7987 0.025C16.7638 0.0130208 16.7275 0.00572917 16.6908 0.00333333C16.6837 0.00458333 16.6758 0 16.6666 0H4.99992C4.76981 0 4.58325 0.186562 4.58325 0.416667V1.66667H2.49992C2.26981 1.66667 2.08325 1.85323 2.08325 2.08333V24.5833C2.08325 24.8134 2.26981 25 2.49992 25H19.9999C20.23 25 20.4166 24.8134 20.4166 24.5833V22.5H22.4999C22.73 22.5 22.9166 22.3134 22.9166 22.0833V6.25C22.9166 6.24083 22.912 6.23292 22.9112 6.22375ZM17.0833 1.4225L21.4941 5.83333H17.0833V1.4225ZM19.5833 24.1667H2.91659V2.5H4.58325V22.0833C4.58325 22.3134 4.76981 22.5 4.99992 22.5H19.5833V24.1667ZM22.0833 21.6667H5.41659V0.833333H16.2499V6.25C16.2499 6.4801 16.4365 6.66667 16.6666 6.66667H22.0833V21.6667Z" fill="#0291F7" />
                                <path d="M9.99992 3.75H7.49992C7.26981 3.75 7.08325 3.93656 7.08325 4.16667V6.66667C7.08325 6.89677 7.26981 7.08333 7.49992 7.08333H9.99992C10.23 7.08333 10.4166 6.89677 10.4166 6.66667V4.16667C10.4166 3.93656 10.23 3.75 9.99992 3.75ZM9.58325 6.25H7.91659V4.58333H9.58325V6.25Z" fill="#0291F7" />
                            </svg>
                            document
                        </button>
                    </div>
                </div>
                <div className="educare-academic-content-management-resource-btn flex flex-wrap justify-end gap-[5px] mb-[25px]">
                    <button
                        type="button"
                        onClick={addFields}
                        className='px-[12px] pt-[2px] pb-[3px] text-[14px] text-white rounded-[30px] bg-primary capitalize'
                    >
                        <span className="text-[12px]"><i className="icon-plus mr-1"></i></span>
                        Add resource
                    </button>
                </div>
                <div>
                    {formFields?.length > 0 ?
                        formFields?.map((item, index) => (
                            <div key={index} className="grid grid-cols-12 gap-4 relative px-10 py-10">
                                {/*close button for each row */}
                                <div className="z-[1] survey-timeline-close-btn absolute top-[20px] right-0 flex">
                                    <button
                                        type="button"
                                        className="educare-danger-btn-xs-fill cursor-pointer transition ease-in-out rounded duration-150 bg-danger/80"
                                        onClick={() => removeFields(index)}
                                    >
                                        <i className='icon-MinusCircle'></i>Close
                                    </button>
                                </div>
                                {/*every row component*/}
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Resource Type"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                        <SelectInput
                                            data_label="Type"
                                            data={resourceTypes}
                                            value={item?.resourse_type}
                                            onChange={(event) => handleFormChange(event, index, "resourse_type")}
                                            className="block"
                                        />
                                        <InputError
                                            message={
                                                errors.resourse_type
                                            }
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-12 md:col-span-4">
                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="Title"
                                            />
                                            <TextInput
                                                value={item?.title}
                                                onChange={(event) => handleFormChange(event, index, "title")}
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
                                </div>
                                {
                                    item.resourse_type.toLowerCase() === 'link' ? (<div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                            <div className="educare-input-field-styles">
                                                {/* <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Enter Link"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div> */}
                                                <InputLabel
                                                    value="Enter Link"
                                                />
                                                <TextInput
                                                    value={item?.link}
                                                    onChange={(event) => handleFormChange(event, index, "link")}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.link
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>) : ''
                                }
                                {
                                    item.resourse_type.toLowerCase() === 'youtube' ? (<div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                            <div className="educare-input-field-styles">
                                                {/* <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            value="Enter Youtube Link"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div> */}
                                                <InputLabel
                                                    value="Enter Youtube Link"
                                                />
                                                <TextInput
                                                    value={item?.youtube_link}
                                                    onChange={(event) => handleFormChange(event, index, "youtube_link")}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.youtube_link
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>) : ''
                                }
                                {
                                    item.resourse_type.toLowerCase() === 'worksheet' ? (<div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel value="Upload Document" />
                                            <div className="educare-input-type-file-styles">
                                                <input
                                                    id="worksheet"
                                                    type="file"
                                                    name="worksheet"
                                                    onChange={(event) => handleFormChange(event, index, "worksheet")}
                                                />
                                            </div>
                                        </div>
                                    </div>) : ''
                                }
                                {
                                    item.resourse_type.toLowerCase() === 'document' ? (<div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel value="Upload Document" />
                                            <div className="educare-input-type-file-styles">
                                                <input
                                                    id="document"
                                                    type="file"
                                                    name="document"
                                                    onChange={(event) => handleFormChange(event, index, "document")}
                                                />
                                            </div>
                                        </div>
                                    </div>) : ''
                                }
                                {
                                    item.resourse_type.toLowerCase() === 'picture' ? (<div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel value="Upload Picture" />
                                            <div className="educare-input-type-file-styles">
                                                <input
                                                    id="upload_picture"
                                                    type="file"
                                                    name="upload_picture"
                                                    onChange={(event) => handleFormChange(event, index, "upload_picture")}
                                                />
                                            </div>
                                        </div>
                                    </div>) : ''
                                }
                                {
                                    item.resourse_type.toLowerCase() === 'audio' ? (<div className="col-span-12 md:col-span-4">
                                        <div className="educare-input-field-styles">
                                            <InputLabel value="Upload Picture" />
                                            <div className="educare-input-type-file-styles">
                                                <input
                                                    id="upload_audio"
                                                    type="file"
                                                    name="upload_audio"
                                                    onChange={(event) => handleFormChange(event, index, "upload_audio")}
                                                />
                                            </div>
                                        </div>
                                    </div>) : ''
                                }
                                {
                                    item.resourse_type.toLowerCase() === 'text' ? (<div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <TextareaInput
                                                value={
                                                    item.description
                                                }
                                                onChange={(event) => handleFormChange(event, index, "description")}
                                                className="block"
                                                placeholder='Type description...'
                                            />
                                            <InputError
                                                message={
                                                    errors.description
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>) : ''
                                }
                            </div>
                        )) :
                        ''
                    }
                </div>
                <div className="educare-academic-content-management-action-btn flex justify-end gap-[5px]">
                    <button
                        className="px-[15px] pt-[3px] pb-[5px] text-[14px] text-white rounded-[8px] bg-gray-400"
                        type="button"
                        onClick={handleReset}
                    >
                        Clear
                    </button>
                    <button
                        className="px-[15px] pt-[3px] pb-[5px] text-white rounded-[8px] bg-primary"
                        type="button"
                        onClick={handleLearningMaterialSave}
                    >
                        Save
                    </button>
                </div>
            </div>

            <AddNewTopicPopup
                addNewTopic={addNewTopic}
                setAddNewTopic={setAddNewTopic}
                onlineTopics={onlineTopics}
                formData={data}
                handleFilterLearningMaterial={handleFilterLearningMaterial}
            />
        </>
    );
};

export default AddMaterial;
