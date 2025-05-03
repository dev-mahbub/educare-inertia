import Checkbox from '@/Components/Checkbox';
import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, useForm } from '@inertiajs/react';
import React, { useState } from 'react';
import FollowUpPopupForm from './FollowUpPopupForm';
import { Tooltip } from '@mui/material';

const AdmissionList = () => {

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
                                            <th>
                                                <div className="educare-checkbox-styles">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="admission_check_id_parent"
                                                            checked={
                                                                data.admission_check_id_parent
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
                                            <th></th>
                                            <th>Visitor Name</th>
                                            <th>Student Name</th>
                                            <th>Class</th>
                                            <th>Father Name</th>
                                            <th>Phone</th>
                                            <th>Refer By</th>
                                            <th>Refer Mobile</th>
                                            <th>Enq Date</th>
                                            <th>Counseller</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <div className="educare-checkbox-styles">
                                                    <label className="inline-block">
                                                        <Checkbox
                                                            name="admission_check_id_2"
                                                            checked={
                                                                data.admission_check_id_2
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
                                                12{" "}
                                                <button
                                                    type="button"
                                                    className="educare-enq-arrow"
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
                                            <td>
                                                <span className="badge success">
                                                    Registration Token
                                                </span>{" "}
                                                Andrew
                                            </td>
                                            <td>Steven</td>
                                            <td>X</td>
                                            <td>Watson</td>
                                            <td>009958745</td>
                                            <td>Lily</td>
                                            <td>004658745</td>
                                            <td>10 Oct 2023</td>
                                            <td>Created by school admin</td>
                                            <td>
                                                <div className="educare-admission-list-action-btn">
                                                    <div className="educare-list-button-field-styles">
                                                        <Tooltip title="Edit" placement="top" arrow>
                                                            <Link href="#" className="bg-supportingB/80 inline-block">
                                                                <i className="icon-editing"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="educare-list-button-field-styles">
                                                        <Tooltip title="View" placement="top" arrow>
                                                            <Link href="#" className="bg-supportingC/80 inline-block">
                                                                <i className="icon-eye"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="educare-list-button-field-styles">
                                                        <Tooltip title="Delete" placement="top" arrow>
                                                            <Link href="#" className="bg-danger/80 inline-block">
                                                                <i className="icon-TrashSimple"></i>
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
                                                <label className="badge info">
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
                                                        <Tooltip title="Edit" placement="top" arrow>
                                                            <Link href="#" className="bg-supportingB/80 inline-block">
                                                                <i className="icon-editing"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="educare-list-button-field-styles">
                                                        <Tooltip title="View" placement="top" arrow>
                                                            <Link href="#" className="bg-supportingC/80 inline-block">
                                                                <i className="icon-eye"></i>
                                                            </Link>
                                                        </Tooltip>
                                                    </div>
                                                    <div className="educare-list-button-field-styles">
                                                        <Tooltip title="Delete" placement="top" arrow>
                                                            <Link href="#" className="bg-danger/80 inline-block">
                                                                <i className="icon-TrashSimple"></i>
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
                                    </tbody>
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <FollowUpPopupForm
                modalFollowUpOpen={modalFollowUpOpen}
                setModalFollowUpOpen={setModalFollowUpOpen}
            />
        </>
    );
};

export default AdmissionList;