import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";
import { useRef } from "react";

export default function ImportForm() {
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
      student_import_file: null,
  });

  const studentImportData = (e) => {
      e.preventDefault();

      post(route("import.student_create.save"), {
          preserveScroll: true,
          onSuccess: ({ props }) => reset(),
          onError: (errors) => {

          },
      });
  };

    return (
        <div className="educare-import-data-area">
            <form onSubmit={studentImportData}>
                <div className="educare-import-data-field-wrapper bg-white/70 p-[30px] pt-5 maxXs:p-[15px] maxXs:pt-2.5 rounded-lg mb-5">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Import student data
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
                                            id="student_import_file"
                                            ref={
                                                assessmentUploadDocumentInput
                                            }
                                            type="file"
                                            name="student_import_file"
                                            onChange={(e) =>
                                                setData(
                                                    "student_import_file",
                                                    e.target
                                                        .files[0]
                                                )
                                            }
                                        />
                                        {/* <InputError
                                            message={
                                                errors.student_import_file
                                            }
                                            className="mt-2"
                                        /> */}
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
                            <InputError
                                message={
                                    errors.student_import_file
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="col-span-6 maxMd:col-span-12">
                            <div className="import-note-box px-[20px] py-[10px] pb-[15px] min-h-[500px]">
                                <div className="educare-import-note-content">
                                    <strong className="block text-danger mb-2">Important Instructions:</strong>
                                    <div className="educare-import-note-list mt-[10px]  mb-[15px]">
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
                                                            Template Compliance: Please do not make any changes to the provided template.
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
                                                            Record Limitation: A maximum of 500 records are accepted per upload.
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
                                                            Data Format: Ensure the data is in a valid format to upload successfully.
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
                                                            Student's First Name,  Father's First Name & Father Mobile Number are required fields.
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
                                                            Both Mobile Number and Aadhaar Number should be entered in text format (Set the cell format to Text).
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
                                                            Dates must be in DD/MM/YYYY format (with separators /, -, or .).
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
                                                            Status:
                                                        </span>
                                                        <span className="text-sm block">
                                                            Enter 0 for new students, 1 for promoted students.
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
                                                            Gender:
                                                        </span>
                                                        <span className="text-sm block">
                                                            1 for male, 2 for female, 3 for other.
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="flex"
                                                >
                                                    <span className="text-sm font-bold">
                                                        9.
                                                    </span>
                                                    <span
                                                        className="ml-0.5"
                                                    >
                                                        <span className="text-sm block font-bold">
                                                            Class Column:
                                                        </span>
                                                        <span className="text-sm block">
                                                            The Class & Section column is mandatory.
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                            <li>
                                                <div
                                                    className="flex"
                                                >
                                                    <span className="text-sm font-bold">
                                                        10.
                                                    </span>
                                                    <span
                                                        className="ml-0.5"
                                                    >
                                                        <span className="text-sm block font-bold">
                                                            Student Type:
                                                        </span>
                                                        <span className="text-sm block">
                                                            Enter 1 for day scholar and 2 for hosteller. If not specified, the student will be considered as a day scholar by default.
                                                        </span>
                                                    </span>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <a
                                        target="_blank"
                                        href={route('import.student_import_template.download')}
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
}
