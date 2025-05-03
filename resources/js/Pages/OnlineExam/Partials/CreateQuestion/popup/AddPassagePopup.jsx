import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import { Tooltip } from '@mui/material';

export default function AddPassagePopup({
    addPassage,
    setAddPassage,
    virtualAssets,
    setSelectedVirtualAsset
 }) {

    const addPassageData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setAddPassage(false);
    };

    // handle link passage start
    const handleLinkPassage = (id) => {
        setSelectedVirtualAsset(virtualAssets?.find(item => item?.id == id) ?? {});
    }
    // handle link passage end


    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6`}>
                <Modal show={addPassage} onClose={closeModal} maxWidth='4xl'>
                    <form onSubmit={addPassageData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper">
                            <div className="educare-popup-form-header py-3">
                                <h5>Passage</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-4">
                                    <div className="col-span-12">
                                        <div className="educare-default-table xs:overflow-x-auto">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Title</th>
                                                        <th>Class</th>
                                                        <th>Subject</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody className='bg-border/40'>
                                                    {
                                                        virtualAssets.length > 0 ? (virtualAssets.map((item, index) => <tr key={index}>
                                                            <td>{item?.title}</td>
                                                            <td>{item?.class_name?.title}</td>
                                                            <td>{item?.subject?.title}</td>
                                                            <td>
                                                                <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Link Passage"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                type='button'
                                                                                className="educare-warning-btn-sm-fill"
                                                                                onClick={() => {
                                                                                    handleLinkPassage(item?.id)
                                                                                }}
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>))
                                                            : (<tr>
                                                                <td
                                                                    colSpan={4}
                                                                    className='text-center'
                                                                >
                                                                    <span className="text-danger">
                                                                        Data not found
                                                                    </span>
                                                                </td>
                                                            </tr>)
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                        <div className="flex flex-wrap justify-end gap-2.5 pt-7">
                                            <PrimaryButton
                                                type='button'
                                                className="educare-gray-btn-md-stroke"
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
}
