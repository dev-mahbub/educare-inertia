import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import TextareaInput from '@/Components/TextareaInput';
import { useForm } from '@inertiajs/react';

const DocumentPopup = ({
    documentPopup,
    setDocumentPopup,
    eventData,
    fileTypes
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        event_id: eventData?.id ?? "",
        name: "",
        description: "",
        file_type: "",
        event_document: "",
    });

    // handle save event document start
    const handleSaveEventDocument = (e) => {
        e.preventDefault();

        post(route('event.document.save', eventData?.id), {
            onSuccess: () => {
                closeModal();
            }
        });
    }
    // handle save event document end

    const documentPopupData = (e) => {
        e.preventDefault();
    };

    const closeModal = () => {
        setDocumentPopup(false);
        reset();
    };
    return (
        <>
            <section className={`educare-admission-follow-up-area space-y-6`}>
                <Modal show={documentPopup} onClose={closeModal}>
                    <form onSubmit={documentPopupData} className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Upload Document</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="grid grid-cols-12 gap-5">
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="Display Name"
                                            />
                                            <TextInput
                                                value={
                                                    data.name
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.name
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="Display Description"
                                            />
                                            <TextareaInput
                                                value={
                                                    data.description
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "description",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.description
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <InputLabel
                                                value="File Type"
                                            />
                                            <SelectInput
                                                data_label="Type"
                                                data={fileTypes}
                                                value={
                                                    data.file_type
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "file_type",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.file_type
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-span-12 md:col-span-6">
                                        <div className="educare-input-field-styles">
                                            <InputLabel value="Upload File" />
                                            <div className="educare-input-type-file-styles">
                                                <input
                                                    id="event_document"
                                                    type="file"
                                                    name="event_document"
                                                    onChange={(e) =>
                                                        setData("event_document", e.target.files[0])
                                                    }
                                                />
                                            </div>
                                            <InputError
                                                message={
                                                    errors.event_document
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton className="educare-gray-btn-md-stroke" onClick={closeModal}>Cancel</PrimaryButton>
                            <PrimaryButton
                                className="educare-primary-btn-md-fill"
                                onClick={(e) => {
                                    handleSaveEventDocument(e);
                                }}
                            >
                                Upload
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
};

export default DocumentPopup;
