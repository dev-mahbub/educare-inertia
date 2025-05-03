import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

const TeacherImportForm = () => {
    const importTeacherDocumentInput = useRef();

    const { data, setData, errors, post, reset, recentlySuccessful } = useForm({
        staff_import_file: null,
    });

    const teacherImportData = (e) => {
        e.preventDefault();

        post(route("import.staff_create.save"), {
            preserveScroll: true,
            onSuccess: ({ props }) => {
                reset();
            },
            onError: (errors) => {

            },
        });
    };

    return (
        <div className="educare-import-data-area">
            <form onSubmit={teacherImportData}>
                <div className="educare-import-data-field-wrapper">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Import Teacher data
                        </h5>
                    </div>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6 maxMd:col-span-12 bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg">
                            <div className="student-import-data flex gap-5 items-end">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Browse for the excel sheet:"
                                    />
                                    <div className="educare-input-type-file-styles">
                                        <input
                                            className="block"
                                            id="staff_import_file"
                                            ref={
                                                importTeacherDocumentInput
                                            }
                                            type="file"
                                            name="staff_import_file"
                                            onChange={(e) =>
                                                setData(
                                                    "staff_import_file",
                                                    e.target
                                                        .files[0]
                                                )
                                            }
                                        />
                                        {/* <InputError
                                            message={
                                                errors.staff_import_file
                                            }
                                            className="mt-2"
                                        /> */}
                                    </div>
                                </div>
                                <div className="text-end">
                                    <PrimaryButton
                                        className="educare-secondary-btn-md-fill"
                                    >
                                        Upload Excel
                                    </PrimaryButton>
                                </div>
                            </div>
                            <InputError
                                message={
                                    errors.staff_import_file
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="col-span-6 maxMd:col-span-12">
                            <div className="import-note-box px-[20px] py-[10px] pb-[15px] min-h-[500px]">
                                <div className="educare-import-note-content">
                                    <strong className="block text-danger mb-2">Important Instructions:</strong>
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
                                                            Template Integrity: Please do not modify the provided template.
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
                                                            Record Limitation: Only a maximum of 500 records are allowed in the list at a time.
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
                                                            Data Format: Ensure the data is in the correct format to upload successfully.
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
                                                            Mandatory Fields:
                                                        </span>
                                                        <span className="text-sm block">
                                                            Teacher's First Name, Role & Gender is a required field.
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
                                                            Mobile & Aadhaar Numbers:
                                                        </span>
                                                        <span className="text-sm block">
                                                            Both Mobile Number and Aadhaar Number should be entered in text format (set the cell format to text).
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
                                                            Date Format:
                                                        </span>
                                                        <span className="text-sm block">
                                                            Dates should follow the DD/MM/YYYY format with separators (/, -, or .).
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="flex"
                                                >
                                                    <span className="text-sm font-bold">
                                                        7.
                                                    </span>
                                                    <span
                                                        className="ml-0.5"
                                                    >
                                                        <span className="text-sm block font-bold">
                                                            Gender:
                                                        </span>
                                                        <span className="text-sm block">
                                                            Enter 1 for male, 2 for female, and 3 for other.
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="flex"
                                                >
                                                    <span className="text-sm font-bold">
                                                        8.
                                                    </span>
                                                    <span
                                                        className="ml-0.5"
                                                    >
                                                        <span className="text-sm block font-bold">
                                                            Staff Role:
                                                        </span>
                                                        <span className="text-sm block">
                                                            Enter "teacher" for Teacher, "admin" for Admin and “staff” for Staff.
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <a
                                        target="_blank"
                                        href={route('import.staff_import_template.download')}
                                        className="educare-primary-btn-md-fill"
                                    >
                                        <i className="icon-DownloadSimple mr-1"></i>Download template
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default TeacherImportForm;
