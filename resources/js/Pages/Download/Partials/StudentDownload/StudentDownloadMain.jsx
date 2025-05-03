import React from "react";
import StudentDownloadFormList from "./StudentDownloadFormList";
import StudentDownloadSelectColumn from "./StudentDownloadSelectColumn";
import StudentDownloadSelectedColumn from "./StudentDownloadSelectedColumn";
import { useForm } from "@inertiajs/react";

export default function StudentDownloadMain() {
    const { data, setData, errors, post, reset, processing } = useForm({
        //student from list 
        select_academic_year: "",
        select_all_active_inactive_tc: "",
        studentType: "class_wise",
        //checkbox
        select_all_student_id: "",
        student_one_id: false,
        student_two_id: false,
        //
        student_name: "",
        admission_number: "",
        //selected column check
        student_name_orderby: "",
        admission_number_orderby: "",
    });



    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="4xl:col-span-4 lg:col-span-6 col-span-12">
                        <StudentDownloadFormList
                            data={data}
                            setData={setData}
                            errors={errors}
                        />
                    </div>
                    <div className="4xl:col-span-8 lg:col-span-6 col-span-12">
                        <div className="educare-classroom-form-area">
                            <div className="grid grid-cols-12 gap-[20px]">
                                <div className="xl:col-span-6 col-span-12">
                                    <StudentDownloadSelectColumn
                                        data={data}
                                        setData={setData}
                                    />
                                </div>
                                <div className="xl:col-span-6 col-span-12">
                                    <StudentDownloadSelectedColumn
                                        data={data}
                                        setData={setData}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
