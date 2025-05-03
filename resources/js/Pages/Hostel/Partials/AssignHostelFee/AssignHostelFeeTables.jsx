import React, { useState } from "react";
import AssignHostelFeeLeftTableFilter from "./AssignHostelFeeLeftTableFilter";
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Tooltip } from "@mui/material";
import { Link, router, useForm } from "@inertiajs/react";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { concatName } from "@/Hooks/GlobalFunction";

const AssignHostelFeeTables = ({
    classNames = [],
    classrooms = [],
    hostelFeeData = [],
    hostelVoucherData = [],
    studentData = [],
}) => {
    const [classroomData, setClassroomData] = useState([]);
    const [studentFilterData, setStudentFilterData] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        class_name_id: "",
        classroom_id: "",
        hostel_fee_id: "",
        selected_vouchers: [],
        selected_students: [],
        all_voucher: false,

        select_all_days_id: "",
        monday_id: false,
    });
    //handle Checkbox end

    const handleClassroom = (classNameId) => {
        setData({
            ...data,
            class_name_id: classNameId,
        })
        const filteredClassroom = classrooms?.filter(item => item?.class_name_id == classNameId);
        setClassroomData(filteredClassroom);
    }

    const handleFilterStudent = (classroomId) => {
        setData({
            ...data,
            classroom_id: classroomId,
        })
        const filteredStudents = studentData?.filter(item => item?.classroom_id == classroomId);
        setStudentFilterData(filteredStudents);
    }

    const handleSelectedStudent = (id) => {
        const isSelectedStudent = data.selected_students.some((student) => student.student_id === id);
        const updatedSelectedStudents = isSelectedStudent
            ? data.selected_students.filter((student) => student.student_id !== id)
            : [...data.selected_students, { student_id: id }];

        setData('selected_students', updatedSelectedStudents);
    }

    const handleAllVoucher = (isChecked) => {
        if (isChecked) {
            const allVoucherIds = hostelVoucherData.map((item) => item.id);
            const updatedSelectedVoucher = allVoucherIds.map((voucher_id) => ({ voucher_id }));
            setData({ ...data, 'selected_vouchers': updatedSelectedVoucher, 'all_voucher': true });
        } else {
            setData({ ...data, 'selected_vouchers': [], 'all_voucher': false });
        }
    };

    const handleSelectedVoucher = (id) => {
        const isVoucherSelected = data.selected_vouchers.some((voucher) => voucher.voucher_id === id);
        const updatedSelectedVouchers = isVoucherSelected
            ? data.selected_vouchers.filter((voucher) => voucher.voucher_id !== id)
            : [...data.selected_vouchers, { voucher_id: id }];
        setData({
            ...data,
            'selected_vouchers': updatedSelectedVouchers,
            'all_voucher': false,
        });
    }

    //scrollable filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollable filter bar end here

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('hostel.assign_fee'));
    }

    const handleInsertData = (e) => {
        e.preventDefault();

        post(route("hostel.assign_fee_save"), {
            preserveScroll: true,
            onSuccess: () => {
                reset()
                setData({
                    selected_vouchers: [],
                    selected_students: [],
                })
            },
        });
    };

    console.log('data', data);
    console.log('hostelVoucherData', hostelVoucherData);

    return (
        <>
            <form onSubmit={handleInsertData}>
                <div className="grid grid-cols-12 gap-5">
                    <div className="col-span-12 xl:col-span-5 lg:col-span-5">
                        <div className="educare-card-title mr-auto pb-none mb-2.5">
                            <h5>
                                <i className="icon-House"></i>
                                Assign Hostel Fee To Student
                            </h5>
                        </div>
                        <div className="educare-header-filtar-bar-area z-[4] relative">
                            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                                <div className="educare-header-filtar-bar-main">
                                    <div className=" educare-header-filtar-bar-inner-main">
                                        <div className="educare-header-filtar-bar-inner-main-wrap">
                                            <div className="educare-header-filtar-bar-fields-area relative">
                                                <span
                                                    className="educare-header-filter-prev"
                                                    onClick={handlePrevClick}
                                                >
                                                    <i className="icon-left-chevron"></i>
                                                </span>
                                                <div
                                                    className="educare-header-filtar-bar-fields-wrap"
                                                    ref={listRef}
                                                    style={{
                                                        transform: `translateX(-${currentIndex * 120
                                                            }px)`,
                                                    }}
                                                >
                                                    {/* Replace changeable inputs */}
                                                    <div className="educare-select-field-styles">
                                                        <SelectInput
                                                            id="class_name_id"
                                                            data_label="Class"
                                                            data={classNames}
                                                            value={data?.class_name_id}
                                                            onChange={(e) => handleClassroom(e.target.value)}
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={errors.class_name_id}
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <div className="educare-select-field-styles">
                                                        <SelectInput
                                                            id="classroom_id"
                                                            data_label="Class Section"
                                                            data={classroomData}
                                                            value={data?.classroom_id}
                                                            onChange={(e) => handleFilterStudent(e.target.value)}
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.classroom_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>
                                                    <div className="educare-select-field-styles">
                                                        <SelectInput
                                                            id="hostel_fee_id"
                                                            data_label="Group"
                                                            data={hostelFeeData}
                                                            value={data.hostel_fee_id}
                                                            onChange={(e) =>
                                                                setData(
                                                                    "hostel_fee_id",
                                                                    e.target.value
                                                                )
                                                            }
                                                            type="text"
                                                            className="block"
                                                        />
                                                        <InputError
                                                            message={
                                                                errors.hostel_fee_id
                                                            }
                                                            className="mt-2"
                                                        />
                                                    </div>

                                                    {/* Replace changable inputs */}
                                                </div>
                                                <span
                                                    className="educare-header-filter-next"
                                                    onClick={handleNextClick}
                                                >
                                                    <i className="icon-chevron"></i>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                            <div>
                                                <Tooltip
                                                    title="Reset"
                                                    placement="top"
                                                    arrow
                                                    as="button"
                                                >
                                                    <Link
                                                        href="#"
                                                        className="educare-gray-btn-md-fill"
                                                        type="button"
                                                        onClick={(e) => handleReset(e)}
                                                    >
                                                        <i className="icon-ArrowsClockwise"></i>
                                                    </Link>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-12 bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                            <div className="flex flex-wrap flex-col">
                                {/* <div className="flex">
                                    <div className="mr-1">
                                        <Checkbox
                                            id="all_voucher"
                                            name="all_voucher"
                                            onChange={(e) => handleAllVoucher(e.target.checked)}
                                            checked={data.all_voucher}
                                        />
                                    </div>
                                    <div className="educare-create-school-settings-list-title width-full">
                                        <InputLabel
                                            htmlFor="select_all_days_id"
                                            value="Select All"
                                        />
                                    </div>
                                </div> */}
                                {hostelVoucherData?.length > 0 ?
                                    hostelVoucherData?.map((voucher, index) => (
                                        <div key={index} className="flex">
                                            <div className="mr-1">
                                                <Checkbox
                                                    id={`voucher_${index}`}
                                                    name={`voucher_${index}`}
                                                    onChange={(e) => handleSelectedVoucher(voucher?.id)}
                                                // checked={data.selected_vouchers.some(voucher => voucher.voucher_id === voucher.id)}
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor={`voucher_${index}`}
                                                    value={voucher?.title}
                                                />
                                            </div>
                                        </div>
                                    )) : ''
                                }
                            </div>
                        </div>
                        <div className="col-span-12">
                            <div className="flex flex-wrap gap-2.5 mt-2">
                                <PrimaryButton type="button" onClick={(e) => handleReset(e)} className="educare-gray-btn-md-stroke">
                                    Reset
                                </PrimaryButton>
                                <PrimaryButton type="submit" className="educare-primary-btn-md-fill">
                                    Assign Hostel Fee
                                </PrimaryButton>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-12 xl:col-span-7 lg:col-span-7">
                        <div className="mb-5">
                            <div className="flex flex-wrap gap-2.5 justify-between items-center mb-2.5">
                                <div className="educare-card-title pb-none">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Student
                                    </h5>
                                </div>
                                <div className="flex flex-wrap gap-2.5 items-center">
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="search_student"
                                            // value={data.search_student}
                                            onChange={(e) =>
                                                setData("search_student", e.target.value)
                                            }
                                            placeHolder="Search here"
                                            className="block"
                                        />
                                        <InputError
                                            // message={errors.search_student}
                                            className="mt-2"
                                        />
                                    </div>
                                    <div className="educare-filter-action-btn flex flex-wrap gap-2">
                                        <div>
                                            <Tooltip
                                                title="Search"
                                                placement="top"
                                                arrow
                                                as="button"
                                            >
                                                <Link
                                                    href="#"
                                                    className="educare-secondary-btn-md-fill"
                                                >
                                                    <i className="icon-search-interface-symbol"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-admission-list-inner-wrapper">
                            <div className="educare-admission-list">
                                <table>
                                    <thead>
                                        <tr>
                                            {/* <th>
                                                <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                    <div className="educare-create-school-settings-list-check width-full">
                                                        <Checkbox
                                                            id="select_all_days_id"
                                                            name="select_all_days_id"
                                                            checked={
                                                                data.select_all_days_id
                                                            }
                                                            onChange={(e) =>
                                                                handleCheckboxSelect(
                                                                    e.target.name,
                                                                    e.target.checked
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <div className="educare-create-school-settings-list-title width-full">
                                                        <InputLabel
                                                            htmlFor="select_all_days_id"
                                                            value="Select All"
                                                        />
                                                    </div>
                                                </div>
                                            </th> */}
                                            <th></th>
                                            <th> Adm. No.</th>
                                            <th>Name</th>
                                            <th>Class</th>
                                            <th>Group</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {studentFilterData?.length > 0 ?
                                            studentFilterData?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>
                                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                            <div className="educare-create-school-settings-list-check width-full">
                                                                <Checkbox
                                                                    id={`student_${index}`}
                                                                    name="student_name"
                                                                    onChange={(e) => handleSelectedStudent(item?.id)}
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>{item?.admission_no}</td>
                                                    <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                    <td>{item?.classroom?.title}</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="12">Data not found</td>
                                            </tr>
                                        }


                                        {/* <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="monday_id"
                                                        name="monday_id"
                                                        checked={data.monday_id}
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(
                                                                e.target.name,
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>157680</td>
                                        <td>Kunal Sing</td>
                                        <td>VA</td>
                                        <td>B</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <Link
                                                            href="#"
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
                                                        <Link
                                                            href="#"
                                                            className="educare-danger-btn-sm-fill"
                                                            as="button"
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                                <div className="educare-create-school-settings-list-check width-full">
                                                    <Checkbox
                                                        id="tuesday_id"
                                                        name="tuesday_id"
                                                        checked={data.tuesday_id}
                                                        onChange={(e) =>
                                                            handleCheckboxSelect(
                                                                e.target.name,
                                                                e.target.checked
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td>157680</td>
                                        <td>Kunal Sing</td>
                                        <td>VA</td>
                                        <td>B</td>
                                        <td>
                                            <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                <div>
                                                    <Tooltip
                                                        title="Edit"
                                                        placement="top"
                                                        arrow
                                                    >
                                                        <Link
                                                            href="#"
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
                                                        <Link
                                                            href="#"
                                                            className="educare-danger-btn-sm-fill"
                                                            as="button"
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </Link>
                                                    </Tooltip>
                                                </div>
                                            </div>
                                        </td>
                                    </tr> */}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
};

export default AssignHostelFeeTables;
