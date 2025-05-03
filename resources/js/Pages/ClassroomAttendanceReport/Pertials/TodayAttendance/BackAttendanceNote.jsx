import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import moment from "moment";

export default function BackAttendanceNote({
    attendanceNoteOpen,
    setAttendanceNoteOpen,
    attendanceNoteData,
    setAttendanceNoteData,
}) {
    const closeModal = () => {
        setAttendanceNoteOpen(false);
    };

    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={attendanceNoteOpen} onClose={closeModal}>
                <div className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Update History</h5>
                        </div>

                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form educare-admission-list-inner-wrapper pt-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-admission-list pb-none bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Notes</th>
                                                <th>Updated By</th>
                                                <th>Updated On</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {attendanceNoteData?.length > 0 ? (
                                                attendanceNoteData?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item?.attendance_note}</td>
                                                        <td>{item?.user_data?.username}</td>
                                                        <td>{moment(item?.created_at).format("DD MMM, YYYY, h:mm:ss A")}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="12">
                                                        Data not found
                                                    </td>
                                                </tr>
                                            )}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <SecondaryButton
                            type="button"
                            onClick={closeModal}
                        >
                            Close
                        </SecondaryButton>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
