import Modal from '@/Components/Modal';
import { router } from '@inertiajs/react';
import { Tooltip } from "@mui/material";
import Swal from 'sweetalert2';

export default function ShowResourcePopup({
    showResourceTopic,
    setShowResourceTopic,
    selectedLearningMaterial,
    user,
    handleFilterLearningMaterial
 }) {

    const closeModal = () => {
        setShowResourceTopic(false);
    };

    // handle download resource file start
    const handleDownloadResourceFile = (id) => {
        const url = route('asset.learning_material_resource.download', id);

        window.open(url);
    }
    // handle download resource file end

    // handle learning material resource delete start
    const handleLearningMaterialResourceDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('asset.learning_material_resource.delete', id), {
                    onSuccess: () => {
                        handleFilterLearningMaterial();
                    },
                    onError: () => {
                        handleFilterLearningMaterial();
                    }
                });
            }
        });
    }
    // handle learning material resource delete end

    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6`}>
                <Modal show={showResourceTopic} onClose={closeModal} maxWidth='4xl'>
                    <div className="educare-popup-form-wrapper p-3">
                        <div className="educare-popup-form-header py-3">
                            <h5>{selectedLearningMaterial?.title} - Resources</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                            <div className="grid grid-cols-12 gap-4">
                                <div className="col-span-12">
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Sl No.</th>
                                                    <th>Title</th>
                                                    <th>Type</th>
                                                    <th>Resource</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className='bg-border/40'>
                                                {
                                                    selectedLearningMaterial?.learning_material_resources?.length > 0 ? (selectedLearningMaterial?.learning_material_resources?.map((item, index) => <tr key={index}>
                                                        <td>{index + 1}</td>
                                                        <td>{item?.title}</td>
                                                        <td>{item?.type}</td>
                                                        <td>
                                                            {item?.type?.toLowerCase() == 'text' ? item?.description : ''}
                                                            {item?.type?.toLowerCase() == 'link' || item?.type?.toLowerCase() == 'youtube' ?
                                                                (
                                                                    <a
                                                                        href={item?.link}
                                                                        target="_blank"
                                                                        className="text-primary"
                                                                    >
                                                                        Click Me
                                                                    </a>
                                                                )
                                                            : ''}
                                                            {item?.type?.toLowerCase() == 'worksheet' || item?.type?.toLowerCase() == 'picture' || item?.type?.toLowerCase() == 'document' || item?.type?.toLowerCase() == 'audio' ?
                                                                item?.file?.file_name
                                                            : ''}
                                                        </td>
                                                        <td>
                                                            <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                                {(item?.type?.toLowerCase() == 'worksheet' || item?.type?.toLowerCase() == 'picture' || item?.type?.toLowerCase() == 'document' || item?.type?.toLowerCase() == 'audio') &&
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Download"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                type='button'
                                                                                className="text-supportingA"
                                                                                onClick={() => handleDownloadResourceFile(item?.file?.id)}
                                                                            >
                                                                                Download
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                }

                                                                {selectedLearningMaterial?.user_id == user?.id &&
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Delete"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button
                                                                                type='button'
                                                                                className="text-supportingB"
                                                                                onClick={() => handleLearningMaterialResourceDelete(item?.id)}
                                                                            >
                                                                                Delete
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                }
                                                            </div>
                                                        </td>
                                                    </tr>))
                                                        : (<tr>
                                                            <td
                                                                colSpan={5}
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
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
}
