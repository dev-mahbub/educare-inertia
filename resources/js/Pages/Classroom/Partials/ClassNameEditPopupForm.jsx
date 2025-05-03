import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';

export default function ClassNameEditPopupForm({ editPopupOpen, setEditPopupOpen, editData }) {


    const [data, setData] = useState(editData);
    useEffect(() => {
        setData(editData);
    }, [editData])

    //repeatable form fields start
    const [formFields, setFormFields] = useState([
        { add_field_section: editData.sections },
    ])

    const handleModalFormChange = (event, index) => {
        const modalFormFields = [...formFields];
        modalFormFields[index] = event.target.value;
        setFormFields(modalFormFields);
        setData("sections", modalFormFields);
        console.log(modalFormFields);
    }
    const addFields = () => {
        setFormFields([...formFields, { sections: "" }])
    }
    const removeFields = (index) => {
        const modalFormFields = [...formFields];
        modalFormFields.splice(index, 1)
        setFormFields(modalFormFields)
        setData("sections", modalFormFields);
    }
    //repeatable form fields end

    const handleUpdate = (e) => {
        e.preventDefault();
        router.patch(route('category.update', data.id), data);
        closeModal();
    };

    const closeModal = () => {
        setEditPopupOpen(false);
    };



    console.log(editData);


    return (
        <div className='educare-admission-follow-up-area space-y-6'>
            <Modal show={editPopupOpen} onClose={closeModal}>
                <form onSubmit={handleUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Update class name</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-3 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="title"
                                            value="Name*"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="title"
                                            value={data?.title}
                                            onChange={(e) => setData({ ...data, title: e.target.value })}
                                            type="text"
                                            className="block"
                                            required
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
                                            htmlFor="description"
                                            value="Description"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <TextareaInput
                                            id="description"
                                            value={data?.description}
                                            onChange={(e) => setData({ ...data, description: e.target.value })}
                                            type="text"
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}

                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-3 maxXs:col-span-12">
                                    <button type="button" className="educare-primary-btn bg-primary" onClick={addFields}><i className="icon-plus"></i>Add Section</button>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="flex flex-col gap-[20px] w-full">
                                            {editData.sections?.map((item, index) => (
                                                <div className="educare-input-singel-field w-full" key={index}>
                                                    <div className="flex items-center gap-[10px]">
                                                        <div className="educare-input-field-styles w-full">
                                                            <TextInput
                                                                id="add_field_section"
                                                                name="add_field_section[]"
                                                                value={item.title}
                                                                onChange={event => handleModalFormChange(event, index)}
                                                                type="text"
                                                                className="block"
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

                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150">
                            Update
                        </PrimaryButton>
                        <SecondaryButton className="ml-3" onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
