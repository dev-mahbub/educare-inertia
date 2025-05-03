import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import React, { useEffect, useState } from "react";
import axios from 'axios';


const ChatForm = ({
    auth,
    siteData,
    messages,
    receiver_id,
    singleMessage
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
        message: "",
        receiver_id: receiver_id

    });

    const dummyData = (e) => {
        e.preventDefault();
    };
    
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            receiver_id: receiver_id,
        }));
    }, [receiver_id]);

    // handle save event start
    const handleChatEventSave = (e) => {
        e.preventDefault();
        axios.post(route('livechat.save'), data)
            .then((response) => {
                const response_data = response.data;
                if (response_data.success == true) {
                    //setSingleMessage((prevText) => prevText + '<div class="message answer"><span class="message">' + response_data.data.text + '</span></div>');
                }
                else {
                    console.error("failed", "failed!");
                }
            })
            .catch((error) => {
                console.error("Error:", error.message);
            });
    }
    // handle save event end

    

    return (
        <div className="educare-event-create-area p-[30px] maxXs:p-[15px] rounded-[10px] bg-white/70">
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5 max-w-[800px] w-full m-auto'>
                <div className="message-wrapper">
                    <div className="messageBox-wrap">
                        {/* {messages?.length > 0 &&
                        messages?.map((item, index) => (
                            <div key={index} className="message reply anaswer">
                                <span className="message">
                                    {item?.text}
                                </span>
                            </div>
                        ))} */}
                        {messages?.length > 0 &&
                            messages?.map((item, index) => (
                                <div key={index} className={`message ${item?.sender_id === auth.user.id ? 'answer' : 'reply'}`}>
                                    <span className="message">
                                        {item?.text}
                                    </span>
                                </div>
                            ))}
                    </div>
                    <div className="messageBox-wrap" dangerouslySetInnerHTML={{ __html: singleMessage }}></div>
                </div>
                <form onSubmit={dummyData}>
                    <div className='flex gap-2 mt-5'>
                        <div className="educare-input-field-styles w-full">
                            <InputLabel
                                htmlFor="message"
                                value=""
                            />
                            <TextInput
                                id="message"
                                value={
                                    data.message
                                }
                                onChange={(e) =>
                                    setData(
                                        "message",
                                        e.target.value
                                    )
                                }
                                className="block"
                            />
                            <InputError
                                message={
                                    errors.message
                                }
                                className="mt-2"
                            />
                        </div>
                        <div className="educare-input-field-styles">
                            <PrimaryButton
                                disabled={processing}
                                className="educare-primary-btn-md-fill mt-1"
                                type="button"
                                onClick={(e) => {
                                    handleChatEventSave(e)
                                }}
                            >
                                Send
                            </PrimaryButton>
                        </div>
                    </div>
                </form>
            </div>

        </div >
    );
};

export default ChatForm;
