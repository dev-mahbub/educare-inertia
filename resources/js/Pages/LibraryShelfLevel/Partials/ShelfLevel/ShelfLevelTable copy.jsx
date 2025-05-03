import { Tooltip } from "@mui/material";
import React, { useEffect, useState } from "react";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm, router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ShelfLevelTable = ({ selectedItem }) => {
    const [rooms, setRooms] = useState([]);
    const [editFormData, setEditFormData] = useState({});
    const [routeMode, setRouteMode] = useState({});

    console.log("EIDT FORM DATA", editFormData);

    useEffect(() => {
        setRooms(selectedItem?.subItems || []);
    }, [selectedItem?.subItems]);

    const handleRemoveItem = (id) => {
        const remainingItem = rooms.filter((item) => item.id !== id);
        setRooms(remainingItem);
    }
    //add and remove field start
    const [formFields, setFormFields] = useState([
        {
            date_at: new Date(),
            name: "",
            description: "",
            note: "",
            select_category: "",
            select_teacher: "",
        },
    ])

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        // receipt
        account_group_id: "",
        parent_id: "",
        receipt_no: "",
        payment_date_at: "",
        description: "",
        // item
        items: formFields,
        id: editFormData?.id ? editFormData?.id : "",
        name: editFormData?.name ? editFormData?.name : "",
        description: editFormData?.description ? editFormData?.description : "",
        total: 0,
    });

    console.log("UU", data);

    // useEffect(() =>{
    //     if(editFormData){
    //         setData(prevData) =>({
    //             ...prevData,
    //             id:editFormData.id,
    //             name:editFormData.name,
    //             description:
    //         })


    //     }
    // })

    useEffect(() => {
        if (editFormData) {
            setData((prevData) => ({
                ...prevData,
                id: editFormData.id,
                name: editFormData.name,
                description: editFormData.description, // You need to complete this line based on your data structure
            }));
        }
    }, [editFormData]);


    const handleEditForm = (id) => {
        const sigleData = rooms.find((item) => item.id == id);
        setEditFormData(sigleData);
        setRouteMode('edit');
    }

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            parent_id: selectedItem?.id ?? ""
        }))
    },[selectedItem])

    // const handleSaveData = (e, index) => {
    //     e.preventDefault();

    //     data.name = formFields[index]?.name,
    //     data.description= formFields[index]?.description,

    //     if(routeMode == edit){
    //         post(route('library_shelf_level.shelf_level_edit'), data)
    //     }else{
    //         post(route('library_shelf_level.shelf_level_create'), {
    //             onError: (errors) => {
    //                for(let key in errors){
    //                 if (key === 'name') {
    //                     toast.error(errors[key], {
    //                         position: 'top-right',
    //                         autoClose: 1500,
    //                     })
    //                 }
    //                }
    //             }
    //         });
    //     }
    // }

    const handleSaveData = (e, index) => {
        e.preventDefault();

        // Create a new object to avoid mutating the state directly
        const newData = {
            name: formFields[index]?.name,
            description: formFields[index]?.description,
        };

        if (routeMode === 'edit') {
            // Assuming that `data.id` is the identifier for editing existing data
            newData.id = data.id;

            post(route('library_shelf_level.shelf_level_edit'), newData);
        } else {
            post(route('library_shelf_level.shelf_level_create'), newData, {
                onError: (errors) => {
                    for (let key in errors) {
                        if (key === 'name') {
                            toast.error(errors[key][0], {
                                position: 'top-right',
                                autoClose: 1500,
                            });
                        }
                    }
                },
            });
        }
    };



    const handleFormChange = (event, index, field, selectedValue) => {
        const updatedFields = [...formFields];
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

    //add field
    const addFields = () => {
        setFormFields([...formFields,
        {
            date_at: new Date(),
            start_data: "",
            end_data: "",
            name: "",
            description: "",
            note: "",
            fuel_ltr: "",
            fuel_rate: "",
            mileage: "",
        },
        ]);
    }
    //remove specific field
    const removeFields = (index) => {
        const remainingField = formFields.filter((field, i) => i !== index);
        setFormFields(remainingField)
    }

    //add and remove field end

    return (
        <>
            <div className="flex flex-wrap justify-between gap-2">
                <div className="educare-card-title mr-auto mb-5 pb-none">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Infra Details
                    </h5>
                </div>
                <PrimaryButton
                    // disabled={processing}
                    className="educare-primary-btn-md-fill"
                    onClick={addFields}
                >
                    <i className="icon-PlusCircle mr-1"></i>
                    Add
                </PrimaryButton>
            </div>
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
                        {
                            formFields?.map((item, index) => (
                                <tr key={index}>

                                    <td>
                                        <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={data?.name}
                                                    onChange={(event, value) => handleFormChange(event, index, "name", value)}
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors && errors[`items.${index}.name`]}
                                                    className="mt-2"
                                                />


                                            </div>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    value={data?.description}
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
                                                        onClick={() => removeFields(index)}

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
                                                        onClick={(e) => (
                                                            handleSaveData(e, index)
                                                        )}
                                                    >
                                                        <i className="icon-check-1"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }

                        {
                            rooms.length > 0 ? (
                                rooms.map(item => (
                                    <tr key={item.id}>
                                        <td>
                                            <span>{item.name}</span>
                                        </td>
                                        <td>{item.description}</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                    <Tooltip title="Edit" placement="top" arrow>
                                                        <button type="button"
                                                        onClick={() => handleEditForm(item?.id)}
                                                        className="educare-warning-btn-sm-fill">
                                                            <i className="icon-editing"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                                <div>
                                                    <Tooltip title="Delete" placement="top" arrow>
                                                        <button
                                                            className="educare-danger-btn-sm-fill"
                                                            onClick={() => handleRemoveItem(item.id)}
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </button>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) :
                                <tr>
                                    <td colSpan={3} className="text-center">Data not found</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ShelfLevelTable;
