import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function ImportSalaryInfo() {
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

    const handleImportStaffEarning = (e) => {
        e.preventDefault();

        post(route('import.salary.save_staff_earning'));
    };

    return (
        <div className="educare-import-data-area">
            <form onSubmit={handleImportStaffEarning}>
                <div className="educare-import-data-field-wrapper bg-white/70 p-[30px] pt-5 maxXs:p-[15px] maxXs:pt-2.5 rounded-lg mb-5">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Import Salary
                        </h5>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-12 maxMd:col-span-12 bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg">
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
                                        type="submit"
                                    >
                                        Upload Excel
                                    </PrimaryButton>
                                </div>
                            </div>
                            <div className="import-note-box px-[20px] py-[10px] pb-[15px] min-h-[500px]">
                                <div className="educare-import-note-content">
                                    <strong className="block text-danger mb-2">Important Instructions:</strong>
                                    <strong className="">Note:</strong><span> Please read the following carefully before making any changes:</span>
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
                                                        className="ml-0.5"
                                                    >
                                                        <span className="text-sm block font-bold">
                                                            Download the Template:
                                                        </span>
                                                        <span className="text-sm block">
                                                            <ul className="list-disc ml-4">
                                                                <li>
                                                                    Begin by downloading the template provided below.
                                                                </li>
                                                            </ul>
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
                                                        className="ml-0.5"
                                                    >
                                                        <span className="text-sm block font-bold">
                                                           Edit the "Teacher Salary" Sheet:
                                                        </span>
                                                        <span className="text-sm block">
                                                            <ul className="list-disc ml-4">
                                                                <li>
                                                                    Make changes only within the "Teacher Salary" sheet.
                                                                </li>
                                                            </ul>
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
                                                        className="ml-0.5"
                                                    >
                                                        <span className="text-sm block font-bold">
                                                            Changes Limited to Earnings and Deductions:
                                                        </span>
                                                        <span className="text-sm block">
                                                            <ul className="list-disc  ml-4">
                                                                <li>You are allowed to modify only the Earnings and Deductions sections.</li>
                                                                <li>Do not make any changes to other parts of the template.</li>
                                                            </ul>
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
                                                        className="ml-0.5"
                                                    >
                                                        <span className="text-sm block font-bold">
                                                            Use Valid Expressions or Specific Amounts:
                                                        </span>
                                                        <span className="text-sm block">
                                                            <ul className="list-disc  ml-4">
                                                                <li>
                                                                    Fill in either valid expressions (based on the earning or deduction title) or a specific amount in any of the earning or deduction columns.
                                                                </li>
                                                                <li>
                                                                    Example of a formula: =BaseSalary * 0.1 for a bonus calculation.
                                                                </li>
                                                                <li>
                                                                    Example of a fixed amount: =300 for a deduction.
                                                                </li>
                                                            </ul>
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
                                                        className="ml-0.5"
                                                    >
                                                        <span className="text-sm block font-bold">
                                                            Do Not Alter the Template Format:
                                                        </span>
                                                        <span className="text-sm block font-bold">
                                                            Do not modify the format of the template, including:
                                                        </span>
                                                        <span className="text-sm block">
                                                            <ul className="list-disc  ml-4">
                                                                <li>The unique ID</li>
                                                                <li>Staff names</li>
                                                                <li>Column headers (such as Earnings, Deductions)</li>
                                                            </ul>
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
                                                        className="ml-0.5"
                                                    >
                                                        <span className="text-sm block font-bold">
                                                            Re-import the Modified Template:
                                                        </span>
                                                        <span className="text-sm block">
                                                            <ul className="list-disc ml-4">
                                                                <li>
                                                                    After making the required changes, re-import the template as instructed.
                                                                </li>
                                                            </ul>
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <a
                                        target="_blank"
                                        href={route('export_excel.salary.staff_salary_import_template')}
                                        className="educare-primary-btn-md-fill"
                                    >
                                        <i className="icon-DownloadSimple mr-1"></i>Download template
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form >
        </div >
    );
}
