import PrimaryButton from '@/Components/PrimaryButton';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import Swal from 'sweetalert2';
import ViewLedgerListPopup from "../Popup/ViewLedgerListPopup";

const AccountGroupList = ({
    accountGroups = [],
    editedItemId = ''
}) => {

    const [ledgersData, setLedgersData] = useState([]);
    const [viewLedgerListPopup, setViewLedgerListPopup] = useState(false);

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
                router.delete(route('account_group.destroy', id));
            }
        });
    }

    // handle view ledgers start
    const handleViewLedgers = (id) => {
        setViewLedgerListPopup(true);
        setLedgersData(accountGroups?.find(item => item?.id == id)?.ledgers ?? []);
    }
    // handle view ledgers end

    // handle edit start
    const handleEdit = (id) => {
        router.post(route('account_group.edit'), {id: id});
    }
    // handle edit end

    return (
        <>
            <div className="educare-classroom-table-wrapper">
                <div className="educare-card-title">
                    <h5>
                        <i className="icon-ListBullets"></i>
                        Account group list <span>({accountGroups?.length})</span>
                    </h5>
                </div>

                <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Account group</th>
                                <th>Under</th>
                                <th>Ledgers</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {accountGroups?.length > 0 ?
                                accountGroups?.map((item, index) => (
                                    <tr key={item?.id} className={item?.id === editedItemId ? 'educare-table-row-active' : ''}>
                                        <td>{++index}</td>
                                        <td>{item?.title}</td>
                                        <td>{item?.parent_title}</td>
                                        <td>
                                            <button
                                                className='educare-primary-btn-sm-fill'
                                                type='button'
                                                onClick={() => {
                                                    handleViewLedgers(item?.id)
                                                }}
                                            >
                                                {item?.ledgers?.length ?? 0}
                                            </button>
                                        </td>
                                        <td>
                                            {item.is_system_default ?
                                                <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                                    <div className="educare-button-field-styles">
                                                        {/* <PrimaryButton
                                                            className="bg-warning/80 "
                                                        >
                                                            <Link
                                                                href={route('account_group.edit', item.id)}
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
                                                <div
                                                    className="badge success"
                                                >
                                                    Default
                                                </div>
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
            </div >
            <ViewLedgerListPopup
                viewLedgerListPopup={viewLedgerListPopup}
                setViewLedgerListPopup={setViewLedgerListPopup}
                ledgersData={ledgersData}
                setLedgersData={setLedgersData}
            />
        </>
    );
};

export default AccountGroupList;
