import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import moment from "moment";

export default function ActionHistoryPopup({ actionHistoryPopup, setActionHistoryPopup, actionHistoryPopupData }) {

    const closeModal = () => {
        setActionHistoryPopup(false);
    };

    return (
        <section className='educare-admission-follow-up-area space-y-6'>
            <Modal show={actionHistoryPopup} onClose={closeModal}>
                <div>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b border-border/50 pb-5">
                            <div className="educare-popup-form-header py-3">
                                <h5>History</h5>
                            </div>
                            <div className="mt-5">
                                <p><span className="font-semibold">Created by</span> : <span>{actionHistoryPopupData?.created_by?.user?.username}</span></p>
                                <p className="mt-1">
                                    <span className="font-semibold">Created on</span> : <span>{moment(actionHistoryPopupData?.created_by?.created_at).format("DD MMMM, YYYY")}</span>
                                </p>
                                <p><span className="font-semibold">Updated by</span> : <span>{actionHistoryPopupData?.updated_by?.user?.username}</span></p>
                                <p className="mt-1">
                                    <span className="font-semibold">Updated on</span> : <span>{moment(actionHistoryPopupData?.updated_by?.updated_at).format("DD MMMM, YYYY")}</span>
                                </p>
                                {/* <p className="mt-1"><span className="font-semibold">Modified on</span> : <span>{ actionHistoryPopupData?.created_at !== actionHistoryPopupData?.updated_at ? moment(actionHistoryPopupData?.updated_at).format("DD MMMM, YYYY") : 'Not updated yet.'}</span></p> */}
                            </div>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <DangerButton
                                className="educare-danger-btn-md-fill"
                                type="button"
                                onClick={closeModal}
                            >
                                Close
                            </DangerButton>
                        </div>
                    </div>
                </div>
            </Modal>
        </section>
    );
}
