import PrimaryButton from '@/Components/PrimaryButton';
import { useEffect, useState } from 'react';
import ApprovePopup from './popup/ApprovePopup';
import CancelPopup from './popup/CancelPopup';

export default function IncrementHistoryTable({
    staffSalaryIncrementData,
    data
}) {

    const [selectedStaffSalaryIncrement, setSelectedStaffSalaryIncrement] = useState({});

    const [approvePopup, setApprovePopup] = useState(false);
    const [cancelPopup, setCancelPopup] = useState(false);

    const handleApprovePopupClick = (id) => {
        setApprovePopup(!approvePopup);

        setSelectedStaffSalaryIncrement(staffSalaryIncrementData?.find(item => item?.id == id) ?? {});
    };

    const handleCancelPopupClick = (id) => {
        setCancelPopup(!cancelPopup);

        setSelectedStaffSalaryIncrement(staffSalaryIncrementData?.find(item => item?.id == id) ?? {});
    };

    //table inner toggle collapse start
    const [enqInnerActive, setEnqInnerActive] = useState(Array(staffSalaryIncrementData?.length).fill(false));
    const handleEnqToggle = (index) => {
        setEnqInnerActive(prevState => {
            const newState = prevState.map((value, i) => i === index ? !value : false);
            return newState;
        });
    };
    //table inner toggle collapse end

    useEffect(() => {
        setEnqInnerActive(Array(staffSalaryIncrementData?.length).fill(false));
    }, [staffSalaryIncrementData]);

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Increment History
                    </h5>
                </div>
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>From Basic</th>
                                <th>Hike</th>
                                <th>To Basic</th>
                                <th>Status</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffSalaryIncrementData?.length > 0 ?
                                staffSalaryIncrementData.map((item, index) => (
                                    <>
                                        <tr>
                                            <td>{item?.increment_date}</td>
                                            <td>{item?.previous_basic_amount ?? 0}</td>
                                            <td>{item?.increment_amount ?? 0}</td>
                                            <td>{item?.current_basic_amount ?? 0}</td>
                                            <td>
                                                <span
                                                    className={`badge ${item?.increment_status == 'Approved' ? 'success' : (item?.increment_status == 'Canceled' ? 'danger' :'warning')}`}
                                                >
                                                    {item?.increment_status}
                                                </span>
                                                {item?.increment_status == 'Pending' &&
                                                    <div className='mt-[2px] flex gap-2'>
                                                        <PrimaryButton
                                                            // disabled={processing}
                                                            type="button"
                                                            onClick={() => {
                                                                handleApprovePopupClick(item?.id)
                                                            }}
                                                            className="educare-primary-btn-md-fill"
                                                        >
                                                            Approve
                                                        </PrimaryButton>
                                                        <PrimaryButton
                                                            // disabled={processing}
                                                            type="button"
                                                            className="educare-gray-btn-md-stroke"
                                                            onClick={() => {
                                                                handleCancelPopupClick(item?.id)
                                                            }}
                                                        >
                                                            Cancel
                                                        </PrimaryButton>
                                                    </div>
                                                }
                                            </td>
                                            <td>
                                                <strong className='text-[15px] pr-2.5 block max-w-[220px]'>
                                                    <button
                                                        type="button"
                                                        className="educare-enq-arrow"
                                                        onClick={() => handleEnqToggle(index)}
                                                    >
                                                        <i
                                                            className={`${enqInnerActive[index]
                                                                ? "icon-arrow-up"
                                                                : "icon-down-arrow"}`}
                                                        ></i>
                                                    </button>
                                                </strong>{" "}
                                            </td>
                                        </tr>
                                        <tr
                                            className={`${enqInnerActive[index]
                                                ? ""
                                                : "hidden"
                                                }`}
                                        >
                                            <td
                                                colSpan="12"
                                                className="educare-admission-list-enq-inner-wrap"
                                            >
                                                <table className="educare-admission-list-enq-inner">
                                                    <tbody>
                                                        {item?.earnings?.length > 0 &&
                                                            item.earnings.map((earning, innerIndex) => (
                                                                <tr key={innerIndex}>
                                                                    <td>
                                                                        <span className='badge success'>{earning?.earning_type_title}</span>
                                                                    </td>
                                                                    <td>{earning?.amount ?? 0}</td>
                                                                    <td>{earning?.total_amount ?? 0}</td>
                                                                    <td></td>
                                                                    <td></td>
                                                                    <td></td>
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
                                    <td className="text-center text-red-500" colSpan="6">
                                        Data not found
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>

            <ApprovePopup
                approvePopup={approvePopup}
                setApprovePopup={setApprovePopup}
                selectedStaffSalaryIncrement={selectedStaffSalaryIncrement}
                setSelectedStaffSalaryIncrement={setSelectedStaffSalaryIncrement}
                formData={data}
            />

            <CancelPopup
                cancelPopup={cancelPopup}
                setCancelPopup={setCancelPopup}
                selectedStaffSalaryIncrement={selectedStaffSalaryIncrement}
                setSelectedStaffSalaryIncrement={setSelectedStaffSalaryIncrement}
                formData={data}
            />
        </>
    );
}
