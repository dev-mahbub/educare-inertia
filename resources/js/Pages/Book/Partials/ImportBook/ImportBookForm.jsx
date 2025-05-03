import React, { useRef } from "react";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function ImportBookForm() {
    const assessmentUploadDocumentInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        import_book_document: null,
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
        <div>
            <div className="educare-card-title pb-none mb-2.5">
                <h5>
                    <i className="icon-ArrowFatLineRight"></i>
                    Import Book
                </h5>
            </div>
            <div className="educare-import-data-area">
                <form onSubmit={studentImportData}>
                    <div className="educare-import-data-field-wrapper bg-white/70 p-[30px] pt-5 maxXs:p-[15px] maxXs:pt-2.5 rounded-lg mb-5">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Read Instruction Carefully
                            </h5>
                        </div>
                        <div className="student-import-data flex gap-5 items-end mb-4">
                            <div className="educare-input-field-styles">
                                <InputLabel
                                    value="Browse for the excel sheet:"
                                />
                                <div className="educare-input-type-file-styles">
                                    <input
                                        id="import_book_document"
                                        ref={
                                            assessmentUploadDocumentInput
                                        }
                                        type="file"
                                        name="import_book_document"
                                        onChange={(e) =>
                                            setData(
                                                "import_book_document",
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
                        <div className="import-note-box px-[20px] py-[10px] pb-[15px] bg-danger/10 border-l-4 min-h-[350px] border-danger">
                            <div className="educare-import-note-content">
                                <strong className="block text-danger mb-2">Important Instruction</strong>
                                <strong className="">Note :</strong><span>Please read the following instructions:</span>
                                <div className="educare-import-note-list mt-[10px]  mb-[15px]">
                                    <ul>
                                        <li>
                                            1) Only .xlsx and .xls is allowed.
                                        </li>
                                        <li>
                                            2) ACCNO is distinct and required.
                                        </li>
                                        <li>
                                            3) Don't make changes in template.
                                        </li>
                                        <li>
                                            4) Excel must contain at least one row value.
                                        </li>
                                        <li>
                                            5) Maximum 500 row values are allowed at a time.
                                        </li>
                                        <li>
                                            6) Date format is mm/dd/yyyy and text type.
                                        </li>
                                    </ul>
                                </div>

                                <PrimaryButton
                                    disabled={processing}
                                    className="educare-primary-btn-md-fill"
                                >
                                    <i className="icon-DownloadSimple mr-1"></i>Download template
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                </form >
            </div >
        </div>
    );
}
