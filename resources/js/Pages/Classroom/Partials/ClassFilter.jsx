import React, { useRef, useState } from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import { Link, router, useForm } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import TextInput from "@/Components/TextInput";
import DatePicker from "react-datepicker";
import { Tooltip } from "@mui/material";
import { useEffect } from "react";
import SelectInput2 from "@/Components/SelectInput2";

export default function ClassFilter({
    classTitles = [],
    subjectTitles = [],
    classId = '',
    subjectId = '',
}) {

    const handleClassRoom = (classId) => {
        router.get(`/classes?class_id=${classId}`);
    }
    const handleSubject = (subjectId) => {
        router.get(`/classes?class_id=${classId}&subject_id=${subjectId}`);
    }

    return (
        <div className='educare-admission-filtar-bar-area z-[4] relative'>
            <div className="py-3 pt-[9px] educare-admission-filtar-bar">
                <div className="educare-admission-filtar-bar-filter justify-between">
                    <div className="educare-admission-filtar-bar-filter-fields-wrap relative">
                        <div className="educare-admission-filtar-bar-filter-fields items-center">
                            <div className="educare-select-field-styles">
                                <InputLabel htmlFor="classroom_id" value="" />
                                <SelectInput2
                                    id="classroom_id"
                                    data_label="class"
                                    data={classTitles}
                                    selectedData={classId}
                                    onChange={(e) =>
                                        handleClassRoom(e.target.value)
                                    }
                                    type="text"
                                    className="block"
                                />
                            </div>
                            <div className="educare-select-field-styles">
                                <InputLabel htmlFor="subject_id" value="" />
                                <SelectInput2
                                    id="subject_id"
                                    data_label="subject"
                                    data={subjectTitles}
                                    selectedData={subjectId}
                                    onChange={(e) =>
                                        handleSubject(e.target.value)
                                    }
                                    type="text"
                                    className="block"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="educare-admission-filtar-bar-filter-action">
                        <div className="educare-button-field-styles">
                            <div>
                                <Tooltip
                                    title="Excel Sheet"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <a
                                        href={route('export_excel.classes')}  
                                        className="educare-success-btn-md-fill"
                                        target="_blank"
                                    >
                                        <i className="icon-FileX"></i>
                                    </a>
                                </Tooltip>
                            </div>
                        </div>
                        <div className="educare-button-field-styles">
                            <div>
                                <Tooltip
                                    title="Reset"
                                    placement="top"
                                    arrow
                                    as="button"
                                >
                                    <Link
                                        href={route('classroom.time_table_list')}
                                        className="educare-gray-btn-md-fill"
                                    >
                                        <i className="icon-ArrowsClockwise"></i>
                                    </Link>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
