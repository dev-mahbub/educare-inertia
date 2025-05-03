import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import Swal from "sweetalert2";

export default function AssignClassSubjectForm({ subjects, classSubjectTypes, grades, classroomSubjects,classroomSubject }) {
    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing
    } = useForm({
        display_order:classroomSubject?.display_order,
        subject_id:classroomSubject?.subject_id,
        type:classroomSubject?.type,
        parent_subject_id:classroomSubject?.parent_subject_id,
        academic_grade_id:classroomSubject?.academic_grade_id,
        is_marking:classroomSubject?.is_marking,
    });

    const assignClassSubjectData = (e) => {
        e.preventDefault();
        put(route("subject.assign_to_class_new_design.update",classroomSubject.id),data, {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('subject.assign_to_class_new_design.delete', id));
            }
        });
    }

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-8 xl:col-span-8 col-span-12 order-1 maxMd:order-2">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    <span>({classroomSubjects?.length})</span>
                                </h5>
                            </div>
                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Sl. No.</th>
                                            <th>Subject</th>
                                            <th>Type</th>
                                            <th>Parent Subject</th>
                                            <th>Grade Scale</th>
                                            <th>Is Marking</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {classroomSubjects?.length > 0 ?
                                            classroomSubjects?.map((item, index) => (
                                                <tr>
                                                    <td>{item?.display_order}</td>
                                                    <td>{item?.subject_title}</td>
                                                    <td>{item?.type}</td>
                                                    <td>{item?.subject_title}</td>
                                                    <td>{item?.grade_scale}</td>
                                                    <td>{item?.is_marking}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip
                                                                    title="Edit"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <Link
                                                                        href={route('subject.assign_to_class_new_design.edit', item.id)}
                                                                        className="educare-warning-btn-sm-fill"
                                                                    >
                                                                        <i className="icon-editing"></i>
                                                                    </Link>
                                                                </Tooltip>
                                                            </div>
                                                            <div>
                                                                <Tooltip
                                                                    title="Delete"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => handleDelete(item.id)}
                                                                    >
                                                                        <i className="icon-TrashSimple"></i>
                                                                    </button>
                                                                </Tooltip>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )) :
                                            <tr>
                                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-4 xl:col-span-4 col-span-12 order-2 maxMd:order-1">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Assign New Subject
                                    </h5>
                                </div>
                                <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] pt-5 maxXs:p-[15px] rounded-lg">
                                    <form onSubmit={assignClassSubjectData}>
                                        <div className="educare-input-field-styles mb-3">
                                            <InputLabel
                                                htmlFor="display_order"
                                                value="Order"
                                            />
                                            <TextInput
                                                id="display_order"
                                                value={
                                                    data.display_order
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "display_order",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.display_order
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles mb-3">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="subject_id"
                                                        value="Subject"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="subject_id"
                                                data_label="Subject"
                                                data={subjects}
                                                value={
                                                    data.subject_id
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "subject_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.subject_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles mb-3">
                                            <div className="educare-input-field-styles-label-wrap">
                                                <div className="educare-input-field-styles-label">
                                                    <InputLabel
                                                        htmlFor="type"
                                                        value="Type"
                                                    />
                                                    <sup>*</sup>
                                                </div>
                                            </div>
                                            <SelectInput
                                                id="type"
                                                data_label="Type"
                                                data={classSubjectTypes}
                                                value={
                                                    data.type
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "type",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.type
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles mb-3">
                                            <InputLabel
                                                htmlFor="parent_subject_id"
                                                value="Parent Subject"
                                            />
                                            <SelectInput
                                                id="parent_subject_id"
                                                data_label="Parent Subject"
                                                data={subjects}
                                                value={
                                                    data.parent_subject_id
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "parent_subject_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.parent_subject_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles mb-3">
                                            <InputLabel
                                                htmlFor="academic_grade_id"
                                                value="Grade Scale"
                                            />
                                            <SelectInput
                                                id="academic_grade_id"
                                                data_label="Grade Scale"
                                                data={grades}
                                                value={
                                                    data.academic_grade_id
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "academic_grade_id",
                                                        e.target.value
                                                    )
                                                }
                                                className="block"
                                            />
                                            <InputError
                                                message={
                                                    errors.academic_grade_id
                                                }
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-checkbox-field-styles mb-4">
                                            <InputLabel
                                                htmlFor="is_marking"
                                                value="Is Marking"
                                            />
                                            <Checkbox
                                                name="is_marking"
                                                checked={
                                                    data.is_marking
                                                }
                                                onChange={(e) =>
                                                    setData(
                                                        "is_marking",
                                                        e.target.checked
                                                    )
                                                }
                                            />
                                        </div>
                                        <div>
                                            <PrimaryButton className="educare-primary-btn-lg-fill">
                                                Assign Subject
                                            </PrimaryButton>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
