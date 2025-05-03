import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";
import ImportItemTableList from "./ImportItemTableList";

export default function ImportItemForm() {
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
        import_file: null,
    });

    const studentImportData = (e) => {
        e.preventDefault();
    };

    // handle download import template start
    const handleDownloadImportTemplate = () => {
        window.open(route('export_excel.inventory.product_import_template'));
    }
    // handle download import template end

    // handle import product start
    const handleImportProduct = (e) => {
        e.preventDefault();

        post(route('import.inventory_product.save'), {
            onSuccess: () => {
                reset();
                assessmentUploadDocumentInput.current.value = '';
            }
        });
    }
    // handle import product end

    return (
        <div className="educare-import-data-area">
            <form onSubmit={studentImportData}>
                <div className="educare-import-data-field-wrapper bg-white/70 p-[30px] pt-5 maxXs:p-[15px] maxXs:pt-2.5 rounded-lg mb-5">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Import Data
                        </h5>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6 maxMd:col-span-12 bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg">
                            <div className="student-import-data flex gap-5 items-end mb-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Browse for the excel sheet:"
                                    />
                                    <div className="educare-input-type-file-styles">
                                        <input
                                            id="import_file"
                                            ref={
                                                assessmentUploadDocumentInput
                                            }
                                            type="file"
                                            name="import_file"
                                            onChange={(e) =>
                                                setData(
                                                    "import_file",
                                                    e.target
                                                        .files[0]
                                                )
                                            }
                                        />
                                        <InputError
                                            message={errors.import_file}
                                            className="mt-2"
                                        />
                                    </div>
                                </div>
                                <div className="text-end">
                                    <PrimaryButton
                                        disabled={processing}
                                        className="educare-secondary-btn-md-fill"
                                        type="button"
                                        onClick={handleImportProduct}
                                    >
                                        Upload Excel
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 maxMd:col-span-12 bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg">
                            <div className="import-note-box px-[20px] py-[10px] pb-[15px] min-h-[500px]">
                                <div className="educare-import-note-content">
                                    <strong className="block text-danger mb-2">Important Instructions for Excel File Submission:</strong>
                                    <div className="educare-import-note-list mt-[10px] mb-[15px]">
                                        <ul>
                                            <li>
                                                <div
                                                    className="flex"
                                                >
                                                    <span className="text-sm font-bold">
                                                        1.
                                                    </span>
                                                    <span
                                                        className="ml-0.5 text-sm"
                                                    >
                                                        <span className="font-bold">
                                                            File Format:
                                                        </span>
                                                        <span className="ml-0.5">
                                                            Only .xlsx or .xls file formats are allowed.
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="flex"
                                                >
                                                    <span className="text-sm font-bold">
                                                        2.
                                                    </span>
                                                    <span
                                                        className="ml-0.5 text-sm"
                                                    >
                                                        <span className="font-bold">
                                                            Required Fields:
                                                        </span>
                                                        <span className="ml-0.5">
                                                            The file must include the Group and Product Name columns.
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="flex"
                                                >
                                                    <span className="text-sm font-bold">
                                                        3.
                                                    </span>
                                                    <span
                                                        className="ml-0.5 text-sm"
                                                    >
                                                        <span className="font-bold">
                                                            Template Integrity:
                                                        </span>
                                                        <span className="ml-0.5">
                                                            Do not change the names of the template columns.
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="flex"
                                                >
                                                    <span className="text-sm font-bold">
                                                        4.
                                                    </span>
                                                    <span
                                                        className="ml-0.5 text-sm"
                                                    >
                                                        <span className="font-bold">
                                                            Row Formatting:
                                                        </span>
                                                        <span className="ml-0.5">
                                                            Avoid placing empty rows between data rows.
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="flex"
                                                >
                                                    <span className="text-sm font-bold">
                                                        5.
                                                    </span>
                                                    <span
                                                        className="ml-0.5 text-sm"
                                                    >
                                                        <span className="font-bold">
                                                            Data Requirement:
                                                        </span>
                                                        <span className="ml-0.5">
                                                            The Excel file must contain at least one row of data.
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="flex"
                                                >
                                                    <span className="text-sm font-bold">
                                                        6.
                                                    </span>
                                                    <span
                                                        className="ml-0.5 text-sm"
                                                    >
                                                        <span className="font-bold">
                                                            Row Limit:
                                                        </span>
                                                        <span className="ml-0.5">
                                                            A maximum of 500 rows are allowed per file.
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <PrimaryButton
                                        disabled={processing}
                                        className="educare-primary-btn-md-fill"
                                        onClick={handleDownloadImportTemplate}
                                    >
                                        <i className="icon-DownloadSimple mr-1"></i>Download template
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-6 maxMd:col-span-12 hidden">
                            <ImportItemTableList />
                        </div>
                    </div>
                </div>
            </form >
        </div >
    );
}
