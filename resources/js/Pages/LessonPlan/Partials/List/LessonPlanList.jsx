import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';

const LessonPlanList = ({ lessonPlans }) => {

    // delete
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
                router.delete(route('lesson_plan.destroy', id));
            }
        });
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
                                        <th>Sr No.</th>
                                        <th>Title</th>
                                        <th>Class</th>
                                        <th>Subject</th>
                                        <th>Start date</th>
                                        <th>End date</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lessonPlans?.length > 0 ?
                                        lessonPlans?.map((item, index) => (
                                            <tr key={index}>
                                                <td>{index+1}</td>
                                                <td>{item?.title}</td>
                                                <td>{item?.classroom_titles}</td>
                                                <td>{item?.subject?.title}</td>
                                                <td>{item?.start_date}</td>
                                                <td>{item?.end_date}</td>
                                                <td>
                                                    <div className="educare-admission-list-action-btn">
                                                        <div className="educare-list-button-field-styles">
                                                            <Tooltip title="Edit" placement="top" arrow>
                                                                <Link href={route('lesson_plan.edit', item?.id)} className="bg-supportingB/80 inline-block">
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
                                                            <Tooltip title="Delete" placement="top" arrow>
                                                                <button
                                                                    className="bg-danger/80 inline-block"
                                                                    type="button"
                                                                    onClick={() => handleDelete(item?.id)}
                                                                >
                                                                    <i className="icon-TrashSimple"></i>
                                                                </button>
                                                            </Tooltip>
                                                        </div>
                                                        {(item?.is_notification_teacher == true || item?.is_mail_teacher == true) &&
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
                                                                        {item?.is_notification_teacher == true &&
                                                                            <Dropdown.Link href="#">
                                                                                <i className="icon-notifications text-[20px] text-supportingA"></i>{" "}
                                                                                Send notification
                                                                            </Dropdown.Link>
                                                                        }

                                                                        {item?.is_mail_teacher == true &&
                                                                            <Dropdown.Link href="#">
                                                                                <i className="icon-email text-[20px] text-supportingA"></i>{" "}
                                                                                Send mail
                                                                            </Dropdown.Link>
                                                                        }
                                                                    </Dropdown.Content>
                                                                </Dropdown>
                                                            </div>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        )) :
                                        <tr>
                                            <td className="text-center text-red-500" colSpan="8">Data not found</td>
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

export default LessonPlanList;
