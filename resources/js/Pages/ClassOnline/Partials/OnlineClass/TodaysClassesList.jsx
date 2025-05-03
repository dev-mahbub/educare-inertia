import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import moment from 'moment';
import Swal from 'sweetalert2';

const TodaysClassesList = ({
    today_online_class,
    currentDate
 }) => {

    const handleDelete = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route('online_class.destroy', id));
            }
        });
    }


    // check if class time expired
    function isClassTimeExpired(start_date, end_time) {
        const classDateTimeString = `${start_date}T${end_time}`;
        const classDateTime = new Date(classDateTimeString);
        const current_date = new Date(currentDate);

        return classDateTime < current_date;
    }

    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Sl No.</th>
                                        <th>Till date</th>
                                        <th>Repeatable days</th>
                                        <th>Start Date</th>
                                        <th>Start time</th>
                                        <th>End time</th>
                                        <th>Class</th>
                                        <th>Subject</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {today_online_class?.length ?
                                        today_online_class?.map((item, index) => (
                                            <tr key={item?.id}>
                                                <td>{index + 1}</td>
                                                <td>{item?.repeat_date && moment(item?.repeat_date).format("MMM DD, YYYY")}</td>
                                                <td>
                                                    <span className='repeatable-days'>{item?.repeatable_days}</span>
                                                </td>
                                                <td>{item?.start_date && moment(item?.start_date).format("MMM DD, YYYY")}</td>
                                                <td>{item?.start_time && moment(item?.start_time, "HH:mm:ss").format("h:mm A")}</td>
                                                <td>{item?.end_time && moment(item?.end_time, "HH:mm:ss").format("h:mm A")}</td>
                                                <td>{item?.classroom?.title}</td>
                                                <td>{item?.subject?.title}</td>
                                                <td>
                                                    <div className="educare-admission-list-action-btn">
                                                        <div className="educare-list-button-field-styles">
                                                            <Tooltip title="Edit" placement="top" arrow>
                                                                <Link href={route('online_class.edit', item?.id)} className="bg-supportingB/80 inline-block">
                                                                    <i className="icon-editing"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div>
                                                        {/* <div className="educare-list-button-field-styles">
                                                            <Tooltip title="View" placement="top" arrow>
                                                                <Link href="#" className="bg-supportingC/80 inline-block">
                                                                    <i className="icon-eye"></i>
                                                                </Link>
                                                            </Tooltip>
                                                        </div> */}
                                                        <div className="educare-list-button-field-styles">
                                                            <PrimaryButton
                                                                onClick={() => handleDelete(item.id)}
                                                                className="bg-danger/80 "
                                                            >
                                                                <i className="icon-TrashSimple"></i>
                                                            </PrimaryButton>

                                                        </div>
                                                        {isClassTimeExpired(item?.start_date, item?.end_time) == false &&
                                                            <div className="educare-list-button-field-styles">
                                                                <Dropdown>
                                                                    <Dropdown.Trigger>
                                                                        <div
                                                                            type="button"
                                                                            className="educare-dropdown-menu"
                                                                        >
                                                                            <PrimaryButton className="bg-dark/80 inline-block">
                                                                                <i className="icon-DotsThreeOutlineVertical"></i>
                                                                            </PrimaryButton>
                                                                        </div>
                                                                    </Dropdown.Trigger>
                                                                    <Dropdown.Content>
                                                                        <a
                                                                            target='_blank'
                                                                            href={item?.live_class_url}>
                                                                            <i className="icon-UploadSimple text-[20px] text-supportingA"></i>{" "}
                                                                            Start Class
                                                                        </a>
                                                                    </Dropdown.Content>
                                                                </Dropdown>
                                                            </div>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                        :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="9">Data not found</td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div >
            </div >
        </>
    );
};

export default TodaysClassesList;
