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
import SmsSettingEditPopupForm from './SmsSettingEditPopupForm';
import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useRef } from 'react';

const SmsSettingForm = ({ smsTypeArr, smsSettings, classNames }) => {

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editData, setEditData] = useState([]);

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
    });

    // handle insert data
    const handleInsert = (e) => {
        e.preventDefault();
        post(route("sms_setting.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    // update
    const handleEditPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };


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
                                    <div className="educare-admission-list">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Id</th>
                                                    <th>Title</th>
                                                    <th>Class</th>
                                                    <th>Context</th>
                                                    <th>Template</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {smsSettings?.length > 0 ?
                                                    smsSettings?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item?.id}</td>
                                                            <td>{item?.title}</td>
                                                            <td>{item?.class_name?.title}</td>
                                                            <td>{item?.context}</td>
                                                            <td>{item?.description.length > 20 ? item?.description.slice(0, 20) + '...' : item?.description}</td>
                                                            <td>
                                                                <div className="educare-admission-list-action-btn">
                                                                    <div className="educare-list-button-field-styles">
                                                                        <PrimaryButton
                                                                            onClick={() => handleEditPopup(item)}
                                                                            className="bg-warning/80 "
                                                                        >
                                                                            <i className="icon-pen"></i>
                                                                        </PrimaryButton>
                                                                    </div>
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Tooltip title="View" placement="top" arrow>
                                                                            <Link href="#" className="bg-supportingC/80 inline-block">
                                                                                <i className="icon-eye"></i>
                                                                            </Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Tooltip title="Delete" placement="top" arrow>
                                                                            <Link onClick={() => handleDelete(item.id)} href="#" className="bg-danger/80 inline-block">
                                                                                <i className="icon-TrashSimple"></i>
                                                                            </Link>
                                                                        </Tooltip>
                                                                    </div>
                                                                    <div className="educare-list-button-field-styles">
                                                                        <Dropdown>
                                                                            <Dropdown.Trigger>
                                                                                <div
                                                                                    type="button"
                                                                                    className="educare-dropdown-menu"
                                                                                >
                                                                                    <PrimaryButton className="bg-dark/80 inline-block">
                                                                                        <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                    </PrimaryButton>
                                                                                </div>
                                                                            </Dropdown.Trigger>
                                                                            <Dropdown.Content>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-UploadSimple text-[20px] text-supportingA"></i>{" "}
                                                                                    Send sms
                                                                                </Dropdown.Link>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-notifications text-[20px] text-supportingA"></i>{" "}
                                                                                    Send notification
                                                                                </Dropdown.Link>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-Notebook text-[20px] text-supportingA"></i>{" "}
                                                                                    Student work
                                                                                </Dropdown.Link>
                                                                                <Dropdown.Link href="#">
                                                                                    <i className="icon-DownloadSimple text-[20px] text-supportingA"></i>{" "}
                                                                                    Download
                                                                                </Dropdown.Link>
                                                                            </Dropdown.Content>
                                                                        </Dropdown>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )) :
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="8">Data not found</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
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
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="audience"
                                                        data_label="Class"
                                                        data={classNames}
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
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="context"
                                                                value="Context"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="context"
                                                        data_label="context"
                                                        data={smsTypeArr}
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
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="description"
                                                                value="Approved DLT SMS Template"
                                                            />
                                                            <sup>*</sup>
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
                                                        placeholder="Message Template"
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
                                                <div className="educare-button-field-styles mt-2.5 text-end">
                                                    <PrimaryButton
                                                        disabled={processing}
                                                        className="h-12 bg-primary text-white text-[16px] rounded-md font-medium px-6 font-primary inline-block"
                                                    >
                                                        Add sms
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
            <SmsSettingEditPopupForm
                editPopupOpen={editPopupOpen}
                setEditPopupOpen={setEditPopupOpen}
                editData={editData}
                smsTypeArr={smsTypeArr}
                classNames={classNames}
            />
        </>
    );
};

export default SmsSettingForm;
