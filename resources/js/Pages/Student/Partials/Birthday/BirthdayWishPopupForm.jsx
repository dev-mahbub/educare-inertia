import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import PrimaryButton from '@/Components/PrimaryButton';
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
        router.post(route('student.birthday_notification'), data, {
            preserveScroll: true,
            onSuccess: () => {
                closeModal();
                setData({ message: '' });
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
                    </div>

                    <div className="mt-6 flex justify-end">
                        <PrimaryButton className="ml-3 inline-flex h-10 items-center px-4 py-2 bg-primary border border-transparent rounded-md font-semibold text-xs text-white tracking-widest hover:bg-primary active:bg-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition ease-in-out duration-150">
                            Send Notification
                        </PrimaryButton>
                        <SecondaryButton className="ml-3" onClick={closeModal}>Cancel</SecondaryButton>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
