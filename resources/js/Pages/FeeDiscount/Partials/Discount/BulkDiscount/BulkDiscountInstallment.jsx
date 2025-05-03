import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function BulkDiscountInstallment({ fees = [], sendSelectedFeeIdsToParent } ) {

    const [selectAllFeeChecked, setSelectAllFeeChecked] = useState(false);
    const [selectedFeeIds, setSelectedFeeIds] = useState([])

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        select_all_installment_id: "",
        installment_id_one: false,
        installment_id_two: false,
        fee_ids: selectedFeeIds
    });

    useEffect(() => {
        if (selectedFeeIds?.length <= 0) {
            setSelectAllFeeChecked(false)
        }
        else {
            setSelectAllFeeChecked(selectedFeeIds?.length === fees?.length)
        }

        sendSelectedFeeIdsToParent(selectedFeeIds)
    }, [fees, selectedFeeIds]);


    const setSelectedFeeId = (id) => {
        if ([...selectedFeeIds]?.includes(id)) {
            setSelectedFeeIds([...selectedFeeIds].filter((item) => item !== id));
        }
        else {
            setSelectedFeeIds([
                ...selectedFeeIds,
                id,
            ]);
        }

        const updateSelectedFeeIds = [...selectedFeeIds];

        setData('fee_ids', updateSelectedFeeIds);
    };

    const handleCheckboxSelect = (name, value) => {
        if (name === "select_all_fee_id") {
            if (value === true) {
                setSelectedFeeIds(fees.map((item) => item.id))
            }
            else {
                setSelectedFeeIds([])
            }

            setSelectAllFeeChecked(value);
        }
    };
    //handle Checkbox end



    return (
        <>
            <div>
                <small className="text-headingLight">
                    <strong className="text-danger">Note:</strong> Discount will be applied only on unpaid installments of students
                </small>
            </div>
            <div className="educare-classroom-table-wrapper">
                <div className="educare-default-table xs:overflow-x-auto">
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                        <div className="educare-create-school-settings-list-check width-full">
                                            <Checkbox
                                                name="select_all_fee_id"
                                                checked={
                                                    selectAllFeeChecked
                                                }
                                                onChange={(e) =>
                                                    handleCheckboxSelect(e.target.name, e.target.checked)
                                                }
                                            />
                                        </div>
                                        <div className="educare-create-school-settings-list-title width-full">
                                            <InputLabel
                                                htmlFor="select_all_fee_id"
                                            />
                                        </div>
                                    </div>
                                </th>
                                <th>Installments</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fees?.length > 0 ?
                            fees?.map((item, index) => (
                                <tr key={index}>
                                    <td>
                                        <div className="educare-create-school-settings-list educare-create-school-settings-list-document">
                                            <div className="educare-create-school-settings-list-check width-full">
                                                <Checkbox
                                                    id={`fee_id_${item?.id}`}
                                                    name="fee_id"
                                                    checked={
                                                        selectedFeeIds.includes(item?.id)
                                                    }
                                                    onChange={(e) => {
                                                            handleCheckboxSelect(e.target.name, e.target.checked)
                                                            setSelectedFeeId(item?.id)
                                                        }
                                                    }
                                                />
                                            </div>
                                            <div className="educare-create-school-settings-list-title width-full">
                                                <InputLabel
                                                    htmlFor={`fee_id_${item?.id}`}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                    <td>{item?.title}</td>
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
        </>
    );
}
