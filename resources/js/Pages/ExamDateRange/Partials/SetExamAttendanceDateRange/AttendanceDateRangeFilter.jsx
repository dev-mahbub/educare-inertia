import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const AttendanceDateRangeFilter = ({ classNames }) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        select_class: "",
    });

    const handeleClassWiseData = (e) => {
        e.preventDefault();

        router.post(route('exam_date_range.list'), data)
    }

    const sendExamMarksData = (e) => {
        e.preventDefault();

        post(route("exam_date_range.save"), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                // if (errors.landmarks_id) {
                //     reset("landmarks_id");
                //     landmarksInput.current.focus();
                // }
            },
        });
    };
    //scrollble filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


    return (
        <>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form onSubmit={sendExamMarksData}>
                            <div className="educare-header-filtar-bar-inner-main flex flex-wrap gap-2.5 justify-between">
                                <div className="educare-card-title leading-none">
                                    <h5>
                                        <i className="icon-calender"></i>
                                        Allocate Exam Duration
                                    </h5>
                                </div>
                                <div className="inline-flex flex-wrap gap-2.5">
                                    <div className="educare-select-field-styles">
                                        <SelectInput
                                            data_label="Class"
                                            data={classNames}
                                            value={data.select_class}
                                            onChange={(e) =>
                                                setData("select_class", e.target.value)
                                            }
                                            type="text"
                                            className="block"
                                        />
                                        <InputError
                                            message={errors.select_class}
                                            className="mt-2"
                                        />
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
                                                type= "button"
                                                className="educare-secondary-btn-md-fill"
                                                onClick={(e) =>{
                                                    handeleClassWiseData(e)
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
                                                <Link
                                                    href="#"
                                                    className="educare-gray-btn-md-fill"
                                                >
                                                    <i className="icon-ArrowsClockwise"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                        {/* <PrimaryButton
                                            // disabled={processing}
                                            className="educare-primary-btn-md-fill"
                                        >
                                            Save
                                        </PrimaryButton> */}
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AttendanceDateRangeFilter;
