import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { Link, router, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import SelectClassPopup from './Popup/SelectClassPopup';
import SelectFeeTypePopup from './Popup/SelectFeeTypePopup';

const EditClassFeeStructureForm = ({
    feeStructures = [],
    feeStructure = {},
    structureTypes = [],
    class_names = [],
    feeTypes = [],
    semesters = [],
    fees  = [],
    hostelAvailable
}) => {
    const [classPopup, setClassPopup] = useState(false);
    const [feeTypePopup, setFeeTypePopup] = useState(false);
    const [selectedClassIds, setSelectedClassIds] = useState([]);
    const [selectedClassNames, setSelectedClassNames] = useState([]);

    const [selectedFeeTypes, setSelectedFeeTypes] = useState([]);
    const [feeData, setFeeData] = useState({});
    const [formReset, setFormReset] = useState(false);
    const [studentType, setStudentType] = useState("");


    // for new students start
    const [selectedFeeTypeAmountArray, setSelectedFeeTypeAmountArray] = useState([]);
    const [selectedFeeIds, setSelectedFeeIds] = useState(fees?.map(item => item?.id));
    // for new students end


    // for old students start
    const [selectedOldFeeTypeAmountArray, setSelectedOldFeeTypeAmountArray] = useState([]);
    const [selectedOldFeeIds, setSelectedOldFeeIds] = useState(fees?.filter(item => !item?.is_admission_install)?.map(item => item?.id));
    // for old students end


    // Function to receive data from the child component

    const handleClassPopupClick = () => {
        setClassPopup(!classPopup);
    };


    const handleFeeTypePopupClick = () => {
        setFeeTypePopup(!feeTypePopup);
    };

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        title: feeStructure.title,
        description: feeStructure.description,
        structure_type: feeStructure.structure_type,
        selected_class_ids: selectedClassIds,
        old_fee_type_amount_array: selectedOldFeeTypeAmountArray,
        old_fee_ids: selectedOldFeeIds,
        fee_type_amount_array: selectedFeeTypeAmountArray,
        fee_ids: selectedFeeIds,
    });

    useEffect(() => {
        const newStudentFeeStructure = feeStructure?.class_fee_structure_amounts?.filter(item => item?.student_status == 'New');
        const oldStudentFeeStructure = feeStructure?.class_fee_structure_amounts?.filter(item => item?.student_status == 'Old');

        const newStudentFeesData = newStudentFeeStructure?.map(item => ({
            fee_type_id: item.fee_type_id,
            title: item?.fee_type?.fee_type,
            amount: item.amount != null ? parseFloat(item.amount) : null,
            semester: item.semester != '' ? item.semester : null,
            fee_id: item.fee_id,
            is_admission_installment: item.is_admission_installment,
        }));


        const oldStudentFeesData = oldStudentFeeStructure?.map(item => ({
            fee_type_id: item.fee_type_id,
            title: item?.fee_type?.fee_type,
            amount: item.amount != null ? parseFloat(item.amount) : null,
            semester: item.semester != '' ? item.semester : null,
            fee_id: item.fee_id,
            is_admission_installment: item.is_admission_installment,
        }));

        setSelectedFeeTypeAmountArray(newStudentFeesData);
        // do not remove this commented code
        // setSelectedFeeIds([...new Set(newStudentFeeStructure?.map(item => item.fee_id))]);

        setSelectedOldFeeTypeAmountArray(oldStudentFeesData);
        // do not remove this commented code
        // setSelectedOldFeeIds([...new Set(oldStudentFeeStructure?.map(item => item.fee_id))]);

        setSelectedClassIds([...new Set(feeStructure?.class_names?.map(className => className.id))]);
        setSelectedClassNames(class_names?.filter(item => [...new Set(feeStructure?.class_names?.map(className => className.id))]?.includes(item?.id)));
    },[feeStructure]);


    // for new students start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            fee_ids: selectedFeeIds,
        }));
    }, [selectedFeeIds]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            fee_type_amount_array: selectedFeeTypeAmountArray?.filter(item => selectedFeeIds?.includes(item.fee_id)),
        }));
    }, [selectedFeeIds, selectedFeeTypeAmountArray]);
    // for new students end


    // for old students start
    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            old_fee_ids: selectedOldFeeIds,
        }));
    }, [selectedOldFeeIds]);

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            old_fee_type_amount_array: selectedOldFeeTypeAmountArray?.filter(item => selectedOldFeeIds?.includes(item.fee_id)),
        }));
    }, [selectedOldFeeIds, selectedOldFeeTypeAmountArray]);
    // for old students end


    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            selected_class_ids: selectedClassIds,
        }));
    }, [selectedClassIds]);



    const receiveDataFromChild = (data) => {
        // do not remove this code
        // setSelectedClassIds(data);
        // setSelectedClassNames(class_names.filter(item => data.includes(item.id)));
    };

    const receiveFeeTypesDataFromChild = (data, copyToAll = false) => {
        if (copyToAll) {
            const feesData = [];

            fees?.forEach(fee => {
                const newData = data?.map(item => ({
                    fee_type_id: item.fee_type_id,
                    title: item.title,
                    amount: item.amount != null ? parseFloat(item.amount) : null,
                    semester: item.semester != '' ? item.semester : null,
                    fee_id: fee.id,
                    is_admission_installment: fee.is_admission_install,
                }));

                feesData.push(...newData);
            });

            if (studentType === 'New') {
                setSelectedFeeTypeAmountArray([...(feesData || [])]);
            }
            else if (studentType === 'Old') {
                setSelectedOldFeeTypeAmountArray([...(feesData || [])]);
            }
        }
        else {
            if (studentType === 'New') {
                setSelectedFeeTypeAmountArray((prevData) => {
                    if (prevData?.length > 0) {
                        const updatedData = prevData?.filter(item => feeData?.id !== item?.fee_id);

                        return [...updatedData, ...(data || [])];
                    }

                    return [...(data || [])];
                });
            }
            else if (studentType === 'Old') {
                setSelectedOldFeeTypeAmountArray((prevData) => {
                    if(prevData?.length > 0) {
                        const updatedData = prevData?.filter(item => feeData?.id !== item?.fee_id);

                        return [...updatedData, ...(data || [])];
                    }

                    return [...(data || [])];
                });
            }
        }
    };


    // store selected fee id for new students start
    const setSelectedFeeId = (id) => {
        if (selectedFeeIds?.includes(id)) {
            setSelectedFeeIds([...selectedFeeIds].filter((item) => item !== id));
        }
        else {
            if (selectedFeeIds?.length > 0) {
                setSelectedFeeIds([
                    ...selectedFeeIds,
                    id,
                ]);
            }
            else {
                setSelectedFeeIds([id]);
            }
        }

        const updateSelectedFeeIds = selectedFeeIds?.length > 0 ? [...selectedFeeIds] : selectedFeeIds;

        setData('fee_ids', updateSelectedFeeIds);
    };
    // store selected fee id for new students start




    // store selected fee id for old students start
    const setSelectedOldFeeId = (id) => {
        if (selectedOldFeeIds?.includes(id)) {
            setSelectedOldFeeIds([...selectedOldFeeIds].filter((item) => item !== id));
        }
        else {
            if (selectedOldFeeIds?.length > 0) {
                setSelectedOldFeeIds([
                    ...selectedOldFeeIds,
                    id,
                ]);
            }
            else {
                setSelectedOldFeeIds([id]);
            }
        }

        const updateSelectedOldFeeIds = selectedOldFeeIds?.length > 0 ? [...selectedOldFeeIds] : selectedOldFeeIds;

        setData('old_fee_ids', updateSelectedOldFeeIds);
    };
    // store selected fee id for new students start


    // handle reset form start
    const handleResetForm = () => {
        reset();
        setSelectedClassIds([...new Set(feeStructure?.class_names?.map(className => className.id))]);
        setSelectedClassNames(class_names?.filter(item => [...new Set(feeStructure?.class_names?.map(className => className.id))]?.includes(item?.id)));
        setSelectedFeeTypes([])
        setSelectedFeeIds(feeStructure?.class_fee_structure_amounts?.map(item => item.fee_id))
        setSelectedFeeTypeAmountArray(feeStructure?.class_fee_structure_amounts?.map(item => ({
            fee_type_id: item.fee_type_id,
            title: item?.fee_type?.fee_type,
            amount: item.amount != null ? parseFloat(item.amount) : null,
            semester: item.semester != '' ? item.semester : null,
            fee_id: item.fee_id,
            is_admission_installment: item.is_admission_installment,
        })));
        setFeeData({})
        setFormReset(true);
    }
    // handle reset form end


    // handle update fee structure start
    const handleClassFeeStructureDataUpdate = (e) => {
        e.preventDefault();

        const fee_ids = [...new Set(data?.fee_type_amount_array?.map(item => item?.fee_id))];
        const old_fee_ids = [...new Set(data?.old_fee_type_amount_array?.map(item => item?.fee_id))];

        if (JSON.stringify(fee_ids.sort()) === JSON.stringify([...new Set(selectedFeeIds.sort())]) && JSON.stringify(old_fee_ids.sort()) === JSON.stringify([...new Set(selectedOldFeeIds.sort())])) {
            put(route('fee.update_create_class_fee_structure', feeStructure.id), {
                preserveScroll: true,
                onSuccess: ({ props }) => {
                    handleResetForm();
                },
                onError: (errors) => {
                    let count = 0;

                    for (let key in errors) {
                        count++;
                        if (key === 'selected_class_ids') {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            })
                        }

                        if (key === 'fee_type_amount_array') {
                            toast.error(errors[key], {
                                position: 'top-right',
                                autoClose: 1500,
                            })
                        }

                        if (key === 'old_fee_type_amount_array') {
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

                        if (key.split('.')[2] === 'semester') {
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
            });
        }
        else {
            toast.error("Selected fee can't be empty.", {
                position: 'top-right',
                autoClose: 1500,
            });
        }
    };
    // handle update fee structure start


    // handle delete fee structure start
    const handleClassFeeStructureDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("fee.delete_create_class_fee_structure", id));
            }
        });
    };
    // handle update fee structure end

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="xxxl:col-span-4 col-span-12">
                    <div className="educare-common-card">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title">
                                <h5>
                                    <i className="icon-BookBookmark"></i>
                                    Create class fee structure
                                </h5>
                            </div>
                            <form onSubmit={handleClassFeeStructureDataUpdate}>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5">
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    <div className="educare-input-field-styles-label">
                                                        <InputLabel
                                                            htmlFor="title"
                                                            value="Title"
                                                        />
                                                        <sup>*</sup>
                                                    </div>
                                                </div>
                                                <TextInput
                                                    id="title"
                                                    value={
                                                        data.title
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "title",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.title
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <InputLabel
                                                    htmlFor="description"
                                                    value="Description"
                                                />
                                                <TextInput
                                                    id="description"
                                                    value={
                                                        data.description
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "description",
                                                            e.target.value
                                                        )
                                                    }
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.description
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                        </div>

                                        <div className="col-span-12">
                                            <div className="educare-input-field-styles">
                                                <div className="educare-input-field-styles-label-wrap">
                                                    {hostelAvailable &&
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="structure_type"
                                                                value="Structure Type"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    }

                                                    {/* do not remove this code */}
                                                    {/* <button type='button'
                                                        className="educare-secondary-btn-sm-stroke"
                                                        onClick={handleClassPopupClick}
                                                    >
                                                        <i className="icon-PlusCircle"></i>{" "}
                                                        Add Class
                                                    </button>*/}
                                                </div>
                                                {hostelAvailable &&
                                                    <>
                                                        <SelectInput
                                                            id="structure_type"
                                                            data_label="Type"
                                                            data={structureTypes}
                                                            value={
                                                                data.structure_type
                                                            }
                                                            onChange={(e) =>
                                                                setData(
                                                                    "structure_type",
                                                                    e.target.value
                                                                )
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.structure_type
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </>
                                                }
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className='flex flex-wrap gap-1'>
                                                {selectedClassNames?.length > 0 ? (
                                                    selectedClassNames?.map((item, index) => (
                                                                <span key={index} className='badge primary'>{item?.title}</span>
                                                            )
                                                        )
                                                    ) : ''}
                                            </div>
                                        </div>
                                        <div className="col-span-12">
                                            <div className="flex flex-wrap gap-2.5 mt-2 justify-end">
                                                <Link
                                                    className="educare-gray-btn-lg-stroke"
                                                    href={route('fee.create_class_fee_structure')}
                                                >
                                                    Cancel
                                                </Link>
                                                <PrimaryButton
                                                    className="educare-primary-btn-lg-fill"
                                                    type="submit"
                                                >
                                                    Save
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="educare-classroom-table-wrapper">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Group Listing
                            </h5>
                        </div>
                        <div className="educare-default-table xs:overflow-x-auto">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {feeStructures?.length > 0 ? (
                                        feeStructures?.map((item, index) => (
                                            <tr key={index} className={feeStructure?.id == item?.id ? 'bg-success' : ''}>
                                                <td>{index + 1}</td>
                                                <td>{item?.title}</td>
                                                <td>
                                                    <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                        <div>
                                                            <Tooltip
                                                                title="Edit"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <Link
                                                                    href={route(
                                                                        "fee.edit_create_class_fee_structure",
                                                                        item?.id
                                                                    )}
                                                                    className="educare-warning-btn-sm-fill"
                                                                >
                                                                    <i className="icon-editing"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        <div>
                                                            <Tooltip
                                                                title="Delete"
                                                                placement="top"
                                                                arrow
                                                            >
                                                                <button
                                                                    className="educare-danger-btn-sm-fill"
                                                                    onClick={() =>
                                                                        handleClassFeeStructureDelete(item?.id)
                                                                    }
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                            <tr>
                                                <td
                                                    className="text-center text-red-500"
                                                    colSpan="7"
                                                >
                                                    Data not found
                                                </td>
                                            </tr>
                                    )}

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="xxxl:col-span-8 col-span-12">
                    <div className="educare-common-card mb-5">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title leading-none">
                                <h5>
                                    <i className="icon-BookBookmark"></i>
                                    Fee Structure for new students
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <div className="grid grid-cols-12 gap-5">
                                    {fees?.length > 0 ? (
                                        fees?.map((fee, index) => (
                                            <div key={index} className="lg:col-span-4 md:col-span-6 col-span-12">
                                                <div className="educare-update-fee-structure educare-new-student-fee-structure">
                                                    <div className="educare-update-fee-structure-heading">
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id="fee_id"
                                                                    name="fee_id"
                                                                    checked={
                                                                        selectedFeeIds?.includes(fee?.id)
                                                                    }
                                                                    onChange={(e) =>{
                                                                            setSelectedFeeId(fee?.id)
                                                                        }
                                                                    }
                                                                />
                                                            </div>
                                                            <div className="educare-create-school-settings-list-title width-full">
                                                                <InputLabel
                                                                    htmlFor="fee_id"
                                                                    value={fee.title}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className='educare-list-action-btn'>
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button type='button'
                                                                        className="educare-warning-btn-sm-fill"
                                                                        onClick={ () => {
                                                                            setStudentType('New')
                                                                            handleFeeTypePopupClick();
                                                                            setFeeData(fee);
                                                                            setSelectedFeeTypes(selectedFeeTypeAmountArray?.filter(data => data?.fee_id === fee?.id));
                                                                        }}
                                                                    >
                                                                        <i className="icon-editing"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    {selectedFeeTypeAmountArray?.filter(data => data?.fee_id === fee?.id)?.length > 0 ? (
                                                        <div className='border border-primary/10 border-t-0'>
                                                            <ul>
                                                                {selectedFeeTypeAmountArray?.filter(data => data?.fee_id === fee?.id)?.map((item, key) => (
                                                                    <li key={key}>
                                                                        <span>{item?.title}</span>
                                                                        <span>{item?.amount} X {item?.semester}</span>
                                                                        <span>{item?.amount * item?.semester}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                            <ul className='bg-primary/5'>
                                                                <li>
                                                                    <h5>Total : </h5>
                                                                        <h5>
                                                                            {selectedFeeTypeAmountArray?.filter(data => data?.fee_id === fee?.id)?.map(item => item.amount * item.semester).reduce((total, amount) => total+amount, 0)
                                                                            }
                                                                            <i className='icon-CurrencyInr font-semibold'></i>
                                                                        </h5>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    ) : ("")}
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="lg:col-span-4 md:col-span-6 col-span-12">
                                            <span>Data not found</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="educare-common-card mb-5">
                        <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="educare-common-card-title leading-none">
                                <h5>
                                    <i className="icon-BookBookmark"></i>
                                    Fee Structure for Old/Promoted Students
                                </h5>
                            </div>
                            <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                <div className="grid grid-cols-12 gap-5">
                                {fees?.filter(item => !item?.is_admission_install)?.length > 0 ? (
                                    fees?.filter(item => !item?.is_admission_install)?.map((fee, index) => (
                                        <div className="lg:col-span-4 md:col-span-6 col-span-12" key={index}>
                                            <div className="educare-update-fee-structure educare-old-student-fee-structure">
                                                <div className="educare-update-fee-structure-heading">
                                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                        <div className="educare-create-school-settings-list-check width-full">
                                                            <Checkbox
                                                                id="fee_id_old"
                                                                name="fee_id_old"
                                                                checked={
                                                                    selectedOldFeeIds?.includes(fee?.id)
                                                                }
                                                                onChange={(e) => {
                                                                        setSelectedOldFeeId(fee?.id)
                                                                    }
                                                                }
                                                            />
                                                        </div>
                                                        <div className="educare-create-school-settings-list-title width-full">
                                                            <InputLabel
                                                                htmlFor="fee_id_old"
                                                                value={fee?.title}
                                                            />
                                                        </div>
                                                    </div>
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
                                                                        setStudentType('Old')
                                                                        handleFeeTypePopupClick();
                                                                        setFeeData(fee);
                                                                        setSelectedFeeTypes(selectedOldFeeTypeAmountArray?.filter(data => data?.fee_id === fee?.id));
                                                                    }}
                                                                >
                                                                    <i className="icon-editing"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                    </div>
                                                </div>
                                                {selectedOldFeeTypeAmountArray?.filter(data => data?.fee_id === fee?.id)?.length > 0 ? (
                                                    <div className='border border-supportingA/10 border-t-0'>
                                                        <ul>
                                                            {selectedOldFeeTypeAmountArray?.filter(data => data?.fee_id === fee?.id)?.map((item, key) => (
                                                                <li key={key}>
                                                                    <span>{item?.title}</span>
                                                                    <span>{item?.amount} X {item?.semester}</span>
                                                                    <span>{item?.amount * item?.semester}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                        <ul className='bg-primary/5'>
                                                            <li>
                                                                <h5>Total : </h5>
                                                                <h5>
                                                                    {selectedOldFeeTypeAmountArray?.filter(data => data?.fee_id === fee?.id)?.map(item => item.amount * item.semester).reduce((total, amount) => total + amount, 0)}
                                                                    <i className='icon-CurrencyInr font-semibold'></i>
                                                                </h5>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                ) : ("")}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="lg:col-span-4 md:col-span-6 col-span-12">
                                        <span>Data not found</span>
                                    </div>
                                )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <SelectClassPopup
                classPopup={classPopup}
                setClassPopup={setClassPopup}
                class_names={class_names}
                sendDataToParent={receiveDataFromChild}
                classNameIds={selectedClassIds}
            />
            <SelectFeeTypePopup
                feeTypePopup={feeTypePopup}
                setFeeTypePopup={setFeeTypePopup}
                feeTypes={feeTypes}
                semesters={semesters}
                selectedFeeTypes={selectedFeeTypes}
                feeData={feeData}
                sendFeeTypeDataToParent={receiveFeeTypesDataFromChild}
                formReset={formReset}
            />
        </>
    );
};

export default EditClassFeeStructureForm;
