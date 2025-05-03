import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ShowFeeStructurePopup from "./Popup/ShowFeeStructurePopup";

const CreateStructureFilter = ({
    classrooms = [],
    employmentCategoryTypes = [],
    feeStructures = [],
    sendselectedFeeStructureIdToParent,
    saveStatus = false,
    removeStatus = false,
    setLoading,
    studentsWithFeeStructureData,
    setStudentsWithFeeStructureData,
    classFeeStructure,
    studentsWithFeeStructure = [],
    setClassroomId,
    setempCatId
}) => {
    const [filterText, setFilterText] = useState("");
    const [showFeeStructurePopup, setShowFeeStructurePopup] = useState(false);
    const [filteredFeeStructures, setFilteredFeeStructures] = useState(feeStructures);

    // filter data by search start
    const filteredFeeStructure = useMemo(() => {
        return studentsWithFeeStructure.filter((item) => {
            const inputText = filterText?.toLowerCase().trim();
            const admissionNo = item?.admission_no?.toLowerCase();
            const studentName =
                `${item?.first_name} ${item?.middle_name} ${item?.last_name}`.toLowerCase();
            const classroomTitle = item?.classroom?.title?.toLowerCase();
            const srnNo = String(item?.srn_no)?.toLowerCase();
            const fatherName =
                `${item?.father?.first_name} ${item?.father?.middle_name} ${item?.father?.last_name}`.toLowerCase();
            const phone = String(item?.phone)?.toLowerCase();
            const feeStructureTitle = item?.fee_structure?.title?.toLowerCase();

            return (
                (admissionNo && admissionNo.includes(inputText)) ||
                (studentName && studentName.includes(inputText)) ||
                (srnNo && srnNo.includes(inputText)) ||
                (classroomTitle && classroomTitle.includes(inputText)) ||
                (fatherName && fatherName.includes(inputText)) ||
                (phone && phone.includes(inputText)) ||
                (feeStructureTitle && feeStructureTitle.includes(inputText))
            );
        });
    }, [studentsWithFeeStructure, filterText]);
    // filter data by search end

    useEffect(() => {
        setStudentsWithFeeStructureData(filteredFeeStructure);
    }, [filteredFeeStructure]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        search_value: "",
        classroom_id: "",
        employment_cat_id: "",
        fee_structure_id: "",
    });

    // handle classroom change start
    const handleClassroomChange = (e) => {
        const classroom_id = e.target.value != "" ? parseInt(e.target.value) : "";

        setStudentsWithFeeStructureData([]);
        setClassroomId(classroom_id)

        if (classroom_id == "") {
            setFilteredFeeStructures(feeStructures);
        }
        else {
            setFilteredFeeStructures(Object.values(feeStructures)?.filter(item => item?.classroom_ids?.includes(classroom_id)));
        }

        setData((prevData) => ({
            ...prevData,
            classroom_id: classroom_id,
            fee_structure_id: ""
        }))
    }
    // handle classroom change end

    // handle reset data start
    const handleReset = () => {
        reset();
        setStudentsWithFeeStructureData([]);
        setLoading(false);
    }
    // handle reset data end

    // handle filter data start
    const handleFilterData = (e) => {
        e.preventDefault();

        setLoading(false);

        router.post(route('fee.assign_fee_to_student'), data);
    }
    // handle filter data end


    // handle view fee structure popup click start
    const handleViewStructurePopupClick = (e) => {
        getFeeStructureById(e);
    };
    // handle view fee structure popup click end

    // handle filter data start
    const getFeeStructureById = (e) => {
        e.preventDefault();

        if (data?.fee_structure_id == "") {
            toast.error("Please select a fee structure", {
                position: "top-right",
                autoClose: 1500,
            });
        }
        else {
            router.post(route('fee.assign_fee_to_student'), data, {
                onSuccess: ({ props }) => {
                    setShowFeeStructurePopup(!showFeeStructurePopup);
                }
            });
        }
    }
    // handle filter data end


    useEffect(() => {
        if (saveStatus === true || removeStatus === true) {
            const form_data = {
                classroom_id: data?.classroom_id ?? null,
                employment_cat_id: data?.employment_cat_id ?? null,
            };

            router.post(route("fee.get_students_with_fee_structure"), form_data);
        }
    }, [saveStatus, removeStatus]);

    const feeStructureFilterData = (e) => {
        e.preventDefault();

        // const form_data = {
        //     classroom_id: data?.classroom_id ?? null,
        //     employment_cat_id: data?.employment_cat_id ?? null,
        // };

        // router.post(route("fee.get_students_with_fee_structure"), form_data);
    };



    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <>
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Assign fee group to students
                </h5>
            </div>
            <div className="educare-admission-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={feeStructureFilterData}>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {Object.keys(studentsWithFeeStructureData)?.length}</span>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
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
                                                transform: `translateX(-${
                                                    currentIndex * 120
                                                }px)`,
                                            }}
                                        >
                                            {/* Replace changable inputs */}
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="classroom_id"
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={data.classroom_id}
                                                    onChange={(e) => {
                                                        handleClassroomChange(e)
                                                    }
                                                    }
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
                                                    id="employment_cat_id"
                                                    data_label="Employment Category"
                                                    data={
                                                        employmentCategoryTypes
                                                    }
                                                    value={
                                                        data.employment_cat_id
                                                    }
                                                    onChange={(e) => {
                                                        setData("employment_cat_id", e.target.value)
                                                        setempCatId(e.target.value)
                                                    }
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.employment_cat_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="fee_structure_id"
                                                    data_label="Group"
                                                    data={filteredFeeStructures}
                                                    value={
                                                        data.fee_structure_id
                                                    }
                                                    onChange={(e) => {
                                                        setData(
                                                            "fee_structure_id",
                                                            e.target.value
                                                        );
                                                        sendselectedFeeStructureIdToParent(
                                                            e.target.value
                                                        );
                                                    }}
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={
                                                        errors.fee_structure_id
                                                    }
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-select-field-styles">
                                                <TextInput
                                                    id="search_value"
                                                    value={data.search_value}
                                                    onChange={(e) => {
                                                        setData(
                                                            "search_value",
                                                            e.target.value
                                                        );
                                                        setFilterText(
                                                            e.target.value
                                                        );
                                                    }}
                                                    className="block"
                                                    placeHolder="Search"
                                                />
                                                <InputError
                                                    message={
                                                        errors.search_value
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
                                    {/* Replace changable buttons */}
                                    <div>
                                        <Tooltip
                                            title="Search"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                type="button"
                                                className="educare-secondary-btn-md-fill"
                                                onClick={(e) => {
                                                    handleFilterData(e)
                                                }}
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip
                                            title="Reset"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <button
                                                type="button"
                                                className="educare-gray-btn-md-fill"
                                                onClick={() => {
                                                    handleReset()
                                                }}
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    <div>
                                        <Tooltip
                                            title="View Structure"
                                            placement="top"
                                            arrow
                                        >
                                            <button
                                                type="button"
                                                className="educare-dark-btn-md-fill"
                                                onClick={(e) => {
                                                    handleViewStructurePopupClick(e);
                                                }}
                                            >
                                                View Structure
                                            </button>
                                        </Tooltip>
                                    </div>
                                    {/* Replace changable buttons */}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ShowFeeStructurePopup
                classFeeStructureData={classFeeStructure}
                setShowFeeStructurePopup={setShowFeeStructurePopup}
                showFeeStructurePopup={showFeeStructurePopup}
            ></ShowFeeStructurePopup>
        </>
    );
};

export default CreateStructureFilter;
