import { router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';

const ResultCardExamGroupingList = ({
    setEditableData,
    setMode,
    examGroups,
    resetFormData,
    data
}) => {

    const handleEditList = (id) => {
        const selectedData = examGroups.find((item) => item.id == id);
        setEditableData(selectedData);
        setMode('edit');
    }

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
            if(result.isConfirmed){
                router.delete(route('result_card.exam_group_delete', id), {
                    onSuccess: () => {
                        resetFormData();
                        setEditableData({});
                    }
                });
            }
        });
    }

    // handle download excel start
    const handleDownloadExcel = () => {
        const params = {
            report_card_id: data?.report_card_type ?? ""
        }

        const url = route('export_excel.exam_group', params);

        window.open(url);
    }
    // handle download excel end

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Report Card Grouping
                </h5>
            </div>
            <div>
                <Tooltip
                    title="Download Excel"
                    placement="top"
                    arrow
                    as="button"
                >
                    <button
                        type='button'
                        className="educare-success-btn-md-fill"
                        onClick={handleDownloadExcel}
                    >
                        <i className="icon-FileX"></i>
                    </button>
                </Tooltip>
            </div>
            <div className="educare-default-table xs:overflow-x-auto">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Parent</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Weightage</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {examGroups?.length > 0 ?
                            examGroups?.map((item, index) => (
                                <tr key={index}>
                                    <td>{item?.display_order}</td>
                                    <td>{item?.parent_group?.title ?? ""}</td>
                                    <td>{item?.title}</td>
                                    <td>{item?.grouping_type}</td>
                                    <td>{item?.weightage}</td>
                                    <td>
                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                            <div>
                                                <Tooltip
                                                    title="Edit"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button
                                                        onClick={() => handleEditList(item.id)}
                                                        className='educare-warning-btn-sm-fill'
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
                                                        href="#"
                                                        className="educare-danger-btn-sm-fill"
                                                        as="button"
                                                        onClick={()=>
                                                            handleDelete(item?.id)
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
                        :
                            <tr>
                                <td className="text-center text-red-500" colSpan="10">Data not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ResultCardExamGroupingList;
