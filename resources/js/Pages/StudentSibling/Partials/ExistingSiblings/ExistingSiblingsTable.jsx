import { useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import SiblingsPopup from "./ExistingSiblingsPopup/SiblingsPopup";

const ExistingSiblingsTable = () => {
    const [listPopup, setListPopup] = useState(false);

    // open popup

    const handleListPopupClick = () => {
        setListPopup(!listPopup);
    };
    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState([false, false, false]);
    const handleEnqToggle = (index) => {
        setEnqInnerActive((prevState) => {
            const newState = prevState.map((value, i) =>
                i === index ? !value : false
            );
            return newState;
        });
    };
    //table inner toggle collapse end

    //form validation start
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        admission_check_id_parent: false,
        admission_check_id_2: false,
        admission_check_id_3: false,
    });

    const AdmissionListData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
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

        if (name === "admission_check_id_parent") {
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
                                            <th>Sr.No.</th>
                                            <th>Parent name</th>
                                            <th>Phone</th>
                                            <th>Email</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                1{" "}
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
                                            <td>Aaditi pathak</td>
                                            <td>01254284574</td>
                                            <td>demo@yahoo.com</td>
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
                                                                Student Name
                                                            </th>
                                                            <th>
                                                                Admission Number
                                                            </th>
                                                            <th>Class Name</th>
                                                            <th>Role No</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>
                                                                Aditi Pandey
                                                            </td>
                                                            <td>014</td>
                                                            <td>XI A</td>
                                                            <td>322935</td>
                                                            <td>
                                                                <button
                                                                    onClick={
                                                                        handleListPopupClick
                                                                    }
                                                                    type="button"
                                                                    className="educare-danger-btn-md-fill"
                                                                >
                                                                    Remove
                                                                    Sibling
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                2{" "}
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
                                            <td>Peter</td>
                                            <td>01254284574</td>
                                            <td>demo@yahoo.com</td>
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
                                                                Student Name
                                                            </th>
                                                            <th>
                                                                Admission Number
                                                            </th>
                                                            <th>Class Name</th>
                                                            <th>Role No</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>Test User</td>
                                                            <td>2501</td>
                                                            <td>XI A</td>
                                                            <td>215240</td>
                                                            <td>
                                                                <button
                                                                    onClick={
                                                                        handleListPopupClick
                                                                    }
                                                                    type="button"
                                                                    className="educare-danger-btn-md-fill"
                                                                >
                                                                    Remove
                                                                    Sibling
                                                                </button>
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

            <SiblingsPopup listPopup={listPopup} setListPopup={setListPopup} />
        </>
    );
};

export default ExistingSiblingsTable;
