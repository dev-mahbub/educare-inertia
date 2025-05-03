import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import PrimaryButton from '@/Components/PrimaryButton';
import React, { useEffect, useState } from "react";
import { Inertia } from '@inertiajs/inertia';
import TextareaInput from '@/Components/TextareaInput';
import { router } from '@inertiajs/react';

export default function SubjectEditPopupForm({ editPopupOpen, setEditPopupOpen, editData }) {

    const [data, setData] = useState(editData);
    useEffect(() => {
        setData(editData);
    }, [editData])

    const handleUpdate = (e) => {
        e.preventDefault();
        router.patch(route('subject.update', data.id), data);
        closeModal();
    };

    const closeModal = () => {
        setEditPopupOpen(false);
    };

    return (
        <div className={`educare-admission-follow-up-area space-y-6`}>
            <Modal show={editPopupOpen} onClose={closeModal}>
                <div className="p-[30px] pt-2.5">
                    <form onSubmit={handleUpdate}>
                        <div className="educare-popup-form-wrapper border-b border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Subject</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">

                                {/* Start Field  */}
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="title"
                                            value="Name*"
                                        />
                                    </div>
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
                                {/* Start Field  */}

                                {/* Start Field  */}
                                <div className="col-span-12 mt-4">
                                    <div className="educare-input-field-styles">
                                        <InputLabel
                                            htmlFor="grade"
                                            value="Grade"
                                        />
                                    </div>
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="grade"
                                            value={data?.grade}
                                            onChange={(e) => setData({ ...data, grade: e.target.value })}
                                            type="text"
                                            className="block"
                                        />
                                    </div>
                                </div>
                                {/* Start Field  */}

                                {/* Start Field  */}
                                <div className="col-span-12 my-4">
                                    <InputLabel htmlFor="short_title" value="Description" />
                                    <TextareaInput
                                        id="short_title"
                                        value={data?.short_title}
                                        onChange={(e) => setData({ ...data, short_title: e.target.value })}
                                        type="text"
                                        className="mt-1 block w-full"
                                    />
                                </div>
                                {/* Start Field  */}

                            </div>
                        </div>

                        <div className="mt-6 flex justify-end">
                            <PrimaryButton className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150">
                                Update
                            </PrimaryButton>
                            <SecondaryButton className="ml-3" onClick={closeModal}>Cancel</SecondaryButton>
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    );
}
