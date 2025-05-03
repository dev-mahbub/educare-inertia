import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

export default function SpeacialTypePopup({ className = '', speacialTypePopup, setSpeacialTypePopup, specialFeeTypes = {}, removeSpecialFeeType }) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});

    const speacialTypePopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setSpeacialTypePopup(false);
        reset();
    };


    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={speacialTypePopup} onClose={closeModal}>
                    <form onSubmit={speacialTypePopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper">
                            <div className="educare-popup-form-header py-3">
                                <h5>Remove Special Fee</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Installment</th>
                                                <th>Fee Type</th>
                                                <th>Amount</th>
                                                <th>Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {specialFeeTypes?.fee?.length > 0 ? (
                                                specialFeeTypes?.fee.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.fee_title}</td>
                                                        <td>{item?.fee_type?.title}</td>
                                                        <td>{item?.fee_type?.amount}</td>
                                                        <td>
                                                            {item?.payment == null || (item?.payment != null && item?.payment?.payment_status == 'Cancelled') ? (
                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Delete"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button type='button'
                                                                                className="educare-danger-btn-sm-fill"
                                                                                onClick={(e) =>  {
                                                                                    removeSpecialFeeType(e, [specialFeeTypes?.student_id], item?.fee_type?.id, specialFeeTypes?.classroom?.class_name_id, item?.fee_id);
                                                                                }}
                                                                            >
                                                                                <i className="icon-TrashSimple"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                    <span className="badge success" >paid</span>
                                                                )
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Close</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
