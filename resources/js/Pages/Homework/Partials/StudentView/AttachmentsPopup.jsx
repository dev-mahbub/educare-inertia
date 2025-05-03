import React, { useEffect } from 'react';
import Modal from '@/Components/Modal';
import { useForm } from '@inertiajs/react';

export default function AttachmentsPopup({attachmentModalOpen, setAttachmentModalOpen, homeWorks, attachmentData}) {
    
    const {
        data,
        setData,
        post,
        reset
    } = useForm({
        attachments: attachmentData || []
    });

    useEffect((() => {
        setData({
            attachments: attachmentData
        });
    }), [attachmentData])
    
    const closeModal = () => {
        setAttachmentModalOpen(false);
    }
    
    return (
        <section className="educare-admission-follow-up-area space-y-6">
            <Modal show={attachmentModalOpen} onClose={closeModal}>
                <div className="educare-classroom-table-wrapper bg-supportingA/10">
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Attachment</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        {data?.attachments?.title}
                                    </td>
                                    <td>
                                    <a
                                        href={data?.attachments?.home_file} 
                                        download 
                                        className="text-blue-600 hover:text-blue-800 underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Download
                                    </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </Modal>
        </section>
    )
}