import Checkbox from '@/Components/Checkbox';
import InputLabel from '@/Components/InputLabel';
import LoaderTwo from "@/Components/LoaderTwo";
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const NullifyFees = ({ studentFeeStructure = [], loading = false, setNullifyFeeIds, feeNullifiedStatus = false, student = {} }) => {

    const [selectedFeeIds, setSelectedFeeIds] = useState([]);
    const [feeAllChecked, setFeeAllChecked] = useState(false);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        fee_ids: selectedFeeIds,
    });

    useEffect(() => {
        if (feeNullifiedStatus){
            setSelectedFeeIds([])
        }
    }, [feeNullifiedStatus])

    // handle form data start
    useEffect(() => {
        if (selectedFeeIds?.length <= 0) {
            setFeeAllChecked(false);
        }
        else {
            setFeeAllChecked(Object.values(studentFeeStructure)?.filter(item => item?.payment_status != 'Paid')?.length === selectedFeeIds?.length);
        }

        setData((prevData) => ({
            ...prevData,
            fee_ids: selectedFeeIds
        }));

        setNullifyFeeIds(selectedFeeIds);
    },[selectedFeeIds]);
    // handle form data end


    // handle checkbox select
    const setSelectedFeeId = (id) => {
        if ([...selectedFeeIds]?.includes(id)) {
            setSelectedFeeIds([...selectedFeeIds].filter((item) => item !== id));
        }
        else {
            setSelectedFeeIds([
                ...selectedFeeIds,
                id,
            ]);
        }
    }

    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all_installment") {
            if (value === true) {
                setSelectedFeeIds(Object.values(studentFeeStructure)?.filter(item => item?.payment_status != 'Paid')?.map((item) => item?.fee?.id))
            }
            else {
                setSelectedFeeIds([])
            }

            setFeeAllChecked(value);
        }
    };
    // handle checkbox select end


    const handleNullifyFeeData = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <form onSubmit={handleNullifyFeeData}>
                <div className="educare-common-card">
                    <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                        <div className="educare-common-card-title flex flex-wrap gap-3">
                            <h5>
                                <i className="icon-BookBookmark"></i>
                                Fee Installments for {student?.id != null &&
                                `${student?.first_name ?? ""} ${student?.middle_name ?? ""} ${student?.last_name ?? ""}`
                                }
                            </h5>
                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                <div className="educare-create-school-settings-list-check width-full">
                                    <Checkbox
                                        id="select_all_installment"
                                        name="select_all_installment"
                                        checked={
                                            feeAllChecked
                                        }
                                        onChange={(e) =>
                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                        }
                                    />
                                </div>
                                <div className="educare-create-school-settings-list-title width-full">
                                    <InputLabel
                                        htmlFor="select_all_installment"
                                        value="Select All Installment"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                            <div className={`educare-update-fee-structure-area ${loading ? 'flex justify-center' : ''}`}>
                                    {loading ?
                                        <LoaderTwo></LoaderTwo>
                                    :
                                        <div className="grid grid-cols-12 gap-5">
                                            {Object.keys(studentFeeStructure)?.length > 0 &&
                                                Object.values(studentFeeStructure)?.map((item, index) => (
                                                    <div className="lg:col-span-4 md:col-span-6 col-span-12" key={index}>
                                                        <div className="educare-update-fee-structure">
                                                            <div className="educare-update-fee-structure-heading">
                                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                                    {item?.payment_status != 'Paid' &&
                                                                        <div className="educare-create-school-settings-list-check width-full">
                                                                            <Checkbox
                                                                                id={`fee_id_${item?.fee?.id}`}
                                                                                name="fee_id"
                                                                                checked={
                                                                                    selectedFeeIds?.includes(item?.fee?.id)
                                                                                }
                                                                                onChange={(e) =>
                                                                                    setSelectedFeeId(item?.fee?.id)
                                                                                }
                                                                            />
                                                                        </div>
                                                                    }
                                                                    <div className="educare-create-school-settings-list-title width-full">
                                                                        <InputLabel
                                                                            htmlFor={`fee_id_${item?.fee?.id}`}
                                                                            value={item?.fee?.title}
                                                                        />
                                                                        {item?.payment_status == 'Paid' &&
                                                                            <span className='badge success ml-1 inline-block'>Paid</span>
                                                                        }
                                                                        {item?.payment_status == 'Partial' &&
                                                                                <span className='badge danger ml-1 inline-block'>Due</span>
                                                                        }

                                                                        {item?.payment_status == 'Due' &&
                                                                            <span className='badge warning ml-1 inline-block'>Unpaid</span>
                                                                        }
                                                                    </div>
                                                                </div>
                                                                {item?.payment_status == 'Partial' &&
                                                                    <div className="width-full">
                                                                        <h5 className='text-danger ml-1 inline-block'>
                                                                            {item?.total_due}
                                                                            <i className='icon-CurrencyInr font-semibold'></i>
                                                                        </h5>
                                                                    </div>
                                                                }
                                                            </div>
                                                            <div className='border border-warning/10 border-t-0'>
                                                                <ul>
                                                                    {item?.fee_type_amounts?.length > 0 &&
                                                                        item?.fee_type_amounts?.map((feeAmount, innerIndex) => (
                                                                            <li key={innerIndex}>
                                                                                <span>{feeAmount?.fee_type_title}</span>
                                                                                {feeAmount?.discount_amount > 0 ?
                                                                                    <span>{`${feeAmount?.amount} - ${feeAmount?.discount_amount} = ${feeAmount?.payable_amount}`}</span>
                                                                                :
                                                                                    <span>{feeAmount?.amount}</span>
                                                                                }
                                                                            </li>
                                                                        ))
                                                                    }
                                                                </ul>
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
                                            }
                                        </div>
                                    }
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default NullifyFees;
