import RadioInput from "@/Components/RadioInput";
import React, { useEffect, useState } from "react";
import { useForm } from '@inertiajs/react';


const AllocationTable = ({ selectedItem }) => {
    const [rooms, setRooms] = useState([])
    //get data from selectedItem and set subitem in rooms state
    useEffect(() => {
        setRooms(selectedItem?.beds || null)
    }, [selectedItem?.beds?.length])

    //validation
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        integrated_account: "",
    });



    return (
        <>
            <div className="educare-admission-list-inner-wrapper">
                <div className="educare-admission-list">
                    <table>
                        <thead>
                            <tr>
                                <th>checked</th>
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
                            {rooms?.length > 0 ? (
                                <>
                                    {rooms?.map((item, index) => (
                                        <tr key={index}>
                                            <td>
                                                <div className="educare-radio-field-styles flex gap-3">
                                                    <RadioInput
                                                        name={`integrated_account_${index}`}
                                                        value=""
                                                        checked={data.integrated_account === `on_${index}`}
                                                        onChange={() =>
                                                            setData("integrated_account", `on_${index}`)
                                                        }
                                                    />
                                                </div>
                                            </td>
                                            <td>
                                                {item?.status === "Available" ? (
                                                    <span className='badge success'>{item.status}</span>
                                                ) : (
                                                    <span className='badge danger'>{item.status}</span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-start">
                                                    <i className="icon-Bed"></i>
                                                    <span className="font-semibold ml-1">{item.bed_no}</span>
                                                </div>
                                            </td>
                                            <td>{item.roomType}</td>
                                            <td>{item.studentName}</td>
                                            <td>{item.class}</td>
                                            <td>{item.fatherName}</td>
                                            <td>{item.mobile}</td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <tr>
                                    <td colSpan={8} className="text-center">Data not found</td>
                                </tr>
                            )}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AllocationTable;
