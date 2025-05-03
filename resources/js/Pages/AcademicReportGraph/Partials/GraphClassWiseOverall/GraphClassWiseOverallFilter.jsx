import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";

const GraphClassWiseOverallFilter = ({
    classrooms
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        classroom_id: "",
    });

    const handleSearch = (e) => {
        e.preventDefault();

        router.post(route('academic_report_graph.classwiseoverall'), data);
    }

    const GraphClassWiseOverallFilterData = (e) => {
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


    return (

        <>
            <div className="mb-2.5">
                <form onSubmit={GraphClassWiseOverallFilterData}>
                    <div className="flex flex-wrap gap-2.5">
                        <div className="educare-select-field-styles">
                            <SelectInput
                                data_label="Class"
                                data={classrooms}
                                value={data.classroom_id}
                                onChange={(e) =>
                                    setData("classroom_id", e.target.value)
                                }
                                type="text"
                                className="block"
                            />
                            <InputError
                                message={errors.classroom_id}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Tooltip
                                title="Search"
                                placement="top"
                                arrow
                                as="button"
                            >
                                <button
                                    href="#"
                                    className="educare-secondary-btn-md-fill"
                                    onClick={(e) =>{
                                        handleSearch(e);
                                    }}
                                >
                                    <i className="icon-search-interface-symbol"></i>
                                </button>
                            </Tooltip>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default GraphClassWiseOverallFilter;
