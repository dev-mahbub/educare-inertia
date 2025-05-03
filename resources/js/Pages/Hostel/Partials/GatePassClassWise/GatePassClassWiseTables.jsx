import Loader from "@/Components/Loader";
import { concatName } from "@/Hooks/GlobalFunction";
import { router } from "@inertiajs/react";
import { useEffect, useState } from "react";

const GatePassClassWiseTables = ({
    classroomData = [],
    gatePass = [],
}) => {
    const [loading, setLoading] = useState(false);
    const [activeItem, setActiveItem] = useState('');

    const handleStudent = (id) => {
        setActiveItem(id);
        router.post(route('hostel.gate_pass_class_wise'), { 'classroom_id': id })
        setLoading(false);
    }

    useEffect(() => {
        setLoading(false);
    }, [gatePass])

    return (
        <>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 xl:col-span-4 lg:col-span-3">
                    <div className="educare-card-title mr-auto pb-none mb-2.5">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Class Wise GatePass
                        </h5>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Class</th>
                                    <th>Gatepass</th>
                                </tr>
                            </thead>
                            <tbody>
                                {classroomData?.length > 0 ?
                                    classroomData?.map((item, index) => (
                                        <tr className={`${activeItem === item?.id ? 'educare-table-row-active' : ''}`} key={index}>
                                            <td>{item?.title}</td>
                                            <td>
                                                <button
                                                    onClick={(e) => handleStudent(item?.id)}
                                                    className="font-semibold text-primary"
                                                >
                                                    {item?.student_gate_pass_count}
                                                </button>
                                            </td>
                                        </tr>
                                    )) :
                                    <tr>
                                        <td className="text-center text-red-500" colSpan="12">Data not found</td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="col-span-12 xl:col-span-8 lg:col-span-9">
                    <div className="educare-card-title mr-auto pb-none mb-2.5">
                        <h5>
                            <i className="icon-user"></i>
                            GatePass Details
                        </h5>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Student Name</th>
                                    <th>Class</th>
                                    <th>Guardian Name</th>
                                    <th>Phone</th>
                                    <th>Relation</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <Loader></Loader>
                            ) : (
                                <tbody>
                                    {gatePass?.length > 0 ? (
                                        gatePass?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{concatName(item?.student?.first_name, item?.student?.middle_name, item?.student?.last_name)}</td>
                                                <td>{item?.classroom?.title}</td>
                                                <td>{item?.visiting_person}</td>
                                                <td>{item?.phone}</td>
                                                <td>{item?.relation_type}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="12">
                                                Data not found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GatePassClassWiseTables;
