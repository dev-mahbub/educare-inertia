import Checkbox from '@/Components/Checkbox';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { Tooltip } from '@mui/material';
import moment from 'moment';
import Swal from 'sweetalert2';
import ReadMessagePopUp from './ReadMessagePopUp';

const SentWebMessageList = ({ webmessages }) => {

    const [modalFollowUpOpen, setModalFollowUpOpen] = useState(false);
    const handleModalFollowUpClick = () => {
        setModalFollowUpOpen(!modalFollowUpOpen);
    };

    const [messagePopUp, setMessagePopUp] = useState(false);
    const [selectedMessage, setSelectedMessage] = useState(null);

    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState([false, false, false])
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        inbox_check_id_parent: false,
        inbox_check_id_2: false,
    });

    const SentWebMessageListData = (e) => {
        e.preventDefault();

        post(route('school.save'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };
    //form validation end

    //handle checkbox start
    const handleCheckboxChange = (name, value) => {
        let newFormData;

        if (name === 'inbox_check_id_parent') {
            newFormData = {
                ...data,
                [name]: value,
                inbox_check_id_2: value,
                admission_check_id_3: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            if (value === false) {
                newFormData.inbox_check_id_parent = false;
            } else if (
                Object.values(newFormData).slice(1).every(Boolean) &&
                !newFormData.inbox_check_id_parent
            ) {
                newFormData.inbox_check_id_parent = true;
            }
        }

        setData(newFormData);
    };

    const handleDelete = (id) => {
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
                router.delete(route('webmessage.destroy', id), {
                    onSuccess: () => {
                        Swal.fire("Deleted!", "Your data has been deleted.", "success");
                    }
                });
            }
        });
    };

    const handlemessagePopUp = (id) => {
        const selectedCurrentWebMessage = webmessages.find(message => message.id === id);
        
        setSelectedMessage(selectedCurrentWebMessage);
        setMessagePopUp(!messagePopUp);
    };


    //handle checkbox end
    return (
        <>
            <div className="educare-web-message-sent-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={SentWebMessageListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-checkbox-styles">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="inbox_check_id_parent"
                                                            checked={
                                                                data.inbox_check_id_parent
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxChange(
                                                                    e.target
                                                                        .name,
                                                                    e.target
                                                                        .checked
                                                                )
                                                            }
                                                        />
                                                    </label>
                                                </div>
                                            </th>
                                            <th>
                                                Recipient
                                            </th>
                                            <th>
                                                Subject
                                            </th>
                                            <th>Document</th>
                                            <th>Date</th>
                                            {/* <th>Action</th> */}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {webmessages && webmessages.map((webmessage, index) => (

                                            <tr key={index}>
                                                <td>
                                                    <div className="educare-checkbox-styles">
                                                        <label className="inline-block">
                                                            <Checkbox
                                                                name="sent_check_id_2"
                                                                checked={
                                                                    data.sent_check_id_2
                                                                }
                                                                onChange={(e) =>
                                                                    handleCheckboxChange(
                                                                        e.target
                                                                            .name,
                                                                        e.target
                                                                            .checked
                                                                    )
                                                                }
                                                            />
                                                        </label>
                                                    </div>
                                                </td>
                                                <td>
                                                
                                                    <span className='block'>
                                                        {webmessage?.audience_type} {' '}
                                                        {webmessage?.teachers && (
                                                            <span>
                                                                <span>(</span>
                                                                    {webmessage.teachers.map(teacher => 
                                                                        `${teacher.first_name ?? ''} ${teacher.middle_name ?? ''} ${teacher.last_name ?? ''}`
                                                                    ).join(', ').substring(0, 30)}
                                                                    {webmessage.teachers.join(', ').length > 30 && '...'}
                                                                <span>)</span>
                                                            </span>
                                                        )}
                                                        {webmessage?.students && (
                                                            <span>
                                                                <span>(</span>
                                                                    {webmessage.students.map(student => 
                                                                        `${student?.admission_no} - ${student?.first_name ?? ''} ${student?.middle_name ?? ''} ${student?.last_name ?? ''}`
                                                                    ).join(', ').substring(0, 30)}
                                                                    {webmessage.students.join(', ').length > 30 && '...'}
                                                                <span>)</span>
                                                            </span>
                                                        )}
                                                        {webmessage?.classrooms && (
                                                            <span>
                                                                <span>(</span>
                                                                    {webmessage.classrooms.map(classroom => 
                                                                        `${classroom.title ?? ''}`
                                                                    ).join(', ').substring(0, 30)}
                                                                    {webmessage.classrooms.join(', ').length > 30 && '...'}
                                                                <span>)</span>
                                                            </span>
                                                        )}
                                                        
                                                    </span>
                                                    <button
                                                        type='button'
                                                        onClick={() => handlemessagePopUp(webmessage.id)}
                                                    >
                                                        <span className="badge success">Read message</span>
                                                    </button>
                                                </td>
                                                <td>{webmessage?.subject}</td>
                                                <td>
                                                    <span className='block'>{webmessage.document}</span>
                                                    {webmessage?.image && (
                                                        <a href={webmessage.image} target="_blank" rel="noreferrer">
                                                            <span className='badge success'>
                                                                Watch Attachment
                                                            </span>
                                                        </a>
                                                    )}
                                                </td>
                                                <td>
                                                    {/* {webmessage?.created_at} */}
                                                    {moment(webmessage?.created_at).format('DD MMM YYYY')}
                                                </td>
                                                {/* <td>

                                                    <div className="educare-admission-list-action-btn">
                                                        <div className="educare-list-button-field-styles">
                                                            <Tooltip title="Edit" placement="top" arrow>
                                                                <Link href="#" className="bg-supportingB/80 inline-block">
                                                                    <i className="icon-editing"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        <div className="educare-list-button-field-styles">
                                                            <Tooltip title="Delete" placement="top" arrow>
                                                                <button className="bg-danger/80 inline-block"
                                                                    type='button'
                                                                    onClick={() => handleDelete(webmessage.id)}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td> */}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <ReadMessagePopUp
                messagePopUp={messagePopUp}
                setMessagePopUp={setMessagePopUp}
                selectedMessage={selectedMessage}
            />
        </>
    );
};

export default SentWebMessageList;