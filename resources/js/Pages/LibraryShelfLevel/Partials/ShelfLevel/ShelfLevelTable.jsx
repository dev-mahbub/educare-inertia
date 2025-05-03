import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import SelectInput from "@/Components/SelectInput";
import SelectInput2 from "@/Components/SelectInput2";

export default function ShelfLevelTable({
    type,
    roomTypeData,
}) {

    const [infraLevelData, setInfraLevelData] = useState([]);
    const [editData, setEditData] = useState('');
    const [infraType, setInfraType] = useState('');
    const [deletedItem, setDeletedItem] = useState('');
    const [formFields, setFormFields] = useState([]);

    const {
        data,
        setData,
    } = useForm({
        items: formFields
    });

    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];
        updatedFields[index][field] = event.target.value;

        setData(prevData => ({
            ...prevData,
            items: updatedFields,
        }));
    }

    const addFields = (e, label) => {
        setInfraType(label);
        e.preventDefault();
        setFormFields([
            {
                parent_id: "",
                name: "",
                description: "",
            },
        ]);
    }

    const removeFields = (index) => {
        let updatedFormFields = [...formFields];
        updatedFormFields.splice(index, 1);
        setFormFields(updatedFormFields);

        setData((prevData) => ({
            ...prevData,
            items: updatedFormFields,
        }));
    }
    //repeatable form fields end

    const handleSaveData = () => {
        router.post(route('library_shelf_level.shelf_level_save'), data);
    };

    // const handleSaveEditData = (e, type) => {
    //     e.preventDefault();
    //     if (editData) {
    //         router.post('/hostel/setup?ids=' + idsString + '&current=' + currentUrlId + '&is_open=' + isOpen + '&type=' + type, editData);
    //     }
    // };

    const handleEditItem = (id, name, description, room_type) => {
        setEditData({ id, name, description, room_type });
    }

    // useEffect(() => {
    //     removeFields();
    //     setEditData('');
    //     setInfraLevelData(childLevels[currentLavelId]);
    // }, [currentLavelId, infraLevelData]);


    const handleDelete = (e, id) => {
        e.preventDefault();
        setDeletedItem(id);
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
                router.delete(route('hostel_infra_level.destroy', id));
            }
        });
    }

    // const { flash } = usePage().props;
    // useEffect(() => {
    //     if (flash.message) {
    //         setInfraLevelData(infraLevelData.filter(item => item?.id !== deletedItem));
    //     }
    // }, [flash]);

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="flex justify-between gap-5 mb-2">
                    <div className="educare-card-title">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Infra Details

                        </h5>
                    </div>
                    <div className="flex gap-5">
                        <PrimaryButton
                            className="educare-primary-btn-md-fill"
                            onClick={(e) => addFields(e, 'Lavel')}
                        >
                            <i className='icon-PlusCircle'></i>Add
                        </PrimaryButton>
                    </div>
                </div>
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list">
                        <form>
                            <table className="pb-[300px]">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {formFields?.length > 0 ?
                                        formFields?.map((item, index) => (
                                            <tr key={index}>
                                                <td>
                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                value={item?.name}
                                                                onChange={(event) => handleFormChange(event, index, "name")}
                                                                className="block"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                        <div className="educare-input-field-styles">
                                                            <TextInput
                                                                value={item?.description}
                                                                onChange={(event) => handleFormChange(event, index, "description")}
                                                                className="block"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Remove"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-danger-btn-sm-fill"
                                                                    onClick={removeFields}

                                                                >
                                                                    X
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Save"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    type="button"
                                                                    className="educare-success-btn-sm-fill"
                                                                    onClick={(e) => handleSaveData(index, type)}
                                                                >
                                                                    <i className="icon-check-1"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) :
                                        ''
                                    }

                                    {infraLevelData?.length > 0 ?
                                        infraLevelData?.map((item2, index2) => (
                                            <tr key={index2}>
                                                <td>
                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                        <div className="educare-input-field-styles">
                                                            {editData?.id === item2.id ?
                                                                <TextInput
                                                                    defaultValue={item2?.name}
                                                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                                    className="block"
                                                                    required
                                                                />
                                                                :
                                                                <div className="flex items-center font-bold">
                                                                    {item2.infra_level_type == 'Bed' ? <i className="icon-Bed mr-1 font-bold"></i> : ''}
                                                                    <span>{item2.name}</span>
                                                                </div>
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                        {
                                                            item2?.infra_level_type === 'Room' ?
                                                                <div className="educare-input-field-styles">
                                                                    {editData?.id === item2.id ?
                                                                        <SelectInput2
                                                                            data_label="Room Type"
                                                                            data={roomTypeData}
                                                                            // defaultValue={item2?.room_type}
                                                                            onChange={(e) => setEditData({ ...editData, room_type: e.target.value })}
                                                                            className="block"
                                                                            selectedData={editData?.room_type}
                                                                        />
                                                                        :
                                                                        <span>
                                                                            {item2?.room_type}
                                                                        </span>
                                                                    }
                                                                </div>
                                                                :
                                                                <div className="educare-input-field-styles">
                                                                    {editData?.id === item2.id ?
                                                                        <TextInput
                                                                            defaultValue={item2?.description}
                                                                            onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                                                            className="block"
                                                                            required
                                                                        />
                                                                        :
                                                                        <span>
                                                                            {item2?.description}
                                                                        </span>
                                                                    }
                                                                </div>
                                                        }
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                        {editData?.id === item2.id ?
                                                            <div className='educare-list-action-btn'>
                                                                <button
                                                                    type="button"
                                                                    className="educare-success-btn-sm-fill"
                                                                    onClick={(e) => handleSaveEditData(e, type)}
                                                                >
                                                                    <i className="icon-check-1"></i>
                                                                </button>
                                                            </div>
                                                            :
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={(e) => handleEditItem(item2?.id, item2?.name, item2?.description, item2?.room_type_id)}
                                                                    className="bg-warning/80 "
                                                                >
                                                                    <i className="icon-pen"></i>
                                                                </PrimaryButton>
                                                            </div>
                                                        }

                                                        <div className="educare-button-field-styles">
                                                            <PrimaryButton
                                                                onClick={(e) => handleDelete(e, item2.id)}
                                                                className="bg-danger/80 "
                                                                type="button"
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </PrimaryButton>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                        </tr>
                                    }

                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
