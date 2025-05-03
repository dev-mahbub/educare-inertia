import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";

export default function ManageBankAccount({ bankAccounts = [], banks = [] }) {

    const { data, setData, errors, processing, post, reset } = useForm({
        account_name: "",
        account_display_name: "",
        account_no: "",
        branch_address: "",
        bank_id: "",
    });


    const handleBankAccountData = (e) => {
        e.preventDefault();
        post(route('bank_account.save'), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                if (props.flash.message != null) {
                    reset()
                }
            }
        });
    };


    const handleBankAccountDelete = (id) => {
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
                router.delete(route("bank_account.destroy", id));
            }
        });
    }


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-12 xl:col-span-6  col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Bank Accounts
                                </h5>
                            </div>
                            <div className="educare-admission-list-area">
                                <div className="educare-admission-list-inner">
                                    <div className="educare-admission-list-inner-wrapper">
                                        <div className="educare-admission-list pb-none">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Account Name</th>
                                                        <th>A/C Display Name</th>
                                                        <th>Account No.</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {bankAccounts?.length > 0 ? (
                                                        bankAccounts?.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item?.account_name}</td>
                                                                <td>{item?.account_display_name}</td>
                                                                <td>{item?.account_no}</td>
                                                                <td>
                                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                        <div>
                                                                            <Tooltip
                                                                                title="Edit"
                                                                                placement="top"
                                                                                arrow
                                                                            >
                                                                                <Link
                                                                                    href={route(
                                                                                        "bank_account.edit",
                                                                                        item?.id
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
                                                                                        handleBankAccountDelete(
                                                                                            item?.id
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
                                        Add New Bank Account
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleBankAccountData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="account_name"
                                                                value="Account Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="account_name"
                                                        value={
                                                            data.account_name
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "account_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.account_name
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
                                                                htmlFor="account_display_name"
                                                                value="A/C Display Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="account_display_name"
                                                        value={data.account_display_name}
                                                        onChange={(e) =>
                                                            setData(
                                                                "account_display_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.account_display_name}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="account_no"
                                                                value="Account No"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="account_no"
                                                        value={data.account_no}
                                                        onChange={(e) =>
                                                            setData(
                                                                "account_no",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.account_no}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="branch_address"
                                                                value="Branch Address"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="branch_address"
                                                        value={data.branch_address}
                                                        onChange={(e) =>
                                                            setData(
                                                                "branch_address",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.branch_address}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="bank_id"
                                                                value="Bank"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="bank_id"
                                                        data_label="Bank"
                                                        data={banks}
                                                        value={
                                                            data.bank_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "bank_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.bank_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        type="submit"
                                                        disabled={processing}
                                                        className="educare-primary-btn-lg-fill"
                                                    >
                                                        Save
                                                    </PrimaryButton>
                                                    <PrimaryButton
                                                        type="button"
                                                        className="educare-gray-btn-lg-stroke"
                                                        disabled={processing}
                                                        onClick={() =>
                                                            reset()
                                                        }
                                                    >
                                                        Reset
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
