import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const PossibleSiblingFilter = ({
    possibleSiblingLength = '',
    classrooms = [],
    setLoading,
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
    } = useForm({
        classroom_id: "",
        search_value: "",
    });
    //scrollable filter bar start here
    const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollable filter bar end here

    const handleSearch = (e) => {
        e.preventDefault();
        router.post(route('student_sibling.possible'), data);
        setLoading(false);
    }

    const handleReset = (e) => {
        e.preventDefault();
        router.get(route('student_sibling.possible'))
    }

    return (
        <>
            <div className="educare-card-title mr-auto">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Possible Siblings by Phone
                </h5>
            </div>
            <div className='educare-header-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <form>
                            <div className=" educare-header-filtar-bar-inner-main">
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <span>Total: {possibleSiblingLength}</span>
                                </div>
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-select-field-styles">
                                                <SelectInput
                                                    id="classroom_id"
                                                    data_label="Class"
                                                    data={classrooms}
                                                    value={data?.classroom_id}
                                                    onChange={(e) =>
                                                        setData("classroom_id", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors?.classroom_id}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <TextInput
                                                    id="search_value"
                                                    value={data?.search_value}
                                                    onChange={(e) => setData("search_value", e.target.value)}
                                                    placeHolder="Search by parent name,email, or phone no."
                                                    type="text"
                                                    className="block min-w-[300px]"
                                                />
                                                <InputError message={errors?.search_value} className="mt-2" />
                                            </div>
                                            <div></div>
                                        </div>
                                        <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
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
                                            <Link
                                                href="#"
                                                className="educare-secondary-btn-md-fill"
                                                onClick={(e) => handleSearch(e)}
                                                type="button"
                                            >
                                                <i className="icon-search-interface-symbol"></i>
                                            </Link>
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
                                                type="button"
                                                onClick={(e) => handleReset(e)}
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
        </>
    );
};

export default PossibleSiblingFilter;
