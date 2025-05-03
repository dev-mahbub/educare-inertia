import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";

const BiometricUpdateListFilter = ({
    studentsBioLength = '',
    classrooms = '',
    setLoading,
    setFormData
 }) => {

    const {
        data,
        setData
    } = useForm({
        classroom_id: "",
        search_value: "",
    });

    useEffect(() => {
        setFormData(data);
    }, [data])

    const handleSearch = (e) => {
        e.preventDefault();
        if (data) {
            router.post(route('student.update_biometric'), data);
            setLoading(false);
        }
    }

    const handleReset = () => {
        router.get(route('student.update_biometric'));
    }

     //scrollble filter bar start here
     const {
        listRef,
        currentIndex,
        handleNextClick,
        handlePrevClick,
    } = useScrollableFilterBar();
    //scrollble filter bar end here


    return (
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-[9px] educare-admission-filtar-bar">
                <div className="educare-admission-filtar-bar-filter">
                    <form>
                        <div className="educare-admission-filtar-bar-count">
                            <span>Total: {studentsBioLength && studentsBioLength}</span>
                        </div>
                        <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                        <div className="educare-admission-filtar-bar-filter-fields-wrap relative w-full">
                            <span className="educare-admission-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                            <div className="educare-admission-filtar-bar-filter-fields" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                <div className="educare-input-field-styles">
                                    <TextInput
                                        id="search_value"
                                        value={data?.search_value}
                                        onChange={(e) => setData("search_value", e.target.value)}
                                        placeHolder="Search"
                                        type="text"
                                        className="block"
                                    />
                                </div>
                                <div className="educare-select-field-styles">
                                    <SelectInput
                                        id="classroom_id"
                                        data_label="All Class"
                                        data={classrooms}
                                        value={data?.classroom_id}
                                        onChange={(e) =>
                                            setData("classroom_id", e.target.value)
                                        }
                                        type="text"
                                        className="block"
                                    />
                                </div>
                            </div>
                            <span className="educare-admission-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                        </div>
                        </div>
                        <div className="educare-admission-filtar-bar-filter-action educare-filter-action-btn">
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
                                        onClick={handleSearch}
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
                                        href={route('student.update_biometric')}
                                        className="educare-gray-btn-md-fill"
                                        onClick={handleReset}
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </Link>
                                </Tooltip>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BiometricUpdateListFilter;
