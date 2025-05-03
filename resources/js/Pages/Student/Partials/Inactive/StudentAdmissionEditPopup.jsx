import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { concatName } from '@/Hooks/GlobalFunction';
import { router } from '@inertiajs/react';
import { useState } from 'react';

export default function StudentAdmissionEditPopup({ editPopupOpen, setEditPopupOpen, editData }) {


    const [data, setData] = useState({ 'new_admission_no': '' });

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(route('student.update_adm_no', editData?.id), data);
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
                            <h5>Update Admission No</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="name"
                                                value="Student Name"
                                            />
                                        </div>
                                        <TextInput
                                            id="title"
                                            value={concatName(editData?.first_name, editData?.middle_name, editData?.last_name)}
                                            type="text"
                                            disabled
                                            className="block disabled"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="current_admission_no"
                                                value="Current Admission No"
                                            />
                                        </div>
                                        <TextInput
                                            id="title"
                                            value={editData?.admission_no}
                                            type="text"
                                            disabled
                                            className="block disabled"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}

                            {/* Start Field  */}
                            <div className="grid grid-cols-12 mb-[17px] gap-[5px]">
                                <div className="col-span-12">
                                    <div className="educare-input-field-styles">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                htmlFor="new_admission_no"
                                                value="Enter New Admission No"
                                            />
                                        </div>
                                        <TextInput
                                            id="new_admission_no"
                                            value={data?.new_admission_no}
                                            onChange={(e) => setData({ ...data, new_admission_no: e.target.value })}
                                            type="text"
                                            className="block"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Start Field  */}

                        </div>
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton
                        type="submit"
                        className="educare-primary-btn-md-fill">
                            Update
                        </PrimaryButton>
                        <SecondaryButton type="button" className="ml-3" onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
