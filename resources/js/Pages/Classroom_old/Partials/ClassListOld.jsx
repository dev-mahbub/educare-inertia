import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import FollowUpPopupForm from './FollowUpPopupForm';
import { Tooltip } from '@mui/material';

const ClassList = ({classrooms}) => {

    const [modalFollowUpOpen, setModalFollowUpOpen] = useState(false);
    const handleModalFollowUpClick = () => {
        setModalFollowUpOpen(!modalFollowUpOpen);
    };

    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState([false, false, false])
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end

    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({});

    const classListData = (e) => {
        e.preventDefault();

        post(route('school.save'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.city) {
                //     reset('city', 'zip');
                //     cityInput.current.focus();
                // }
            },
        });
    };
    //form validation end
    
    return (
        <>
            <div className="educare-classroom-list-area">
                <div className="educare-classroom-list-inner">
                    <div className="educare-classroom-list-inner-wrapper">
                        <form onSubmit={classListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Class Name</th>
                                            <th>Class Teacher</th>
                                            <th>Class Monitor</th>
                                            <th>Total student</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classrooms ?
                                        classrooms.map((item) => (
                                        <>
                                            <tr>
                                                <td>{item.id}</td>
                                                <td>
                                                    
                                                    <button
                                                        type="button"
                                                        className="educare-enq-arrow hidden"
                                                        onClick={() =>
                                                            handleEnqToggle(0)
                                                        }
                                                    >
                                                        <i
                                                            className={`${
                                                                enqInnerActive[0]
                                                                    ? "icon-arrow-up"
                                                                    : "icon-down-arrow"
                                                            }`}
                                                        ></i>
                                                    </button>
                                                </td>
                                                <td>{item.title}</td>
                                                <td>{item.phone} {item.phone_2 ? ', ' + item.phone_2 : ''}</td>
                                                <td>
                                                    <div className="educare-admission-list-action-btn">
                                                        <div className="educare-list-button-field-styles hidden">
                                                            <Link href="#" className="bg-supportingA/80 inline-block">
                                                                <i className="icon-pen"></i>
                                                            </Link>
                                                        </div>
                                                        <div className="educare-list-button-field-styles">
                                                            <Tooltip title="Edit" placement="top" arrow>
                                                                <Link href={`/school/edit/${item.id}`} className="bg-supportingB/80 inline-block">
                                                                    <i className="icon-editing"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>

                                                        
                                                        <div className="educare-list-button-field-styles">
                                                            <Dropdown>
                                                                <Dropdown.Trigger>
                                                                    <div
                                                                        type="button"
                                                                        className="educare-dropdown-menu"
                                                                    >
                                                                        <PrimaryButton className="bg-dark/80 inline-block">
                                                                            <i className="icon-DotsThreeOutlineVertical"></i>
                                                                        </PrimaryButton>
                                                                    </div>
                                                                </Dropdown.Trigger>

                                                                <Dropdown.Content>
                                                                    <Dropdown.Link href="#">
                                                                    {" "}
                                                                        Assign Roll No             
                                                                    </Dropdown.Link>
                                                                    <button
                                                                        type="button"
                                                                        onClick={
                                                                            handleModalFollowUpClick
                                                                        }
                                                                    >
                                                                    {" "}
                                                                        Assign Subject Teacher             
                                                                    </button>
                                                                    <Dropdown.Link href="#">
                                                                    {" "}
                                                                        Assign Class Monitor             
                                                                    </Dropdown.Link>
                                                                </Dropdown.Content>
                                                            </Dropdown>
                                                        </div>
                                                        <div className="educare-list-button-field-styles">
                                                            <Link href="#" className="bg-supportingC/80 hidden">
                                                                <i className="icon-eye"></i>
                                                            </Link>
                                                        </div>
                                                        <div className="educare-list-button-field-styles">
                                                            <Link href="#" className="bg-danger/80 hidden">
                                                                <i className="icon-TrashSimple"></i>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr
                                                className={`${
                                                    enqInnerActive[0]
                                                        ? ""
                                                        : "hidden"
                                                }`}
                                            >
                                                <td
                                                    colSpan="12"
                                                    className="educare-admission-list-enq-inner-wrap"
                                                >
                                                    <table className="educare-admission-list-enq-inner">
                                                        <thead>
                                                            <tr>
                                                                <th>
                                                                    Activity Title
                                                                </th>
                                                                <th>
                                                                    Activity Date
                                                                </th>
                                                                <th>
                                                                    Follow Up Date
                                                                </th>
                                                                <th>Caller Name</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr>
                                                                <td>
                                                                    New activity for
                                                                    admission by
                                                                    Steven
                                                                </td>
                                                                <td>20-08-23</td>
                                                                <td>25-08-23</td>
                                                                <td>
                                                                    School Admin
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </>
                                        )):
                                        <>
                                         <p>no list</p>
                                        </>}
                                       
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FollowUpPopupForm modalFollowUpOpen={modalFollowUpOpen} setModalFollowUpOpen={setModalFollowUpOpen} />
        </>
    );
};

export default ClassList;