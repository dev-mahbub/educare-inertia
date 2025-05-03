import PrimaryButton from "@/Components/PrimaryButton";
import { Link, router } from "@inertiajs/react";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';



export default function ClassNamesList({ classNames }) {

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
                router.delete(route('class_name.destroy', id));
            }
        });
    }

    const handleDeleteDisableMessage = (id) => {
        Swal.fire({
            title: 'Warning message',
            text: 'You will not be able to delete this item. Already It has been created class. You can only inactive it',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, inactive it!',
        }).then((result) => {
            // warning
        });
    }

    let titles = "";

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="educare-card-title flex items-center gap-2.5">
                    <div className="educare-card-back-btn">
                        <Link href={route('classroom.time_table_list')}><i className="icon-ArrowLeft"></i> Back</Link>
                    </div>
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Class list <span>(Total : {classNames?.length})</span>
                    </h5>
                </div>

                <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                    <table>
                        <thead>
                            <tr>
                                <th>Sl. No</th>
                                <th>Class</th>
                                <th>Sections</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {classNames?.length > 0 ?
                                classNames?.map((item, indx) => (
                                    <tr key={item?.id}>
                                        <td>{indx + 1}</td>
                                        <td>{item?.title}</td>
                                        <td>{item?.sections}</td>
                                        <td>
                                            <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                <div className="educare-button-field-styles">
                                                    <PrimaryButton
                                                        className="bg-warning/80 "
                                                    >
                                                        <Link href={route('class_name.edit', item?.id)} className="bg-supportingB/80 inline-block">
                                                            <i className="icon-editing"></i>
                                                        </Link>
                                                        <i className="icon-pen"></i>
                                                    </PrimaryButton>
                                                    {/* <div className="educare-list-button-field-styles">
                                                                    <Tooltip title="Edit" placement="top" arrow>

                                                                    </Tooltip>
                                                                </div> */}
                                                </div>
                                                <div className={`educare-button-field-styles ${item.classrooms?.length}`}>
                                                    {/* {(item.classrooms?.length > 0) ? */}
                                                    {item?.can_delete == false ?
                                                    <PrimaryButton className="bg-danger/80" type="button" onClick={() => handleDeleteDisableMessage(item.id)}>
                                                        <i className="icon-TrashSimple"></i>
                                                    </PrimaryButton>
                                                    :
                                                    <PrimaryButton
                                                        onClick={() => handleDelete(item.id)}
                                                        className="bg-danger/80 ">
                                                        <i className="icon-TrashSimple"></i>
                                                    </PrimaryButton>
                                                    }
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )) :
                                <tr>
                                    <td className="text-center text-red-500" colSpan="7">Class not found</td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
