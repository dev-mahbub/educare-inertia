import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
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

    // new code
    const handleStudnetEnqueryInsert = (e, id) => {
        e.preventDefault();
        window.location.href = route('admission_enquery_reg.create_registration', { enquiry_id: id });
    };

    // old code
    // const handleStudnetEnqueryInsert = (e, id) => {
    //     e.preventDefault();
    //     if(id) {
    //         router.post( route('admission_enquery_reg.switch_enquery_to_reg', id) );
    //     }
    // };


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
                                                <span className='text-[16px] font-semibold text-headingLight'>{concatName(data?.first_name, data?.middle_name, data?.last_name)}</span>
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
                                                <span className='text-[16px] font-semibold text-headingLight'>{data?.father_mobile}</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                            <div className='text-center pt-6'>
                                {/* <Link
                                    href={route('admission_enquery_reg.create_registration', { enquiry_id: entryStudentData ?.id})}
                                    className="educare-primary-btn-md-fill"
                                >
                                    Start Registration Process
                                </Link> */}
                                <PrimaryButton
                                    className='educare-primary-btn-md-fill'
                                    type='button'
                                    onClick={(e) => {
                                        handleStudnetEnqueryInsert(e, data?.id);
                                    }}
                                >
                                    Start Registration Process
                                </PrimaryButton>

                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
