import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import LoaderTwo from "../../../../../Components/LoaderTwo";
import UpdateFeeTypePopup from './Popup/UpdateFeeTypePopup';

const UpdateFeeStructure = ({
    studentFeeStructure = [],
    selectedStudent = {},
    fees = [],
    feeTypes = [],
    loading = true,
    setLoading,
}) => {
    const [updateFeeTypePopup, setUpdateFeeTypePopup] = useState(false);

    const [studentFeeStructureData, setStudentFeeStructureData] = useState([]);
    const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);
    const [selectedFeeData, setSelectedFeeData] = useState([]);

    useEffect(() => {
        setStudentFeeStructureData(Object.values(fees)?.map(fee => ({
                fee: studentFeeStructure[fee?.id]?.fee ?? { id: fee?.id, title: fee?.title, is_admission_installment: fee?.is_admission_install },
                fee_type_amounts: studentFeeStructure[fee?.id]?.fee_type_amounts ?? [],
                total_payable: studentFeeStructure[fee?.id]?.total_payable ?? 0,
                total_amount: studentFeeStructure[fee?.id]?.total_amount ?? 0,
                total_paid: studentFeeStructure[fee?.id]?.total_paid ?? 0,
                total_due: studentFeeStructure[fee?.id]?.total_due ?? 0,
                payment_status: studentFeeStructure[fee?.id]?.payment_status ?? 'Due',
            }))
        );

        setLoading(false);
    }, [studentFeeStructure, fees])


    const handleUpdateFeeTypePopupClick = () => {
        setUpdateFeeTypePopup(!updateFeeTypePopup);
    };

    return (
        <>
            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-BookBookmark"></i>
                            Fee Installments {selectedStudent?.id != null ? (`for ${selectedStudent?.first_name ?? ""} ${selectedStudent?.middle_name ?? ""} ${selectedStudent?.last_name ?? ""}`) : ""}
                        </h5>
                    </div>
                    <div className={`educare-common-card-wrap-border border-t border-grayLight/20 pt-5 ${loading ? 'flex justify-center' : ''}`}>
                        {loading ?
                            <LoaderTwo></LoaderTwo>
                        :
                            <div className="educare-update-fee-structure-area">
                                {selectedStudent?.id != null &&
                                    <div className="grid grid-cols-12 gap-5">
                                        {Object.keys(studentFeeStructureData)?.length > 0 ?
                                            Object.values(studentFeeStructureData)?.map((item, index) => (
                                                <div className="lg:col-span-4 md:col-span-6 col-span-12" key={index}>
                                                    <div className="educare-update-fee-structure">
                                                        <div className="educare-update-fee-structure-heading">
                                                            <h5 className='text-[15px] font-semibold text-headingLight'>{item?.fee?.title}
                                                                {item?.payment_status === 'Paid' &&
                                                                    <span className='badge success ml-1'>Paid</span>
                                                                }

                                                                {item?.payment_status === 'Partial' &&
                                                                    <span className='badge danger ml-1'>Due</span>
                                                                }

                                                                {item?.payment_status === 'Due' &&
                                                                    <span className='badge warning ml-1'>Unpaid</span>
                                                                }
                                                            </h5>
                                                            {item?.payment_status == 'Partial' &&
                                                                <div className="width-full">
                                                                    <h5 className='text-danger ml-1 inline-block'>
                                                                        {item?.total_due}
                                                                        <i className='icon-CurrencyInr font-semibold'></i>
                                                                    </h5>
                                                                </div>
                                                            }
                                                            {(item?.payment_status === 'Due' && selectedStudent?.status == 'Active') &&
                                                                <div className='educare-list-action-btn'>
                                                                    <div>
                                                                        <Tooltip
                                                                            title="Edit"
                                                                            placement="top"
                                                                            arrow
                                                                        >
                                                                            <button type='button'
                                                                                className="educare-warning-btn-sm-fill"
                                                                                onClick={() => {
                                                                                    handleUpdateFeeTypePopupClick();
                                                                                    setSelectedFeeTypes(item?.fee_type_amounts);
                                                                                    setSelectedFeeData(item?.fee);
                                                                                }}
                                                                            >
                                                                                <i className="icon-editing"></i>
                                                                            </button>
                                                                        </Tooltip>
                                                                    </div>
                                                                </div>
                                                            }
                                                        </div>
                                                        <div className='border border-warning/10 border-t-0'>
                                                            {item?.fee_type_amounts?.length > 0 &&
                                                                <ul>
                                                                    {item?.fee_type_amounts?.map((feeTypeAmount, index) => (
                                                                        <li key={index}>
                                                                            <span>
                                                                                {feeTypeAmount?.is_fee_special ?
                                                                                    <span className="!text-blue-500">Special </span>
                                                                                : ""}
                                                                                {feeTypeAmount?.fee_type_title}
                                                                            </span>
                                                                            {feeTypeAmount?.discount_amount > 0 ?
                                                                                <span>{`${feeTypeAmount?.amount} - ${feeTypeAmount?.discount_amount} = ${feeTypeAmount?.payable_amount}`}</span>
                                                                            :
                                                                                <span>{feeTypeAmount?.amount}</span>
                                                                            }
                                                                        </li>
                                                                    ))}
                                                                </ul>
                                                            }
                                                            <ul className='bg-supportingC/5'>
                                                                <li>
                                                                    <h5>Total : </h5>
                                                                    <h5>{item?.total_payable}<i className='icon-CurrencyInr font-semibold'></i></h5>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        :
                                            <div className="col-span-12 text-center">
                                                <span>Data not found</span>
                                            </div>
                                        }
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <UpdateFeeTypePopup
                updateFeeTypePopup={updateFeeTypePopup}
                setUpdateFeeTypePopup={setUpdateFeeTypePopup}
                selectedFeeTypes={selectedFeeTypes}
                feeTypes={feeTypes}
                selectedFeeData={selectedFeeData}
                selectedStudent={selectedStudent}
            />
        </>
    );
};

export default UpdateFeeStructure;
