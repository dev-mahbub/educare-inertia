import Loader from "@/Components/Loader";
import { router } from '@inertiajs/react';
import { Tooltip } from '@mui/material';
import { useState } from 'react';
import Swal from "sweetalert2";
import ShowDiscountList from './Popup/showDiscountList';

const StudentAvailingDiscountList = ({
    studentFeeDiscounts = [],
    feeTypes = [],
    loading
}) => {

    const [showDiscountListPopup, setShowDiscountListPopup] = useState(false);
    const [selectedDiscountData, setSelectedDiscountData] = useState({});

    const handlePopupClick = () => {
        setShowDiscountListPopup(!showDiscountListPopup);
    }

    const handleDeleteAllFeeDiscount = (discountId, studentId) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You will not be able to recover this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                router.delete(route("fee_discount.delete_student_fee_discount", {
                    discountId: discountId,
                    studentId: studentId,
                }));
            }
        });
    }


    return (
        <>
            <div className="educare-admission-list-area">
                <div className="educare-admission-list-inner">
                    <div className="educare-admission-list-inner-wrapper">
                        <div className="educare-admission-list">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Adm No.</th>
                                        <th>Roll No</th>
                                        <th>Student Name</th>
                                        <th>Class</th>
                                        <th>Discount Type</th>
                                        <th>Discount</th>
                                        <th>Created By</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                {loading ?
                                    <Loader></Loader>
                                :
                                    <tbody>
                                        {studentFeeDiscounts?.length > 0 ?
                                            studentFeeDiscounts?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item?.student?.admission_no ?? ""}</td>
                                                    <td>{item?.student?.classroom_roll?.roll_no ?? ""}</td>
                                                    <td>{`${item?.student?.first_name ?? ""} ${item?.student?.middle_name ?? ""} ${item?.student?.last_name ?? ""}`}</td>
                                                    <td>{item?.student?.classroom?.title ?? ""}</td>
                                                    <td>{item?.discount?.title ?? 'Unknown'}</td>
                                                    <td>{item?.discount?.is_discount_percentage ? 'Percentage' : 'Flat'}</td>
                                                    <td>{`${item?.created_by?.first_name ?? ""} ${item?.created_by?.middle_name ?? ""} ${item?.created_by?.last_name ?? ""}`}</td>
                                                    <td>
                                                        <div className='educare-list-action-btn flex flex-nowrap gap-1'>
                                                            <div>
                                                                <Tooltip
                                                                    title="View"
                                                                    placement="top"
                                                                    arrow
                                                                >
                                                                    <button
                                                                        type="button"
                                                                        className="educare-tertiary-btn-sm-fill"
                                                                        onClick={() => {
                                                                            handlePopupClick();
                                                                            setSelectedDiscountData(item)
                                                                        }}
                                                                    >
                                                                        <i className="icon-eye"></i>
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
                                                                        type="button"
                                                                        className="educare-danger-btn-sm-fill"
                                                                        onClick={() => {
                                                                            handleDeleteAllFeeDiscount(item?.discount?.id, item?.student?.id);
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
                                                <td className="text-center text-red-500" colSpan="10">Data not found</td>
                                            </tr>
                                        }
                                    </tbody>
                                }
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <ShowDiscountList
                selectedDiscountData={selectedDiscountData}
                showDiscountListPopup={showDiscountListPopup}
                setShowDiscountListPopup={setShowDiscountListPopup}
                feeTypes={feeTypes}
            />
        </>
    );
};

export default StudentAvailingDiscountList;
