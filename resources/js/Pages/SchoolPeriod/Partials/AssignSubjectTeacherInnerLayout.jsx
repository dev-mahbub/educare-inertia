import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";;
import { useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import React, { useRef } from 'react';
import SchoolShiftMenu from '../../../Components/Partials/Menus/SchoolShift/SchoolShiftMenu'

const AssignSubjectTeacherInnerLayout = () => {

    const titleInput = useRef();
    //
    const {
        data,
        setData,
        errors,
        post,
        reset,
        recentlySuccessful,
    } = useForm({
        //input start
        table_controller_class: "",
        table_controller_shift: "",

        monday_subject_a: "",
        monday_subject_b: "",
        monday_subject_c: "",
        monday_teacher_a: "",
        monday_teacher_b: "",
        monday_teacher_c: "",

        tuesday_subject_a: "",
        tuesday_subject_b: "",
        tuesday_subject_c: "",
        tuesday_teacher_a: "",
        tuesday_teacher_b: "",
        tuesday_teacher_c: "",

        wednesday_subject_a: "",
        wednesday_subject_b: "",
        wednesday_subject_c: "",
        wednesday_teacher_a: "",
        wednesday_teacher_b: "",
        wednesday_teacher_c: "",

        thursday_subject_a: "",
        thursday_subject_b: "",
        thursday_subject_c: "",
        thursday_teacher_a: "",
        thursday_teacher_b: "",
        thursday_teacher_c: "",

        friday_subject_a: "",
        friday_subject_b: "",
        friday_subject_c: "",
        friday_teacher_a: "",
        friday_teacher_b: "",
        friday_teacher_c: "",

        saturday_subject_a: "",
        saturday_subject_b: "",
        saturday_subject_c: "",
        saturday_teacher_a: "",
        saturday_teacher_b: "",
        saturday_teacher_c: "",
        //input end
    });

    return (
        <div className="educare-dashboard-main-content-wrap">
            <div className="educare-bottom-header z-10 relative">
                <div className="educare-bottom-header-middle">
                    <SchoolShiftMenu title="Time Table Management" />
                </div>
            </div>
            <div className="educare-dashboard-main-content-body">
                <div className="educare-dashboard-main-content-body-wrap">
                    <form>
                        <div className="educare-time-table-controller-area">
                            <div className="grid grid-cols-12 gap-[20px]">
                                <div className="col-span-12">
                                    <div className="educare-time-table-controller-header flex items-center justify-between flex-wrap gap-[15px] py-[15px] px-[15px] maxXs:py-[20px] maxXs:px-[20px] rounded-lg bg-white">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <div className="educare-time-table-controller-title">
                                                <h6>Create Class Time Table</h6>
                                            </div>
                                            <label className="count-badge unfulfilled-badge">Total Period:<strong className="count-badge-title"> 3</strong></label>
                                        </div>
                                        <div className="educare-time-table-controller-select flex justify-end maxXs:justify-start items-center flex-wrap gap-[8px]">
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="table_controller_class"
                                                    data_label="Class"
                                                    data={[]}
                                                    ref={titleInput}
                                                    value={data.table_controller_class}
                                                    onChange={(e) =>
                                                        setData(
                                                            "table_controller_class",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block w-full"
                                                />

                                                <InputError
                                                    message={errors.table_controller_class}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="table_controller_shift"
                                                    data_label="Morning"
                                                    data={[]}
                                                    ref={titleInput}
                                                    value={data.table_controller_shift}
                                                    onChange={(e) =>
                                                        setData(
                                                            "table_controller_shift",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block w-full"
                                                />

                                                <InputError
                                                    message={errors.table_controller_shift}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-time-table-controller-quick-button">
                                                <PrimaryButton
                                                    className="bg-primary text-white px-[10px] pt-[4px] pb-[5px] text-[14px] flex items-center gap-[5px] rounded-[5px] capitalize">
                                                    save time table
                                                </PrimaryButton>
                                                <Transition
                                                    show={recentlySuccessful}
                                                    enter="transition ease-in-out"
                                                    enterFrom="opacity-0"
                                                    leave="transition ease-in-out"
                                                    leaveTo="opacity-0"
                                                >
                                                    <p className="text-sm text-gray-600">Reset</p>
                                                </Transition>
                                            </div>
                                            <div className="educare-time-table-controller-quick-button">
                                                <PrimaryButton
                                                    className="text-[20px] text-danger"><i className="icon-FilePdf"></i>
                                                </PrimaryButton>
                                                <Transition
                                                    show={recentlySuccessful}
                                                    enter="transition ease-in-out"
                                                    enterFrom="opacity-0"
                                                    leave="transition ease-in-out"
                                                    leaveTo="opacity-0"
                                                >
                                                    <p className="text-sm text-gray-600">Reset</p>
                                                </Transition>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="educare-time-table-controller-wrapper maxXs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 1</h6>
                                                        <p className="text-[14px]">7:00 AM - 7:45 AM</p>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 2</h6>
                                                        <p className="text-[14px]">8:00 AM - 8:45 AM</p>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 3</h6>
                                                        <p className="text-[14px]">9:00 AM - 9:45 AM</p>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="day-name">
                                                            <span>Monday</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="monday_subject_a"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.monday_subject_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "monday_subject_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.monday_subject_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="monday_teacher_a"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.monday_teacher_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "monday_teacher_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.monday_teacher_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="monday_subject_b"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.monday_subject_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "monday_subject_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.monday_subject_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="monday_teacher_b"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.monday_teacher_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "monday_teacher_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.monday_teacher_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="monday_subject_c"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.monday_subject_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "monday_subject_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.monday_subject_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="monday_teacher_c"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.monday_teacher_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "monday_teacher_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.monday_teacher_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="day-name">
                                                            <span>Tuesday</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="tuesday_subject_a"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.tuesday_subject_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "tuesday_subject_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.tuesday_subject_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="tuesday_teacher_a"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.tuesday_teacher_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "tuesday_teacher_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.tuesday_teacher_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="tuesday_subject_b"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.tuesday_subject_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "tuesday_subject_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.tuesday_subject_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="tuesday_teacher_b"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.tuesday_teacher_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "tuesday_teacher_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.tuesday_teacher_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="tuesday_subject_c"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.tuesday_subject_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "tuesday_subject_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.tuesday_subject_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="tuesday_teacher_c"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.tuesday_teacher_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "tuesday_teacher_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.tuesday_teacher_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="day-name">
                                                            <span>Wednesday</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="wednesday_subject_a"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.wednesday_subject_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "wednesday_subject_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.wednesday_subject_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="wednesday_teacher_a"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.wednesday_teacher_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "wednesday_teacher_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.wednesday_teacher_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="wednesday_subject_b"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.wednesday_subject_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "wednesday_subject_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.wednesday_subject_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="wednesday_teacher_b"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.wednesday_teacher_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "wednesday_teacher_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.wednesday_teacher_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="wednesday_subject_c"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.wednesday_subject_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "wednesday_subject_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.wednesday_subject_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="wednesday_teacher_c"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.wednesday_teacher_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "wednesday_teacher_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.wednesday_teacher_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="day-name">
                                                            <span>Thursday</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="thursday_subject_a"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.thursday_subject_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "thursday_subject_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.thursday_subject_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="thursday_teacher_a"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.thursday_teacher_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "thursday_teacher_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.thursday_teacher_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="thursday_subject_b"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.thursday_subject_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "thursday_subject_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.thursday_subject_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="thursday_teacher_b"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.thursday_teacher_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "thursday_teacher_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.thursday_teacher_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="thursday_subject_c"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.thursday_subject_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "thursday_subject_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.thursday_subject_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="thursday_teacher_c"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.thursday_teacher_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "thursday_teacher_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.thursday_teacher_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="day-name">
                                                            <span>Friday</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="friday_subject_a"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.friday_subject_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "friday_subject_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.friday_subject_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="friday_teacher_a"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.friday_teacher_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "friday_teacher_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.friday_teacher_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="friday_subject_b"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.friday_subject_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "friday_subject_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.friday_subject_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="friday_teacher_b"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.friday_teacher_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "friday_teacher_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.friday_teacher_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="friday_subject_c"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.friday_subject_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "friday_subject_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.friday_subject_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="friday_teacher_c"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.friday_teacher_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "friday_teacher_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.friday_teacher_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="day-name">
                                                            <span>Saturday</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="saturday_subject_a"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.saturday_subject_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "saturday_subject_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.saturday_subject_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="saturday_teacher_a"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.saturday_teacher_a}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "saturday_teacher_a",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.saturday_teacher_a}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="saturday_subject_b"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.saturday_subject_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "saturday_subject_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.saturday_subject_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="saturday_teacher_b"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.saturday_teacher_b}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "saturday_teacher_b",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.saturday_teacher_b}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="educare-time-table-select min-h-[150px]">
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="saturday_subject_c"
                                                                    data_label="Subject"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.saturday_subject_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "saturday_subject_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.saturday_subject_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                            <div className="educare-input-field-styles">
                                                                <SelectInput
                                                                    id="saturday_teacher_c"
                                                                    data_label="Teacher"
                                                                    data={[]}
                                                                    ref={titleInput}
                                                                    value={data.saturday_teacher_c}
                                                                    onChange={(e) =>
                                                                        setData(
                                                                            "saturday_teacher_c",
                                                                            e.target.value
                                                                        )
                                                                    }
                                                                    type="text"
                                                                    className="block w-full"
                                                                />

                                                                <InputError
                                                                    message={errors.saturday_teacher_c}
                                                                    className="mt-2"
                                                                />
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-allotment-time-table-area mt-[60px]">
                            <div className="grid grid-cols-12">
                                <div className="col-span-12">
                                    <div className="educare-timetable-notice gap-[15px] py-[15px] px-[15px] maxXs:py-[20px] maxXs:px-[20px] rounded-lg bg-white mb-[2px]">
                                        <div className="flex items-center gap-2 flex-wrap justify-between">
                                            <div className="educare-time-table-controller-title">
                                                <p className="capitalize text-danger">before make changes please take attendance</p>
                                            </div>
                                            <PrimaryButton
                                                className=" bg-warning text-white px-[10px] pt-[4px] pb-[5px] text-[14px] flex items-center gap-[5px] rounded-[5px] capitalize">
                                                (Sun Aug 27 -2023)
                                            </PrimaryButton>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="educare-time-table-controller-header flex items-center justify-between flex-wrap gap-[15px] py-[15px] px-[15px] maxXs:py-[20px] maxXs:px-[20px] rounded-lg bg-white">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <div className="educare-time-table-controller-title">
                                                <h6>Today Allocation</h6>
                                            </div>
                                            <label className="count-badge unfulfilled-badge">Total Period:<strong className="count-badge-title"> 3</strong></label>
                                        </div>
                                        <div className="educare-time-table-controller-select flex justify-end maxXs:justify-start items-center flex-wrap gap-[8px]">
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="table_controller_class"
                                                    data_label="Teacher"
                                                    data={[]}
                                                    ref={titleInput}
                                                    value={data.table_controller_class}
                                                    onChange={(e) =>
                                                        setData(
                                                            "table_controller_class",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block w-full"
                                                />

                                                <InputError
                                                    message={errors.table_controller_class}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-input-field-styles">
                                                <SelectInput
                                                    id="table_controller_shift"
                                                    data_label="Morning"
                                                    data={[]}
                                                    ref={titleInput}
                                                    value={data.table_controller_shift}
                                                    onChange={(e) =>
                                                        setData(
                                                            "table_controller_shift",
                                                            e.target.value
                                                        )
                                                    }
                                                    type="text"
                                                    className="block w-full"
                                                />

                                                <InputError
                                                    message={errors.table_controller_shift}
                                                    className="mt-2"
                                                />
                                            </div>
                                            <div className="educare-time-table-controller-quick-button">
                                                <PrimaryButton
                                                    className="bg-primary text-white px-[10px] pt-[4px] pb-[5px] text-[14px] flex items-center gap-[5px] rounded-[5px] capitalize">
                                                    All Teacher
                                                </PrimaryButton>
                                                <Transition
                                                    show={recentlySuccessful}
                                                    enter="transition ease-in-out"
                                                    enterFrom="opacity-0"
                                                    leave="transition ease-in-out"
                                                    leaveTo="opacity-0"
                                                >
                                                    <p className="text-sm text-gray-600">Reset</p>
                                                </Transition>
                                            </div>
                                            <div className="educare-time-table-controller-quick-button">
                                                <PrimaryButton
                                                    className="text-[20px] text-success"><i className="icon-FileXls"></i>
                                                </PrimaryButton>
                                                <Transition
                                                    show={recentlySuccessful}
                                                    enter="transition ease-in-out"
                                                    enterFrom="opacity-0"
                                                    leave="transition ease-in-out"
                                                    leaveTo="opacity-0"
                                                >
                                                    <p className="text-sm text-gray-600">Reset</p>
                                                </Transition>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-12">
                                    <div className="educare-time-table-controller-wrapper maxXs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 1</h6>
                                                        <p className="text-[14px]">7:00 AM - 7:45 AM</p>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 2</h6>
                                                        <p className="text-[14px]">8:00 AM - 8:45 AM</p>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 3</h6>
                                                        <p className="text-[14px]">9:00 AM - 9:45 AM</p>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        Standard First A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Standard First B
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Standard First C
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        XI A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        XII A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        XI B
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        XII B
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        First A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        First B
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Second A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Second B
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-report-class-timetable-area mt-[60px]">
                            <div className="col-span-12">
                                <div className="educare-time-table-controller-header flex items-center justify-between flex-wrap gap-[15px] py-[15px] px-[15px] maxXs:py-[20px] maxXs:px-[20px] rounded-lg bg-white">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <div className="educare-time-table-controller-title">
                                            <h6>Create Class Time Table</h6>
                                        </div>
                                        <label className="count-badge unfulfilled-badge">Total Period:<strong className="count-badge-title"> 3</strong></label>
                                    </div>
                                    <div className="educare-time-table-controller-select flex justify-end maxXs:justify-start items-center flex-wrap gap-[8px]">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="table_controller_class"
                                                data_label="Class"
                                                data={[]}
                                                ref={titleInput}
                                                value={data.table_controller_class}
                                                onChange={(e) =>
                                                    setData(
                                                        "table_controller_class",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block w-full"
                                            />

                                            <InputError
                                                message={errors.table_controller_class}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="table_controller_shift"
                                                data_label="Morning"
                                                data={[]}
                                                ref={titleInput}
                                                value={data.table_controller_shift}
                                                onChange={(e) =>
                                                    setData(
                                                        "table_controller_shift",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block w-full"
                                            />

                                            <InputError
                                                message={errors.table_controller_shift}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-time-table-controller-quick-button">
                                            <PrimaryButton
                                                className="bg-primary text-white px-[10px] pt-[4px] pb-[5px] text-[14px] flex items-center gap-[5px] rounded-[5px] capitalize">
                                                save time table
                                            </PrimaryButton>
                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">Reset</p>
                                            </Transition>
                                        </div>
                                        <div className="educare-time-table-controller-quick-button">
                                            <PrimaryButton
                                                className="text-[20px] text-danger"><i className="icon-FilePdf"></i>
                                            </PrimaryButton>
                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">Reset</p>
                                            </Transition>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-[20px]">
                                <div className="col-span-12">
                                    <div className="educare-time-table-controller-wrapper maxXs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 1</h6>
                                                        <p className="text-[14px]">7:00 AM - 7:45 AM</p>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 2</h6>
                                                        <p className="text-[14px]">8:00 AM - 8:45 AM</p>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 3</h6>
                                                        <p className="text-[14px]">9:00 AM - 9:45 AM</p>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 4</h6>
                                                        <p className="text-[14px]">10:00 AM - 11:45 AM</p>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        Monday
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-between items-center">
                                                            <span className="px-[5px] py-[5px] bg-success text-white rounded-[4px] w-full text-center">Computer</span>
                                                            <span className="w-[100px] text-center"><i className="icon-CaretDoubleRight"></i></span>
                                                            <span className="px-[5px] py-[5px] bg-info text-white rounded-[4px] w-full text-center">Shamim</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-between items-center">
                                                            <span className="px-[5px] py-[5px] bg-success text-white rounded-[4px] w-full text-center">Computer</span>
                                                            <span className="w-[100px] text-center"><i className="icon-CaretDoubleRight"></i></span>
                                                            <span className="px-[5px] py-[5px] bg-info text-white rounded-[4px] w-full text-center">Shamim</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-between items-center">
                                                            <span className="px-[5px] py-[5px] bg-success text-white rounded-[4px] w-full text-center">Computer</span>
                                                            <span className="w-[100px] text-center"><i className="icon-CaretDoubleRight"></i></span>
                                                            <span className="px-[5px] py-[5px] bg-info text-white rounded-[4px] w-full text-center">Shamim</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-between items-center">
                                                            <span className="px-[5px] py-[5px] bg-success text-white rounded-[4px] w-full text-center">Computer</span>
                                                            <span className="w-[100px] text-center"><i className="icon-CaretDoubleRight"></i></span>
                                                            <span className="px-[5px] py-[5px] bg-info text-white rounded-[4px] w-full text-center">Shamim</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Tuesday
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Wednesday
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Thursday
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Friday
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Saturday
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-report-teacher-timetable-area mt-[60px]">
                            <div className="col-span-12">
                                <div className="educare-time-table-controller-header flex items-center justify-between flex-wrap gap-[15px] py-[15px] px-[15px] maxXs:py-[20px] maxXs:px-[20px] rounded-lg bg-white">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <div className="educare-time-table-controller-title">
                                            <h6>Create Teacher Time Table</h6>
                                        </div>
                                        <label className="count-badge unfulfilled-badge">Total Period:<strong className="count-badge-title"> 3</strong></label>
                                    </div>
                                    <div className="educare-time-table-controller-select flex justify-end maxXs:justify-start items-center flex-wrap gap-[8px]">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="table_controller_class"
                                                data_label="Class"
                                                data={[]}
                                                ref={titleInput}
                                                value={data.table_controller_class}
                                                onChange={(e) =>
                                                    setData(
                                                        "table_controller_class",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block w-full"
                                            />

                                            <InputError
                                                message={errors.table_controller_class}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="table_controller_shift"
                                                data_label="Morning"
                                                data={[]}
                                                ref={titleInput}
                                                value={data.table_controller_shift}
                                                onChange={(e) =>
                                                    setData(
                                                        "table_controller_shift",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block w-full"
                                            />

                                            <InputError
                                                message={errors.table_controller_shift}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-time-table-controller-quick-button">
                                            <PrimaryButton
                                                className="bg-primary text-white px-[10px] pt-[4px] pb-[5px] text-[14px] flex items-center gap-[5px] rounded-[5px] capitalize">
                                                save time table
                                            </PrimaryButton>
                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">Reset</p>
                                            </Transition>
                                        </div>
                                        <div className="educare-time-table-controller-quick-button">
                                            <PrimaryButton
                                                className="text-[20px] text-danger"><i className="icon-FilePdf"></i>
                                            </PrimaryButton>
                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">Reset</p>
                                            </Transition>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-[20px]">
                                <div className="col-span-12">
                                    <div className="educare-time-table-controller-wrapper maxXs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 1</h6>
                                                        <p className="text-[14px]">7:00 AM - 7:45 AM</p>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 2</h6>
                                                        <p className="text-[14px]">8:00 AM - 8:45 AM</p>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 3</h6>
                                                        <p className="text-[14px]">9:00 AM - 9:45 AM</p>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Period - 4</h6>
                                                        <p className="text-[14px]">10:00 AM - 11:45 AM</p>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        Monday
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-between items-center">
                                                            <span className="px-[5px] py-[5px] bg-success text-white rounded-[4px] w-full text-center">Computer</span>
                                                            <span className="w-[100px] text-center"><i className="icon-CaretDoubleRight"></i></span>
                                                            <span className="px-[5px] py-[5px] bg-info text-white rounded-[4px] w-full text-center">Shamim</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-between items-center">
                                                            <span className="px-[5px] py-[5px] bg-success text-white rounded-[4px] w-full text-center">Computer</span>
                                                            <span className="w-[100px] text-center"><i className="icon-CaretDoubleRight"></i></span>
                                                            <span className="px-[5px] py-[5px] bg-info text-white rounded-[4px] w-full text-center">Shamim</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-between items-center">
                                                            <span className="px-[5px] py-[5px] bg-success text-white rounded-[4px] w-full text-center">Computer</span>
                                                            <span className="w-[100px] text-center"><i className="icon-CaretDoubleRight"></i></span>
                                                            <span className="px-[5px] py-[5px] bg-info text-white rounded-[4px] w-full text-center">Shamim</span>
                                                        </div>
                                                    </td>
                                                    <td>
                                                        <div className="flex justify-between items-center">
                                                            <span className="px-[5px] py-[5px] bg-success text-white rounded-[4px] w-full text-center">Computer</span>
                                                            <span className="w-[100px] text-center"><i className="icon-CaretDoubleRight"></i></span>
                                                            <span className="px-[5px] py-[5px] bg-info text-white rounded-[4px] w-full text-center">Shamim</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Tuesday
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Wednesday
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Thursday
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Friday
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        Saturday
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                    <td>
                                                        N/A
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="educare-report-teacher-vacant-timetable-area mt-[60px]">
                            <div className="col-span-12">
                                <div className="educare-timetable-notice gap-[15px] py-[15px] px-[15px] maxXs:py-[20px] maxXs:px-[20px] rounded-lg bg-white mb-[2px]">
                                    <div className="flex items-center gap-2 flex-wrap justify-between">
                                        <div className="educare-time-table-controller-title">
                                            <h6>Vacant Teacher</h6>
                                        </div>
                                        <PrimaryButton
                                            className=" bg-warning text-white px-[10px] pt-[4px] pb-[5px] text-[14px] flex items-center gap-[5px] rounded-[5px] capitalize">
                                            (Sun Aug 27 -2023)
                                        </PrimaryButton>
                                    </div>
                                </div>
                            </div>
                            <div className="col-span-12">
                                <div className="educare-time-table-controller-header flex items-center justify-between flex-wrap gap-[15px] py-[15px] px-[15px] maxXs:py-[20px] maxXs:px-[20px] rounded-lg bg-white">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <label className="count-badge unfulfilled-badge">Total Period:<strong className="count-badge-title"> 3</strong></label>
                                    </div>
                                    <div className="educare-time-table-controller-select flex justify-end maxXs:justify-start items-center flex-wrap gap-[8px]">
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="table_controller_class"
                                                data_label="Class"
                                                data={[]}
                                                ref={titleInput}
                                                value={data.table_controller_class}
                                                onChange={(e) =>
                                                    setData(
                                                        "table_controller_class",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block w-full"
                                            />

                                            <InputError
                                                message={errors.table_controller_class}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-input-field-styles">
                                            <SelectInput
                                                id="table_controller_shift"
                                                data_label="Morning"
                                                data={[]}
                                                ref={titleInput}
                                                value={data.table_controller_shift}
                                                onChange={(e) =>
                                                    setData(
                                                        "table_controller_shift",
                                                        e.target.value
                                                    )
                                                }
                                                type="text"
                                                className="block w-full"
                                            />

                                            <InputError
                                                message={errors.table_controller_shift}
                                                className="mt-2"
                                            />
                                        </div>
                                        <div className="educare-time-table-controller-quick-button">
                                            <PrimaryButton
                                                className="bg-primary text-white px-[10px] pt-[4px] pb-[5px] text-[14px] flex items-center gap-[5px] rounded-[5px] capitalize">
                                                save time table
                                            </PrimaryButton>
                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">Reset</p>
                                            </Transition>
                                        </div>
                                        <div className="educare-time-table-controller-quick-button">
                                            <PrimaryButton
                                                className="text-[20px] text-danger"><i className="icon-FilePdf"></i>
                                            </PrimaryButton>
                                            <Transition
                                                show={recentlySuccessful}
                                                enter="transition ease-in-out"
                                                enterFrom="opacity-0"
                                                leave="transition ease-in-out"
                                                leaveTo="opacity-0"
                                            >
                                                <p className="text-sm text-gray-600">Reset</p>
                                            </Transition>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-12 gap-[20px]">
                                <div className="col-span-12">
                                    <div className="educare-time-table-controller-wrapper maxXs:overflow-x-auto">
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th>
                                                        Sl:No
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Teacher name</h6>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Gendder</h6>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Employer Name</h6>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Phone</h6>
                                                    </th>
                                                    <th>
                                                        <h6 className="text-[16px] mb-[3px]">Teacher Subject Class</h6>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        01
                                                    </td>
                                                    <td>
                                                        Select shift & period!
                                                    </td>
                                                    <td>
                                                        Male
                                                    </td>
                                                    <td>
                                                        Mr. Harry Lushbaugh
                                                    </td>
                                                    <td>
                                                        +911846076872
                                                    </td>
                                                    <td>
                                                        Physic
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        02
                                                    </td>
                                                    <td>
                                                        Select shift & period!
                                                    </td>
                                                    <td>
                                                        Male
                                                    </td>
                                                    <td>
                                                        Mr. Harry Lushbaugh
                                                    </td>
                                                    <td>
                                                        +911846076872
                                                    </td>
                                                    <td>
                                                        Physic
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        03
                                                    </td>
                                                    <td>
                                                        Select shift & period!
                                                    </td>
                                                    <td>
                                                        Male
                                                    </td>
                                                    <td>
                                                        Mr. Harry Lushbaugh
                                                    </td>
                                                    <td>
                                                        +911846076872
                                                    </td>
                                                    <td>
                                                        Physic
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        04
                                                    </td>
                                                    <td>
                                                        Select shift & period!
                                                    </td>
                                                    <td>
                                                        Male
                                                    </td>
                                                    <td>
                                                        Mr. Harry Lushbaugh
                                                    </td>
                                                    <td>
                                                        +911846076872
                                                    </td>
                                                    <td>
                                                        Physic
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        05
                                                    </td>
                                                    <td>
                                                        Select shift & period!
                                                    </td>
                                                    <td>
                                                        Male
                                                    </td>
                                                    <td>
                                                        Mr. Harry Lushbaugh
                                                    </td>
                                                    <td>
                                                        +911846076872
                                                    </td>
                                                    <td>
                                                        Physic
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AssignSubjectTeacherInnerLayout;
