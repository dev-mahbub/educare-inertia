import { concatName } from "@/Hooks/GlobalFunction";


const VacantTeacherList = ({
    currentDate,
    teachers,
    totalTeacherCount
}) => {
    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="flex justify-between items-center mb-2.5 gap-5 flex-wrap">
                        <div className="educare-card-title">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Vacant Teachers
                            </h5>
                        </div>
                        <h5 className="bg-info px-4 py-[4px] text-white rounded-[6px] items-center">{currentDate}</h5>
                    </div>
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sr. No.</th>
                                        <th>Teacher Name</th>
                                        <th>Gender</th>
                                        <th>Employee Id</th>
                                        <th>Phone</th>
                                        <th>Teacher Subject Class</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {totalTeacherCount > 0 ?
                                        teachers.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{concatName(item?.first_name, item?.middle_name, item?.last_name)}</td>
                                                <td>{item?.gender}</td>
                                                <td>{item?.employee_id}</td>
                                                <td>{item?.phone}</td>
                                                <td>
                                                    {item?.classroom_subjects?.length > 0 &&
                                                        item?.classroom_subjects.map((classroomSubject, innerIndex) => (
                                                            <div key={innerIndex}><strong>{classroomSubject?.subject_title}</strong> - {classroomSubject?.classroom_title}</div>
                                                        ))
                                                    }
                                                </td>
                                            </tr>
                                        ))
                                    :
                                        <tr>
                                            <td
                                                className="text-center text-red-500"
                                                colSpan="6"
                                            >
                                                Data not found
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VacantTeacherList;
