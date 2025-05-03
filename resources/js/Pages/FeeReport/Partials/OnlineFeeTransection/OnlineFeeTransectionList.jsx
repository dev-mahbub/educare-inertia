import Checkbox from '@/Components/Checkbox';
import SuccessButton from '@/Components/SuccessButton';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import React, { useState } from 'react';
import BulkTransectionStatusPopup from './BulkTransectionStatusPopup/BulkTransectionStatusPopup';

const OnlineFeeTransectionList = () => {
    const [checkedData, setCheckedData] = useState([])
    console.log(checkedData)

    //handle for popup start
    const [bulkTransectionPopup, setBulkTransectionPopup] = useState(false);

    const handleFormNumberModalClick = () => {
        setBulkTransectionPopup(!bulkTransectionPopup);
    };
    //handle for popup end

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all_transection_id: "",
        panding_id: false,
        failed_id: false,
    });

    const transectionCheck = data.select_all_transection_id || data.panding_id || data.failed_id;

    //handle Checkbox start
    const handleCheckboxSelect = (name, value) => {
        let newFormData;

        // parent will check, all child will check
        if (name === "select_all_transection_id") {
            newFormData = {
                ...data,
                [name]: value,
                panding_id: value,
                failed_id: value,
            };
        } else {
            newFormData = {
                ...data,
                [name]: value,
            };

            // any child uncheck, parent will uncheck
            if (value === false) {
                newFormData.select_all_transection_id = false;
            }
            // after all child checked, then parent will check
            else if (newFormData.panding_id === true &&
                newFormData.failed_id === true
            ) {
                newFormData.select_all_transection_id = true;
            }
        }

        setData(newFormData);

        // Update checkedData state based on selected checkboxes
        const updatedCheckedData = Object.keys(newFormData)
            .filter(key => key !== 'select_all_transection_id' && newFormData[key])
            .map(key => key);

        setCheckedData(updatedCheckedData);
    };
    //handle Checkbox end

    return (
        <>
            <div className='flex flex-wrap justify-between items-end gap-2 mt-5'>
                <div>
                    <span className='badge info'>
                        <i className='icon-info mr-1'></i>
                        Please process 200 records at a time and do this process in evening time.
                    </span>
                </div>
                <div className='flex gap-2'>
                    <div>
                        {
                            transectionCheck &&
                            <div>
                                <SuccessButton
                                    // disabled={processing}
                                    className="educare-secondary-btn-md-fill"
                                    onClick={handleFormNumberModalClick}
                                >
                                    Bulk Status
                                </SuccessButton>
                            </div>
                        }
                    </div>
                    <div >
                        <Tooltip
                            title="Excel Sheet"
                            placement="top"
                            arrow
                            as="button"
                        >
                            <Link
                                href="#"
                                className="educare-success-btn-md-fill"
                            >
                                <i className="icon-FileX"></i>
                            </Link>
                        </Tooltip>
                    </div>
                </div>
            </div>
            <div className="educare-admission-list-area mt-2">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="select_all_transection_id"
                                                    name="select_all_transection_id"
                                                    checked={
                                                        data.select_all_transection_id
                                                    }
                                                    onChange={(e) =>
                                                        handleCheckboxSelect(e.target.name, e.target.checked)
                                                    }
                                                />
                                            </div>
                                        </th>
                                        <th>Date</th>
                                        <th>Transaction Id</th>
                                        <th>Installment</th>
                                        <th>Amount</th>
                                        <th>Student Detail</th>
                                        <th>Pay. Mode</th>
                                        <th>Resp. Code</th>
                                        <th>Resp. Msg</th>
                                        <th>Gateway Status</th>
                                        <th>ERP Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>

                                        </td>
                                        <td>2023-12-11</td>
                                        <td>312010689445</td>
                                        <td>January Fee,</td>
                                        <td>7500</td>
                                        <td>Name: Adnan</td>
                                        <td>null</td>
                                        <td>0</td>
                                        <td>Aborted</td>
                                        <td>
                                            <span className='badge success'>Success</span>
                                        </td>
                                        <td>
                                            <span className='badge success'>Fee Updated</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="panding_id"
                                                    name="panding_id"
                                                    checked={
                                                        data.panding_id
                                                    }
                                                    onChange={(e) =>
                                                        handleCheckboxSelect(e.target.name, e.target.checked)
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>2023-12-11</td>
                                        <td>312010689445</td>
                                        <td>January Fee,</td>
                                        <td>7500</td>
                                        <td>Name: Adnan</td>
                                        <td>null</td>
                                        <td>0</td>
                                        <td>Aborted</td>
                                        <td>
                                            <span className='badge warning'>Panding</span>
                                        </td>
                                        <td>
                                            <span className='badge info'>Get Status</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="failed_id"
                                                    name="failed_id"
                                                    checked={
                                                        data.failed_id
                                                    }
                                                    onChange={(e) =>
                                                        handleCheckboxSelect(e.target.name, e.target.checked)
                                                    }
                                                />
                                            </div>
                                        </td>
                                        <td>2023-12-11</td>
                                        <td>312010689445</td>
                                        <td>January Fee,</td>
                                        <td>7500</td>
                                        <td>Name: Adnan</td>
                                        <td>null</td>
                                        <td>0</td>
                                        <td>Aborted</td>
                                        <td>
                                            <span className='badge danger'>Failed</span>
                                        </td>
                                        <td>
                                            <span className='badge info'>Get Status</span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <BulkTransectionStatusPopup
                checkedData={checkedData}
                bulkTransectionPopup={bulkTransectionPopup}
                setBulkTransectionPopup={setBulkTransectionPopup}
            />
        </>
    );
};

export default OnlineFeeTransectionList;