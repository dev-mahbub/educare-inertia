import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const SingleList = ({ products = [] }) => {

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
                router.delete(route('single_product.destroy', id));
            }
        });
    }

    // handle edit start
    const handleEdit = (id) => {
        router.post(route('edit_single_product.list'), {id:id});
    }
    // handle edit end

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Products <span>(Total : {products?.length})</span>
                </h5>
            </div>

            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                <table>
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Name</th>
                            <th>Group</th>
                            <th>Opening Stock</th>
                            <th>Type</th>
                            <th>Rate</th>
                            <th>GST Tax(%)</th>
                            <th>Code</th>
                            <th>Size</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products?.length > 0 ?
                            products?.map((item, index) => (
                                <tr key={item?.id}>
                                    <td>{++index}</td>
                                    <td>{item?.title?.length > 20 ? item?.title?.slice(0, 20) + '...' : item?.title}</td>
                                    <td>{item?.category_title}</td>
                                    <td>{item?.opening_stock}</td>
                                    <td>{item?.type}</td>
                                    <td>{item?.rate_per_product}</td>
                                    <td>{item?.gst_tax}</td>
                                    <td>{item?.product_code}</td>
                                    <td>{item?.product_size}</td>
                                    <td>
                                        <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                            <div className="educare-button-field-styles">
                                                {/* <PrimaryButton
                                                    className="bg-warning/80 "
                                                >
                                                    <Link
                                                        href={route('edit_single_product.list', item.id)}
                                                    >
                                                        <i className="icon-editing"></i>
                                                    </Link>
                                                </PrimaryButton> */}
                                                <PrimaryButton
                                                    className="bg-warning/80 "
                                                    type="button"
                                                    onClick={() => {
                                                        handleEdit(item?.id)
                                                    }}
                                                >
                                                    <i className="icon-editing"></i>
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
                                <td className="text-center text-red-500" colSpan="10">Data not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default SingleList;
