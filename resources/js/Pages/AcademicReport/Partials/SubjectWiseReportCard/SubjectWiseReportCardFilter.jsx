import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const SubjectWiseReportCardFilter = ({
    subjects = [],
    classrooms = [],
    subjeteWiseData
}) => {
    // const [filteredSubjects, setFilteredSubjects] = useState([]);

    const { data, setData, errors, post, reset, processing } = useForm({
        classroom_id: "",
        subject_id: "",
        // with_round_off: false,
    });

    // Handle Classroom Changes
    const handleClassroomChange = (id) => {
        // setFilteredSubjects(
        //     subjects?.filter((item) => item?.classroom_id == id)
        // );

        setData((prevData) => ({
            ...prevData,
            classroom_id: id,
            subject_id: "",
        }));

        const form_data = {
            classroom_id: id
        }

        router.post(route('academic_report.subject_report'), form_data)
    };

    const handeFilterData = (e) => {
        e.preventDefault();
        router.post(route("academic_report.subject_report"), data);
    };

    const SubjectWiseReportCardFilterData = (e) => {
        e.preventDefault();
    };
    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
        useScrollableFilterBar();
    //scrollble filter bar end here

    return (
        <div className="educare-header-filtar-bar-area z-[4] relative">
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={SubjectWiseReportCardFilterData}>
                        <div className=" educare-header-filtar-bar-inner-main">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Subject Wise Report
                                </h5>
                            </div>
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
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Class"
                                                data={classrooms}
                                                value={data.classroom_id}
                                                onChange={(e) =>
                                                    handleClassroomChange(
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.classroom_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-select-field-styles">
                                            <SelectInput
                                                data_label="Subject"
                                                data={subjects}
                                                value={data.subject_id}
                                                onChange={(e) =>
                                                    setData(
                                                        "subject_id",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block"
                                            />
                                            <InputError
                                                message={errors.subject_id}
                                                className="mt-2"
                                            />
                                        </div>
                                        {/* <div className="educare-create-school-settings-list educare-create-school-settings-list-document flex-nowrap">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id="with_round_off"
                                                    name="with_round_off"
                                                    checked={
                                                        data.with_round_off
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "with_round_off",
                                                            e.target.checked
                                                        )
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor="with_round_off"
                                                    value="With Round Off"
                                                />
                                            </div>
                                        </div> */}
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
                                        title="Search"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <button
                                            type="button"
                                            className="educare-secondary-btn-md-fill"
                                            onClick={(e) => handeFilterData(e)}
                                        >
                                            <i className="icon-search-interface-symbol"></i>
                                        </button>
                                    </Tooltip>
                                </div>
                                {subjeteWiseData?.length > 0 &&
                                    <div>
                                        <Tooltip
                                            title="Excel Sheet"
                                            placement="top"
                                            arrow
                                            as="button"
                                        >
                                            <a
                                                href={route('export_excel.subject_wise_report', data)}
                                                target="_blank"
                                                className="educare-success-btn-md-fill"
                                            >
                                                <i className="icon-FileX"></i>
                                            </a>
                                        </Tooltip>
                                    </div>
                                }
                                <div>
                                    <Tooltip
                                        title="Reset"
                                        placement="top"
                                        arrow
                                        as="button"
                                    >
                                        <Link
                                            href={route('academic_report.subject_report')}
                                            className="educare-gray-btn-md-fill"
                                        >
                                            <i className="icon-ArrowsClockwise"></i>
                                        </Link>
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SubjectWiseReportCardFilter;
