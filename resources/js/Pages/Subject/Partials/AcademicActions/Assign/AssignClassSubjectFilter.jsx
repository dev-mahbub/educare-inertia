import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput from '@/Components/SelectInput';
import { Link, useForm } from '@inertiajs/react';
import { Tooltip } from '@mui/material';

const AssignClassSubjectFilter = () => {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        class_id: "",
    });

    const assignClassFilterData = (e) => {
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
        <div className='flex flex-wrap justify-between gap-1 mb-5'>
            <form onSubmit={assignClassFilterData} className='flex flex-wrap gap-1'>
                <div className="educare-select-field-styles">
                    <SelectInput
                        id="class_id"
                        data_label="Class"
                        data={[]}
                        value={data.class_id}
                        onChange={(e) =>
                            setData("class_id", e.target.value)
                        }
                        type="text"
                        className="block"
                    />
                    <InputError
                        message={errors.class_id}
                        className="mt-2"
                    />
                </div>
                <div className="educare-admission-filtar-bar-filter-action educare-filter-action-btn">
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
            </form>
            <div>
                <PrimaryButton // subject/sync-subjects-to-class
                    className="educare-primary-btn-md-fill"
                >
                    <i className='icon-PlusCircle'></i> Sync subject to other class
                </PrimaryButton>
            </div>
        </div>
    );
};

export default AssignClassSubjectFilter;
