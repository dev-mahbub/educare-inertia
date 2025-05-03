import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const VoucherTypeList = ({ vouchers = [], editedItemId = '' }) => {

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
                router.delete(route('product_voucher_type.destroy', id));
            }
        });
    }

    // handle edit start
    const handleEdit = (id) => {
        router.post(route('product_voucher_type.edit'), {id: id});
    }
    // handle edit end

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-card-title">
                <h5>
                    <i className="icon-ListBullets"></i>
                    Voucher type List <span>({vouchers?.length})</span>
                </h5>
            </div>

            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                <table>
                    <thead>
                        <tr>
                            <th>Sl. No</th>
                            <th>Title</th>
                            <th>Base type</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vouchers?.length > 0 ?
                            vouchers?.map((item, index) => (
                                <tr key={item?.id} className={item?.id === editedItemId ? 'educare-table-row-active' : ''}>
                                    <td>{++index}</td>
                                    <td>{item?.title}</td>
                                    <td>{item?.sub_type?.slice(0, 80)}</td>
                                    <td>
                                        {item?.is_system_default == false ?
                                            <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                <div className="educare-button-field-styles">
                                                    {/* <PrimaryButton
                                                        className="bg-warning/80 "
                                                    >
                                                        <Link
                                                            href={route('product_voucher_type.edit', item.id)}
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
                                                        onClick={() => handleDelete(item.id)}
                                                        className="bg-danger/80 "
                                                    >
                                                        <i className="icon-TrashSimple"></i>
                                                    </PrimaryButton>
                                                </div>
                                            </div>
                                        :
                                            <span
                                                className='badge bg-success'
                                            >
                                                Defualt
                                            </span>
                                        }
                                    </td>
                                </tr>
                            )) :
                            <tr>
                                <td className="text-center text-red-500" colSpan="7">Data not found</td>
                            </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default VoucherTypeList;
