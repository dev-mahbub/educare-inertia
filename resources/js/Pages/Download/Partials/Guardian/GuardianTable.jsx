import { useEffect, useState } from "react";
import GuardianPopUp from "./GuardianPopUp";

const GuardianTable = ({
    guardians
}) => {
    const [selectedGuardian, setSelectedGuardian] = useState({});

    const [singlePopup, setSinglePopup] = useState(false);

    const handleListPopupClick = (guardian) => {
        setSelectedGuardian(guardian);

        setSinglePopup(!singlePopup);
    };
    const [enqInnerActive, setEnqInnerActive] = useState(new Array(Object.keys(guardians)?.length)?.fill(false));

    const handleEnqToggle = (index) => {
        setEnqInnerActive((prevState) => {
            const newState = prevState.map((value, i) =>
                i === index ? !value : false
            );
            return newState;
        });
    };

    useEffect(() => {
        setEnqInnerActive(new Array(Object.keys(guardians)?.length)?.fill(false));
    }, [guardians]);

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
                                        <th>Guardian name</th>
                                        <th>Phone</th>
                                        <th>Email</th>
                                        <th> GuardianId</th>
                                        <th> Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(guardians)?.length > 0 ?
                                        Object.values(guardians)?.map((item, parentIndex) => (
                                            <>
                                                <tr>
                                                    <td>
                                                        <button
                                                            type="button"
                                                            className="educare-enq-arrow"
                                                            onClick={() =>
                                                                handleEnqToggle(parentIndex)
                                                            }
                                                        >
                                                            <i
                                                                className={`${enqInnerActive[parentIndex]
                                                                        ? "icon-arrow-up"
                                                                        : "icon-down-arrow"
                                                                    }`}
                                                            ></i>
                                                        </button>
                                                    </td>

                                                    <td>{item?.guardian_name}</td>
                                                    <td>{item?.guardian_phone}</td>
                                                    <td>{item?.guardian_email}</td>
                                                    <td>{item?.guardianid}</td>
                                                    <td>
                                                        <button
                                                            onClick={() => {
                                                                handleListPopupClick(item)
                                                            }}
                                                            className="educare-success-btn-lg-fill"
                                                        >
                                                            Update Guardianld
                                                        </button>
                                                    </td>
                                                </tr>

                                                <tr
                                                    className={`${enqInnerActive[parentIndex] ? "" : "hidden"
                                                        }`}
                                                >
                                                    <td
                                                        colSpan="12"
                                                        className="educare-admission-list-enq-inner-wrap"
                                                    >
                                                        <table className="educare-admission-list-enq-inner">
                                                            <thead>
                                                                <tr>
                                                                    <td>Student Name</td>
                                                                    <td>Class Name</td>
                                                                    <td>Roll No</td>
                                                                    <td>
                                                                        Admission Number
                                                                    </td>
                                                                    <td>Father Name</td>
                                                                    <td>Father Email</td>
                                                                    <td>Father Mobile</td>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Object.keys(item?.student_data)?.length > 0 &&
                                                                    Object.values(item?.student_data)?.map((student, index) => (
                                                                        <tr key={index}>
                                                                            <td>{student?.name}</td>
                                                                            <td>{student?.classroom_title}</td>
                                                                            <td>{student?.roll_no}</td>
                                                                            <td>{student?.admission_no}</td>
                                                                            <td>{student?.father_name}</td>
                                                                            <td>{student?.father_email}</td>
                                                                            <td>{student?.father_phone}</td>
                                                                        </tr>
                                                                    ))
                                                                }
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    :
                                        <tr>
                                            <td className = "text-center text-red-500" colSpan = "7">
                                                Data not found
                                            </td>
                                        </tr>
                                    }

                                    {/* <tr>
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
                                        <td>ts@gmail.com</td>
                                        <td>
                                            <button
                                                onClick={handleListPopupClick}
                                                className="educare-success-btn-lg-fill"
                                            >
                                                Update Guardianld
                                            </button>
                                        </td>
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
                                                        <td>Student Name</td>
                                                        <td>Class Name</td>
                                                        <td>Roll No</td>
                                                        <td>
                                                            Admission Number
                                                        </td>
                                                        <td>Father Name</td>
                                                        <td>Father Email</td>
                                                        <td>Father Mobile</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Pallavi Roy</td>
                                                        <td>II A</td>
                                                        <td>4</td>
                                                        <td>DM0022 </td>
                                                        <td>Hemant Roy</td>
                                                        <td>test@gmail.com</td>
                                                        <td>21542412</td>
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
                                        <td>Punit Verma</td>
                                        <td>12504152</td>
                                        <td>ts@gmail.com</td>
                                        <td>ts@gmail.com</td>
                                        <td>
                                            <button
                                                onClick={handleListPopupClick}
                                                className="educare-success-btn-lg-fill"
                                            >
                                                Update Guardianld
                                            </button>
                                        </td>
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
                                                        <td>Student Name</td>
                                                        <td>Class Name</td>
                                                        <td>Roll No</td>
                                                        <td>
                                                            Admission Number
                                                        </td>
                                                        <td>Father Name</td>
                                                        <td>Father Email</td>
                                                        <td>Father Mobile</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>Pallavi Roy</td>
                                                        <td>II A</td>
                                                        <td>4</td>
                                                        <td>DM0022 </td>
                                                        <td>Hemant Roy</td>
                                                        <td>test@gmail.com</td>
                                                        <td>21542412</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <GuardianPopUp
                singlePopup={singlePopup}
                setSinglePopup={setSinglePopup}
                selectedGuardian={selectedGuardian}
                setSelectedGuardian={setSelectedGuardian}
            />
        </>
    );
};

export default GuardianTable;
