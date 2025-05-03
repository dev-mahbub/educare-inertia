import React, { useState } from "react";
import SiblingPopUp from "./SiblingPopUp";
const SiblingTable = () => {
    const [listPopup, setListPopup] = useState(false);
    const handleListPopupClick = () => {
        setListPopup(!listPopup);
    };
    const [enqInnerActive, setEnqInnerActive] = useState([false, false, false]);

    const handleEnqToggle = (index) => {
        setEnqInnerActive((prevState) => {
            const newState = prevState.map((value, i) =>
                i === index ? !value : false
            );
            return newState;
        });
    };

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Parent name </th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
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

                                        <td>Punit Verma</td>
                                        <td>12504152</td>
                                        <td>ts@gmail.com</td>
                                    </tr>

                                    <tr
                                        className={`${
                                            enqInnerActive[0] ? "" : "hidden"
                                        }`}
                                    >
                                        <td
                                            colSpan="12"
                                            className="educare-admission-list-enq-inner-wrap"
                                        >
                                            <table className="educare-admission-list-enq-inner">
                                                <thead>
                                                    <tr>
                                                        <th>Student Name</th>
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
                                                        <td> Puja Sah</td>
                                                        <td>DM0002</td>
                                                        <td>NURSERY A</td>
                                                        <td>4</td>
                                                        <td>
                                                            <button
                                                                onClick={
                                                                    handleListPopupClick
                                                                }
                                                                className="educare-success-btn-lg-fill"
                                                            >
                                                                Remove Siblings
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>

                                    <tr>
                                        <td>
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
                                        <td>Shyam Sah</td>
                                        <td>0214257485</td>
                                        <td>ist@gmail.com</td>
                                    </tr>
                                    <tr
                                        className={`transition duration-300 ${
                                            enqInnerActive[1] ? "" : "hidden"
                                        }`}
                                    >
                                        <td
                                            colSpan="12"
                                            className="educare-admission-list-enq-inner-wrap"
                                        >
                                            <table className="educare-admission-list-enq-inner">
                                                <thead>
                                                    <tr>
                                                        <th>Student Name</th>
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
                                                        <td> Puja Sah</td>
                                                        <td>DM0002</td>
                                                        <td>NURSERY A</td>
                                                        <td>4</td>
                                                        <td>
                                                            <button
                                                                onClick={
                                                                    handleListPopupClick
                                                                }
                                                                className="educare-success-btn-lg-fill"
                                                            >
                                                                Remove Siblings
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
                    </div>
                </div>
            </div>

            <SiblingPopUp listPopup={listPopup} setListPopup={setListPopup} />
        </>
    );
};

export default SiblingTable;
