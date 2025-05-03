import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
import SuccessButton from '@/Components/SuccessButton';
import { router } from "@inertiajs/react";
import TextareaInput from "@/Components/TextareaInput";
import React, { useEffect, useState } from "react";

export default function BirthdayWishPopupForm({ PopupOpen, setPopupOpen, Data, setBirthdayData }) {
    
    const [data, setData] = useState(Data);
    useEffect(() => {
        setData(Data);
    }, [Data])

    useEffect(() => {
        setBirthdayData(data);
    }, [data]);

    const handleUpdate = (e) => {
        e.preventDefault();
        router.post(route('teacher.birthday_sms'), data, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
            },
            onError: () => { }
        });
    };

    const closeModal = () => {
        setPopupOpen(false);
    };


    return (
        <div className='educare-admission-follow-up-area space-y-6'>
            <Modal show={PopupOpen} onClose={closeModal}>
                <form onSubmit={handleUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Send Birthday Wishes</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <TextareaInput 
                                placeholder="Type hear ..."
                                name="message"
                                value={data.message}
                                className="h-[150px]"
                                onChange={(e) => setData({ ...data, message: e.target.value })}
                            />
                        </div>

                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700">
                                        <span className="font-medium">Note: </span>
                                        Use <span className="font-bold">#StudentName</span> to display student name<br/>
                                        Use <span className="font-bold">#FatherName</span> to display father name
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-3 mb-5">
                            Do you want save above template to future use?
                            <SuccessButton className="ml-4 educare-success-btn-md-fill">
                                Save Template
                            </SuccessButton>
                        </div>

                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150">
                            Send SMS
                        </PrimaryButton>
                        <SecondaryButton className="ml-3" onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
