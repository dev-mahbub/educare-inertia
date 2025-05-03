import Checkbox from '@/Components/Checkbox';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import { Tooltip } from '@mui/material';

const PermissionList = ({schools}) => {

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

    //form validation start
    const { data, setData, errors, post, reset, processing, recentlySuccessful } = useForm({
        admission_check_id_parent: false,
        admission_check_id_2: false,
        admission_check_id_3: false,
    });

    const AdmissionListData = (e) => {
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

    //handle checkbox start
      const handleCheckboxChange = (name, value) => {
        let newFormData;
    
        if (name === 'admission_check_id_parent') {
          newFormData = {
            ...data,
            [name]: value,
            admission_check_id_2: value,
            admission_check_id_3: value,
          };
        } else {
          newFormData = {
            ...data,
            [name]: value,
          };
    
          if (value === false) {
            newFormData.admission_check_id_parent = false;
          } else if (
            Object.values(newFormData).slice(1).every(Boolean) &&
            !newFormData.admission_check_id_parent
          ) {
            newFormData.admission_check_id_parent = true;
          }
        }
    
        setData(newFormData);
      };
    //handle checkbox end
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form onSubmit={AdmissionListData}>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>ID. No</th>
                                            <th>Photo</th>
                                            <th>School Name</th>
                                            <th>Affiliation No</th>
                                            <th>Address</th>
                                            <th>mail</th>
                                            <th>Phone</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {schools ?
                                        schools.map((item) => (
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
                                                <td>{item.affiliation_no}</td>
                                                <td>{item.street_address}<br />{item.city} {item.zip}</td>
                                                <td>{item.mail}</td>
                                                <td>{item.phone} {item.phone_2 ? ', ' + item.phone_2 : ''}</td>
                                                <td>
                                                    <span className={item.is_inactive == 0 ? "badge success" : "badge danger"}>{item.is_inactive == 0 ? "Active" : "Inactive"}</span>
                                                </td>
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
                                                                        <i className="icon-FilePlus text-[20px] text-supportingA"></i>{" "}
                                                                        Push To Registration
                                                                    </Dropdown.Link>
                                                                    <button
                                                                        type="button"
                                                                        onClick={
                                                                            handleModalFollowUpClick
                                                                        }
                                                                    >
                                                                        <i className="icon-ChartBarHorizontal text-[20px] text-supportingA"></i>{" "}
                                                                        Follow Up
                                                                    </button>
                                                                    <Dropdown.Link href="#">
                                                                        <i className="icon-TrashSimple text-[20px] text-supportingA"></i>{" "}
                                                                        Delete Enquiry
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

                                        {/*
                                        <tr>
                                            <td>
                                                <div className="educare-checkbox-styles">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="admission_check_id_3"
                                                            checked={
                                                                data.admission_check_id_3
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
                                                10{" "}
                                                <button
                                                    type="button"
                                                    className="educare-enq-arrow"
                                                    onClick={() =>
                                                        handleEnqToggle(1)
                                                    }
                                                >
                                                    <i
                                                        className={`${
                                                            enqInnerActive[1]
                                                                ? "icon-arrow-up"
                                                                : "icon-down-arrow"
                                                        }`}
                                                    ></i>
                                                </button>
                                            </td>
                                            <td>
                                                <label className="educare-visitor-name-badge h-5 px-2 text-[12px] text-white bg-supportingA/80 inline-block rounded">
                                                    New{" "}
                                                </label>{" "}
                                                Peter
                                            </td>
                                            <td>Jhon</td>
                                            <td>XI</td>
                                            <td>Jonny</td>
                                            <td>004658744</td>
                                            <td>Mimu</td>
                                            <td>004658749</td>
                                            <td>9 Oct 2023</td>
                                            <td>Created by school admin</td>
                                            <td>
                                                <div className="educare-admission-list-action-btn">
                                                    <div className="educare-list-button-field-styles">
                                                        <PrimaryButton className="bg-supportingA/80">
                                                            <i className="icon-pen"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-list-button-field-styles">
                                                        <PrimaryButton className="bg-supportingB/80">
                                                            <i className="icon-editing"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    <div className="educare-list-button-field-styles">
                                                        <Dropdown>
                                                            <Dropdown.Trigger>
                                                                <div
                                                                    type="button"
                                                                    className="educare-dropdown-menu"
                                                                >
                                                                    <PrimaryButton className="bg-dark/80">
                                                                        <i className="icon-DotsThreeOutlineVertical"></i>
                                                                    </PrimaryButton>
                                                                </div>
                                                            </Dropdown.Trigger>

                                                            <Dropdown.Content>
                                                                <button type='button' >
                                                                    <i className="icon-FilePlus text-[20px] text-supportingA"></i>{" "}
                                                                    Push To Registration
                                                                </button>

                                                                <button type='button' onClick={handleModalFollowUpClick}>
                                                                    <i className="icon-ChartBarHorizontal text-[20px] text-supportingA"></i>{" "}
                                                                    Follow Up
                                                                </button>

                                                                <button type='button'>
                                                                    <i className="icon-TrashSimple text-[20px] text-supportingA"></i>{" "}
                                                                    Delete Enquiry
                                                                </button>
                                                            </Dropdown.Content>
                                                        </Dropdown>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                        <tr
                                            className={`transition duration-300 ${
                                                enqInnerActive[1]
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
                                                                Peter
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
                                        */}
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PermissionList;