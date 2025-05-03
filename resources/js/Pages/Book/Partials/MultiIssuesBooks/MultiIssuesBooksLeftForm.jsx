import React from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { Tooltip } from "@mui/material";
const MultiIssuesBooksLeftForm = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        user_type: "student",
        teacher: "",
        adm_number: "",
        class_name: "",
        student: "",
        acc_no: "",
        book_title: "",
        author: "",
        publisher: "",
        select_class: "",
        select_subject: "",
    });
    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <form>
                        <div className="grid grid-cols-12 gap-5 mb-5">
                            <div className="col-span-12 lg:col-span-6">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="User"
                                    />
                                    <SelectInput
                                        data_label="User Type"
                                        data={[]}
                                        value={data.user_type}
                                        onChange={(e) =>
                                            setData("user_type", e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.user_type}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            {
                                data.user_type === "teacher" ? (
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="Teacher"
                                            />
                                            <SelectInput
                                                data_label="Teacher"
                                                data={[]}
                                                value={data.teacher}
                                                onChange={(e) =>
                                                    setData(
                                                        "teacher",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.teacher}
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                ) : ""
                            }

                            {/* if select student  */}
                            {
                                data.user_type === "student" ? (
                                    <>
                                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Adm Number"
                                                />
                                                <TextInput
                                                    value={data.adm_number}
                                                    onChange={(e) =>
                                                        setData(
                                                            "adm_number",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.adm_number}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Class"
                                                />
                                                <SelectInput
                                                    data_label="Class"
                                                    data={[]}
                                                    value={data.class_name}
                                                    onChange={(e) =>
                                                        setData(
                                                            "class_name",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.class_name}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    value="Student"
                                                />
                                                <SelectInput
                                                    data_label="Student"
                                                    data={[]}
                                                    value={data.student}
                                                    onChange={(e) =>
                                                        setData("student", e.target.value)
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.student}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </>
                                ) : ""
                            }

                            {/* end if select student */}
                        </div>

                        <div className="grid grid-cols-12 gap-5 educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Accno"
                                    />
                                    <TextInput
                                        value={data.acc_no}
                                        placeHolder="Enter Acc No"
                                        onChange={(e) =>
                                            setData("acc_no", e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.acc_no}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Book Title"
                                    />
                                    <TextInput
                                        value={data.book_title}
                                        placeHolder="Enter Book Title"
                                        onChange={(e) =>
                                            setData(
                                                "book_title",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.book_title}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Author"
                                    />
                                    <TextInput
                                        value={data.author}
                                        onChange={(e) =>
                                            setData("author", e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.author}
                                        className="mt-2"
                                    />
                                </div>
                            </div>

                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Publisher"
                                    />
                                    <TextInput
                                        id="publisher"
                                        value={data.publisher}
                                        placeHolder="Publisher"
                                        onChange={(e) =>
                                            setData("publisher", e.target.value)
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.publisher}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            {/* select box */}
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Class"
                                    />
                                    <SelectInput
                                        id="select_class"
                                        data_label="Class"
                                        data={[]}
                                        value={data.select_class}
                                        onChange={(e) =>
                                            setData(
                                                "select_class",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.select_class}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            <div className="col-span-12 md:col-span-6 lg:col-span-4">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        value="Subject"
                                    />
                                    <SelectInput
                                        id="select_subject"
                                        data_label="Subject"
                                        data={[]}
                                        value={data.select_subject}
                                        onChange={(e) =>
                                            setData(
                                                "select_subject",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.select_subject}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                            {/* end select box */}
                        </div>

                        <div className="col-span-12 mt-5">
                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                <PrimaryButton className="educare-gray-btn-lg-stroke">
                                    Reset
                                </PrimaryButton>
                                <PrimaryButton className="educare-primary-btn-lg-fill">
                                    Search
                                </PrimaryButton>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* table */}

            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Book Title</th>
                            <th>Total Stock</th>
                            <th>Available Stock</th>
                            <th>Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Book Title</td>
                            <td>10</td>
                            <td>7</td>
                            <td>
                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                    <div>
                                        <Tooltip
                                            title="Edit"
                                            placement="top"
                                            arrow
                                        >
                                            <button
                                                type="button"
                                                className="educare-primary-btn-sm-fill"
                                            >
                                                <i className="icon-plus"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>Book Title 2</td>
                            <td>10</td>
                            <td>10</td>
                            <td>
                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                    <div>
                                        <Tooltip
                                            title="Edit"
                                            placement="top"
                                            arrow
                                        >
                                            <button
                                                type="button"
                                                className="educare-primary-btn-sm-fill"
                                            >
                                                <i className="icon-plus"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default MultiIssuesBooksLeftForm;
