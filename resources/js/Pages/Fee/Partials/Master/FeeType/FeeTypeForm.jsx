import Checkbox from '@/Components/Checkbox';
// import Dropdown from "@/Components/Dropdown";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";

export default function FeeTypeForm({types = [], installment_types = [], categories = []}) {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        fee_type: "",
        installment_type: "",
        category_id: "",
        display_name: "",
        is_fee_refundable: "",
        is_late_fee: "",
        is_transport_fee: "",
        description: "",
    });


    const handleLateFeeChange = (e) => {
        const is_late_fee = e.target.checked;

        setData((prevData) => ({
            ...prevData,
            is_late_fee: is_late_fee,
            is_transport_fee: "",
        }));
    }

    const handleTransportFeeChange = (e) => {
        const is_transport_fee = e.target.checked;

        setData((prevData) => ({
            ...prevData,
            is_transport_fee: is_transport_fee,
            is_late_fee: "",
        }));
    }


    const handleFeeTypeData = (e) => {
        e.preventDefault();
        post(route("fee.type.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const handleFeeTypeDelete = (id) => {
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
                router.delete(route("fee.type.delete", id));
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
                                    Fee Types
                                    <span>(Total : {types?.length})</span>
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
                                                    {types?.length > 0 ? (
                                                        types?.map(
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
                                                                                            "fee.type.edit",
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
                                                                                            handleFeeTypeDelete(
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

                                                    {/* <tr>
                                                        <td>Transport</td>
                                                        <td>
                                                            Transportation Fee
                                                        </td>
                                                        <td>Installment </td>
                                                        <td>Van Fe</td>
                                                        <td>
                                                            <span className="badge warning">
                                                                No
                                                            </span>
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
                                                                <div className="relative">
                                                                    <Dropdown>
                                                                        <Dropdown.Trigger>
                                                                            <div className="educare-dropdown-menu">
                                                                                <button
                                                                                    type="button"
                                                                                    className="educare-dark-btn-sm-fill"
                                                                                >
                                                                                    <i className="icon-DotsThreeOutlineVertical"></i>
                                                                                </button>
                                                                            </div>
                                                                        </Dropdown.Trigger>
                                                                        <Dropdown.Content>
                                                                            <Dropdown.Link href="#">
                                                                                <i className="icon-info text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                Student
                                                                                Details
                                                                            </Dropdown.Link>
                                                                            <Dropdown.Link href="#">
                                                                                <i className="icon-TrashSimple text-[20px] text-supportingA mr-1"></i>{" "}
                                                                                Delete
                                                                            </Dropdown.Link>
                                                                        </Dropdown.Content>
                                                                    </Dropdown>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr> */}
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
                                        Add New Fee Type
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleFeeTypeData}>
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
                                                        value={
                                                            data.fee_type
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
                                                        data_label="Installment"
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
                                                        data={categories}
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
                                            <div className="col-span-12">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className=" inline-block">
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
                                                            value="Is Fee Refundable?"
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
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className=" inline-block">
                                                        <Checkbox
                                                            id="is_late_fee"
                                                            name="is_late_fee"
                                                            checked={
                                                                data.is_late_fee
                                                            }
                                                            onChange={(e) =>
                                                                handleLateFeeChange(e)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="is_late_fee"
                                                            value="Is Late Fee?"
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.is_late_fee
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className=" inline-block">
                                                        <Checkbox
                                                            id="is_transport_fee"
                                                            name="is_transport_fee"
                                                            checked={
                                                                data.is_transport_fee
                                                            }
                                                            onChange={(e) =>
                                                                handleTransportFeeChange(e)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="is_transport_fee"
                                                            value="Is Transport Fee?"
                                                        />
                                                    </div>
                                                    <InputError
                                                        message={
                                                            errors.is_transport_fee
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                        type="button"
                                                        onClick={() => reset()}
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
