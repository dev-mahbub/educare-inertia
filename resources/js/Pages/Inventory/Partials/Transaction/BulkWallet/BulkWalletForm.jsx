import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BulkWalletList from "./BulkWalletList";

const BulkWalletForm = ({
    boardingStudents,
    classrooms
}) => {

    const [loading, setLoading] = useState(false);
    const [formFields, setFormFields] = useState([]);

    const {
        data,
        setData,
        errors
    } = useForm({
        transaction_date: new Date(),
        classroom_id: "",
        student_data: [],
        deduction_amount_copy: "",
        description_copy: ""
    });

    useEffect(() => {
        setFormFields(boardingStudents?.map(item => ({
            ...item,
            deduction_amount: '',
            description: ''
        })));
    }, [boardingStudents]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            student_data: formFields?.filter(item => item?.deduction_amount > 0)?.map(item => ({
                ...item,
                student_id: item?.id
            }))
        }));
    }, [formFields]);

    // handle classroom change start
    const handleClassroomChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            classroom_id: value
        }));

        const form_data = {
            classroom_id: value
        }

        router.post(route('bulk_wallet.list'), form_data);
    }
    // handle classroom change end


    // handle deduct start
    const handleDeduct = (e) => {
        e.preventDefault();

        const form_data = {
            transaction_date: data?.transaction_date,
            student_data: data?.student_data
        }

        if(data?.transaction_date == '') {
            toast.error('Please select date', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if(data?.student_data?.length == 0) {
            toast.error('Please enter deduction amount of atleast one student', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else if (data?.student_data?.some(item => item?.deduction_amount > item?.wallet_amount)) {
            toast.error('Deducted amount exceeds wallet amount', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            router.post(route('bulk_wallet.save'), form_data, {
                onSuccess: () => {
                    const form_data = {
                        classroom_id: data?.classroom_id
                    }

                    router.post(route('bulk_wallet.list'), form_data);

                    setData((prevData) => ({
                        ...prevData,
                        transaction_date: new Date(),
                        deduction_amount_copy: '',
                        description_copy: '',
                        student_data: []
                    }));
                },
                onError: (errors) => {
                    for (const key in errors) {
                        if (['transaction_date', 'student_data'].includes(key)) {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            });

                            break;
                        }
                    }

                    const form_data = {
                        classroom_id: data?.classroom_id
                    }

                    router.post(route('bulk_wallet.list'), form_data);
                }
            });
        }

    }
    // handle deduct end

    //scrollable filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollable filter bar end here


    return (
        <>
            <div className="educare-card-title mr-auto pb-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Bulk Wallet Deduction
                </h5>
            </div>
            <div className="educare-input-field-notes my-2">
                {/* <ul>
                    <li>[ Note: Only boarding students of selected class is shown below ]</li>
                </ul> */}
                <h4 className="text-right">
                    Note: "Only boarding students from the selected class are displayed below."
                </h4>
            </div>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form>
                            <div className=" educare-header-filtar-bar-inner-main">
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {boardingStudents?.length}</span>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-input-field-styles">
                                                <DatePicker
                                                    selected={data?.transaction_date && new Date(data?.transaction_date)}
                                                    onChange={(date) => setData("transaction_date", date)}
                                                    showYearDropdown
                                                    showMonthDropdown
                                                    useShortMonthInDropdown
                                                    showPopperArrow={false}
                                                    peekNextMonth
                                                    dropdownMode="select"
                                                    isClearable
                                                    dateFormat="dd/MM/yyyy"
                                                    placeholderText="Select Date"
                                                    className="w-full"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="classroom_id"
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    onChange={(e) =>
                                                        handleClassroomChange(e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                            </div>
                                            <div className="whitespace-nowrap">
                                                <PrimaryButton
                                                    className="educare-primary-btn-md-fill whitespace-nowrap"
                                                    type="button"
                                                    onClick={handleDeduct}
                                                >
                                                    Deduct
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <BulkWalletList
                loading={loading}
                formFields={formFields}
                setFormFields={setFormFields}
                data={data}
                setData={setData}
                errors={errors}
            />
        </>
    );
};

export default BulkWalletForm;
