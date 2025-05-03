import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SetupHostelTablePopup from "./SetupHostelTablePopup"

const SetupHostelTable = ({ selectedItem }) => {
    //seup hostel table popup start
    const [listPopup, setListPopup] = useState(false);
    const handleListPopupClick = () => {
        setListPopup(!listPopup);
    };
    //seup hostel table popup end

    //room and beds data get and remove data start here
    const [rooms, setRooms] = useState([]);
    const [beds, setBeds] = useState([]);

    useEffect(() => {
        setRooms(selectedItem?.subItems || []);
    }, [selectedItem?.subItems?.length]);

    useEffect(() => {
        setBeds(selectedItem?.beds || []);
    }, [selectedItem?.beds?.length]);

    const handleRemoveItem = (id, type) => {
        const remainingItems = type === "rooms" ? rooms.filter(item => item.id !== id) : beds.filter(item => item.id !== id);

        type === "rooms" ? setRooms(remainingItems) : setBeds(remainingItems);
    };
    //room and beds data get and remove data end here

    //row add for bed room level start here
    //bed fields
    const [bedFields, setBedFields] = useState([
        {
            name: "",
            description: "",
        },
    ])
    //room fields
    const [roomFields, setRoomFields] = useState([
        {
            name: "",
            select_room_type: "",
        },
    ])
    //level fields
    const [levelField, setLevelField] = useState([
        {
            name: "",
            description: "",
        },
    ])
    //form validation
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        select_room_type: "",
        name: "",
        description: "",
    });

    //get onchange data from onchange value
    const handleFormChange = (event, index, field, selectedValue) => {
        const updatedFields = [...roomFields];
        if (selectedValue) {
            updatedFields[index][field] = selectedValue;
        }
        else {
            updatedFields[index][field] = event.target.value;
        }
        setData(prevData => ({
            ...prevData,
            items: updatedFields,
            // total: newSubtotal,
        }));
    }

    //add Bed field
    const addBed = () => {
        setBedFields([...bedFields,
        {
            description: "",
            name: "",
        },
        ]);
    }
    //add Room field
    const addRoom = () => {
        setRoomFields([...roomFields,
        {

            select_room_type: "",
            name: "",
        },
        ]);
    }
    //add level field
    const addLevel = () => {
        setLevelField([...levelField,
        {
            description: "",
            name: "",
        },
        ]);
    }
    //remove bed specific field
    const removeBedFileds = (index) => {
        const remainingField = bedFields.filter((field, i) => i !== index);
        setBedFields(remainingField)
    }
    //remove rooms specific field
    const removeRoomFields = (index) => {
        const remainingField = roomFields.filter((field, i) => i !== index);
        setRoomFields(remainingField)
    }
    //remove level specific field
    const removeLevelFields = (index) => {
        const remainingField = levelField.filter((field, i) => i !== index);
        setLevelField(remainingField)
    }
    //row add for room and hostle end here

    return (
        <>
            <div className="flex justify-between items-center flex-wrap mb-2">
                <div className="educare-card-title mr-auto pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Infra Details
                    </h5>
                </div>
                {/* add beds button display if beds data exists else addLevel and addRoom and Assign button display*/}
                {
                    beds.length ? (
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="transition ease-in-out duration-150 educare-primary-btn-md-fill"
                                onClick={addBed}
                            >
                                <i className="icon-PlusCircle"></i>
                                Add Bed
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            <button
                                type="button"
                                className="transition ease-in-out duration-150 educare-primary-btn-md-fill"
                                onClick={addLevel}
                            >
                                <i className="icon-PlusCircle"></i>
                                Add Level
                            </button>
                            <button
                                type="button"
                                className="transition ease-in-out duration-150 educare-secondary-btn-md-fill"
                                onClick={addRoom}
                            >
                                <i className="icon-PlusCircle"></i>
                                Add Room
                            </button>
                            <button
                                type="button"
                                className="transition ease-in-out duration-150 educare-secondary-btn-md-fill"
                                onClick={handleListPopupClick}
                            >
                                <i className="icon-PlusCircle"></i>
                                Assign Hostel Staff
                            </button>
                        </div>
                    )
                }
            </div>


            {rooms.length > 0 && (
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roomFields?.length > 0 ?
                                roomFields?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={item?.name}
                                                        onChange={(event, value) => handleFormChange(event, index, "name", value)}
                                                        className="block"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    data_label="Room Type"
                                                    data={[]}
                                                    value={item?.select_room_type}
                                                    onChange={(event, value) => handleFormChange(event, index, "select_room_type", value)}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.select_room_type
                                                    }
                                                    className="mt-2"
                                                />
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
                                                            onClick={() => removeRoomFields(index)}

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
                                                        >
                                                            <i className="icon-check-1"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )) : ""

                            }
                            {levelField?.length > 0 ?
                                levelField?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={item?.name}
                                                        onChange={(event, value) => handleFormChange(event, index, "name", value)}
                                                        className="block"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={item?.description}
                                                        onChange={(event, value) => handleFormChange(event, index, "description", value)}
                                                        className="block"
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
                                                            onClick={() => removeLevelFields(index)}

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
                                                        >
                                                            <i className="icon-check-1"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )) : ""

                            }
                            {rooms.map(item => (
                                <tr key={item.id}>

                                    <td>
                                        <div className="flex items-center font-bold">
                                            <i className="icon-House mr-1 font-bold"></i>
                                            <span>{item.label}</span>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            <div>
                                                <Tooltip title="Edit" placement="top" arrow>
                                                    <button type="button" className="educare-warning-btn-sm-fill">
                                                        <i className="icon-editing"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip title="Delete" placement="top" arrow>
                                                    <button
                                                        className="educare-danger-btn-sm-fill"
                                                        onClick={() => handleRemoveItem(item.id, "rooms")}
                                                    >
                                                        <i className="icon-TrashSimple"></i>
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
            )}

            {beds.length > 0 && (
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>name</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bedFields?.length > 0 ?
                                bedFields?.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={item?.name}
                                                        onChange={(event, value) => handleFormChange(event, index, "name", value)}
                                                        className="block"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                <div className="educare-input-field-styles">
                                                    <TextInput
                                                        value={item?.description}
                                                        onChange={(event, value) => handleFormChange(event, index, "description", value)}
                                                        className="block"
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
                                                            onClick={() => removeBedFileds(index)}

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
                                                        >
                                                            <i className="icon-check-1"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )) : ""

                            }
                            {beds.map(item => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="flex items-center font-bold">
                                            <i className="icon-Bed mr-1 font-bold"></i>
                                            <span>{item.label}</span>
                                        </div>
                                    </td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            <div>
                                                <Tooltip title="Edit" placement="top" arrow>
                                                    <button type="button" className="educare-warning-btn-sm-fill">
                                                        <i className="icon-editing"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip title="Delete" placement="top" arrow>
                                                    <button
                                                        onClick={() => handleRemoveItem(item.id, "beds")}
                                                        className="educare-danger-btn-sm-fill"
                                                    >
                                                        <i className="icon-TrashSimple"></i>
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
            )}
            <SetupHostelTablePopup
                listPopup={listPopup}
                setListPopup={setListPopup}
            />
        </>
    );
};

export default SetupHostelTable;
