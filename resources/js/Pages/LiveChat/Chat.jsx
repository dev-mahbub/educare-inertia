import DashboardLayout from '@/Layouts/DashboardLayout';
import ChatFromInnerLayout from '@/Pages/LiveChat/Partials/ChatFromInnerLayout';
import { Head } from '@inertiajs/react';
import React, { useState } from "react";
const match = '';
const updateIcon = '';
const deleteIcon = '';

export default function Create({
    auth,
    siteData,
    messages,
    receiver_id
}) {
    const [singleMessage, setSingleMessage] = useState([]);
    const [msgId, setMsgId] = useState('');

    window.Echo.private('chat')
    .listen("MessageSent", (response) => {
        console.log(response?.message);
        if ((response?.message?.receiver_id === auth.user.id) && (response.message.id != msgId)) {
            setMsgId(response.message.id);
            setSingleMessage((prevText) => prevText + '<div class="message reply"><span class="message">' + response.message.text + '</span></div>');
        }
    });

    return (
        <DashboardLayout
            user={auth.user}
            siteData={siteData}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>}
        >
            <Head title="Create Event" />
            <ChatFromInnerLayout
                auth={auth}
                siteData={siteData}
                messages={messages}
                receiver_id={receiver_id}
                singleMessage={singleMessage}
            />
        </DashboardLayout>
    );
}
