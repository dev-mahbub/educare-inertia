import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import { useState } from "react";
import Swal from "sweetalert2";
import DocumentPopup from './DocumentPopup/DocumentPopup';

const Document = ({
    eventData,
    fileTypes
}) => {
    const [documentPopup, setDocumentPopup] = useState(false);

    const handleDocumentPopupClick = () => {
        setDocumentPopup(!documentPopup);
    };

    // handle delete event document start
    const handleDeleteEventDocument = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('event.document.delete', { eventId: eventData?.id, id: id }));
            }
        });
    }
    // handle delete event document end

    // handle download document file start
    const handleDownloadDocumentFile = (fileId) => {
        const url = route('event.document.download', fileId);

        window.open(url);
    }
    // handle download document file end

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-card-title flex justify-between items-end">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Documents
                        </h5>
                        <PrimaryButton
                            className="educare-primary-btn-md-fill"
                            onClick={handleDocumentPopupClick}
                        >
                            <i className='icon-upload'></i> Upload
                        </PrimaryButton>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <tbody>
                                {eventData?.event_documents?.length > 0 && (
                                    eventData?.event_documents?.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <button
                                                    className="text-supportingA hover:text-primary cursor-pointer"
                                                    type="button"
                                                    onClick={() => {
                                                        handleDownloadDocumentFile(item?.file?.id)
                                                    }}
                                                >
                                                    <i className="icon-DownloadSimple mr-1"></i>
                                                    {item?.name}
                                                </button>
                                            </td>
                                            <td>{item?.file_type}</td>
                                            <td>{item?.upload_date}</td>
                                            <td>
                                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                    <button
                                                        className="educare-danger-btn-sm-fill"
                                                        onClick={() => handleDeleteEventDocument(item?.id)}
                                                    >
                                                        <i className="icon-TrashSimple translate-x-[1px]"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <DocumentPopup
                documentPopup={documentPopup}
                setDocumentPopup={setDocumentPopup}
                eventData={eventData}
                fileTypes={fileTypes}
            />
        </>
    );
};

export default Document;
