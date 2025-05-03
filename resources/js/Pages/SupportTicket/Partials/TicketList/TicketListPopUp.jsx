import Modal from "@/Components/Modal";
import { useForm } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";
import InputLabel from "@/Components/InputLabel";
import TextareaInput from "@/Components/TextareaInput";
import InputError from "@/Components/InputError";
import { useEffect } from "react";

const TicketListPopUp = ({ className = "", singlePopup, setSinglePopup, singlePopupData = "", parentPhoneNumber }) => {
    const {
        data,
        setData,
        delete: destroy,
        post,
        processing,
        reset,
        errors,
    } = useForm({
        message_content: "",
        parent_phone: "",
    });

    useEffect(() => {
        setData("message_content", singlePopupData);
    }, [singlePopupData]);

    useEffect(() => {   
        setData("parent_phone", parentPhoneNumber);
    }, [parentPhoneNumber]);


    const singlePopupDataSubmit = (e) => {
        e.preventDefault();
        
        post(route("support_ticket.send_login_credential"), {
            onSuccess: () => {
                closeModal();
            },
        });
    };

    const closeModal = () => {
        setSinglePopup(false);
        reset();
    };

    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6 ${className}`}
            >
                <Modal show={singlePopup} onClose={closeModal}>
                    <form
                        onSubmit={singlePopupDataSubmit}
                        className="p-[30px] pt-2.5"
                    >
                        <div className="educare-popup-form-wrapper border-b mb-5 border-border/50">
                            <div className="educare-popup-form-header py-3">
                                <h5>Send Login Credential</h5>
                            </div>
                            <div className="educare-popup-form pt-5 pb-5 maxSm:py-4 flex flex-col gap-3">
                                <div className="educare-input-field-styles">
                                    <InputLabel
                                        htmlFor="message_content"
                                        value="Message Content"
                                    />
                                    <TextareaInput
                                        id="message_content"
                                        value={data?.message_content}
                                        onChange={(e) =>
                                            setData(
                                                "message_content",
                                                e.target.value
                                            )
                                        }
                                        className="block"
                                    />
                                    <InputError
                                        message={errors.message_content}
                                        className="mt-2"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-end gap-2.5">
                            <PrimaryButton
                                className="educare-gray-btn-md-stroke"
                                onClick={closeModal}
                                type="button"
                            >
                                Cancel
                            </PrimaryButton>
                            <PrimaryButton className="educare-primary-btn-md-fill">
                                Send
                            </PrimaryButton>
                        </div>
                    </form>
                </Modal>
            </section>
        </>
    );
};

export default TicketListPopUp;
