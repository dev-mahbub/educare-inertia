import InputError from '@/Components/InputError';
import Loader from '@/Components/Loader';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { concatName } from '@/Hooks/GlobalFunction';
import { useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import moment from 'moment/moment';
import React, { useState } from 'react';
import { useEffect } from 'react';

const PossibleSiblingTable = ({
    possibleSibling = [],
    parentRowData,
    loading,
    setLoading,
}) => {

    const [possibleSiblingData, setPossibleSiblingData] = useState(possibleSibling);
    const [enqInnerActive, setEnqInnerActive] = useState('');
    let sIndx = 0;

    useEffect(() => {
        setPossibleSiblingData(possibleSibling);
        setLoading(false);
    }, [possibleSibling])


    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <form>
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th>Parent name</th>
                                            <th>Phone</th>
                                            <th>
                                                <div className='flex justify-between items-center'>
                                                    <h5>Email</h5>
                                                    <PrimaryButton
                                                        // disabled={processing}
                                                        className="educare-primary-btn-md-fill"
                                                    >
                                                        Save Change
                                                    </PrimaryButton>
                                                </div>
                                            </th>
                                        </tr>
                                    </thead>
                                    {loading ? (
                                    <Loader></Loader>
                                ) : (
                                    <tbody>
                                        {possibleSiblingData?.length > 0 ? (
                                            possibleSiblingData?.map((item, index) => (
                                                <React.Fragment>
                                                    <tr key={index}>
                                                        <td>
                                                            {++sIndx}
                                                            <button
                                                                type="button"
                                                                className="educare-enq-arrow"
                                                                onClick={() => setEnqInnerActive(enqInnerActive === index ? '' : index)}
                                                            >
                                                                <i className={enqInnerActive === index ? "icon-arrow-up" : "icon-down-arrow"}></i>
                                                            </button>
                                                        </td>
                                                        <td>{parentRowData[index] && parentRowData[index]['parent_name']}</td>
                                                        <td>{parentRowData[index] && parentRowData[index]['phone']}</td>
                                                        <td>{parentRowData[index] && parentRowData[index]['email']}</td>
                                                    </tr>
                                                    <tr
                                                        className={enqInnerActive === index ? '' : 'hidden'}
                                                    >
                                                        <td colSpan="12" className="educare-admission-list-enq-inner-wrap">
                                                            <table className="educare-admission-list-enq-inner">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Student Name</th>
                                                                        <th>Father's Name</th>
                                                                        <th>Admission Number</th>
                                                                        <th>Class Name</th>
                                                                        <th>Roll No</th>
                                                                        <th>Action</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {item?.length > 0 ? (
                                                                        item?.map((item2, subIndex) => (
                                                                            <>
                                                                                <tr key={subIndex}>
                                                                                    <td>{concatName(item2?.student_first_name, item2?.student_middle_name, item2?.student_last_name)}</td>
                                                                                    <td>{concatName(item2?.father_first_name, item2?.father_middle_name, item2?.father_last_name)}</td>
                                                                                    <td>{item2?.admission_no}</td>
                                                                                    <td>{item2?.classroom_title}</td>
                                                                                    <td>{item2?.classroom_roll_no}</td>
                                                                                    <td>need to update</td>
                                                                                </tr>
                                                                            </>
                                                                        ))
                                                                    ) : (
                                                                        <tr>
                                                                            <td colSpan="10">No product items found</td>
                                                                        </tr>
                                                                    )}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                </React.Fragment>
                                            ))
                                        ) : (
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="12">
                                                    Data not found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                    )}
                                </table>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PossibleSiblingTable;
