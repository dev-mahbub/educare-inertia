import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import Loader from "@/Components/Loader";
import SelectInput from '@/Components/SelectInput';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

const TransportVoucherList = ({
    classNames = [],
    classrooms = [],
    setSelectedClassroomIds,
    selectedClassroomIds,
    transportVoucherReport,
    loading
}) => {

    const [filteredClassrooms, setFilteredClassrooms] = useState(classrooms);
    const [classroomCheckedAll, setClassroomCheckedAll] = useState(false);


    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_all_classroom: "",
        class_one: false,
        class_two: false,
        class_name_id: "",
    });

    // handle class change start
    const handleClassChange = (e) => {
        const class_name_id = e.target.value;

        if (class_name_id == "" || class_name_id == null) {
            setFilteredClassrooms(classrooms);
        }
        else {
            setFilteredClassrooms(classrooms?.filter(item => item?.class_name_id == class_name_id));
        }

        setData((prevData) => ({
            ...prevData,
            class_name_id: class_name_id
        }));

        setSelectedClassroomIds([]);
    }
    // handle class change end

    //handle classroom Checkbox select start
    useEffect(() => {
        if (selectedClassroomIds?.length <= 0) {
            setClassroomCheckedAll(false);
        }
        else {
            setClassroomCheckedAll(selectedClassroomIds?.length === filteredClassrooms?.length);
        }
    }, [selectedClassroomIds, filteredClassrooms])


    const handleCheckboxSelect = (name, value) => {
        let updatedClassroomIds = [...selectedClassroomIds];

        // parent will check, all child will check
        if (name === "select_all_classroom") {
            if (value) {
                updatedClassroomIds = filteredClassrooms?.map(item => item?.id);
            }
            else {
                updatedClassroomIds = [];
            }
        } else if (name = "classroom_id") {
            if (selectedClassroomIds?.includes(value)) {
                updatedClassroomIds = updatedClassroomIds?.filter(item => item != value);
            }
            else {
                updatedClassroomIds = [...updatedClassroomIds, value];
            }
        }

        setSelectedClassroomIds(updatedClassroomIds)
    };
    //handle classroom Checkbox select end


    // format number start
    function formatNumber(num) {
        let newNum = num;

        if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
            newNum = parseFloat(num).toFixed(2);
        } else {
            newNum = num.toString();
        }

        if (newNum.split('.')[1] == '00') {
            newNum = newNum.split('.')[0];
        }

        return newNum;

        // if (!isNaN(num) && !Number.isInteger(parseFloat(num))) {
        //     return parseFloat(num).toFixed(2);
        // } else {
        //     return num.toString();
        // }
    }
    // format number end


    return (
        <>

            <div className='grid grid-cols-12 gap-5'>
                <div className="col-span-12 lg:col-span-3">
                    <div className="educare-input-field-styles mb-2">
                        <SelectInput
                            id="class_name_id"
                            data_label="All Class"
                            data={classNames}
                            value={
                                data.class_name_id
                            }
                            onChange={(e) =>
                               handleClassChange(e)
                            }
                            className="block"
                        />
                        <InputError
                            message={
                                errors.class_name_id
                            }
                            className="mt-2"
                        />
                    </div>
                    <div className="educare-admission-list-area">
                        <div className="educare-admission-list-inner">
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list pb-none">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="select_all_classroom"
                                                            name="select_all_classroom"
                                                            checked={
                                                                classroomCheckedAll
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxSelect(e.target.name, e.target.checked)
                                                            }
                                                        />
                                                    </div>
                                                </th>
                                                <th>Section</th>
                                            </tr>
                                        </thead>
                                            <tbody>
                                                {filteredClassrooms?.length > 0 &&
                                                    filteredClassrooms?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>
                                                                <div className="educare-create-school-settings-list-check width-full">
                                                                    <Checkbox
                                                                        name="classroom_id"
                                                                        checked={
                                                                        selectedClassroomIds?.includes(item?.id)
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleCheckboxSelect(e.target.name, item?.id)
                                                                        }
                                                                    />
                                                                </div>
                                                            </td>
                                                            <td>{item?.title}</td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-12 lg:col-span-9">
                    <div className="educare-admission-list-area">
                        <div className="educare-admission-list-inner">
                            <div className="educare-admission-list-inner-wrapper">
                                <div className="educare-admission-list">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Adm No</th>
                                                <th>Student Name</th>
                                                <th>Class</th>
                                                <th>Installment</th>
                                                <th>Fee Type</th>
                                                <th>Amount</th>
                                                <th>Paid</th>
                                                <th>Due</th>
                                                <th>Status</th>
                                            </tr>
                                        </thead>
                                        {loading ?
                                            <Loader></Loader>
                                        :
                                            <tbody>
                                                {Object.keys(transportVoucherReport)?.length > 0 && Object.keys(transportVoucherReport?.reports)?.length > 0 ?
                                                    Object.values(transportVoucherReport?.reports)?.map((item, index) => (
                                                        <tr key={index}>
                                                            <td>{item?.admission_no}</td>
                                                            <td>{item?.student_name}</td>
                                                            <td>{item?.class_name}</td>
                                                            <td>{item?.title}</td>
                                                            <td>{item?.fee_type}</td>
                                                            <td>{formatNumber(item?.amount)}</td>
                                                            <td>{formatNumber(item?.total_paid)}</td>
                                                            <td>{formatNumber(item?.total_due)}</td>
                                                            <td>
                                                                {item?.status == 'Paid' &&
                                                                    <span className='badge success'>Paid</span>
                                                                }

                                                                {item?.status == 'Partial' &&
                                                                    <span className='badge primary'>Partial</span>
                                                                }

                                                                {item?.status == 'Due' &&
                                                                    <span className='badge danger'>Due</span>
                                                                }
                                                            </td>
                                                        </tr>
                                                    ))
                                                :
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        }
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default TransportVoucherList;
