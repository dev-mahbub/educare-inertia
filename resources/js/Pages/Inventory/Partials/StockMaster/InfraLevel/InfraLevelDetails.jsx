import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function InfraLevelDetails({ infraLevels, childLevels, infraLavelIds, infraLavelIdString, currentLavelId, is_open}) {

    const [infraLevelData, setInfraLevelData] = useState([])
    const [loading, setLoading] = useState(false);
    const [customIndex, setCustomIndex] = useState('');
    const [editData, setEditData] = useState('');
    const [idsString, setUrlIdsString] = useState(infraLavelIdString);
    const [currentUrlId, setCurrentUrlId] = useState(currentLavelId);
    const [isOpen, setIsOpen] = useState(is_open);

    const [formFields, setFormFields] = useState([
        {
            parent_id: currentLavelId,
            name: "",
            description: "",
        },
    ])

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

    const addFields = () => {
        setFormFields([...formFields,
        {
            parent_id: currentLavelId,
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

    const handelReset = () => {
        setFormFields([
            {
                parent_id: currentLavelId,
                name: "",
                description: "",
            },
        ]);
        setData({
            items: [],
        });
    }

    const handleSaveData = (index) => {
        const indexData = formFields[index];
        if (indexData) {
            router.post('/inventory/infra/level?ids='+ idsString +'&current='+ currentUrlId +'&is_open='+ isOpen, indexData, {
                onSuccess: () => {
                    router.get('/inventory/infra/level?ids=' + idsString + '&current=' + currentUrlId + '&is_open=' + isOpen);
                }
            });
            setLoading(false);
            setCustomIndex(index);
        }
    };

    const handleSaveEditData = () => {
        if (editData) {
            router.post('/inventory/infra/level?ids='+ idsString +'&current='+ currentUrlId +'&is_open='+ isOpen, editData, {
                onSuccess: () => {
                    router.get('/inventory/infra/level?ids=' + idsString + '&current=' + currentUrlId + '&is_open=' + isOpen);
                }
            });
            setLoading(false);
        }
    };

    const handleEditItem = (id, name, description) => {
        setEditData({id, name, description });
    }

    useEffect(() => {
        setLoading(false);
        removeFields();
        setEditData('');
        setInfraLevelData(childLevels[currentLavelId]);
    }, [currentLavelId]);


    const handleDelete = (e, id) => {
        e.preventDefault();
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
                router.delete(route('infra_level.destroy', id));
            }
        });
    }

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
                            onClick={addFields}
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
                                                                value={item?.label}
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
                                                                    onClick={(e) => handleSaveData(index)}
                                                                >
                                                                    <i className="icon-check-1"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>

                                                        {loading && customIndex === index ?
                                                            <div className="ml-1">
                                                                <div role="status" className="flex justify-center">
                                                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                    </svg>
                                                                </div>
                                                            </div> : ''}
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
                                                                    defaultValue={item2?.label}
                                                                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                                                                    className="block"
                                                                    required
                                                                />
                                                                :
                                                                <TextInput
                                                                    defaultValue={item2?.label}
                                                                    className="block disabled"
                                                                    disabled={true}
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-input-field-styles-px-8 min-w-[60px]">
                                                        <div className="educare-input-field-styles">
                                                            {editData?.id === item2.id ?
                                                                <TextInput
                                                                    defaultValue={item2?.description}
                                                                    onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                                                    className="block"
                                                                    required
                                                                />
                                                                :
                                                                <TextInput
                                                                    defaultValue={item2?.description}
                                                                    className="block disabled"
                                                                    disabled={true}
                                                                />
                                                            }
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="educare-button-action-field-wrapper flex gap-[5px]">

                                                        {editData?.id === item2.id ?

                                                            <div className='educare-list-action-btn'>
                                                                <button
                                                                    type="button"
                                                                    className="educare-success-btn-sm-fill"
                                                                    onClick={(e) => handleSaveEditData(e)}
                                                                >
                                                                    <i className="icon-check-1"></i>
                                                                </button>
                                                            </div>
                                                            :
                                                            <div className="educare-button-field-styles">
                                                                <PrimaryButton
                                                                    onClick={() => handleEditItem(item2?.id, item2?.name, item2?.description)}
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

                                                        {loading && editData?.id === item2?.id ?
                                                            <div className="ml-1">
                                                                <div role="status" className="flex justify-center">
                                                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                    </svg>
                                                                </div>
                                                            </div> : ''}

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
