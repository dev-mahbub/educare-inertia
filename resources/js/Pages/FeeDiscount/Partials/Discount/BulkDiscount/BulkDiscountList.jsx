import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BulkDiscountFeeType from "./BulkDiscountFeeType";
import BulkDiscountInstallment from "./BulkDiscountInstallment";


export default function BulkDiscountList({ students = [], feeTypes = [], selectedDiscount = {}, fees = [], submitEvent = {}, sendDiscountAddStatusToParent } ) {

    const [selectedFeeIds, setSelectedFeeIds] = useState([]);
    const [selectedStudentIds, setSelectedStudentIds] = useState([]);
    const [selectAllStudentChecked, setSelectAllStudentChecked] = useState(false);
    const [feeTypeAmountArrayData, setFeeTypeAmountArrayData] = useState([]);
    const [selectedDiscountData, setSelectedDiscountData] = useState(selectedDiscount);
    const [discountType, setDiscountType] = useState(false);


    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        select_all_student_id: "",
        discount_id: null,
        is_discount_percentage: discountType,
        fee_ids: selectedFeeIds,
        student_ids: selectedStudentIds,
        fee_type_amount_array: feeTypeAmountArrayData,
    });

    useEffect(() => {
        setSelectedDiscountData(selectedDiscount);
    }, [selectedDiscount]);

    useEffect(() => {
        setDiscountType(selectedDiscount?.is_discount_percentage ?? false);
    }, [selectedDiscount]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            discount_id: selectedDiscount?.id ?? null,
            is_discount_percentage: discountType,
            fee_ids: selectedFeeIds,
            student_ids: selectedStudentIds,
            fee_type_amount_array: feeTypeAmountArrayData,
        }));
    }, [selectedDiscount, discountType, selectedFeeIds, selectedStudentIds, feeTypeAmountArrayData]);

    useEffect(() => {
        if (selectedStudentIds?.length <= 0) {
            setSelectAllStudentChecked(false)
        }
        else {
            setSelectAllStudentChecked(selectedStudentIds?.length === students?.length)
        }
    }, [students, selectedStudentIds]);


    useEffect(() => {
        if (Object.keys(submitEvent).length > 0) {
            post(route('fee_discount.bulk.save'), {
                onSuccess: ({ props }) => {
                    sendDiscountAddStatusToParent(true);
                    handleFormReset();
                },
                onError: (errors) => {
                    let count = 0;

                    for (let key in errors) {
                        count++;
                        if (key.split('.')[0] !== 'fee_type_amount_array') {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            })
                        }

                        if (key.split('.')[2] === 'amount') {
                            count++;
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            })
                        }

                        if (count >= 1) {
                            break;
                        }
                    }
                }
            })
        }
    }, [submitEvent]);


    const handleFormReset = () => {
        setSelectedStudentIds([])
        setSelectedFeeIds([])
        setSelectedDiscountData({})
        setFeeTypeAmountArrayData([])
        reset();
    }


    const setSelectedStudentId = (id) => {
        if ([...selectedStudentIds]?.includes(id)) {
            setSelectedStudentIds([...selectedStudentIds].filter((item) => item !== id));
        }
        else {
            setSelectedStudentIds([
                ...selectedStudentIds,
                id,
            ]);
        }

        const updateSelectedStudentIds = [...selectedStudentIds];

        setData('student_ids', updateSelectedStudentIds);
    };

    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all_student_id") {
            if (value === true) {
                setSelectedStudentIds(students.map((item) => item.id))
            }
            else {
                setSelectedStudentIds([])
            }

            setSelectAllStudentChecked(value);
        }
    };
    //handle Checkbox end


    const selectedFeeIdsFromChild = (data) => {
        setSelectedFeeIds(data)
    }


    const feeTypeAmountArrayFromChild = (data) => {
        setFeeTypeAmountArrayData(data);
    }



    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-4 xl:col-span-4 col-span-12">
                        { students?.length > 0 &&
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-default-table xs:overflow-x-auto">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="select_all_student_id"
                                                            name="select_all_student_id"
                                                            checked={
                                                                selectAllStudentChecked
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="select_all_student_id"
                                                        />
                                                    </div>
                                                </div>
                                            </th>
                                            <th>Student ({students?.length})</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students?.length > 0 ?
                                            students?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={`student_id_${item?.id}`}
                                                                    name="student_id"
                                                                    checked={
                                                                        selectedStudentIds.includes(item?.id)
                                                                    }
                                                                    onChange={(e) => {
                                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                                            setSelectedStudentId(item?.id);
                                                                        }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor={`student_id_${item?.id}`}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        {`${item?.title} (${item?.admission_no})`}
                                                        {item?.discount != null &&
                                                            <span className='badge primary ml-2' key={index}>{item?.discount?.title}</span>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                                <tr>
                                                    <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                </tr>
                                            }


                                        {/* <tr>
                                            <td>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            name="student_id_two"
                                                            checked={
                                                                data.student_id_two
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="student_id_two"
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>Aditi Pandey (014)</td>
                                        </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    }
                    </div>
                    <div className="lg:col-span-8 xl:col-span-8 col-span-12">
                        <div className="grid grid-cols-12 gap-[20px]">
                            <div className="col-span-12 lg:col-span-4">
                                <div className="educare-classroom-table-wrapper">
                                    {
                                        students?.length > 0 &&
                                        <BulkDiscountInstallment
                                            fees={fees}
                                            sendSelectedFeeIdsToParent={selectedFeeIdsFromChild}
                                        />
                                    }
                                </div>
                            </div>
                            <div className="col-span-12 lg:col-span-8">
                                {Object.keys(selectedDiscountData)?.length > 0 &&
                                    <BulkDiscountFeeType feeTypes={feeTypes} selectedDiscount={selectedDiscountData} sendFeeTypeAmountArrayToParent={feeTypeAmountArrayFromChild}/>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
