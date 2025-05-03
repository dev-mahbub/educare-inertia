import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { Tooltip } from '@mui/material';

export default function BulkTransectionStatusPopup({ className = '', bulkTransectionPopup, setBulkTransectionPopup, checkedData }) {

    console.log(checkedData)

    const BulkTransectionStatusPopupData = (e) => {
        e.preventDefault();
        // destroy(route('profile.destroy'), {
        //     preserveScroll: true,
        //     onSuccess: () => closeModal(),
        //     onError: () => passwordInput.current.focus(),
        //     onFinish: () => reset(),
        // });
    };

    const closeModal = () => {
        setBulkTransectionPopup(false);
        
    };

    return (
        <section className={`educare-admission-follow-up-area space-y-6 ${className}`}>
            <Modal show={bulkTransectionPopup} onClose={closeModal}>
                <form onSubmit={BulkTransectionStatusPopupData} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b-0 mb-0 border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Bulk Transaction Status</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table className='bg-supportingA/10'>
                                        <thead>
                                            <tr>
                                                <th>Total Selected Transactions</th>
                                                <th>Total Success</th>
                                                <th>Total Failure</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    <Tooltip
                                                        title="Click"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <button>
                                                            1
                                                        </button>
                                                    </Tooltip>

                                                </td>
                                                <td>
                                                    <Tooltip
                                                        title="Click"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <button>
                                                            0
                                                        </button>
                                                    </Tooltip>

                                                </td>
                                                <td>
                                                    <Tooltip
                                                        title="Click"
                                                        placement="top"
                                                        arrow
                                                        as="button"
                                                    >
                                                        <button>
                                                            1
                                                        </button>
                                                    </Tooltip>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-default-table xs:overflow-x-auto">
                                    <table className='bg-supportingA/10'>
                                        <thead>
                                            <tr>
                                                <th>Order Id</th>
                                                <th>Admission No</th>
                                                <th>Name</th>
                                                <th>Class</th>
                                                <th>Reason</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td colSpan={5}>data not found</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-wrap justify-end gap-2.5">
                        <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
