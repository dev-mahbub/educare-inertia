import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import RadioInput from '@/Components/RadioInput';
import SelectInput from '@/Components/SelectInput';
import TextInput from '@/Components/TextInput';
import { router, useForm } from "@inertiajs/react";
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
    allStudentData,
    student,
    staff
}) => {
    const [delocationPopup, setDelocationPopup] = useState(false);
    const [studentData, setStudentData] = useState([]);
    const [studentTeacherData, setStudentTeacherData] = useState({});
    const [stoppageData, setStoppageData] = useState([]);
    const [showStudentTeacher, setShowStudentTeacher] = useState(false);
    const [preShowStudentTeacher, setPreShowStudentTeacher] = useState(false);
    const [prevStudentTeacherData, setPrevStudentTeacherData] = useState([]);
    const [filteredVouchers, setFilteredVouchers] = useState([]);

    const [selectedStudent, setSelectedStudent] = useState({});
    const [selectedStaff, setSelectedStaff] = useState({});

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
        classroom_id: "",
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
        setSelectedStudent(student);
    }, [student]);

    useEffect(() => {
        setSelectedStaff(staff);
    }, [staff]);

    useEffect(() => {
        if(data?.allocate_type_for == 'Teacher') {
            if (selectedStaff?.id != null) {
                if (teacherDetailsData?.staff_id != null) {
                    setShowStudentTeacher(true);
                    setStudentTeacherData(teacherDetailsData);
                } else {
                    setShowStudentTeacher(false);
                }

                if (prevTeacherDetailsData?.length > 0) {
                    setPreShowStudentTeacher(true);
                    setPrevStudentTeacherData(prevTeacherDetailsData);
                } else {
                    setPreShowStudentTeacher(false);
                }
            }

            setData((prevData) => ({
                ...prevData,
                staff_id: selectedStaff?.id ?? ""
            }));
        } else if (data?.allocate_type_for == 'Student') {
            if (selectedStudent?.id != null) {
                const student_id = selectedStudent?.id ?? '';

                setData((prevData) => ({
                    ...prevData,
                    admission_no: selectedStudent?.admission_no ?? "",
                    classroom_id: selectedStudent?.classroom_id ?? "",
                    student_id: student_id
                }));

                if (studentDetailsData?.student_id != null) {
                    setShowStudentTeacher(true);
                    setStudentTeacherData(studentDetailsData);
                } else {
                    setShowStudentTeacher(false);
                }

                if (prevStudentDetailsData?.length > 0) {
                    setPreShowStudentTeacher(true);
                    setPrevStudentTeacherData(prevStudentDetailsData);
                } else {
                    setPreShowStudentTeacher(false);
                }

                if (transportFeeStructureSetting?.value == 'fee') {
                    setFilteredVouchers(vouchers?.filter(item => {
                        const hasPayment = item?.payment?.filter(item => item?.student_id == student_id)?.some(payment => {
                            return payment?.student_id == student_id && payment?.payment_status != 'Cancelled';
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
                                (item?.payment?.student_id != student_id || (item?.payment?.student_id == student_id && item?.payment?.payment_status == 'Cancelled'))
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
                setData((prevData) => ({
                    ...prevData,
                    student_id: "",
                    admission_no: ""
                }));
            }
        }
    }, [selectedStudent,selectedStaff, teacherDetailsData, prevTeacherDetailsData, studentDetailsData, prevStudentDetailsData]);

    useEffect(() => {
        setStudentData(allStudentData);
    }, [allStudentData]);

    // handle search student by admission no start
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
                classroom_id: data?.classroom_id,
                allocate_type_for: data?.allocate_type_for,
            };

            router.post(route("transport.allocation"), form_data);
        }
    };
    // handle search student by admission no end

    // handle change classroom start
    const handleClassroom = (classroom_id) => {
        setShowStudentTeacher(false);
        setPreShowStudentTeacher(false);

        const form_data = {
            classroom_id: classroom_id,
            allocate_type_for: data?.allocate_type_for
        };

        router.post(route("transport.allocation"), form_data);
    };
    // handle change classroom end


    // handle change student start
    const handleSelectChange = (event) => {
        const studentId = event.target.value;

        const form_data = {
            classroom_id: data?.classroom_id,
            student_id: studentId,
            allocate_type_for: data?.allocate_type_for
        };

        router.post(route("transport.allocation"), form_data);
    };
    // handle change student end


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

    // handle save transport allocation start
    const handelInsert = (e) => {
        e.preventDefault();

        post(route("transport.allocation_save"), {
            preserveScroll: true,
            onSuccess: () => {
                let form_data = {};

                if (data?.allocate_type_for == 'Teacher') {
                    form_data = {
                        staff_id: data?.staff_id,
                        allocate_type_for: data?.allocate_type_for
                    };
                } else {
                    form_data = {
                        classroom_id: data?.classroom_id,
                        student_id: data?.student_id,
                        allocate_type_for: data?.allocate_type_for
                    };
                }

                router.post(route("transport.allocation"), form_data);

                setData((prevData) => ({
                    ...prevData,
                    voucher_id: "",
                    transport_type: "",
                    transport_route_id: "",
                    transport_stoppage_id: "",
                    amount: "",
                    available_seats: "",
                    total_seats: ""
                }));
            }
        });
    }
    // handle save transport allocation end

    // handle change staff start
    const handelTeacherData = (id) => {
        const form_data = {
            staff_id: id,
            allocate_type_for: data?.allocate_type_for
        };

        router.post(route("transport.allocation"), form_data);
    }
    // handle change staff end

    // handle change allocate type for start
    const handleChangeAllocateTypeFor = (value) => {
        setData((prevData) => ({
            ...prevData,
            allocate_type_for: value,
            classroom_id: "",
            admission_no: "",
            student_id: "",
            voucher_id: "",
            transport_type: "",
            staff_id: "",
            transport_route_id: "",
            transport_stoppage_id: "",
            amount: "",
            available_seats: "",
            total_seats: ""
        }));

        setSelectedStudent({});
        setSelectedStaff({});
        setStudentData([]);
        setStudentTeacherData([]);
        setStoppageData([]);
        setShowStudentTeacher(false);
        setPreShowStudentTeacher(false);
        setPrevStudentTeacherData([]);
        setFilteredVouchers([]);
    }
    // handle change allocate type for end

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
                                                        handleChangeAllocateTypeFor("Student")
                                                        // setData("allocate_type_for", "Student")
                                                        // setStudentTeacherData([])
                                                    }
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-12 md:col-span-6 sm:col-span-6">
                                            <div className="educare-radio-field-styles flex gap-3">
                                                <RadioInput
                                                    name="allocate_type_for"
                                                    value="Allocate Staff"
                                                    checked={data.allocate_type_for === "Teacher"}
                                                    onChange={() => {
                                                        handleChangeAllocateTypeFor("Teacher")
                                                        // setStudentTeacherData([])
                                                        // setData({
                                                        //     ...data,
                                                        //     allocate_type_for: "Teacher",
                                                        //     student_id: "",
                                                        //     admission_no: "",
                                                        // });
                                                        // setShowStudentTeacher(false);
                                                        // setPreShowStudentTeacher(false);
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
                                                                onKeyPress={(e) => {
                                                                    if (e.key == 'Enter') {
                                                                        e.preventDefault();

                                                                        handleSearch(e.target.value)
                                                                    }
                                                                }}
                                                                onChange={(e) => {
                                                                    setData(
                                                                        "admission_no",
                                                                        e.target.value
                                                                    )
                                                                }}
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
                                                                    value={data?.student_id}
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
                                                                value="Staff"
                                                            />
                                                            <SelectInput
                                                                id="staff_id"
                                                                data_label="Staff"
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
                                                    Add Transport To {data.allocate_type_for === "Teacher" ? 'Staff' : 'Student'}
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
                                            {data.allocate_type_for === "Teacher" ? 'Staff' : 'Student'} {'->'} Transport Detail
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
                                            {data.allocate_type_for === "Teacher" ? 'Staff' : 'Student'} {'->'} Previous Transport History
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
