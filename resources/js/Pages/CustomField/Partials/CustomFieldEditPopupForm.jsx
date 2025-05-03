import InputError from "@/Components/InputError";
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function ContactEditPopupForm({
    editPopupOpen,
    setEditPopupOpen,
    editData,
    field_form_types,
    student_staff_types,
    data_types,
    setEditData
}) {

    const [filteredFormSections, setFilteredFormSections] = useState([]);
    const [data, setData] = useState(editData);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setData(editData);
        setFilteredFormSections(field_form_types?.filter(item => item?.field_type == editData?.custom_field_type));
    }, [editData]);

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

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(route('custom_field.update', data.id), data, {
            onSuccess:() => {
                closeModal();
            },
            onError:(errors) => {
                setErrors(errors);
            }
        });
    };

    const closeModal = () => {
        setEditPopupOpen(false);
        setFilteredFormSections([]);
        setErrors({});
        setEditData({});
    };

    return (
        <div className="educare-admission-follow-up-area space-y-6">
            <Modal show={editPopupOpen} onClose={closeModal}>
                <form onSubmit={handleUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Custom field</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">

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
                                            onChange={(e) => setData({ ...data, name: e.target.value })}
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
                                            required
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
                                    {data?.data_type == 'List' &&
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

                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150">
                            Update
                        </PrimaryButton>
                        <SecondaryButton className="ml-3" type="button" onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
