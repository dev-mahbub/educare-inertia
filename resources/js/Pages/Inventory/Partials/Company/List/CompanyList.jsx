import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { router } from '@inertiajs/react';
import Swal from 'sweetalert2';

const CompanyList = ({
    companies = [],
    search = '',
    editedItemId = '',
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
                router.delete(route('company.destroy', id));
            }
        });
    }

    // search
    const handleSearch = (search) => {
        if (search) {
            router.get(`/inventory/company?search=${search}`);
        }
        else {
            router.get(route('company.list'));
        }
    }

    // handle edit start
    const handleEdit = (id) => {
        router.post(route('company.edit'), {id: id});
    }
    // handle edit end

    return (
        <div className="educare-classroom-table-wrapper">

            {/* filter */}
            <div className='educare-admission-filtar-bar-area z-[4] relative'>
                <div className="py-3 pt-0 educare-admission-filtar-bar">
                    <div className="educare-admission-filtar-bar-filter justify-between flex-wrap items-center">
                        <div className="educare-card-title pb-none">
                            <h5>
                                <i className="icon-ListBullets"></i>
                                Companies <span>({companies?.length})</span>
                            </h5>
                        </div>
                        <div className="educare-select-field-styles">
                            <TextInput
                                id="search_query"
                                defaultValue={search}
                                onChange={(e) =>
                                    handleSearch(e.target.value)
                                }
                                className="block"
                                type="text"
                                placeHolder="Search here"
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* filter */}

            <div className="educare-admission-list mb-[25px]">
                <table>
                    <thead>
                        <tr>
                            <th>Sl.No</th>
                            <th>Name</th>
                            <th>Mobile</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {companies?.length > 0 ?
                            companies?.map((item, index) => (
                                <tr key={item?.id} className={item?.id === editedItemId ? 'educare-table-row-active' : ''}>
                                    <td>{++index}</td>
                                    <td>{item?.title}</td>
                                    <td>{item?.mobile}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.address}</td>
                                    <td>
                                        <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                            <div className="educare-button-field-styles">
                                                {/* <PrimaryButton
                                                    className="bg-warning/80 "
                                                >
                                                    <Link
                                                        href={route('company.edit', item.id)}
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

export default CompanyList;
