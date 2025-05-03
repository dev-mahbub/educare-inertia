import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';

export default function BulkProcessDraftSalaryPopup({
    className = '',
    bulkProcessPopup,
    setBulkProcessPopup,
    handleBulkProcessSalary
}) {

    // handle close modal start
    const closeModal = (e) => {
        e.preventDefault();

        setBulkProcessPopup(false);
    };
    // handle close modal end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
                <Modal show={bulkProcessPopup} onClose={closeModal}>
                    <form onSubmit={handleBulkProcessSalary} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Confirmation</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <p className='text-headingLight'>Are you sure to process salary of staffs? Once processed, you can delete salary manually in case of need.</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal} type="button">No</PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill" type="submit">Yes</PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
