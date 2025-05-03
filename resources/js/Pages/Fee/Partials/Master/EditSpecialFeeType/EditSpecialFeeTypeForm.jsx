import Checkbox from '@/Components/Checkbox';
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";


export default function SpecialFeeTypeForm({
    special_types = "",
    special_type = "",
    installment_types = "",
    fee_categories = "",
}) {
    const { data, setData, errors, put, reset, processing } = useForm({
        fee_type:special_type.fee_type ,
        installment_type:special_type.installment_type ,
        category_id:special_type.category_id ,
        display_name:special_type.display_name ,
        is_fee_refundable:special_type.is_fee_refundable ,
        description:special_type.description ,
    });

    const handleFeeSpecialTypeUpdate = (e) => {
        e.preventDefault();
        put(route("fee.special_type.update", special_type.id), data, {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleFeeSpecialTypeDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("fee.special_type.delete", id));
            }
        });
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-12 xl:col-span-6  col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Special Fee Types
                                    <span>
                                        (Total : {special_types?.length})
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
                                                        <th>FeeType</th>
                                                        <th>Category</th>
                                                        <th>Type</th>
                                                        <th>Display Name</th>
                                                        <th>Fee Refundable</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {special_types?.length >
                                                    0 ? (
                                                        special_types?.map(
                                                            (item, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        {
                                                                            item?.fee_type
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item?.category?.title
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item?.installment_type
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            item?.display_name
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {item?.is_fee_refundable ? (
                                                                            <span className="badge success">
                                                                                Yes
                                                                            </span>
                                                                        ) : (
                                                                            <span className="badge warning">
                                                                                No
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                    <td>
                                                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                                            <div>
                                                                                <Tooltip
                                                                                    title="Edit"
                                                                                    placement="top"
                                                                                    arrow
                                                                                >
                                                                                    <Link
                                                                                        href={route(
                                                                                            "fee.special_type.edit",
                                                                                            item.id
                                                                                        )}
                                                                                        className="educare-warning-btn-sm-fill"
                                                                                    >
                                                                                        <i className="icon-editing"></i>
                                                                                    </Link>
                                                                                </Tooltip>
                                                                            </div>
                                                                            <div>
                                                                                <Tooltip
                                                                                    title="Delete"
                                                                                    placement="top"
                                                                                    arrow
                                                                                >
                                                                                    <button
                                                                                        className="educare-danger-btn-sm-fill"
                                                                                        onClick={() =>
                                                                                            handleFeeSpecialTypeDelete(
                                                                                                item.id
                                                                                            )
                                                                                        }
                                                                                    >
                                                                                        <i className="icon-TrashSimple"></i>
                                                                                    </button>
                                                                                </Tooltip>
                                                                            </div>
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            )
                                                        )
                                                    ) : (
                                                        <tr>
                                                            <td
                                                                className="text-center text-red-500"
                                                                colSpan="7"
                                                            >
                                                                Data not found
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-12 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add New Special Fee Type
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleFeeSpecialTypeUpdate}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="fee_type"
                                                                value="Fee Type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="fee_type"
                                                        value={data.fee_type}
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
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="installment_type"
                                                                value="Installment Type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="installment_type"
                                                        data_label="Type"
                                                        data={installment_types}
                                                        value={
                                                            data.installment_type
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "installment_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.installment_type
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
                                                                htmlFor="category_id"
                                                                value="Fee Category"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="category_id"
                                                        data_label="Category"
                                                        data={fee_categories}
                                                        value={
                                                            data.category_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "category_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.category_id
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
                                                                htmlFor="display_name"
                                                                value="Display Name"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="display_name"
                                                        value={
                                                            data.display_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "display_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.display_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="translate-y-[0px] inline-block">
                                                        <Checkbox
                                                            id="is_fee_refundable"
                                                            name="is_fee_refundable"
                                                            checked={
                                                                data.is_fee_refundable
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "is_fee_refundable",
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="is_fee_refundable"
                                                            value="Is Fee Refundable ?"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="description"
                                                        value="Description"
                                                    />
                                                    <TextareaInput
                                                        id="description"
                                                        value={data.description}
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <Link
                                                        href={route("fee.special_type")}
                                                        className="educare-gray-btn-lg-stroke"
                                                    >
                                                        {" "}
                                                        Cancel
                                                    </Link>
                                                    <PrimaryButton
                                                        className="educare-primary-btn-lg-fill"
                                                        type="submit"
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
