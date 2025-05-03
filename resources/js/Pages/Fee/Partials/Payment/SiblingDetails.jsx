import { Tooltip } from '@mui/material';

const SiblingDetails = ({
    siblings = [],
    getStudentFeeInstallments
}) => {

    const hanldeGetStudentFeeInstallments = (id) => {
        const form_data = {
            student_id: id,
            request_type: "fetch_fee_installments",
        }

        getStudentFeeInstallments(form_data);
    }

    return (
        <div className="educare-classroom-table-wrapper">
             <div className="educare-card-title">
                <h5>
                    <i className="icon-man"></i>
                    Sibling Details
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Class</th>
                            <th>Roll Number</th>
                            <th>Adm. Number</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {siblings?.length > 0 ? (
                            siblings?.map((item, index) => (
                                <tr key={index}>
                                    <td>{`${item?.first_name ?? ""} ${item?.middle_name ?? ""} ${item?.last_name ?? ""}`}</td>
                                    <td>{item?.classroom?.title ?? ""}</td>
                                    <td>{item?.classroom_roll?.roll_no ?? ""}</td>
                                    <td>{item?.admission_no}</td>
                                    <td>
                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                            <div>
                                                <Tooltip
                                                    title="Edit"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        type="button"
                                                        className="educare-warning-btn-sm-fill"
                                                        onClick={(e) => {
                                                            hanldeGetStudentFeeInstallments(item?.id)
                                                        }}
                                                    >
                                                        <i className="icon-editing"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                                <tr>
                                    <td
                                        className="text-center text-red-500"
                                        colSpan="7"
                                    >
                                        Data not found
                                    </td>
                                </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SiblingDetails;
