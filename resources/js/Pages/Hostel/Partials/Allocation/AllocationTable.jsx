import React, { useState } from "react";
import { Tooltip } from "@mui/material";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import { router, useForm, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import Swal from "sweetalert2";
import SelectInput from "@/Components/SelectInput";
import SelectInput2 from "@/Components/SelectInput2";
import RadioInput from "@/Components/RadioInput";

export default function AllocationTable({
    currentLavelId = '',
    studentBedDetails = [],
    data,
    setData,
    errors,
    post,
    reset,
    processing,
}) {

    const [infraLevelData, setInfraLevelData] = useState(studentBedDetails);

    useEffect(() => {
        setInfraLevelData(studentBedDetails);
    }, [studentBedDetails]);



    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="educare-admission-list-inner-wrapper">
                    <div className="educare-admission-list">
                        <table className="pb-[300px]">
                            <thead>
                                <tr>
                                    <th>Status</th>
                                    <th>Bed No.</th>
                                    <th>Room Type</th>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Father Name</th>
                                    <th>Mobile</th>
                                </tr>
                            </thead>
                            <tbody>
                                {infraLevelData?.length > 0 ?
                                    infraLevelData?.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="educare-radio-field-styles flex gap-3">
                                                    {item?.is_have_student ? '' :
                                                        <RadioInput
                                                            name="hostel_infra_level_id"
                                                            checked={data.hostel_infra_level_id === item?.id}
                                                            onChange={() =>
                                                                setData("hostel_infra_level_id", item?.id)
                                                            }
                                                        />
                                                    }
                                                    {item?.is_have_student ? (
                                                        <span className='badge danger'>Not Available</span>
                                                    ) : (
                                                        <span className='badge success'>Available</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td>{item?.bed_no}</td>
                                            <td>{item?.room_type}</td>
                                            <td>{item?.student_name}</td>
                                            <td>{item?.classroom_title}</td>
                                            <td>{item?.father_name}</td>
                                            <td>{item?.father_mobile}</td>
                                        </tr>
                                    )) :
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}
