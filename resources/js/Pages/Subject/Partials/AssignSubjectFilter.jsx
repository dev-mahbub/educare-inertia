import React, { useRef, useState, useEffect } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import SelectInput2 from "@/Components/SelectInput2";
import { useForm, router } from "@inertiajs/react";
import PrimaryButton from "@/Components/PrimaryButton";

export default function AssignSubjectFilter({ classrooms, classId }) {
    const [data, setData] = useState(classrooms);
    const [classroomId, setClassroomId] = useState(classId);

    useEffect(() => {
        setData(classrooms);
        setClassroomId(classId);
    }, [classrooms, classId]);

    const permissionFilterData = (e) => {
        e.preventDefault();
        router.get("/subject/assign-to-class?class=" + data.id);
    };

    return (
        <div className="educare-permission-filtar-bar-area z-[4] relative">
            <div className=" educare-permission-filtar-bar">
                <div className="educare-permission-filtar-bar-filter">
                    <form onSubmit={permissionFilterData}>
                        <div className="flex justify-between items-center gap-2.5 maxMd:gap-2.5 maxSm:flex-wrap">
                            <div>
                                <div className="educare-card-title leading-none">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Assign subject list
                                    </h5>
                                </div>
                            </div>
                            <div className="educare-permission-filtar-bar-filter-fields-wrap flex items-end gap-2.5 maxMd:gap-2.5 maxXs:flex-wrap">
                                <div className="educare-permission-filtar-bar-filter-fields flex gap-2.5">
                                    <div
                                        className={`educare-select-field-styles ${data.check_user}`}
                                    >
                                        <SelectInput2
                                            id="class"
                                            data_label="Class"
                                            data={classrooms}
                                            selectedData={classroomId}
                                            onChange={(e) =>
                                                setData({
                                                    ...data,
                                                    id: e.target.value,
                                                })
                                            }
                                            type="text"
                                            className="block w-[200px]"
                                        />
                                    </div>
                                </div>
                                <div className="educare-permission-filtar-bar-filter-btn">
                                    <PrimaryButton className="educare-primary-btn-md-fill">
                                        Check Subjects
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
