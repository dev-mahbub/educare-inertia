import React from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";


export default function ClassOrderList({ classrooms }) {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        classroom_ids: classrooms.map(classroom => ({ id: classroom.id, order: classroom.display_order })),
    });

    const assignDisplayOrder = (e) => {
        e.preventDefault();
        post(route("classroom.save_assign_order"), data, {
            preserveScroll: true,
            onSuccess: () => reset()
        });

    };

    console.log(data.classroom_ids);

    const handleDisplayOrder = (id, order) => {
        setData((prevData) => ({ ...prevData, [id]: order }));
        setData((prevFormData) => {
            const existingRoll = prevFormData.classroom_ids.find((item) => item.id === id);
            if (existingRoll) {
                return {
                    ...prevFormData,
                    classroom_ids: prevFormData.classroom_ids.map((item) =>
                        item.id === id ? { ...item, order } : item
                    ),
                };
            } else {
                // Add new class data
                return {
                    ...prevFormData,
                    classroom_ids: [...prevFormData.classroom_ids, { id, order }],
                };
            }
        });
    };

    // const handleDisplayOrder = (id, order) => {
    //     const dataArray = [...data.classroom_ids];
    //     const classOrder = dataArray.filter( (classroom, indx) => {
    //         if(classroom.id == id) {
    //             classroom.order = order;
    //             console.log(classroom);
    //             return classroom;
    //         }
    //     })
    //   //  setData('classroom_ids', classOrder);

    //     // const classroomIds = data.classroom_ids;
    //     // option => option !== null
    //     // classroomIds.filter(classroom => {
    //     //     const indx = classroomIds.findIndex( x => x.id === id );
    //     //     if(indx >= 0) {
    //     //         classroom.order = order;
    //     //         classroomIds[indx] = classroom;
    //     //         setData('classroom_ids', classroomIds);
    //     //     }
    //     // });
    //     console.log(classOrder);
    // };

    return (
        <div className="educare-master-create-shift-area">

            <div className="educare-common-card">
                <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
                    <div className="educare-common-card-title">
                        <h5>
                            <i className="icon-UsersThree"></i>
                            Assign Display Order
                        </h5>
                    </div>
                    <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
                        <div className="educare-master-create-shift-form">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-time-table-controller-wrapper">
                                    <div className="educare-custom-table">
                                        <div className="educare-custom-table-body">
                                            <form onSubmit={assignDisplayOrder}>
                                                <div className="educare-assign-table-wrap">
                                                    <div className="grid grid-cols-12 gap-5 gap-y-2">
                                                        <div className="lg:col-span-4 md:col-span-6 maxSm:col-span-12">
                                                            {classrooms.map((item, index) => (
                                                                <div className="educare-assign-table-list " key={index}>
                                                                    <div className="educare-assign-table-heading">
                                                                        <h6>{item.title}</h6>
                                                                    </div>
                                                                    <div className="educare-assign-table-input">
                                                                        <div className="educare-input-field-styles">
                                                                            <TextInput
                                                                                id={`assign_order_${item.id}`}
                                                                                name={`assign_order[${item.id}]`}
                                                                                value={data.classroom_ids[index]?.order}
                                                                                onChange={(e) => handleDisplayOrder(item.id, e.target.value)}
                                                                                className="block"
                                                                            />
                                                                            <InputError
                                                                                message={errors[`assign_order[${item.id}]`]}
                                                                                className="mt-2"
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <PrimaryButton
                                                        type="submit"
                                                        disabled={processing}
                                                        className="educare-primary-btn-md-fill"
                                                    >
                                                        Save
                                                    </PrimaryButton>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
