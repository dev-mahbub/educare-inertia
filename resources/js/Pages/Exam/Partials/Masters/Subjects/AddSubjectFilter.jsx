import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput from "@/Components/SelectInput";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import useScrollableFilterBar from "@/Utils/FilterArrow";

const AddSubjectFilter = () => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        subject_name: "",
        select_all: "",
    });

    const handleAddSubjectFilterData = (e) => {
        e.preventDefault();

        post(route("school.save"), {
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
        <div className='educare-header-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                <div className="educare-header-filtar-bar-main">
                    <form onSubmit={handleAddSubjectFilterData}>
                        <div className="educare-header-filtar-bar-inner-main">
                            <div className="educare-header-filtar-bar-count">
                                <span>Subjects Total: 10</span>
                            </div>
                            <div className="educare-header-filtar-bar-inner-main-wrap">
                                <div className="educare-header-filtar-bar-fields-area relative">
                                    <span className="educare-header-filter-prev" onClick={handlePrevClick}><i className="icon-left-chevron"></i></span>
                                        <div className="educare-header-filtar-bar-fields-wrap" ref={listRef} style={{ transform: `translateX(-${currentIndex * 120}px)` }}>
                                            <div className="educare-select-field-styles">
                                                <InputLabel htmlFor="select_all" value="" />
                                                <SelectInput
                                                    id="select_all"
                                                    data_label="All"
                                                    data={[]}
                                                    value={data.select_all}
                                                    onChange={(e) =>
                                                        setData("select_all", e.target.value)
                                                    }
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError
                                                    message={errors.select_all}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <InputLabel htmlFor="subject_name" value="" />
                                                <TextInput
                                                    id="subject_name"
                                                    value={data.subject_name}
                                                    onChange={(e) => setData("subject_name", e.target.value)}
                                                    placeHolder="Subject Name"
                                                    type="text"
                                                    className="block"
                                                />
                                                <InputError message={errors.subject_name} className="mt-2" />
                                            </div>
                                        </div>
                                    <span className="educare-header-filter-next" onClick={handleNextClick}><i className="icon-chevron"></i></span>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddSubjectFilter;
