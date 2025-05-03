import PrimaryButton from "@/Components/PrimaryButton";
import { router } from "@inertiajs/react";
import 'react-toastify/dist/ReactToastify.css';
import Swal from 'sweetalert2';

const SaleGroupList = ({ saleGroups = [] }) => {

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
                router.delete(route('sale_group.destroy', id));
            }
        });
    }

    // handle edit start
    const handleEdit = (id) => {
        router.post(route('sale_group.edit'), { id: id });
    }
    // handle edit end

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Sale Group <span>(Total : {saleGroups?.length})</span>
                </h5>
            </div>

            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                <table>
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Name</th>
                            <th>Items Associated</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {saleGroups?.length > 0 ?
                            saleGroups?.map((item, index) => (
                                <tr key={item?.id}>
                                    <td>{++index}</td>
                                    <td>{item?.title}</td>
                                    <td>{item?.sale_group_products?.length}</td>
                                    <td>
                                        <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                            <div className="educare-button-field-styles">
                                                {/* <PrimaryButton
                                                    // onClick={() => handleEditPopup(item)}
                                                    className="bg-warning/80 "
                                                >
                                                    <Link href={route('sale_group.edit', item?.id)}><i className="icon-pen"></i></Link>
                                                </PrimaryButton> */}
                                                <PrimaryButton
                                                    type="button"
                                                    onClick={() => handleEdit(item?.id)}
                                                    className="bg-warning/80 "
                                                >
                                                    <i className="icon-pen"></i>
                                                </PrimaryButton>
                                            </div>
                                            <div className="educare-button-field-styles">
                                                <PrimaryButton
                                                    onClick={() => handleDelete(item?.id)}
                                                    className="bg-danger/80 "
                                                >
                                                    <i className="icon-TrashSimple"></i>
                                                </PrimaryButton>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td className="text-center text-red-500" colSpan="7">Category not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SaleGroupList;
