import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import { useState } from 'react';
import DetailedDuePopup from './DetailedDuePopup';

export default function StudentDuePopup({
    className = '',
    studentDuePopup,
    setStudentDuePopup,
    studentFeesData = {},
    installmentTotalDue,
    studentName
}) {
    const [feesTypeData, setFeesTypeData] = useState({})
    const [secondPopup, setSecondPopup] = useState(false);
    const handleDetailedDuePopupOpen = (feesData) => {
        setFeesTypeData(feesData);
        setSecondPopup(!secondPopup);
    };

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});

    const studentDuePopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setStudentDuePopup(false);
        reset();
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={studentDuePopup}>
                    <form onSubmit={studentDuePopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>{studentName} 's Due</h5>
                            </div>
                            <div className="educare-popup-form pt-2 pb-2 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-notes">
                                    <ul>
                                        <li>Following is a list of all the dues. Please click on the title to view the details</li>
                                    </ul>
                                </div>
                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th colSpan={3}>Installment Due</th>
                                            </tr>
                                            <tr>
                                                <th>Sr.</th>
                                                <th>Title</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                studentFeesData && Object.keys(studentFeesData).length > 0 ? (
                                                    Object.values(studentFeesData)?.map((item, index) => <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <span
                                                                className='text-supportingA cursor-pointer'
                                                                onClick={() => handleDetailedDuePopupOpen(item.fee_types_data)}
                                                            >
                                                                {item.fee_title}
                                                            </span>
                                                        </td>
                                                        <td>{item.due_amount}</td>
                                                    </tr>)
                                                ) :
                                                    <tr>
                                                        <td colSpan={3} className='text-center'>Data not found</td>
                                                    </tr>
                                            }
                                        </tbody>
                                        <tfoot className='bg-supportingA/75'>
                                            <tr>
                                                <td colSpan={2} className='font-bold'>Total</td>
                                                <td colSpan={1} className='font-bold'>{installmentTotalDue}</td>
                                            </tr>
                                        </tfoot>
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
            <DetailedDuePopup
                secondPopup={secondPopup}
                studentName={studentName}
                setSecondPopup={setSecondPopup}
                feesTypeData={feesTypeData}
            />
        </>
    );
}
