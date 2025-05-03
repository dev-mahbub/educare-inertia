import Modal from '@/Components/Modal';
import 'react-toastify/dist/ReactToastify.css';

export default function LeaveRequestDetailPopup({
    showLeaveRequestDetailPopup,
    setShowLeaveRequestDetailPopup,
    selectedLeave
}) {

    const closeModal = () => {
        setShowLeaveRequestDetailPopup(false);
    };

    return (
        <div className='educare-admission-follow-up-area space-y-6'>
            <Modal show={showLeaveRequestDetailPopup} onClose={closeModal} className="educare-lg-width-modal">
                <div className="educare-popup-form-wrapper-main p-[30px] pt-2.5">
                    <div className="educare-admission-list-inner bg-supportingA/10">
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list pb-none">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Day</th>
                                            <th>Day Type</th>
                                            <th>Shift <span className='text-danger'>(In case of half day)</span></th>
                                        </tr>
                                    </thead>
                                        <tbody>
                                            {selectedLeave?.leave_days?.length > 0 ?
                                                selectedLeave.leave_days.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.date}</td>
                                                        <td>{item?.day}</td>
                                                        <td>{item?.day_type}</td>
                                                        <td>{item?.shift}</td>
                                                    </tr>
                                                ))
                                                :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="8">
                                                        Data not found
                                                    </td>
                                                </tr>
                                            }
                                        </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
