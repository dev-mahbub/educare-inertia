import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useState } from "react";
import Swal from "sweetalert2";

export default function EditAcademicSyllabus({
    classNames,
    subjects,
    academicSyllabuses,
    academicSyllabus,
}) {
    const [filteredSubjects, setFilteredSubjects] = useState(
        subjects?.filter(
            (item) => item?.class_name_id == academicSyllabus?.class_name_id
        )
    );
    const [selectedFiles, setSelectedFiles] = useState({
        selected_file: academicSyllabus?.file?.path,
        selected_file_name: null,
    });

    const { data, setData, errors, post, reset, processing } = useForm({
        class_name_id: academicSyllabus?.class_name_id,
        subject_id: academicSyllabus?.subject_id,
        title: academicSyllabus?.title,
        file: "",
    });

    const handleFileChange = (e, file_for) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setSelectedFiles({
                ...selectedFiles,
                [file_for]: reader.result,
            });
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const cancelEditAcademic = (e) => {
        e.preventDefault();
        router.get(route("academic_syllabus.list"));
    };

    const handleReset = (e) => {
        e.preventDefault();
        setData({
            class_name_id: "",
            subject_id: "",
            title: "",
            file: "",
        });
        setSelectedFiles({
            selected_file: null,
            selected_file_name: null,
        });
    };

    const updateSyllabus = (e) => {
        e.preventDefault();
        post(
            route("academic_syllabus.update", academicSyllabus.id),
            { _method: "put", ...data },
            {
                preserveScroll: true,
                onSuccess: () => reset(),
            }
        );
    };

    const handleDeleteSyllabus = (e, id) => {
        e.preventDefault();
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("academic_syllabus.destroy", id));
            }
        });
    };

    const handleClassNameAndSubjects = (id) => {
        setFilteredSubjects(
            subjects?.filter((item) => item?.class_name_id == id)
        );
        setData((prevData) => ({
            ...prevData,
            class_name_id: id,
            subject_id: "",
        }));
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-5">
                    <div className="xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>Syllabus</h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={updateSyllabus}>
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="select_class"
                                                                value="Class"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="class_name_id"
                                                        data_label="Class"
                                                        required={true}
                                                        data={classNames}
                                                        value={
                                                            data?.class_name_id
                                                        }
                                                        onChange={(e) =>
                                                            handleClassNameAndSubjects(
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.class_name_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="Subject"
                                                                value="Subject"
                                                            />
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        data_label="subject"
                                                        data={filteredSubjects}
                                                        value={data?.subject_id}
                                                        onChange={(e) =>
                                                            setData(
                                                                "subject_id",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors?.subject_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
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
                                                        value={data?.title}
                                                        onChange={(e) =>
                                                            setData(
                                                                "title",
                                                                e.target.value
                                                            )
                                                        }
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={errors?.title}
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel value="Attachment" />
                                                    <div className="educare-input-type-file-styles">
                                                        <input
                                                            id="file"
                                                            type="file"
                                                            name="file"
                                                            onChange={(e) => {
                                                                setData(
                                                                    "file",
                                                                    e.target
                                                                        .files[0]
                                                                );
                                                                handleFileChange(
                                                                    e,
                                                                    "selected_file"
                                                                );
                                                            }}
                                                        />
                                                        {/* {selectedFiles?.selected_file ? (
                                                            <img
                                                                src={
                                                                    selectedFiles?.selected_file
                                                                }
                                                                className="pt-2"
                                                                style={{
                                                                    width: "120px",
                                                                    height: "auto",
                                                                }}
                                                            />
                                                        ) : (
                                                            ""
                                                        )} */}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="flex flex-wrap gap-2.5 mt-2">
                                                    <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                        onClick={(e) =>
                                                            cancelEditAcademic(e)
                                                        }
                                                        type="button"
                                                    >
                                                        Cancel
                                                    </PrimaryButton>
                                                    {/* <PrimaryButton
                                                        className="educare-gray-btn-lg-stroke"
                                                        onClick={(e) =>
                                                            handleReset(e)
                                                        }
                                                        type="button"
                                                    >
                                                        Reset
                                                    </PrimaryButton> */}
                                                    <PrimaryButton
                                                        type="submit"
                                                        className="educare-primary-btn-lg-fill"
                                                    >
                                                        Update
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="xl:col-span-6 col-span-12">
                        <div className="educare-admission-list-area">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Syllabus
                                    <span>
                                        (Total : {academicSyllabuses?.length} )
                                    </span>
                                </h5>
                            </div>
                            <div className="educare-admission-list-inner">
                                <div className="educare-admission-list-inner-wrapper">
                                    <div className="educare-admission-list pb-none">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Sl. No</th>
                                                    <th>Title</th>
                                                    <th>Class</th>
                                                    <th>Subject</th>
                                                    <th>Attachment</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {academicSyllabuses?.length >
                                                0 ? (
                                                    academicSyllabuses?.map(
                                                        (item, index) => (
                                                            <tr key={item?.id}>
                                                                <td>
                                                                    {index + 1}
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item?.title
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item
                                                                            ?.class_name
                                                                            .title
                                                                    }
                                                                </td>
                                                                <td>
                                                                    {
                                                                        item
                                                                            ?.subject
                                                                            .title
                                                                    }
                                                                </td>
                                                                <td>
                                                                    <a
                                                                        style={{
                                                                            color: "rgb(11 82 189",
                                                                        }}
                                                                        target="__blank"
                                                                        href={
                                                                            item
                                                                                ?.file
                                                                                ?.path
                                                                        }
                                                                    >
                                                                        {
                                                                            item
                                                                                ?.file
                                                                                ?.file_name
                                                                        }
                                                                    </a>
                                                                </td>
                                                                <td>
                                                                    <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                                        <div>
                                                                            <Tooltip
                                                                                title="Edit"
                                                                                placement="top"
                                                                                arrow
                                                                            >
                                                                                <Link
                                                                                    href={route(
                                                                                        "academic_syllabus.edit",
                                                                                        item.id
                                                                                    )}
                                                                                    className="educare-warning-btn-sm-fill"
                                                                                >
                                                                                    <i className="icon-editing"></i>
                                                                                </Link>
                                                                            </Tooltip>
                                                                        </div>
                                                                        <div>
                                                                            <Tooltip
                                                                                title="Delete"
                                                                                placement="top"
                                                                                arrow
                                                                            >
                                                                                <button
                                                                                    onClick={() =>
                                                                                        handleDeleteSyllabus(
                                                                                            e,
                                                                                            item.id
                                                                                        )
                                                                                    }
                                                                                    className="educare-danger-btn-sm-fill"
                                                                                    type="button"
                                                                                >
                                                                                    <i className="icon-TrashSimple"></i>
                                                                                </button>
                                                                            </Tooltip>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )
                                                    )
                                                ) : (
                                                    <tr>
                                                        <td
                                                            className="text-center text-red-500"
                                                            colSpan="7"
                                                        >
                                                            Data not found
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
