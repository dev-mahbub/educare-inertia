import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";

export default function MasterBookListPopUp({
    className = "",
    accNoData,
    listPopup,
    setListPopup,
}) {
    const closeModal = () => {
        setListPopup(false);
    };
    console.log(accNoData);
    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6 ${className}`}
            >
                <Modal show={listPopup} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3">
                                <h5>Book details</h5>
                            </div>

                            <div className="mt-2.5">
                                <p>
                                    <strong>Book Title : </strong>
                                    {accNoData?.book_title}
                                </p>
                                <p>
                                    <strong>Book Author : </strong>
                                    {accNoData?.author}
                                </p>
                                <p>
                                    <strong>Publisher : </strong>
                                    {accNoData?.publisher_name}
                                </p>
                            </div>

                            <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Sr.</th>
                                                <th> Acc No.</th>
                                                <th>Book Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {accNoData?.book_acc_nos?.length > 0 ? (
                                                accNoData?.book_acc_nos?.map((item, index) => (
                                                    <tr key={index}>
                                                        <td> {++index} </td>
                                                        <td> {item.acc_no} </td>
                                                        <td>
                                                            <span className={`badge ${item?.status === 'Active' ? 'success' : 'danger'}`}>
                                                                {item?.status}
                                                            </span>
                                                        </td>
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

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton
                                className="educare-gray-btn-md-stroke"
                                onClick={closeModal}
                            >
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill">
                                Save
                            </PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}
