import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import 'react-toastify/dist/ReactToastify.css';
import AccountGroupList from "../List/AccountGroupList";


export default function CreateAccountGroupForm({ parentTitles = [], accountGroups = [] }) {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        parent_id: "",
        title: "",
    });

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("account_group.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };


    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12 order-2 lg:order-1">
                        <AccountGroupList accountGroups={accountGroups} />
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12 order-1 lg:order-2">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add account group
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataInsert}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
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
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        id="title"
                                                        value={data?.title}
                                                        onChange={(e) =>
                                                            setData("title", e.target.value)
                                                        }
                                                        type="text"
                                                        className="block"
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors?.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="parent_id"
                                                                value="Under"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        id="parent_id"
                                                        data_label="account"
                                                        data={parentTitles}
                                                        value={
                                                            data.parent_id
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "parent_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors?.parent_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="educare-classroom-button-wrapper">
                                            <div className="flex justify-end">
                                                <PrimaryButton
                                                    type="submit"
                                                    disabled={processing}
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
