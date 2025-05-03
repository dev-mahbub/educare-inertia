import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function PushToRegPopup({
    pushToRegPopup,
    setPushToRegPopup,
    entryStudentData,
    setEntryStudentData
}) {

    const [data, setData] = useState(entryStudentData);
    useEffect(() => {
        setData(entryStudentData);
    }, [entryStudentData])

    const closeModal = () => {
        setPushToRegPopup(false);
        reset();
    };

    const concatName = (first_name, middle_name, last_name) => {
        const nameParts = [first_name, middle_name, last_name].filter(Boolean);
        return nameParts.join(' ');
    };

    // old code
    const handleStudentDataInsert = () => {
        const father = 'Father';
        const mother = 'Mother';
        router.post(route('admission.registration_list.save'), { ...data, father, mother });
    }

    // new code
    // handle start admission process start
    const handleStartAdmissionProcess = () => {
        router.get(route('admission_registration.add_admission', entryStudentData?.id));
    }
    // handle start admission process end

    // handle view admission process start
    const handleViewAdmissionProcess = () => {
        router.get(route('admission_registration.view_admission', entryStudentData?.id));
    }
    // handle view admission process end

    return (
        <section className='educare-admission-follow-up-area space-y-6'>
            <Modal show={pushToRegPopup} onClose={closeModal}>
                <div className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Registration</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-input-field-styles">
                                <div className="grid grid-cols-12 gap-x-5">
                                    <div className="sm:col-span-6 col-span-12">
                                        <ul>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Name : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{data?.first_name}</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Father Name : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{concatName(data?.father_first_name, data?.father_middle_name, data?.father_last_name)}</span>
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="sm:col-span-6 col-span-12">
                                        <ul>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Class : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{data?.class_title}</span>
                                            </li>
                                            <li className='mb-2'>
                                                <span className='text-[16px] font-normal text-headingLightest'>Mobile No : </span>
                                                <span className='text-[16px] font-semibold text-headingLight'>{data?.contact_number}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center pt-6'>
                                {entryStudentData?.enquiry_type == 'Registration' &&
                                    <PrimaryButton
                                        className='educare-primary-btn-md-fill'
                                        type='button'
                                        onClick={handleStartAdmissionProcess}
                                    >
                                        Start Admission Process
                                    </PrimaryButton>
                                }

                                {entryStudentData?.enquiry_type == 'Admission' &&
                                    <PrimaryButton
                                        className='educare-primary-btn-md-fill'
                                        type='button'
                                        onClick={handleViewAdmissionProcess}
                                    >
                                        View Admission Process
                                    </PrimaryButton>
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
