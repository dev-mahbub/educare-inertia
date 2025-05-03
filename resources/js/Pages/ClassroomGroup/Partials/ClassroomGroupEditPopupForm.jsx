import { useEffect, useRef, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import TextareaInput from '@/Components/TextareaInput';

export default function ClassroomGroupEditPopupForm({ editPopupOpen, setEditPopupOpen, editData }) {

    const [data, setData] = useState(editData);
    useEffect(() => {
        setData(editData)
    }, [editData])

    const handleUpdate = (e) => {
        e.preventDefault();
        router.patch(route('classroom_group.update', data.id), data);
        closeModal();
    };

    const closeModal = () => {
        setEditPopupOpen(false);
    };

    return (
        <div className='educare-admission-follow-up-area space-y-6'>
            <Modal show={editPopupOpen} onClose={closeModal}>
                <form onSubmit={handleUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Class group</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-3 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles-label-wrap">
                                            <div className="educare-input-field-styles-label">
                                                <InputLabel
                                                    value="Class group name"
                                                />
                                                <sup>*</sup>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="city"
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
                                            htmlFor="discussion"
                                            value="Description"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-9 maxXs:col-span-12">
                                    <div className="educare-input-field-styles">
                                        <TextareaInput
                                            id="discussion"
                                            value={data?.discussion}
                                            onChange={(e) => setData({ ...data, discussion: e.target.value })}
                                            type="text"
                                            className="mt-1 block w-full"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}

                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2.5 mt-6 justify-end">
                        <PrimaryButton
                            className="educare-gray-btn-lg-stroke" onClick={closeModal}
                        >
                            Cancel
                        </PrimaryButton>
                        <PrimaryButton
                            className="educare-primary-btn-lg-fill"
                        >
                            Update contact
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
