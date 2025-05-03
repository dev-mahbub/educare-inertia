import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";

export default function ClassNameForm() {
    const titleInput = useRef();
    const cityInput = useRef();
    const addFieldDepartmentInput = useRef();

    const {
        data,
        setData,
        errors,
        post,
        reset,
        recentlySuccessful,
    } = useForm({
        add_class: "",
        add_pre_class: "",
        add_field_department_id: "",
    });

    const schoolData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.city) {
                    reset("city", "zip");
                    cityInput.current.focus();
                }

                if (errors.add_class_pre_nursery) {
                    reset("add_class_pre_nursery");
                    titleInput.current.focus();
                }
            },
        });
    };

    //repeatable form fields start
    const [formFields, setFormFields] = useState([
        { add_field_department_id: '' },
    ])

    const handleFormChange = (event, index) => {
        let data = [...formFields];
        data[index][event.target.add_field_department_id] = event.target.value;
        setFormFields(data);
    }
    const addFields = () => {
        let object = {
            add_field_department_id: '',
        }
        setFormFields([...formFields, object])
    }
    const removeFields = (index) => {
        let data = [...formFields];
        data.splice(index, 1)
        setFormFields(data)
    }
    //repeatable form fields end

    return (
        <div className="educare-classroom-form-area">
            <form onSubmit={schoolData}>
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Class Summary
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Shift Name</th>
                                            <th>Start Time</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                Pre Nursery
                                            </td>
                                            <td>
                                                A,B
                                            </td>
                                            <td>
                                                <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-warning/80 "
                                                        >
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-danger/80 "
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Standard 1st
                                            </td>
                                            <td>
                                                A,B
                                            </td>
                                            <td>
                                                <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-warning/80 "
                                                        >
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-danger/80 "
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Standard 1st A
                                            </td>
                                            <td>
                                                A,B
                                            </td>
                                            <td>
                                                <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-warning/80 "
                                                        >
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-danger/80 "
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Standard 1st B
                                            </td>
                                            <td>
                                                A,B
                                            </td>
                                            <td>
                                                <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-warning/80 "
                                                        >
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-danger/80 "
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                IX
                                            </td>
                                            <td>
                                                A,B
                                            </td>
                                            <td>
                                                <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-warning/80 "
                                                        >
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            className="bg-danger/80 "
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
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
                                        Create Class
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                    <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                        <div className="col-span-3 maxXs:col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="add_class"
                                                    value="Class*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-9 maxXs:col-span-12">
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="add_class"
                                                    data_label="Class"
                                                    data={[]}
                                                    ref={titleInput}
                                                    value={data.add_class}
                                                    onChange={(e) =>
                                                        setData(
                                                            "add_class",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="mt-1 block w-full"
                                                />

                                                <InputError
                                                    message={errors.add_class}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                        <div className="col-span-3 maxXs:col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="add_pre_class"
                                                    value="Link with e-learning class*"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-9 maxXs:col-span-12">
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="add_pre_class"
                                                    data_label="Pre Nursery"
                                                    data={[]}
                                                    ref={titleInput}
                                                    value={data.add_pre_class}
                                                    onChange={(e) =>
                                                        setData(
                                                            "add_pre_class",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="mt-1 block w-full"
                                                />

                                                <InputError
                                                    message={errors.add_pre_class}
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                        <div className="col-span-3 maxXs:col-span-12">
                                            <button type="submit" className="educare-primary-btn bg-primary" onClick={addFields}><i className="icon-plus"></i>Add Field</button>
                                        </div>
                                        <div className="col-span-9 maxXs:col-span-12">
                                            <div className="educare-input-field-styles">
                                                <div className="flex flex-col gap-[20px] w-full">
                                                    {formFields.map((form, index) => (
                                                        <div className="educare-input-singel-field w-full" key={index}>
                                                            <div className="flex items-center gap-[10px]">
                                                                <div className="educare-input-field-styles w-full">
                                                                    <SelectInput
                                                                        id="add_field_department_id"
                                                                        data_label="department"
                                                                        data={[]}
                                                                        ref={addFieldDepartmentInput}
                                                                        // value={data.add_field_department_id}
                                                                        // onChange={(e) =>
                                                                        //     setData(
                                                                        //         "add_field_department_id",
                                                                        //         e.target.value
                                                                        //     )
                                                                        // }
                                                                        // type="text"
                                                                        onChange={event => handleFormChange(event, index)}
                                                                        value={form.add_field_department_id}
                                                                        className="mt-1 block w-full"
                                                                    />

                                                                    <InputError
                                                                        message={errors.add_field_department_id}
                                                                        className="mt-2"
                                                                    />
                                                                </div>
                                                                <div className="input-field-close-button">
                                                                    <div className="educare-input-action-button btn-red">
                                                                        <PrimaryButton onClick={() => removeFields(index)}
                                                                        >
                                                                            <i className="icon-TrashSimple"></i>
                                                                        </PrimaryButton>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="educare-classroom-button-wrapper">
                                        <div className="flex justify-end gap-[15px]">
                                            <PrimaryButton
                                                className="h-[35px] px-[10px] bg-primary text-white text-[14px] rounded-md font-medium font-primary inline-block"
                                            >
                                                Save
                                            </PrimaryButton>

                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">Save</p>
                                            </Transition>
                                            <PrimaryButton
                                                className="h-[35px] px-[10px] border-[1px] border-border text-[14px] rounded-md font-medium font-primary inline-block"
                                            >
                                                Save
                                            </PrimaryButton>

                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">Reset</p>
                                            </Transition>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
