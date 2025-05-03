import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';



export default function ShowFeeStructurePopup({ className = '', classFeeStructureData = [], setShowFeeStructurePopup, showFeeStructurePopup }) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});


    const closeModal = () => {
        setShowFeeStructurePopup(false);
        reset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={showFeeStructurePopup} onClose={closeModal} className="lg:max-w-[60rem] xl:max-w-6xl sm:max-w-[calc(100%-60px)]">
                    <div className="educare-common-card">
                            <div className="p-3">
                                <h4 className="font-bold text-lg">Fee Structure :- <span>{classFeeStructureData?.title}</span></h4>
                            </div>
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                            <div className="p-[30px] pt-2.5">
                                <div className="educare-common-card-title flex items-center flex-wrap">
                                    <div className="educare-common-card-title leading-none">
                                        <h5>Fee Structure for new students</h5>
                                    </div>
                                </div>
                                <div className="educare-popup-form-wrapper border-y mb-5 border-border/50">
                                    <div className="grid grid-cols-12 gap-5 py-3">
                                        {showFeeStructurePopup && classFeeStructureData['New']?.fees && Object.keys(classFeeStructureData['New']?.fees)?.length > 0 ?
                                            Object.values(classFeeStructureData['New']?.fees)?.map((item, index) => (
                                                <div key={index} className="lg:col-span-4 md:col-span-6 col-span-12">
                                                    <div className="educare-update-fee-structure educare-new-student-fee-structure">
                                                        <div className="educare-update-fee-structure-heading">
                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                <div className="educare-create-school-settings-list-title width-full">
                                                                    <h5 className="text-[15px] font-primary text-white">{item?.fee?.title}
                                                                        <span> ({item?.total_amount})</span>
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {item?.fee_type_amount_array?.length > 0 ? (
                                                            <div className='border border-primary/10 border-t-0'>
                                                                <ul>
                                                                    {item?.fee_type_amount_array?.map((item, key) => (
                                                                        <li key={key}>
                                                                            <span>{item?.fee?.title}</span>
                                                                            <span>{item?.amount} X {item?.semester}</span>
                                                                            <span>{item?.amount * item?.semester}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : ("")}
                                                    </div>
                                                </div>
                                            ))
                                         :
                                            <div className="col-span-12">
                                                <div className="educare-update-fee-structure text-center">
                                                    <span>Data not found!</span>
                                                </div>
                                            </div>
                                            }
                                    </div>
                                </div>
                            </div>
                            <div className="p-[30px] pt-2.5">
                                <div className="educare-common-card-title flex items-center flex-wrap">
                                    <div className="educare-common-card-title leading-none">
                                        <h5>Fee Structure for Old/Promoted Students</h5>
                                    </div>
                                </div>
                                <div className="educare-popup-form-wrapper border-y mb-5 border-border/50">
                                    <div className="grid grid-cols-12 gap-5 py-3">
                                        {showFeeStructurePopup && classFeeStructureData['Old']?.fees && Object.keys(classFeeStructureData['Old']?.fees)?.length > 0 ?
                                            Object.values(classFeeStructureData['Old']?.fees)?.map((item, index) => (
                                                <div key={index} className="lg:col-span-4 md:col-span-6 col-span-12">
                                                    <div className="educare-update-fee-structure educare-new-student-fee-structure">
                                                        <div className="educare-update-fee-structure-heading">
                                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                <div className="educare-create-school-settings-list-title width-full">
                                                                    <h5 className="text-[15px] font-primary text-white">{item?.fee?.title}
                                                                        <span> ({item?.total_amount})</span>
                                                                    </h5>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {item?.fee_type_amount_array?.length > 0 ? (
                                                            <div className='border border-primary/10 border-t-0'>
                                                                <ul>
                                                                    {item?.fee_type_amount_array?.map((item, key) => (
                                                                        <li key={key}>
                                                                            <span>{item?.fee?.title}</span>
                                                                            <span>{item?.amount} X {item?.semester}</span>
                                                                            <span>{item?.amount * item?.semester}</span>
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            </div>
                                                        ) : ("")}
                                                    </div>
                                                </div>
                                            ))
                                         :
                                            <div className="col-span-12">
                                                <div className="educare-update-fee-structure text-center">
                                                    <span>Data not found!</span>
                                                </div>
                                            </div>
                                            }
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-wrap justify-end gap-2.5">
                                <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Close</PrimaryButton>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}
