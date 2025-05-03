import React from 'react';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import Dropdown from "@/Components/Dropdown";

export default function FeeCategoryForm() {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        title: "",
    });

    const handleFeeInstallmentData = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6  col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Category
                                    <span>
                                        (Total : 04)
                                    </span>
                                </h5>
                            </div>
                            <div className="educare-admission-list-area">
                                <div className="educare-admission-list-inner">
                                    <div className="educare-admission-list-inner-wrapper">
                                        <div className="educare-admission-list pb-none">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Monthly fee</td>
                                                        <td>
                                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Edit"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <Link
                                                                            href="#"
                                                                            className="educare-warning-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-editing"></i>
                                                                        </Link>
                                                                    </Tooltip>
                                                                </div>
                                                                <div>
                                                                    <Tooltip
                                                                        title="View"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <Link
                                                                            href="#"
                                                                            className="educare-tertiary-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-eye"></i>
                                                                        </Link>
                                                                    </Tooltip>
                                                                </div>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Delete"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <Link
                                                                            href="#"
                                                                            className="educare-danger-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </Link>
                                                                    </Tooltip>
                                                                </div>
                                                                <div className='relative'>
                                                                    <Dropdown>
                                                                        <Dropdown.Trigger>
                                                                            <div className="educare-dropdown-menu">
                                                                                <button type="button" className="educare-dark-btn-sm-fill">
                                                                                    <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                </button>
                                                                            </div>
                                                                        </Dropdown.Trigger>
                                                                        <Dropdown.Content>
                                                                            <Dropdown.Link href="#">
                                                                                <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                Default fee
                                                                            </Dropdown.Link>
                                                                        </Dropdown.Content>
                                                                    </Dropdown>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td>Exam fee</td>
                                                        <td>
                                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Edit"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <Link
                                                                            href="#"
                                                                            className="educare-warning-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-editing"></i>
                                                                        </Link>
                                                                    </Tooltip>
                                                                </div>
                                                                <div>
                                                                    <Tooltip
                                                                        title="View"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <Link
                                                                            href="#"
                                                                            className="educare-tertiary-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-eye"></i>
                                                                        </Link>
                                                                    </Tooltip>
                                                                </div>
                                                                <div>
                                                                    <Tooltip
                                                                        title="Delete"
                                                                        placement="top"
                                                                        arrow
                                                                    >
                                                                        <Link
                                                                            href="#"
                                                                            className="educare-danger-btn-sm-fill"
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </Link>
                                                                    </Tooltip>
                                                                </div>
                                                                <div className='relative'>
                                                                    <Dropdown>
                                                                        <Dropdown.Trigger>
                                                                            <div className="educare-dropdown-menu">
                                                                                <button type="button" className="educare-dark-btn-sm-fill">
                                                                                    <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                </button>
                                                                            </div>
                                                                        </Dropdown.Trigger>
                                                                        <Dropdown.Content>
                                                                            <Dropdown.Link href="#">
                                                                                <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                Default fee
                                                                            </Dropdown.Link>
                                                                        </Dropdown.Content>
                                                                    </Dropdown>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add New fee category
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleFeeInstallmentData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-12">
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
                                                        id="fee_type"
                                                        value={
                                                            data.tifee_typetle
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "fee_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.fee_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                    >
                                                        Reset
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                    >
                                                        Save
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
}
