import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";


export default function BulkUploadImageList() {

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        dummy_1: "",
        dummy_2: "",
        dummy_toggle_radio_1: "",
        staffType: "",
    });



    return (
        <>
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <div className="educare-classroom-form-area">
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-card-title">
                                    <h5>
                                    <i className="icon-upload"></i>
                                    Student Image Bulk Upload
                                    </h5>
                                </div>
                            </div>
                        </div>
                        
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="educare-classroom-table-wrapper ">
                                <div className="text-right">
                                    <Tooltip>
                                        <Link
                                            href="#"
                                            className="educare-dark-btn-md-fill"
                                        >
                                            <i className="icon-upload"></i>
                                            Upload
                                        </Link>
                                        <Link
                                            href="#"
                                            className="educare-primary-btn-md-fill ml-2"
                                        >
                                            <i className="icon-PlusCircle"></i>
                                            Choose Profile Image
                                        </Link>
                                        
                                    </Tooltip>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <div className="educare-card-title">
                                    <h5 className="text-xs ml-3">Notes: </h5>
                                    <ul className="list-disc ml-12 mt-1">
                                        <li>File name must be <strong>Admission Number</strong> of a student</li>
                                        <li>Select only 30 images for upload</li>
                                        <li>Allowed files are png, jpg, jpeg, bmp format</li>
                                        <li>Please reduce file size before upload</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <div className="educare-classroom-form-area">     
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <h5 className="font-bold">Response after upload:</h5>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <div className="educare-classroom-form-area">     
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <h5 className="font-bold">
                                <i className="icon-FileImage"></i>
                                    Valid files:
                                </h5>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
                <div className="educare-classroom-form-area">     
                    <div className="grid grid-cols-12 gap-[20px]">
                        <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                            <div className="educare-classroom-table-wrapper">
                                <h5 className="font-bold">
                                    <i className="icon-FileImage"></i>
                                    InValid files (discarded):
                                </h5>   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </>
    );
}
