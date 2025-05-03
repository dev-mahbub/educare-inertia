import React, { useRef } from "react";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import InputError from "@/Components/InputError";

export default function CreateImport() {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        import_student_fee_upload_document: null,
        import_transport_voucher_upload_document: null,
        select_class: "",

    });

    const studentImportData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                //   if (errors.city) {
                //       reset("city", "zip");
                //       cityInput.current.focus();
                //   }
            },
        });
    };

    return (
        <div className="educare-import-data-area">
            <form onSubmit={studentImportData}>
                <div className="educare-import-data-field-wrapper bg-white/70 p-[30px] pt-5 maxXs:p-[15px] maxXs:pt-2.5 rounded-lg mb-5">

                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6 maxMd:col-span-12">
                            <div className="educare-common-card">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-common-card-title">
                                        <h5>
                                            <i className="icon-BookBookmark"></i>
                                            Import Student Fee
                                        </h5>
                                    </div>
                                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="student-import-data flex gap-5 items-end">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Browse for the excel sheet:"
                                                />
                                                <div className="educare-input-type-file-styles">
                                                    <input
                                                        id="import_student_fee_upload_document"
                                                        type="file"
                                                        name="import_student_fee_upload_document"
                                                        onChange={(e) =>
                                                            setData(
                                                                "import_student_fee_upload_document",
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    className="educare-secondary-btn-md-fill"
                                                >
                                                    Upload Excel
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="educare-common-card">
                                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                                    <div className="educare-common-card-title">
                                        <h5>
                                            <i className="icon-BookBookmark"></i>
                                            Import Transport Voucher
                                        </h5>
                                    </div>
                                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                        <div className="student-import-data flex gap-5 items-end">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Browse for the excel sheet:"
                                                />
                                                <div className="educare-input-type-file-styles">
                                                    <input
                                                        id="import_transport_voucher_upload_document"
                                                        type="file"
                                                        name="import_transport_voucher_upload_document"
                                                        onChange={(e) =>
                                                            setData(
                                                                "import_transport_voucher_upload_document",
                                                                e.target
                                                                    .files[0]
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                            <div className="text-end">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    className="educare-secondary-btn-md-fill"
                                                >
                                                    Upload Excel
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 maxMd:col-span-12">
                            <div className="import-note-box px-[20px] py-[10px] pb-[15px] bg-danger/10 border-l-4 min-h-[500px] border-danger">
                                <div className="educare-import-note-content">
                                    <strong className="block text-danger mb-2">Important!!</strong>
                                    <strong className="">Note :</strong><span>Please read the following instructions:</span>
                                    <div className="educare-import-note-list mt-1  mb-[20px]">
                                        <ul>
                                            <li className="mb-1">
                                                1) Don't make any changes in downloaded template.
                                            </li>
                                            <li className="mb-1">
                                                2) Date format should be (mm-dd-yyyy).
                                            </li>
                                            <li className="mb-1">
                                                3) Admission number is mandatory.
                                            </li>
                                            <li className="mb-1">
                                                4) Please fill in payment mode column:  "Cash,Cheque,Paytm,Neft,Online,CardSwap,BankProcess,EmployeeWard,Other "
                                            </li>
                                            <li className="mb-1">
                                                5) Don't change payment mode spelling it should be remains same as it is.
                                            </li>
                                            <li className="mb-1">
                                                <strong>6) This will import fees without any late fees.</strong>
                                            </li>

                                        </ul>
                                    </div>
                                    <div className="flex flex-wrap justify-start gap-5">
                                        <div className="select-class">
                                            <div className="educare-input-field-styles w-56">
                                                <SelectInput
                                                    data_label="Class"
                                                    data={[]}
                                                    value={
                                                        data.select_class
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "select_class",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.select_class
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="download-button">
                                            <PrimaryButton
                                                disabled={processing}
                                                className="educare-primary-btn-md-fill"
                                            >
                                                <i className="icon-DownloadSimple mr-1"></i>Download template
                                            </PrimaryButton>
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
}
