import React, { useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { Link, useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { Tooltip } from "@mui/material";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import DatePicker from "react-datepicker";
import TextareaInput from "@/Components/TextareaInput";
const AddCandidateTable = () => {
    const [candidateData, setCandidateData] = useState({
        id: "",
        fName: "",
        lName: "",
        jobCode: "",
        appliedDate: "",
        phone: "",
        qualification: "",
    });
    const { data, setData, errors, post, reset, processing } = useForm({
        first_name: "",
        last_name: "",
        job_code: "",
        date_of_birth: "",
        phone: "",
        email: "",
        gender: "",
        total_experience: "",
        working_status: "",
        qualificaiton: "",
        last_employer: "",
        notes: "",
        upload_documents: "",
    });

    const handleAddCandidateData = (e) => {
        e.preventDefault();
        post(route("subject.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const dummyCandidateData = [
        {
            id: 1,
            fName: "Sumit",
            lName: "Singh",
            jobCode: "j01",
            appliedDate: "06 Jan 2024",
            phone: "734578435",
            qualification: "MA",
        },
        {
            id: 2,
            fName: "Hemant ",
            lName: "Roy",
            jobCode: "j01",
            appliedDate: "05 Jan 2024",
            phone: "02142514",
            qualification: "BA",
        },
    ];

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add A Candidate
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={handleAddCandidateData}>
                                        <div className="grid grid-cols-12 gap-4">
                                            {/* form value */}

                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="first_name"
                                                                value="First Name"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="first_name"
                                                        value={
                                                            data?.first_name
                                                                ? data?.first_name
                                                                : candidateData?.fName
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "first_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.first_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="last_name"
                                                        value="Last Name"
                                                    />
                                                    <TextInput
                                                        id="last_name"
                                                        value={
                                                            data?.last_name
                                                                ? data?.last_name
                                                                : candidateData?.lName
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "last_name",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.last_name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="job_code"
                                                                value="Job Code"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="job_code"
                                                        data_label="Job Code"
                                                        data={[]}
                                                        value={data.job_code}
                                                        onChange={(e) =>
                                                            setData(
                                                                "job_code",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.job_code
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Date of Birth" />
                                                    <DatePicker
                                                        selected={
                                                            data.date_of_birth &&
                                                            new Date(
                                                                data.date_of_birth
                                                            )
                                                        }
                                                        onChange={(date) =>
                                                            setData(
                                                                "date_of_birth",
                                                                date
                                                            )
                                                        }
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText=""
                                                        className="w-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="phone"
                                                        value="Phone Number"
                                                    />
                                                    <TextInput
                                                        id="phone"
                                                        value={
                                                            data.phone
                                                                ? data.phone
                                                                : candidateData.phone
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "phone",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.phone}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="email"
                                                        value="Email"
                                                    />
                                                    <TextInput
                                                        id="email"
                                                        value={data.email}
                                                        onChange={(e) =>
                                                            setData(
                                                                "email",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.email}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="gender"
                                                        value="Gender"
                                                    />
                                                    <SelectInput
                                                        id="gender"
                                                        data_label="Class"
                                                        data={[]}
                                                        value={data.gender}
                                                        onChange={(e) =>
                                                            setData(
                                                                "gender",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.gender}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="total_experience"
                                                        value="Total Experience"
                                                    />
                                                    <TextInput
                                                        id="total_experience"
                                                        value={
                                                            data.total_experience
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "total_experience",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.total_experience
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-4">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="working_status"
                                                        value="Currently Working?"
                                                    />
                                                    <SelectInput
                                                        id="working_status"
                                                        data_label=""
                                                        data={[]}
                                                        value={
                                                            data.working_status
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "working_status",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.working_status
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="qualificaiton"
                                                        value="Qualification"
                                                    />
                                                    <TextInput
                                                        id="qualificaiton"
                                                        value={
                                                            data.qualificaiton
                                                                ? data.qualificaiton
                                                                : candidateData.qualification
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "qualificaiton",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.qualificaiton
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="last_employer"
                                                        value="Last Employer"
                                                    />
                                                    <TextInput
                                                        id="last_employer"
                                                        value={
                                                            data.last_employer
                                                        }
                                                        onChange={(e) =>
                                                            setData(
                                                                "last_employer",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.last_employer
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="notes"
                                                        value="Additional Notes"
                                                    />
                                                    <TextareaInput
                                                        id="notes"
                                                        value={data.notes}
                                                        onChange={(e) =>
                                                            setData(
                                                                "notes",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors.notes}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-span-12 md:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Upload Document" />
                                                    <div className="educare-input-type-file-styles">
                                                        <input
                                                            id="upload_documents"
                                                            type="file"
                                                            name="upload_documents"
                                                            onChange={(e) =>
                                                                setData(
                                                                    "upload_documents",
                                                                    e.target
                                                                        .files[0]
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton className="educare-gray-btn-lg-stroke">
                                                        Reset
                                                    </PrimaryButton>
                                                    <PrimaryButton className="educare-primary-btn-lg-fill">
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
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    All Candidates
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Applied Date</th>
                                            <th>Job Code</th>
                                            <th>Download File</th>
                                            <th>File From Website</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {dummyCandidateData.map((item) => (
                                            <tr key={item.id}>
                                                <td>
                                                    {item.fName} {item.lName}
                                                </td>
                                                <td>{item.appliedDate}</td>
                                                <td>{item.jobCode}</td>
                                                <td></td>
                                                <td></td>

                                                <td>
                                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                        <div>
                                                            <Tooltip
                                                                title="Edit"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    onClick={() =>
                                                                        setCandidateData(
                                                                            item
                                                                        )
                                                                    }
                                                                    type="button"
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-editing"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddCandidateTable;
