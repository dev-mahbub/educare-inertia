import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { router, useForm, usePage } from "@inertiajs/react";
import { Tooltip } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import ListSubheader from '@mui/material/ListSubheader';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import moment from 'moment';
import { useEffect, useState } from 'react';
import DelocationPopup from './Popup/DelocationPopup';

const AllocationTransport = ({
    classrooms,
    students,
    vouchers,
    routes,
    transportTypeArr,
    stoppages,
    teachers,
    availableSeats,
    studentDetailsData,
    teacherDetailsData,
    prevStudentDetailsData,
    prevTeacherDetailsData,
    transportFeeStructureSetting,
    transportStudentData,
    allStudentData,
    inputClassroomId,
    sessionCustomData,
}) => {
    const [delocationPopup, setDelocationPopup] = useState(false);
    const [studentData, setStudentData] = useState([]);
    const [studentTeacherData, setStudentTeacherData] = useState([]);
    const [stoppageData, setStoppageData] = useState([]);
    const [showStudentTeacher, setShowStudentTeacher] = useState(false);
    const [preShowStudentTeacher, setPreShowStudentTeacher] = useState(false);
    const [prevStudentTeacherData, setPrevStudentTeacherData] = useState([]);
    const [filteredVouchers, setFilteredVouchers] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [searchStudent, setSearchStudent] = useState({});
    const { flash } = usePage().props;

    const handleDelocationPopupModalClick = () => {
        setDelocationPopup(!delocationPopup);
    };

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        admission_no: "",
        allocate_type_for: "Student",
        student_id: "",
        voucher_id: "",
        transport_type: "",
        staff_id: "",
        transport_route_id: "",
        transport_stoppage_id: "",
        amount: "",
        available_seats: "",
        total_seats: "",
    });

    useEffect(() => {
        if(transportStudentData.length > 0) {
            let classroomIdVal = "";
            let stdId = transportStudentData[0]?.id;
            if(transportStudentData[0]?.classroom_promoted_students.length > 0) {
                classroomIdVal = transportStudentData[0]?.classroom_promoted_students[0]?.classroom_id;
            }
            else {
                classroomIdVal = transportStudentData[0]?.classroom_id;
            }
            setData({
                ...data,
                admission_no: transportStudentData[0]?.admission_no,
                classroom_id: classroomIdVal,
                student_id: stdId,
            });

            setSelectedOption(stdId);
            handelStudentData(stdId);

            // active right sidebar
            const filleterStudentTeacher = studentDetailsData?.find(item => item?.student_id == stdId);
            const prevFilleterStudentTeacher = prevStudentDetailsData?.filter(item => item?.student_id == stdId);

            if (filleterStudentTeacher) {
                setShowStudentTeacher(true);
                setStudentTeacherData(filleterStudentTeacher);
            } else {
                setShowStudentTeacher(false);
            }

            if (prevFilleterStudentTeacher) {
                setPreShowStudentTeacher(true);
                setPrevStudentTeacherData(prevFilleterStudentTeacher);
            } else {
                setPreShowStudentTeacher(false);
            }

            if (transportFeeStructureSetting?.value == 'fee') {
                setFilteredVouchers(vouchers?.filter(item => {
                    const hasPayment = item?.payment?.filter(item => item?.student_id == stdId)?.some(payment => {
                        return payment?.student_id == stdId && payment?.payment_status != 'Cancelled';
                    });

                    return !hasPayment;
                }));
            }
            else if (transportFeeStructureSetting?.value == 'voucher') {
                setFilteredVouchers(vouchers?.filter(item => {
                    if (
                        item?.payment == null ||
                        (
                            item?.payment != null &&
                            (item?.payment?.student_id != stdId || (item?.payment?.student_id == stdId && item?.payment?.payment_status == 'Cancelled'))
                        )
                    ) {
                        return true;
                    }
                    else {
                        return false;
                    }
                }));
            }
        }
        else {
            // setSelectedOption('');
            // handelStudentData('');
        }
    }, [transportStudentData, studentDetailsData, teacherDetailsData])

    useEffect(() => {
        setData({
            ...data,
            admission_no: "",
            classroom_id: inputClassroomId,
            student_id: ""
        });
    }, [inputClassroomId])

    useEffect(() => {
        setData({
            ...data,
            admission_no: sessionCustomData?.student?.admission_no,
            classroom_id: sessionCustomData?.classroom_id,
            student_id: sessionCustomData?.student_id
        });
        // active right sidebar
        const filleterStudentTeacher = studentDetailsData?.find(item => item?.student_id == sessionCustomData?.student_id);
        const prevFilleterStudentTeacher = prevStudentDetailsData?.filter(item => item?.student_id == sessionCustomData?.student_id);

        if (filleterStudentTeacher) {
            setShowStudentTeacher(true);
            setStudentTeacherData(filleterStudentTeacher);
        } else {
            setShowStudentTeacher(false);
        }

        if (prevFilleterStudentTeacher) {
            setPreShowStudentTeacher(true);
            setPrevStudentTeacherData(prevFilleterStudentTeacher);
        } else {
            setPreShowStudentTeacher(false);
        }
    }, [sessionCustomData])

    useEffect(() => {
        setStudentData(allStudentData);
    }, [allStudentData])

    // useEffect(() => {
    //     if (flash?.customData != null) {
    //         setShowStudentTeacher(false);
    //         setPreShowStudentTeacher(false);
    //         const form_data = {
    //             classroom_id: flash?.customData?.classroom_id,
    //         };

    //         router.post(route("transport.allocation"), form_data);
    //     }
    // }, [flash]);

    const handleSearch = (addNo) => {
        setData({
            ...data,
            admission_no: addNo,
        });

        if(addNo.length > 0) {
            setShowStudentTeacher(false);
            setPreShowStudentTeacher(false);
            const form_data = {
                admission_no: addNo,
            };
            router.post(route("transport.allocation"), form_data);
        }

        /* old data
        let foundStudent = null;
        allStudentData.forEach(std => {
            const filteredStudent = std.options.find(student => student.admission_no === addNo);
            if (filteredStudent) {
                foundStudent = filteredStudent;
            }
        });
        if (foundStudent) {
            setSearchStudent(foundStudent);
            setData({
                ...data,
                admission_no: addNo,
                classroom_id: foundStudent.classroom_id,
                student_id: foundStudent.id,
            });
            setSelectedOption(foundStudent.id);
            handleClassroom(foundStudent.classroom_id);
            handelStudentData(foundStudent.id);
        } else {
            // Reset data if student is not found
            setSearchStudent({});
            setData({
                ...data,
                admission_no: addNo,
                classroom_id: '',
                student_id: '',
            });
            setSelectedOption('');
            setStudentData([]);
            setShowStudentTeacher(false);
            setPreShowStudentTeacher(false);
        } */
    };

    const handleClassroom_old = (id) => {
        const filteredData = [];
        allStudentData.forEach(std => {
            const filteredOptions = std.options.filter(student => student.classroom_id == id);
            if (filteredOptions.length > 0) {
                filteredData.push({
                    name: std.name,
                    options: filteredOptions
                });
            }
        });
        setStudentData(filteredData);
    }

    const handleClassroom = (classroomId) => {
        setShowStudentTeacher(false);
        setPreShowStudentTeacher(false);
        const form_data = {
            classroom_id: classroomId,
        };
        router.post(route("transport.allocation"), form_data);
    };

    const handleSelectChange = (event) => {
        const studentId = event.target.value;
        let admission_no = '';
        allStudentData.forEach(category => {
            const student = category.options.find(student => student.id == studentId);
            if (student) { // Check if the student is found
                admission_no = student.admission_no;
            }
        });
        setData({
            ...data,
            'student_id': studentId,
            'admission_no': admission_no,
        })
        setSelectedOption(event.target.value);
        handelStudentData(studentId);
    };

    const handleAdm = (id) => {
        const studentAdm = studentData?.find((item) => item?.id == id);
        setData({
            ...data,
            'student_id': id,
            'admission_no': studentAdm?.admission_no,
        })
    }

    const handleAvailableSeats = (routeId) => {
        const availableData = availableSeats?.find((item) => item?.transport_route_id == routeId);
        setData(
            {
                ...data,
                transport_route_id: routeId,
                available_seats: availableData?.available_seats,
                total_seats: availableData?.total_seat,
                transport_stoppage_id: "",
                amount: "",
                transport_type: "",
            }
        );
        setStoppageData(stoppages?.filter((item2) => item2?.transport_route_id == routeId));
    }

    const handleStoppage = (stoppageId) => {
        const amountStoppage = stoppages?.find(item3 => item3?.id == stoppageId);
        setData({
            ...data,
            transport_stoppage_id: stoppageId,
            amount: amountStoppage?.pick_drop_price,
            transport_type: 'Pick & Drop',
        })
    }

    const handelPickAmount = (value) => {
        const amountStoppage = stoppages?.find(item3 => item3?.id == data?.transport_stoppage_id);
        if (value == 'Pickup') {
            setData({
                ...data,
                'transport_type': value,
                'amount': amountStoppage?.pick_price,
            })
        } else if (value == 'Drop') {
            setData({
                ...data,
                'transport_type': value,
                'amount': amountStoppage?.drop_price,
            })
        } else if (value == 'Pick & Drop') {
            setData({
                ...data,
                'transport_type': value,
                'amount': amountStoppage?.pick_drop_price,
            })
        }
    }

    const handelInsert = (e) => {
        e.preventDefault();
        post(route("transport.allocation_save"), {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    // aaa

    const handelStudentData = (id) => {
        const filleterStudentTeacher = studentDetailsData?.find(item => item?.student_id == id);
        const prevFilleterStudentTeacher = prevStudentDetailsData?.filter(item => item?.student_id == id);

        if (filleterStudentTeacher) {
            setShowStudentTeacher(true);
            setStudentTeacherData(filleterStudentTeacher);
        } else {
            setShowStudentTeacher(false);
        }

        if (prevFilleterStudentTeacher) {
            setPreShowStudentTeacher(true);
            setPrevStudentTeacherData(prevFilleterStudentTeacher);
        } else {
            setPreShowStudentTeacher(false);
        }

        if (transportFeeStructureSetting?.value == 'fee') {
            setFilteredVouchers(vouchers?.filter(item => {
                const hasPayment = item?.payment?.filter(item => item?.student_id == id)?.some(payment => {
                    return payment?.student_id == id && payment?.payment_status != 'Cancelled';
                });

                return !hasPayment;
            }));
        }
        else if (transportFeeStructureSetting?.value == 'voucher') {
            setFilteredVouchers(vouchers?.filter(item => {
                if (
                    item?.payment == null ||
                    (
                        item?.payment != null &&
                        (item?.payment?.student_id != id || (item?.payment?.student_id == id && item?.payment?.payment_status == 'Cancelled'))
                    )
                ) {
                    return true;
                }
                else {
                    return false;
                }
            }));
        }

        // setFilteredVouchers(vouchers?.filter(item => item?.payment == null ||( item?.payment != null && item?.payment?.student_id != id)));
    }

    const handelTeacherData = (id) => {
        setData(
            {
                ...data,
                staff_id: id
            }
        )
        const filteredTeacher = teacherDetailsData?.find(item => item?.staff_id == id);
        const filteredPrevTeacher = prevTeacherDetailsData?.filter(item => item?.staff_id == id);

        if (filteredTeacher) {
            setShowStudentTeacher(true);
            setStudentTeacherData(filteredTeacher);
        } else {
            setShowStudentTeacher(false);
        }

        if (filteredPrevTeacher) {
            setPreShowStudentTeacher(true);
            setPrevStudentTeacherData(filteredPrevTeacher);
        } else {
            setPreShowStudentTeacher(false);
        }


        if (transportFeeStructureSetting?.value == 'fee') {
            setFilteredVouchers(vouchers?.filter(item => {
                const hasPayment = item?.payment?.filter(item => item?.student_id == id)?.some(payment => {
                    return payment?.student_id == id && payment?.payment_status != 'Cancelled';
                });

                return !hasPayment;
            }));
        }
        else if (transportFeeStructureSetting?.value == 'voucher') {
            setFilteredVouchers(vouchers?.filter(item => {
                if (
                    item?.payment == null ||
                    (
                        item?.payment != null &&
                        (item?.payment?.student_id != id || (item?.payment?.student_id == id && item?.payment?.payment_status == 'Cancelled'))
                    )
                ) {
                    return true;
                }
                else {
                    return false;
                }
            }));
        }

        setStudentTeacherData(filteredTeacher);
    }

    return (
        <>
            <div className="educare-common-card">
                <form onSubmit={handelInsert}>
                    <div className="grid grid-cols-12 gap-5">
                        <div className="xl:col-span-6 col-span-12">
                            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg">
                                <div className="educare-common-card-title">
                                    <h5>
                                        <i className="icon-BookBookmark"></i>
                                        Select Student or Teacher to allocate
                                    </h5>
                                </div>
                                <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                                    <div className="grid grid-cols-12 gap-5 mb-6">
                                        <div className="col-span-12 md:col-span-6 sm:col-span-6">
                                            <div className="educare-radio-field-styles flex gap-3">
                                                <RadioInput
                                                    name="allocate_type_for"
                                                    value="Allocate Student"
                                                    checked={data.allocate_type_for === "Student"}
                                                    onChange={() => {
                                                        setData("allocate_type_for", "Student")
                                                        setStudentTeacherData([])
                                                    }
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6 sm:col-span-6">
                                            <div className="educare-radio-field-styles flex gap-3">
                                                <RadioInput
                                                    name="allocate_type_for"
                                                    value="Allocate Teacher"
                                                    checked={data.allocate_type_for === "Teacher"}
                                                    onChange={() => {
                                                        setStudentTeacherData([])
                                                        setData({
                                                            ...data,
                                                            allocate_type_for: "Teacher",
                                                            student_id: "",
                                                            admission_no: "",
                                                        });
                                                        setShowStudentTeacher(false);
                                                        setPreShowStudentTeacher(false);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="gird grid-cols-12">
                                        {data.allocate_type_for == "Student" &&
                                            <div className="col-span-12">
                                                <div className="grid grid-cols-12 gap-5">
                                                    <div className="col-span-12 md:col-span-4 sm:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="admission_no"
                                                                value="Admission No."
                                                            />
                                                            <TextInput
                                                                id="admission_no"
                                                                value={data?.admission_no}
                                                                onChange={(e) => {
                                                                    handleSearch(e.target.value)
                                                                }
                                                                    // setData(
                                                                    //     "admission_no",
                                                                    //     e.target.value
                                                                    // )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.admission_no
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 md:col-span-4 sm:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="classroom_id"
                                                                            value="Select Class"
                                                                        />
                                                                        <sup>*</sup>
                                                                    </div>
                                                                </div>
                                                            <SelectInput
                                                                id="classroom_id"
                                                                data_label="Class"
                                                                data={classrooms}
                                                                value={
                                                                    data.classroom_id
                                                                }
                                                                onChange={(e) => {
                                                                    setData(
                                                                        "classroom_id",
                                                                        e.target.value
                                                                    )
                                                                    handleClassroom(e.target.value);
                                                                }
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.classroom_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="col-span-12 md:col-span-4 sm:col-span-6">
                                                        <div className="educare-material-group-select-styles">
                                                            <FormControl>
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="student_id"
                                                                            value="Select Student"
                                                                        />
                                                                        <sup>*</sup>
                                                                    </div>
                                                                </div>
                                                                <Select
                                                                    value={selectedOption}
                                                                    onChange={handleSelectChange}
                                                                    id="grouped-select"
                                                                >
                                                                    <MenuItem value="">
                                                                        <em>Select Student</em>
                                                                    </MenuItem>
                                                                    {studentData?.map((std, index) => [
                                                                        <ListSubheader className="material-selet-subheader" key={`header-${index}`}>
                                                                            {std.name}
                                                                        </ListSubheader>,
                                                                        ...std.options.map((option, optionIndex) => (
                                                                            <MenuItem
                                                                                key={`option-${index}-${optionIndex}`}
                                                                                value={option.id}
                                                                            >
                                                                                {option.name}
                                                                            </MenuItem>
                                                                        )),
                                                                    ])}
                                                                </Select>
                                                                <InputError
                                                                    message={
                                                                        errors.student_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        {data.allocate_type_for === "Teacher" &&
                                            <div className="col-span-12">
                                                <div className="grid grid-cols-12 gap-5">
                                                    <div className="col-span-12 md:col-span-6 sm:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <InputLabel
                                                                htmlFor="staff_id"
                                                                value="Teacher"
                                                            />
                                                            <SelectInput
                                                                id="staff_id"
                                                                data_label="Teacher"
                                                                data={teachers}
                                                                value={
                                                                    data.staff_id
                                                                }
                                                                onChange={(e) => handelTeacherData(e.target.value)}
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.staff_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        }
                                        <div className="col-span-12">
                                            <div className="flex flex-wrap justify-between items-center pt-4 pb-1 mb-3 border-b border-grayLight/20 gap-5">
                                                <h5 className='text-[15px] font-semibold text-headingLight'>Route Details</h5>
                                                {data?.transport_route_id ? <span className='badge warning'>Available Seats {data?.available_seats} out of {data?.total_seats}</span> : ''}
                                            </div>
                                            <div className="grid grid-cols-12 gap-5">
                                                {data.allocate_type_for == "Student" &&
                                                    <div className="col-span-12 md:col-span-4 sm:col-span-6">
                                                        <div className="educare-input-field-styles">
                                                            <div className="educare-input-field-styles-label-wrap">
                                                                <div className="educare-input-field-styles-label">
                                                                    <InputLabel
                                                                        htmlFor="allocate_from"
                                                                        value="Allocate From"
                                                                    />
                                                                    <sup>*</sup>
                                                                </div>
                                                            </div>
                                                            <SelectInput
                                                                id="voucher_id"
                                                                data_label="From"
                                                                data={filteredVouchers}
                                                                value={
                                                                    data.voucher_id
                                                                }
                                                                onChange={(e) =>
                                                                    setData(
                                                                        "voucher_id",
                                                                        e.target.value
                                                                    )
                                                                }
                                                                className="block"
                                                            />
                                                            <InputError
                                                                message={
                                                                    errors.voucher_id
                                                                }
                                                                className="mt-2"
                                                            />
                                                        </div>
                                                    </div>
                                                }
                                                <div className="col-span-12 md:col-span-4 sm:col-span-6">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="transport_route_id"
                                                                    value="Route"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                        <SelectInput
                                                            id="transport_route_id"
                                                            data_label="route"
                                                            data={routes}
                                                            value={
                                                                data.transport_route_id
                                                            }
                                                            onChange={(e) =>
                                                                handleAvailableSeats(e.target.value)
                                                            }
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.transport_route_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                </div>
                                                {data?.transport_route_id ?
                                                    <>
                                                        <div className="col-span-12 md:col-span-4 sm:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            htmlFor="transport_stoppage_id"
                                                                            value="Stoppage"
                                                                        />
                                                                        <sup>*</sup>
                                                                    </div>
                                                                </div>
                                                                <SelectInput
                                                                    id="transport_stoppage_id"
                                                                    data_label="stoppage"
                                                                    data={stoppageData}
                                                                    value={
                                                                        data.transport_stoppage_id
                                                                    }
                                                                    onChange={(e) =>
                                                                        handleStoppage(e.target.value)
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.transport_stoppage_id
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-4 sm:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                <InputLabel
                                                                    htmlFor="transport_type"
                                                                    value="Transport Type"
                                                                />
                                                                <SelectInput
                                                                    id="transport_type"
                                                                    data_label="Type"
                                                                    data={transportTypeArr}
                                                                    value={
                                                                        data.transport_type
                                                                    }
                                                                    onChange={(e) => {
                                                                        handelPickAmount(e.target.value);
                                                                    }
                                                                    }
                                                                    className="block"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.transport_type
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="col-span-12 md:col-span-4 sm:col-span-6">
                                                            <div className="educare-input-field-styles">
                                                                {/* <InputLabel
                                                                    value="Amount"
                                                                /> */}
                                                                <div className="educare-input-field-styles-label-wrap">
                                                                    <div className="educare-input-field-styles-label">
                                                                        <InputLabel
                                                                            value="Amount"
                                                                        />
                                                                        <sup>*</sup>
                                                                    </div>
                                                                </div>
                                                                <TextInput
                                                                    id="amount"
                                                                    value={
                                                                        data.amount
                                                                    }
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "amount",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    className="block"
                                                                    type="number"
                                                                />
                                                                <InputError
                                                                    message={
                                                                        errors.amount
                                                                    }
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </>
                                                    : ''
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-12">
                                        <div className="col-span-12">
                                            <div className="flex flex-wrap gap-2.5 mt-5 justify-end">
                                                <PrimaryButton
                                                    className="educare-primary-btn-lg-fill"
                                                    type="submit"
                                                    disabled={processing}
                                                >
                                                    Add Transport To {data.allocate_type_for}
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="xl:col-span-6 col-span-12">
                            {
                                showStudentTeacher ? <div className="educare-classroom-table-wrapper mb-5">
                                    <div className="educare-card-title flex justify-between flex-wrap gap-2.5 items-center">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            {data?.allocate_type_for} {'->'} Transport Detail
                                        </h5>
                                        <div>
                                            <Tooltip
                                                title="Deallocate Transport"
                                                placement="top"
                                                arrow
                                            >
                                                <button type='button' className="educare-gray-btn-md-fill" onClick={handleDelocationPopupModalClick}>Deallocate</button>
                                            </Tooltip>
                                        </div>
                                    </div>
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <td colSpan={2}><span className='font-bold'>Route name : </span> {studentTeacherData?.route_name}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className='font-bold'>Transport Type : </span> {studentTeacherData?.transport_type}
                                                    </td>
                                                    <td>
                                                        <span className='font-bold'>Vehicle No : </span>
                                                        {studentTeacherData?.vehicle_number}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className='font-bold'>Vehicle Type : </span> {studentTeacherData?.vehicle_type}
                                                    </td>
                                                    <td>
                                                        <span className='font-bold'>Timing : </span>
                                                        {studentTeacherData?.timing && moment(studentTeacherData?.timing, "HH:mm:ss").format("h:mm A")}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className='font-bold'>Driver  : </span> {studentTeacherData?.driver_name}
                                                    </td>
                                                    <td>
                                                        <span className='font-bold'>Conductor : </span>
                                                        {studentTeacherData?.conductor_name}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className='font-bold'>Driver Mobile  : </span> {studentTeacherData?.driver_mobile}
                                                    </td>
                                                    <td>
                                                        <span className='font-bold'>Conductor Mobile : </span>
                                                        {studentTeacherData?.conductor_mobile}</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <span className='font-bold'>Applied On  : </span> {studentTeacherData?.applied_on_date_at && moment(studentTeacherData?.applied_on_date_at).format("DD MMM, YYYY")}
                                                    </td>
                                                    <td>
                                                        <span className='font-bold'>Transport Fee : </span>
                                                        {studentTeacherData?.transport_fee}</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div> : ''
                            }

                            {
                                preShowStudentTeacher ? <div className="educare-classroom-table-wrapper">
                                    <div className="educare-card-title flex justify-between flex-wrap gap-2.5">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            {data?.allocate_type_for} {'->'} Previous Transport History
                                        </h5>
                                    </div>
                                    <div className="educare-default-table xs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>Route Name</th>
                                                    <th>Stoppage</th>
                                                    <th>Vehicle</th>
                                                    <th>Starts From</th>
                                                    <th>Price</th>
                                                    <th>Applied On</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {prevStudentTeacherData?.length > 0 ?
                                                    prevStudentTeacherData?.map((item3, index) => (
                                                        <tr key={index}>
                                                            <td>{item3?.route_name}</td>
                                                            <td>{item3?.stoppage}</td>
                                                            <td>{item3?.vehicle_number}</td>
                                                            <td>{item3?.start_from_date && moment(item3?.start_from_date).format("DD-MMM-YYYY")}</td>
                                                            <td>{item3?.transport_fee}</td>
                                                            <td>{item3?.applied_on_date_at && moment(item3?.applied_on_date_at).format("DD MMM, YYYY")}</td>
                                                        </tr>
                                                    ))
                                                :
                                                    <tr>
                                                        <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div> : ''
                            }
                        </div>
                    </div>
                </form>
            </div>
            <DelocationPopup
                delocationPopup={delocationPopup}
                setDelocationPopup={setDelocationPopup}
                vouchers={filteredVouchers}
                data={data}
            />
        </>
    );
};

export default AllocationTransport;
