import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function StaffCredentialPopup({ staffCredentialPopup, setStaffCredentialPopup, staffCreditData }) {
    const [showUser, setShowUser] = useState(false);
    const toggleUserVisibility = () => {
        setShowUser(!showUser);
    };

    const [isEmailSending, setIsEmailSending] = useState(false);

    const {
        data,
        setData
    } = useForm({
        phone: staffCreditData?.phone,
        email: staffCreditData?.email,
        username: staffCreditData?.username,
        pass: staffCreditData?.parent_pass,
    });

    useEffect((() => {
        setData(staffCreditData)
    }), [staffCreditData])

    const closeModal = () => {
        setStaffCredentialPopup(false);
        setIsEmailSending(false);
    };

    // handle send login credential start
    const handleSendLoginCredential = (e) => {
        e.preventDefault();

        const form_data = {
            staff_id: staffCreditData?.id
        }

        router.post(route('staff.send_login_credential'), form_data, {
            onBefore: () => {
                setIsEmailSending(true);
            },
            onSuccess: () => {
                setIsEmailSending(false)
            },
            onError: () => {
                setIsEmailSending(false)
            }
        });
    }
    // handle send login credential end

    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={staffCredentialPopup} onClose={closeModal}>
                <div className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Confirmation</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <span className='bg-primary/10 px-4 block text-center py-2 text-heading font-semibold mb-3 rounded'>Are you sure to Send username and password to teacher ?</span>
                                <ul>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Email : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{data?.email}</span>
                                    </li>
                                    <li className='mb-2'>
                                        <span className='text-[16px] font-normal text-headingLightest'>Mobile No. : </span>
                                        <span className='text-[16px] font-semibold text-headingLight'>{data?.phone}</span>
                                    </li>
                                   {showUser &&
                                   <>
                                    <li className='mb-2'>
                                            <span className='text-[16px] font-normal text-headingLightest'>Username : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{data?.username}</span>
                                        </li>
                                        <li>
                                            <span className='text-[16px] font-normal text-headingLightest'>Password : </span>
                                            <span className='text-[16px] font-semibold text-headingLight'>{data?.pass}</span>
                                        </li>
                                    </>
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        <PrimaryButton className="educare-secondary-btn-md-fill" onClick={toggleUserVisibility}>{showUser ? 'Hide' : 'Show'}</PrimaryButton>
                        <PrimaryButton
                            className="educare-success-btn-md-fill"
                            type="button"
                            onClick={handleSendLoginCredential}
                            disabled={isEmailSending}
                        >
                            Send Email
                        </PrimaryButton>
                        <PrimaryButton className="educare-primary-btn-md-fill">Send Sms</PrimaryButton>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
