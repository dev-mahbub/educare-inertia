import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';

export default function DetailedDuePopup({
    className = '',
    secondPopup,
    studentName,
    setSecondPopup,
    feesTypeData = {}
}) {
     
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});

    const secondPopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setSecondPopup(false);
        reset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={secondPopup} onClose={closeModal}>
                    <form onSubmit={secondPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>{studentName}'s Detailed Due</h5>
                            </div>
                            <div className="educare-popup-form pt-2 pb-2 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-notes">
                                    <ul>
                                        <li>Following is a bifurcated view of due</li>
                                    </ul>
                                </div>
                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Fee Type</th>
                                                <th>Amount Payable</th>
                                                <th>Amount Paid</th>
                                                <th>Due</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                               feesTypeData && Object.keys(feesTypeData)?.length > 0 ? (
                                                    Object.values(feesTypeData)?.map((item, index) => <tr key={index}>
                                                        <td>{item.fee_type_title}</td>
                                                        <td>{item.payable_amount}</td>
                                                        <td>{item.paid_amount}</td>
                                                        <td>{item.due_amount}</td>
                                                    </tr>)
                                                ) : <tr>
                                                    <td colSpan={4} className='text-center'>Data not found</td>
                                                </tr>
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton type='button' className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
