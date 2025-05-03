import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Loader from "@/Components/Loader";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import SuccessButton from "@/Components/SuccessButton";
import TextInput from "@/Components/TextInput";
import TextareaInput from "@/Components/TextareaInput";
import { router, useForm } from "@inertiajs/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ProductReturnForm({
    allocationStaffs = [],
    allocationProducts
}) {

    const [loading, setLoading] = useState(false);

    const [formFields, setFormFields] = useState([]);

    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing
    } = useForm({
        return_date_at: new Date(),
        staff_id: "",
        items: formFields,
        description: ""
    });

    useEffect(() => {
        setData((prevData) => ({
            ...prevData,
            items: formFields?.filter(item => item?.return_quantity > 0),
        }));
    }, [formFields]);

    useEffect(() => {
        setFormFields(allocationProducts?.map((item) => ({
            product_title: item?.product_title,
            allocated_quantity: item.total_allocated_quantity - item.total_returned_quantity,
            product_id: item?.product_id,
            return_quantity: "",
        })));
    }, [allocationProducts]);

    const handleFormChange = (event, index, field) => {
        const updatedFields = [...formFields];

        updatedFields[index][field] = event.target.value > updatedFields[index]['allocated_quantity'] ? 0 : event.target.value;

        setFormFields(updatedFields);
    };

    const handleReturnInsert = (e) => {
        e.preventDefault();

        if(data?.items?.length == 0) {
            toast.error('Please fill return quantity field for return items !', {
                position: 'top-right',
                autoClose: 1500,
            });
        } else {
            post(route("allocation_product_return.save"), {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: (errors) => {
                    for (const key in errors) {
                        if (key == 'items') {
                            toast.error('Please fill return quantity field for return items !', {
                                position: 'top-right',
                                autoClose: 1500,
                            });

                            break;
                        }
                    }

                    router.post(route('product_return.list'), { staff_id: data?.staff_id })
                }
            });
        }
    };

    const handleAllocationStaff = (id) => {
        setData((prevData) => ({
            ...prevData,
            staff_id: id,
        }));

        router.post(route('product_return.list'), { staff_id: id });

        setLoading(false);
    }

    // handle reset start
    const handleReset = () => {
        // setFormFields([]);
        // reset();

        router.get(route('product_return.list'));
    }
    // handle reset end

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-classroom-table-wrapper">
                            <div className="educare-card-title">
                                <h5>
                                    <i className="icon-ListBullets"></i>
                                    Production products <span>({formFields?.length})</span>
                                </h5>
                            </div>

                            <div className="educare-default-table xs:overflow-x-auto mb-[25px]">
                                <form>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>SL</th>
                                                <th>Title</th>
                                                <th>Quantity</th>
                                                <th>Return quantity</th>
                                            </tr>
                                        </thead>
                                        {loading ?
                                            <Loader></Loader>
                                            :
                                            <>
                                                <tbody>
                                                    {formFields?.length > 0 ?
                                                        formFields?.map((item, index) => (
                                                            <tr key={item?.id}>
                                                                <td>{index+1}</td>
                                                                <td>{item?.product_title}</td>
                                                                <td>{item?.allocated_quantity}</td>
                                                                <td>
                                                                    <div className="educare-input-field-styles">
                                                                        <TextInput
                                                                            id="return_quantity"
                                                                            value={item?.return_quantity}
                                                                            onChange={(event) => handleFormChange(event, index, "return_quantity")}
                                                                            type="number"
                                                                            className="mt-1 block w-full"
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        )) :
                                                        <tr>
                                                            <td className="text-center text-red-500" colSpan="7">Data not found</td>
                                                        </tr>
                                                    }
                                                </tbody>
                                                {formFields?.length > 0 ? <tfoot>
                                                    <tr>
                                                        <td colSpan="5">
                                                            <div className="flex justify-end">
                                                                <PrimaryButton
                                                                    type="button"
                                                                    disabled={processing}
                                                                    className="educare-primary-btn-md-fill"
                                                                    onClick={handleReturnInsert}
                                                                >
                                                                    Save
                                                                </PrimaryButton>
                                                                <SuccessButton
                                                                    disabled={processing}
                                                                    className="educare-secondary-btn-md-fill ml-3"
                                                                    type="button"
                                                                    onClick={handleReset}
                                                                >
                                                                    Reset
                                                                </SuccessButton>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tfoot>
                                                    : ''
                                                }

                                            </>
                                        }
                                    </table>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Issued Return
                                    </h5>
                                </div>
                                <form>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">
                                        <div className="grid grid-cols-12 mb-5 gap-5">

                                            {/* Start Field  */}
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="return_date_at"
                                                                value="Return date"
                                                            />
                                                        </div>
                                                    </div>
                                                    <DatePicker
                                                        selected={data?.return_date_at}
                                                        onChange={(date) => setData("return_date_at", date)}
                                                        showYearDropdown
                                                        showMonthDropdown
                                                        useShortMonthInDropdown
                                                        showPopperArrow={false}
                                                        peekNextMonth
                                                        dropdownMode="select"
                                                        isClearable
                                                        dateFormat="dd/MM/yyyy"
                                                        placeholderText="Return Date"
                                                        className="w-full"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.return_date_at
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* Start Field  */}

                                            {/* Start Field  */}
                                            <div className="col-span-12 md:col-span-6">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="staff_id"
                                                                value="Staff"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <SelectInput
                                                        id="staff_id"
                                                        data_label="staff"
                                                        data={allocationStaffs}
                                                        value={data.staff_id}
                                                        onChange={(e) => handleAllocationStaff(e.target.value)}
                                                        type="text"
                                                        className="block"
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.staff_id
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* Start Field  */}

                                            {/* Start Field  */}
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles-label-wrap">
                                                        <div className="educare-input-field-styles-label">
                                                            <InputLabel
                                                                htmlFor="description"
                                                                value="Description"
                                                            />
                                                            <sup>*</sup>
                                                        </div>
                                                    </div>
                                                    <TextareaInput
                                                        id="description"
                                                        value={data?.description}
                                                        onChange={(e) =>
                                                            setData(
                                                                "description",
                                                                e.target.value
                                                            )
                                                        }
                                                        type="text"
                                                        className="mt-1 block w-full"
                                                    />
                                                    <InputError
                                                        message={
                                                            errors.description
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            {/* Start Field  */}
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
