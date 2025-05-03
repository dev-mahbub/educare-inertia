import Dropdown from '@/Components/Dropdown';
import PrimaryButton from '@/Components/PrimaryButton';
import { Link, router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';

const TemplateList = ({ templates }) => {

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
                router.delete(route('sms_setting.delete_template', id));
            }
        });
    }

    return (
        <div className="educare-admission-list">
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Template</th>
                        <th>Context</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {templates?.length > 0 ?
                        templates?.map((item, index) => (
                            <tr key={index}>
                                <td>{item?.id}</td>
                                <td>{item?.title}</td>
                                <td>{item?.description.length > 20 ? item?.description.slice(0, 20) + '...' : item?.description}</td>
                                <td>{item?.context}</td>
                                <td>
                                    <div className="educare-admission-list-action-btn">
                                        <div className="educare-list-button-field-styles">
                                            <Tooltip title="Edit" placement="top" arrow>
                                                <Link href={route('sms_setting.edit_template', item.id)} className="bg-supportingC/80 inline-block">
                                                    <i className="icon-pen"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                        <div className="educare-list-button-field-styles hidden">
                                            <Tooltip title="View" placement="top" arrow>
                                                <Link href="#" className="bg-supportingC/80 inline-block">
                                                    <i className="icon-eye"></i>
                                                </Link>
                                            </Tooltip>
                                        </div>
                                        <div className="educare-list-button-field-styles">
                                            <PrimaryButton
                                                type="button"
                                                className="bg-danger/80 inline-block"
                                                onClick={(e) => handleDelete(item.id)}
                                            >
                                                <i className="icon-TrashSimple"></i>
                                            </PrimaryButton>
                                        </div>
                                        <div className="educare-list-button-field-styles hidden">
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
                                                    <Dropdown.Link href="#">
                                                        <i className="icon-UploadSimple text-[20px] text-supportingA"></i>{" "}
                                                        Send sms
                                                    </Dropdown.Link>
                                                    <Dropdown.Link href="#">
                                                        <i className="icon-notifications text-[20px] text-supportingA"></i>{" "}
                                                        Send notification
                                                    </Dropdown.Link>
                                                    <Dropdown.Link href="#">
                                                        <i className="icon-Notebook text-[20px] text-supportingA"></i>{" "}
                                                        Student work
                                                    </Dropdown.Link>
                                                    <Dropdown.Link href="#">
                                                        <i className="icon-DownloadSimple text-[20px] text-supportingA"></i>{" "}
                                                        Download
                                                    </Dropdown.Link>
                                                </Dropdown.Content>
                                            </Dropdown>
                                        </div>
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
    );
};

export default TemplateList;
