import PrimaryButton from '@/Components/PrimaryButton';
import SelectInput2 from '@/Components/SelectInput2';
import TextInput from '@/Components/TextInput';
import useScrollableFilterBar from '@/Utils/FilterArrow';
import { router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import Swal from 'sweetalert2';

const LedgerList = ({
    ledgers = [],
    accountGroupTitles = [],
    editedItemId = '',
    accountId = '',
    search = '',
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
                router.delete(route('ledger.destroy', id));
            }
        });
    }

    // filter
    const handleGroup = (accountId) => {

        console.log("accountId", accountId);

        if (accountId === 'Select group') {
            router.get(`/inventory/ledger?search=${search}`);
        } else if (!isNaN(parseInt(accountId))) {
            router.get(`/inventory/ledger?account_id=${accountId}&search=${search}`);
        }
    }

    const handleSearch = (search) => {
        if (search) {
            router.get(`/inventory/ledger?account_id=${accountId}&search=${search}`);
        }
        else {
            router.get(`/inventory/ledger?account_id=${accountId}`);
        }
    }

    const handleReset = () => {
        router.get(route('ledger.list'));
    }

    //scrollble filter bar start here
    const { listRef, currentIndex, handleNextClick, handlePrevClick } =
    useScrollableFilterBar();
    //scrollble filter bar end here

    // handle edit start
    const handleEdit = (id) => {
        router.post(route('ledger.edit'), {id: id});
    }
    // handle edit end

    return (
        <div className="educare-classroom-table-wrapper">
            <div className="educare-header-filtar-bar-area z-[4] relative">
                <div className="py-3 pt-0 educare-header-filtar-bar-wrap">
                    <div className="educare-header-filtar-bar-main">
                        <div>
                            <div className=" educare-header-filtar-bar-inner-main">
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-count mr-auto">
                                    <div className="educare-card-title pb-none">
                                        <h5>
                                            <i className="icon-ListBullets"></i>
                                            Ledgers ({ledgers?.length})
                                        </h5>
                                    </div>
                                </div>
                                {/* delete count if don't need */}
                                <div className="educare-header-filtar-bar-inner-main-wrap ml-auto maxMd:ml-0">
                                    <div className="educare-header-filtar-bar-fields-area relative">
                                        <span
                                            className="educare-header-filter-prev"
                                            onClick={handlePrevClick}
                                        >
                                            <i className="icon-left-chevron"></i>
                                        </span>
                                        <div
                                            className="educare-header-filtar-bar-fields-wrap"
                                            ref={listRef}
                                            style={{
                                                transform: `translateX(-${
                                                    currentIndex * 120
                                                }px)`,
                                            }}
                                        >
                                            {/* Replace changable inputs */}
                                            <div className="educare-select-field-styles">
                                                <SelectInput2
                                                    id="account_group_id"
                                                    data_label="group"
                                                    data={accountGroupTitles}
                                                    selectedData={accountId}
                                                    onChange={(e) =>
                                                        handleGroup(e.target.value)
                                                    }
                                                    className="block"
                                                />
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
                                                    placeholder="Search"
                                                />
                                            </div>
                                            {/* Replace changable inputs */}
                                        </div>
                                        <span
                                            className="educare-header-filter-next"
                                            onClick={handleNextClick}
                                        >
                                            <i className="icon-chevron"></i>
                                        </span>
                                    </div>
                                </div>
                                <div className="educare-header-filtar-bar-action educare-filter-action-btn">
                                    {/* Replace changable buttons */}
                                    <div>
                                        <Tooltip
                                            title="Reset"
                                            placement="top"
                                            arrow
                                        >
                                            <button
                                                type="button"
                                                onClick={handleReset}
                                                className="educare-gray-btn-md-fill"
                                            >
                                                <i className="icon-ArrowsClockwise"></i>
                                            </button>
                                        </Tooltip>
                                    </div>
                                    {/* Replace changable buttons */}
                                </div>
                            </div>
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
                            <th>Ledgers</th>
                            <th>Group</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ledgers?.length > 0 ?
                            ledgers?.map((item, index) => (
                                <tr key={item?.id} className={item?.id === editedItemId ? 'educare-table-row-active' : ''}>
                                    <td>{++index}</td>
                                    <td>{item?.title}</td>
                                    <td>{item?.group_title}</td>
                                    <td>{item?.email}</td>
                                    <td>{item?.mobile}</td>
                                    <td>
                                        <div className="educare-button-action-field-wrapper flex gap-[5px]">
                                            <div className="educare-button-field-styles">
                                                {/* <PrimaryButton
                                                    className="bg-warning/80 "
                                                >
                                                    <Link
                                                        href={route('ledger.edit', item.id)}
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
                                            {
                                                item?.is_system_default ?
                                                    <div className="educare-button-field-styles">
                                                        <PrimaryButton
                                                            onClick={() => handleDelete(item?.id)}
                                                            className="bg-danger/80 "
                                                        >
                                                            <i className="icon-TrashSimple"></i>
                                                        </PrimaryButton>
                                                    </div>
                                                    :
                                                    ''
                                            }

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

export default LedgerList;
