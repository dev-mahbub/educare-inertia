import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';

export default function ListPopup({ className = '', listPopup, setListPopup }) {

    const closeModal = () => {
        setListPopup(false);
        reset(); 
    };

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={listPopup} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3">
                                <h5>List Popup</h5>
                            </div>
                            <div className="educare-popup-form pt-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-default-table xs:overflow-x-auto bg-supportingA/10">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>1</td>
                                                <td>Social Media</td>
                                                <td>Lorem, ipsum dolor.</td>
                                            </tr>
                                            <tr>
                                                <td>2</td>
                                                <td>Online</td>
                                                <td>Lorem, ipsum dolor.</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill">Save</PrimaryButton>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}
