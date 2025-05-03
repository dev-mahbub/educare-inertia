import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm } from '@inertiajs/react';

export default function LeaveTypePopup({
    className = '',
    leaveTypePopup,
    setLeaveTypePopup,
    selectedLeave,
    setSelectedLeave
}) {

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({});

    const leaveTypePopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setLeaveTypePopup(false);
        reset();
        setSelectedLeave({});
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={leaveTypePopup} onClose={closeModal}>
                    <form onSubmit={leaveTypePopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper ">
                            <div className="educare-popup-form-header py-3">
                                <h5>Consumed Leaves</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-classroom-table-wrapper">
                                    <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Leave</th>
                                                    <th>NoOfDays</th>
                                                    <th>From</th>
                                                    <th>To</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {selectedLeave?.leaves?.length > 0 &&
                                                    <>
                                                        {selectedLeave.leaves.map((item, index) => (
                                                            <tr key={index}>
                                                                <td>{item?.acronym}</td>
                                                                <td>{item?.no_of_days}</td>
                                                                <td>{item?.start_date}</td>
                                                                <td>{item?.end_date}</td>
                                                            </tr>
                                                        ))}
                                                        <tr>
                                                            <td>Total</td>
                                                            <td>{selectedLeave.leaves.reduce((total, item) => total + parseInt(item?.no_of_days ?? 0), 0)}</td>
                                                            <td></td>
                                                            <td></td>
                                                        </tr>
                                                    </>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton
                                type="button"
                                className="educare-gray-btn-md-stroke"
                                onClick={closeModal}
                            >
                                Cancel
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
