import { router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import moment from 'moment';
import Swal from 'sweetalert2';

const VehicleList = ({
    vehicles
}) => {

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("vehicle.destroy", id));
            }
        });
    };

    // handle edit start
    const handleEdit = (id) => {
        router.post(route("vehicle.edit"), {id: id});
    }
    // handle edit end

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title leading-none">
                <h5>
                    <i className="icon-Taxi"></i>
                    Vehicles
                    <span>(Total : {vehicles?.length})</span>
                </h5>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th>Vehicle No.</th>
                            <th>Certificate Expiration</th>
                            <th>Seats</th>
                            <th>Device Id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles?.length > 0 ? (
                            vehicles?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.vehicle_number}</td>
                                    <td>
                                        <b>Registration number : {item?.registration_number}</b>
                                        {
                                            item?.registration_date
                                                ?
                                                <li className={item?.is_expired_registration_upto ? 'text-danger' : ''}>Registration expired on {item?.registration_date && moment(item?.registration_date).format("DD MMM, YYYY")}</li>
                                                :
                                                <li>Registration date not set yet.</li>
                                        }

                                        {
                                            item?.permit_upto
                                                ?
                                                <li className={item?.is_expired_permit_upto ? 'text-danger' : ''}>Permit expired on {item?.permit_upto && moment(item?.permit_upto).format("DD MMM, YYYY")}</li>
                                                :
                                                <li>Permit date not set yet.</li>
                                        }

                                        {
                                            item?.pollution_upto
                                                ?
                                                <li className={item?.is_expired_pollution_upto ? 'text-danger' : ''}>Permit expired on {item?.pollution_upto && moment(item?.pollution_upto).format("DD MMM, YYYY")}</li>
                                                :
                                                <li>Pollution date not set yet.</li>
                                        }

                                        {
                                            item?.road_tax_upto
                                                ?
                                                <li className={item?.is_expired_road_tax_upto ? 'text-danger' : ''}>Road tax expired on {item?.road_tax_upto && moment(item?.road_tax_upto).format("DD MMM, YYYY")}</li>
                                                :
                                                <li>Road tax date not set yet.</li>
                                        }

                                        {
                                            item?.insurance_upto
                                                ?
                                                <li className={item?.is_expired_insurance_upto ? 'text-danger' : ''}>Insurance tax expired on {item?.insurance_upto && moment(item?.insurance_upto).format("DD MMM, YYYY")}</li>
                                                :
                                                <li>Insurance date not set yet.</li>
                                        }

                                    </td>
                                    <td>{item?.total_seat}</td>
                                    <td>{item?.device_id}</td>
                                    <td>
                                        <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                            <div>
                                                <Tooltip
                                                    title="Edit"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            handleEdit(item?.id)
                                                        }}
                                                        className="educare-warning-btn-sm-fill"
                                                    >
                                                        <i className="icon-editing"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                            <div>
                                                <Tooltip
                                                    title="Delete"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        className="educare-danger-btn-sm-fill"
                                                        onClick={() =>
                                                            handleDelete(
                                                                item.id
                                                            )
                                                        }
                                                    >
                                                        <i className="icon-TrashSimple"></i>
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

export default VehicleList;
