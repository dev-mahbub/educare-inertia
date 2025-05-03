import HostelHeaderMenus from '@/Components/Partials/Menus/Hostel/HostelHeaderMenus';
import React from 'react';
import AllocationFilter from './AllocationFilter';
import AllocationTables from './AllocationTables';
import { useForm } from '@inertiajs/react';

const AllocationInnerLayout = ({
    classrooms,
    students,
    infraLevels,
    childLevels,
    infraLavelIds,
    infraLavelIdString,
    currentLavelId,
    is_open,
    type,
    studentBedDetails,
}) => {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
    } = useForm({
        admission_no: "",
        classroom_id: "",
        student_id: "",
        joining_date_at: "",
        hostel_infra_level_id: "",
        infraLavelIdString: infraLavelIdString,
        infraLavelIds: infraLavelIds,
        currentLavelId: currentLavelId,
        room_id: currentLavelId,
        is_open: is_open,
        type: type,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('hostel.allocation_save'), data, {
            preserveScroll: true,
            // onSuccess: () => reset(),
        });
    };

    return (
        <>
            <div className="educare-dashboard-main-content-wrap">
                <div className="educare-dashboard-main-content-body">
                    <div className="educare-bottom-header z-10 relative">
                        <div className="educare-bottom-header-middle bg-white">
                            <HostelHeaderMenus title="HOSTEL MANAGEMENT" />
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="educare-dashboard-main-content-body-wrap">
                            <AllocationFilter
                                classrooms={classrooms}
                                students={students}
                                data={data}
                                setData={setData}
                                errors={errors}
                                post={post}
                                reset={reset}
                                processing={processing}
                            />
                            <AllocationTables
                                classrooms={classrooms}
                                students={students}
                                infraLevels={infraLevels}
                                childLevels={childLevels}
                                infraLavelIds={infraLavelIds}
                                infraLavelIdString={infraLavelIdString}
                                currentLavelId={currentLavelId}
                                is_open={is_open}
                                type={type}
                                studentBedDetails={studentBedDetails}
                                data={data}
                                setData={setData}
                                errors={errors}
                                post={post}
                                reset={reset}
                                processing={processing}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AllocationInnerLayout;
