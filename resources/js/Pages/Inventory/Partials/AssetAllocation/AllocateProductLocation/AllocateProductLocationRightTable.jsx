import { router, useForm } from "@inertiajs/react";
import { Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import AllocateProductLocationRightFilter from "./AllocateProductLocationRightFilter";
import AllocateitemtolocationTreeMenu from "./AllocateitemtolocationTreeMenu";

const AllocateProductLocationRightTable = ({
    alocateItem,
    mode,
    infraLevels,
    setAlocateItem,
    setMode
}) => {

    const [customErrors, setCustomErrors] = useState({});

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        // total_available: "",
        allocate_quantity: "",
        allocate_date: new Date(),
        product_id: "",
        infra_level_id: ""
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            product_id: alocateItem?.id
        }));
    }, [alocateItem]);

    // handle allocate product start
    const handleAllocateProduct = (e) => {
        e.preventDefault();

        router.post(route('allocate_product_location.save'), data, {
            onSuccess: () => {
                reset();
                setData('allocate_date', new Date());
                setAlocateItem({});
                setMode('');
                setCustomErrors({});
            },
            onError: (errors) => {
                setCustomErrors(errors);
                console.error(errors);

                for (const key in errors) {
                    if (key == 'product_id') {
                        toast.error(errors[key], {
                            position: 'top-right',
                            autoClose: 1500,
                        });

                        break;
                    }
                    else if (key == 'infra_level_id') {
                        toast.error(errors[key], {
                            position: 'top-right',
                            autoClose: 1500,
                        });

                        break;
                    }
                }
            }
        });
    }
    // handle allocate product end

    // handle delete product allocation start
    const handleDeleteProductAllocation = (id) => {
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
                router.patch(route('allocate_product_location.delete', id), {},{
                    onSuccess: () => {
                        setAlocateItem((prevData) => ({
                            ...prevData,
                            product_location_allocations: prevData?.product_location_allocations?.filter(item => item?.id != id)
                        }));
                    }
                });
            }
        });
    }
    // handle delete product allocation end


    return (
        <>
            {mode == 'view' && (
                <>
                    {" "}
                    <div className="educare-card-title pb-none mb-5">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Allocted Item Location{" "}
                            {mode == 'view'
                                ? `(${alocateItem?.title})`
                                : ""}
                        </h5>
                    </div>
                    <div className="educare-default-table xs:overflow-x-auto">
                        <table>
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Code</th>
                                    <th>Location</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {alocateItem?.product_location_allocations?.length > 0 ?
                                    alocateItem?.product_location_allocations?.map((item, index) => (
                                        <tr key={index}>
                                            <td>{alocateItem?.title}</td>
                                            <td>{alocateItem?.product_code}</td>
                                            <td>{item?.infra_level?.name}</td>
                                            <td>
                                                <div className="educare-list-action-btn flex flex-nowrap gap-1">
                                                    {/* <div>
                                                        <Tooltip
                                                            title="Edit"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-warning-btn-sm-fill"
                                                            >
                                                                <i className="icon-editing"></i>
                                                            </button>
                                                        </Tooltip>
                                                    </div> */}
                                                    <div>
                                                        <Tooltip
                                                            title="Delete"
                                                            placement="top"
                                                            arrow
                                                        >
                                                            <button
                                                                type="button"
                                                                className="educare-danger-btn-sm-fill"
                                                                as="button"
                                                                onClick={() => {
                                                                    handleDeleteProductAllocation(item?.id)
                                                                }}
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
                                        <td
                                            className="text-center text-red-500"
                                            colSpan="10"
                                        >
                                            Data not found
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </>
            )}
            {mode == 'allocate' && (
                <>
                    {" "}
                    <div className="educare-card-title pb-none mb-5">
                        <h5>
                            <i className="icon-ListBullets"></i>
                            Allocate item to location {`(${alocateItem?.title})`}
                        </h5>
                    </div>
                    <AllocateProductLocationRightFilter
                        alocateItem={alocateItem}
                        data={data}
                        setData={setData}
                        errors={customErrors}
                        handleAllocateProduct={handleAllocateProduct}
                    />
                    <AllocateitemtolocationTreeMenu
                        setData={setData}
                        infraLevels={infraLevels}
                    />
                </>
            )}

        </>
    );
};

export default AllocateProductLocationRightTable;
