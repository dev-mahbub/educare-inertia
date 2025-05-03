import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import React from "react";
const EnquiryListDetailsPopUp = ({
    className = "",
    listPopup,
    setListPopup,
    enquiryDetails,
}) => {
    const closeModal = () => {
        setListPopup(false);
    };
    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6 ${className}`}
            >
                <Modal show={listPopup} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3">
                                <h5>Enquiry Detail</h5>
                            </div>
                            <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Enquiry Detail</th>
                                                <th>Address</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{enquiryDetails?.name}</td>
                                                <td>{enquiryDetails?.address}</td>
                                                <td>{enquiryDetails?.enquiry_message}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton
                                className="educare-gray-btn-md-stroke"
                                onClick={closeModal}
                            >
                                Close
                            </PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
};

export default EnquiryListDetailsPopUp;
