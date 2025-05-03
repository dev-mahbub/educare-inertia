import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Modal from "@/Components/Modal";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import DatePicker from "react-datepicker";
import SelectInput from "@/Components/SelectInput";
import moment from "moment/moment";
const ReadMessagePopUp = ({
    messagePopUp,
    setMessagePopUp,
    selectedMessage
}) => {
    const closeModal = () => {
        setMessagePopUp(false);
        reset();
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        title: "",
        activity_date: "",
        follow_date: "",
        status: "",
    });

    console.log(selectedMessage);


    const handleSubmit = (e) => {
        e.preventDefault();
        post(route("visitor_enquiry.activity_save"), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
        });
    };

    return (
        <>
            <section
                className={`educare-admission-follow-up-area space-y-6`}
            >
                <Modal show={messagePopUp} onClose={closeModal}>
                    <div className="p-[30px] pt-2.5">
                        <div className="educare-popup-form-wrapper mb-5 ">
                            <div className="educare-popup-form-header py-3 mb-2.5">
                                <h5>Message Details</h5>
                            </div>
                            <div className="educare-common-card">
                                {/* Message Title */}
                                <div className="mb-4">
                                    <div className="text-gray-600 text-sm font-medium mb-1">Message Title</div>
                                    <div className="text-gray-900 font-semibold">{selectedMessage?.subject}</div>
                                </div>

                                {/* Message Description */}
                                <div className="mb-4">
                                    <div className="text-gray-600 text-sm font-medium mb-1">Description</div>
                                    <div className="text-gray-900">{selectedMessage?.body}</div>
                                </div>

                                {/* Message Meta Info */}
                                <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <div className="text-gray-600 text-sm font-medium mb-1">Audience</div>
                                        <div className="text-gray-900">{selectedMessage?.audience_type}</div>
                                    </div>
                                    <div>
                                        <div className="text-gray-600 text-sm font-medium mb-1">Sent On</div>
                                        <div className="text-gray-900">
                                            {/* {selectedMessage?.created_at} */}
                                            {moment(selectedMessage?.created_at).format("DD MMM YYYY")}
                                        </div>
                                    </div>
                                </div>

                                {/* Recipients List */}
                                <div>
                                    <div className="text-gray-600 text-sm font-medium mb-2">Sent To:</div>
                                    <div className="max-h-[200px] overflow-y-auto">
                                    {selectedMessage?.teachers && (
                                        <span>
                                            {selectedMessage.teachers.map(teacher => 
                                                `${teacher.first_name ?? ''} ${teacher.middle_name ?? ''} ${teacher.last_name ?? ''}`
                                            ).join(', ')}
                                        </span>
                                    )}
                                    {selectedMessage?.students && (
                                        <span>
                                            {selectedMessage.students.map(student => 
                                                `${student?.admission_no} - ${student?.first_name ?? ''} ${student?.middle_name ?? ''} ${student?.last_name ?? ''}`
                                            ).join(', ')}
                                        </span>
                                    )}
                                    {selectedMessage?.classrooms && (
                                        <span>
                                            {selectedMessage.classrooms.map(classroom => 
                                                `${classroom.title ?? ''}`
                                            ).join(', ')}
                                        </span>
                                    )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </section>
        </>
    );
};

export default ReadMessagePopUp;
