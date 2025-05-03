import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import 'react-toastify/dist/ReactToastify.css';
import LedgerList from "../List/LedgerList";

export default function CreateLedgerForm({
    ledgers,
    accountGroupTitles = [],
    ledgerAmountArr = [],
    accountId,
    search,
}) {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        account_group_id: "",
        title: "",
        mobile: "",
        alt_mobile: "",
        email: "",
        address: "",
        opening_balance: "",
        amount_type: "",
        description: "",
    });

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("ledger.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    // hndle reset start
    const handleReset = () => {
        router.get(route('ledger.list'));
    }
    // hndle reset end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-7 xl:col-span-7 col-span-12 order-2 lg:order-1">
                        <LedgerList
                            ledgers={ledgers}
                            accountGroupTitles={accountGroupTitles}
                            accountId={accountId}
                            search={search}
                        />
                    </div>
                    <div className="lg:col-span-5 xl:col-span-5 col-span-12 order-1 lg:order-2">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title pb-none">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add new ledger
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataInsert}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        <div className="grid grid-cols-12 gap-5">

                                            {/* start field */}
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="account_group_id"
                                                                value="Account group"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="account_group_id"
                                                        data_label="account group"
                                                        data={accountGroupTitles}
                                                        value={
                                                            data.account_group_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "account_group_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.account_group_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
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
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="mobile"
                                                                value="Mobile"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="mobile"
                                                        value={
                                                            data.mobile
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "mobile",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.mobile
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="alt_mobile"
                                                                value="Alternate mobile"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="alt_mobile"
                                                        value={
                                                            data.alt_mobile
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "alt_mobile",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.alt_mobile
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="email"
                                                                value="Email"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="email"
                                                        value={
                                                            data.email
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "email",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="email"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.email
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="address"
                                                                value="Address"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="address"
                                                        value={
                                                            data.address
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "address",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="text"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.address
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="opening_balance"
                                                                value="Opening Balance"
                                                            />
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="opening_balance"
                                                        value={
                                                            data.opening_balance
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "opening_balance",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                        type="number"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.opening_balance
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                            {/* start field */}
                                            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="amount_type"
                                                                value="Amount type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="amount_type"
                                                        data_label="amount type"
                                                        data={ledgerAmountArr}
                                                        value={
                                                            data.amount_type
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "amount_type",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.amount_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* start field */}

                                        </div>

                                        {/* Start Field  */}
                                        <div className="educare-classroom-button-wrapper mt-6">
                                            <div className="flex justify-end gap-2">
                                                <PrimaryButton
                                                    className="educare-gray-btn-lg-fill"
                                                    type="button"
                                                    onClick={handleReset}
                                                >
                                                    Reset
                                                </PrimaryButton>
                                                <PrimaryButton
                                                    type="submit"
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
        </>
    );
}
