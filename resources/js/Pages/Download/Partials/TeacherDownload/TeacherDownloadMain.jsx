import React from "react";
import TeacherDownloadFormList from "./TeacherDownloadFormList";
import { useForm } from "@inertiajs/react";
import TeacherDownloadSelectColumn from "./TeacherDownloadSelectColumn";
import TeacherDownloadSelectedColumn from "./TeacherDownloadSelectedColumn";

export default function TeacherDownloadMain() {

    const { data, setData, errors, post, reset, processing } = useForm({
        //radio download
        downloadTeacherType: "",
        //select download
        select_gender_wise: "",
        select_religious_wise: "",
        select_category_wise: "",
        select_house_wise: "",
        select_designation_wise: "",
        select_job_type_wise: "",
        select_department_wise: "",
        select_class_group_wise: "",
        //teacher download select coulumn
        teacher_first_name: "",
        teacher_last_name: "",
        teacher_full_name: "",
        teacher_biometric_code: "",
        //teacher download selected column check
        teacher_first_name_order_by: "",
        teacher_last_name_order_by: "",
        teacher_biometric_code_order_by: "",
        teacher_full_name_order_by: "",
    });



    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="4xl:col-span-4 lg:col-span-6 col-span-12">
                        <TeacherDownloadFormList
                            data={data}
                            setData={setData}
                            errors={errors}
                        />
                    </div>
                    <div className="4xl:col-span-8 lg:col-span-6 col-span-12">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-DownloadSimple"></i>
                                Custom Download
                            </h5>
                        </div>
                        <div className="educare-classroom-form-area">
                            <div className="grid grid-cols-12 gap-[20px]">
                                <div className="4xl:col-span-6 col-span-12">
                                    <TeacherDownloadSelectColumn
                                        data={data}
                                        setData={setData}
                                    />
                                </div>
                                <div className="4xl:col-span-6 col-span-12">
                                    <TeacherDownloadSelectedColumn
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
