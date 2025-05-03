import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';
import CustomFieldEditPopupForm from "./CustomFieldEditPopupForm";

export default function CustomFieldForm({
    custom_fields,
    field_form_types,
    student_staff_types,
    data_types
}) {

    const [editPopupOpen, setEditPopupOpen] = useState(false);
    const [editData, setEditData] = useState({});
    const [filteredFormSections, setFilteredFormSections] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        name: "",
        custom_field_type: "",
        form_section: "",
        data_type: "",
        input_length: "",
        is_required: "",
        display_order: "",
        list_value: "",
    });

    // handle change field type start
    const handleChangeFieldType = (value) => {
        setData((prevData) => ({
            ...prevData,
            custom_field_type: value,
            form_section: ""
        }));

        setFilteredFormSections(field_form_types?.filter(item => item?.field_type == value));
    }
    // handle change field type end


    const handleFormDataInsert = (e) => {
        e.preventDefault();
        post(route("custom_field.save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    // update
    const handleEditPopup = (editData) => {
        setEditData(editData);
        setEditPopupOpen(!editPopupOpen);
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('custom_field.destroy', id));
            }
        });
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Custom Field list <span>(Total : {custom_fields?.length})</span>
                                </h5>
                            </div>

                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No</th>
                                            <th>Field name</th>
                                            <th>Student / Staff</th>
                                            <th>Form section</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {custom_fields?.length > 0 ?
                                            custom_fields?.map((item, index) => (
                                                <tr key={item?.id}>
                                                    <td>{index + 1}</td>
                                                    <td>{item?.name}</td>
                                                    <td>{item?.custom_field_type}</td>
                                                    <td>{item?.form_section}</td>

                                                    <td>
                                                        <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => handleEditPopup(item)}
                                                                    className="bg-warning/80 "
                                                                >
                                                                    <i className="icon-pen"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => handleDelete(item.id)}
                                                                    className="bg-danger/80 "
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">CustomField not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add custom field
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataInsert}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="name"
                                                        value="Field name*"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        id="name"
                                                        name="name"
                                                        value={data?.name}
                                                        onChange={(e) =>
                                                            setData("name", e.target.value)
                                                        }
                                                        type="text"
                                                        className="block"
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.name
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                            <div className="col-span-3 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <InputLabel
                                                        htmlFor="custom_field_type"
                                                        value="Staff / Student*"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-9 maxXs:col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <SelectInput
                                                        id="custom_field_type"
                                                        name="custom_field_type"
                                                        data_label=""
                                                        data={student_staff_types}
                                                        value={data.custom_field_type}
                                                        onChange={(e) =>
                                                            handleChangeFieldType(e.target.value)
                                                        }
                                                        type="text"
                                                        className="block"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.custom_field_type
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}

                                        {data.custom_field_type != "" &&
                                            <>
                                                {/* Start Field  */}
                                                {data?.custom_field_type != 'Teacher' &&
                                                    <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                                        <div className="col-span-3 maxXs:col-span-12">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="form_section"
                                                                    value="Form section*"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-9 maxXs:col-span-12">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="form_section"
                                                                    data_label="form section"
                                                                    data={filteredFormSections}
                                                                    value={data.form_section}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "form_section",
                                                                            e.target
                                                                                .value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.form_section
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {/* Start Field  */}

                                                {/* Start Field  */}
                                                <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                                    <div className="col-span-3 maxXs:col-span-12">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="data_type"
                                                                value="Value data type*"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-9 maxXs:col-span-12">
                                                        <div className="educare-input-field-styles">
                                                            <SelectInput
                                                                id="data_type"
                                                                name="data_type"
                                                                data_label=""
                                                                data={data_types}
                                                                value={data?.data_type}
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "data_type",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                type="text"
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.data_type
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Start Field  */}

                                                {/* Start Field  */}
                                                {(data?.data_type == 'Numeric' || data?.data_type == 'Alphanumeric') &&
                                                    <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                                        <div className="col-span-3 maxXs:col-span-12">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="input_length"
                                                                    value="Maximum input length(ex:1-255)*"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-9 maxXs:col-span-12">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="input_length"
                                                                    name="input_length"
                                                                    value={data?.input_length}
                                                                    onChange={(e) =>
                                                                        setData("input_length", e.target.value)
                                                                    }
                                                                    type="number"
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.input_length
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {/* Start Field  */}

                                                {/* Start Field  */}
                                                {data?.data_type == 'List'  &&
                                                    <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                                        <div className="col-span-3 maxXs:col-span-12">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="list_value"
                                                                    value="List Value*"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-9 maxXs:col-span-12">
                                                            <div className="educare-input-field-styles">
                                                                <TextInput
                                                                    id="list_value"
                                                                    name="list_value"
                                                                    value={data?.list_value}
                                                                    onChange={(e) =>
                                                                        setData("list_value", e.target.value)
                                                                    }
                                                                    type="text"
                                                                    className="block"
                                                                    placeHolder="value1,value2"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.list_value
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                }
                                                {/* Start Field  */}

                                                {/* Start Field  */}
                                                <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                                    <div className="col-span-3 maxXs:col-span-12">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="display_order"
                                                                value="Display order(ex:1,2,...)"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-9 maxXs:col-span-12">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                id="display_order"
                                                                name="display_order"
                                                                value={data?.display_order}
                                                                onChange={(e) =>
                                                                    setData("display_order", e.target.value)
                                                                }
                                                                type="number"
                                                                className="block"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Start Field  */}

                                                {/* Start Field  */}
                                                <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                                    <div className="col-span-3 maxXs:col-span-12">
                                                        <div className="educare-input-field-styles"></div>
                                                    </div>
                                                    <div className="col-span-9 maxXs:col-span-12">
                                                        <div className="flex mb-[17px] gap-[10px]">
                                                            <div className="educare-input-field-styles">
                                                                <input
                                                                    type="checkbox"
                                                                    id="is_required_edit"
                                                                    name="is_required"
                                                                    data-select-all="b-check"
                                                                    className="checkme mr-2"
                                                                    checked={data?.is_required}
                                                                    onChange={(e) => setData("is_required", e.target.checked)}
                                                                />

                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="is_required_edit"
                                                                    value="Make this field required"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* Start Field  */}
                                            </>
                                        }

                                        <div className="educare-classroom-button-wrapper">
                                            <div className="flex justify-end">
                                                <PrimaryButton
                                                    disabled={processing}
                                                    className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                                >
                                                    Add CustomField
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <CustomFieldEditPopupForm
                    editPopupOpen={editPopupOpen}
                    setEditPopupOpen={setEditPopupOpen}
                    editData={editData}
                    field_form_types={field_form_types}
                    student_staff_types={student_staff_types}
                    data_types={data_types}
                    setEditData={setEditData}
                >

                </CustomFieldEditPopupForm>
            </div>
        </>
    );
}
