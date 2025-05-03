import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { Inertia } from '@inertiajs/inertia';
import { useForm } from "@inertiajs/react";

export default function ImportPreviousDue({ fees = [], feeTypes = [] }) {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        due_fee_file: null,
        fee_id: "",
        fee_type_id: "",
        is_fee_special:false,
    });

    const handleFeeTypeChange = (e) => {
        setData((prevData) => ({
            ...prevData,
            fee_type_id: e.target.value,
            is_fee_special: feeTypes?.find(item => item?.id == e.target.value)?.is_fee_special,
        }))
    }

    const handleReset = () => {
        reset();
        // setData({})
    }

    const handleError = (errors) => {
        // console.log(errors);
    }

    const prevFeeImportData = (e) => {
        e.preventDefault();

        post(route("fee_import.previous_due_store"), {
            preserveScroll: true,
            onSuccess: () => handleReset(),
            onError: (errors) => handleError(errors),
        });
    };


    const handleDownloadTemplate = () => {
        Inertia.visit(route('fee_import.previous_due_template.download'), { method: 'get' });
    }

    return (
        <div className="educare-import-data-area">
            <div className="educare-import-data-field-wrapper bg-white/70 p-[30px] pt-5 maxXs:p-[15px] maxXs:pt-2.5 rounded-lg mb-5">
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-6 maxMd:col-span-12">
                        <div className="educare-common-card">
                            <form onSubmit={prevFeeImportData}>
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-common-card-title">
                                        <h5>
                                            <i className="icon-BookBookmark"></i>
                                            Import Previous Due
                                        </h5>
                                    </div>
                                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="grid grid-cols-12 gap-5 mb-6">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="select-class">
                                                    <div className="educare-input-field-styles w-full">
                                                        <SelectInput
                                                            data_label="Installment"
                                                            data={fees}
                                                            value={
                                                                data.fee_id
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "fee_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.fee_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="select-class">
                                                    <div className="educare-input-field-styles w-full">
                                                        <SelectInput
                                                            data_label="Fee Type"
                                                            data={feeTypes}
                                                            value={
                                                                data.fee_type_id
                                                            }
                                                            onChange={(e) =>
                                                                handleFeeTypeChange(e)
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.fee_type_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="student-import-data flex gap-5 items-end">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Browse for the excel sheet:"
                                                />
                                                <div className="educare-input-type-file-styles">
                                                    <input
                                                        id="due_fee_file"
                                                        type="file"
                                                        name="due_fee_file"
                                                        onChange={(e) =>
                                                            setData("due_fee_file", e.target.files[0])
                                                        }
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.due_fee_file
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    type="submit"
                                                    className="educare-secondary-btn-md-fill"
                                                >
                                                    Upload Excel
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-span-6 maxMd:col-span-12">
                        <div className="import-note-box px-[20px] py-[10px] pb-[15px] bg-danger/10 border-l-4 min-h-[500px] border-danger">
                            <div className="educare-import-note-content">
                                <strong className="block text-danger mb-2">Important!!</strong>
                                <strong className="">Note :</strong><span>Please read the following instructions:</span>
                                <div className="educare-import-note-list mt-[5px]  mb-[20px]">
                                    <ul>
                                        <li className="mb-1">
                                        1) Don't make any changes in downloaded template.
                                        </li>
                                        <li className="mb-1">
                                        {/* 2) Admission number and amount are mandatory. */}
                                        2) Admission number and amount are mandatory.
                                        </li>

                                    </ul>
                                </div>
                                <div className="download-button">
                                    <a target="_blank" href={route('fee_import.previous_due_template.download')}
                                        className="educare-primary-btn-md-fill">
                                        <i className="icon-DownloadSimple mr-1"></i>Download template
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
