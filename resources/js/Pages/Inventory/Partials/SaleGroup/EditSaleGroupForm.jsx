import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { useForm } from "@inertiajs/react";
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { TextField } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CheckboxA from '@mui/material/Checkbox';
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import SaleGroupList from "./SaleGroupList";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function EditSaleGroupForm({
    saleGroups = [],
    products = [],
    saleGroup = [],
    saleGroupProducts = [],
}) {

    const {
        data,
        setData,
        errors,
        put,
        reset,
        processing
    } = useForm({
        title: saleGroup?.title,
        products: saleGroupProducts,
    });

    const [selectedOptions, setSelectedOptions] = useState(saleGroupProducts);

    const handleSelectChange = (event, value) => {
        setSelectedOptions(value);
        setData("products", value);
    };

    const handleFormDataInsert = (e) => {
        e.preventDefault();
        put(route("sale_group.update", saleGroup?.id), data, {
            preserveScroll: true,
            onSuccess: () => reset()
        });
    };

    return (
        <>
            <div className="educare-classroom-form-area">
                <div className="grid grid-cols-12 gap-[20px]">
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <SaleGroupList
                            saleGroups={saleGroups}
                        />
                    </div>
                    <div className="lg:col-span-6 xl:col-span-6 col-span-12">
                        <div className="educare-class-form-box-wrapper">
                            <div className="educare-create-school-details-form-wrap">
                                <div className="educare-card-title">
                                    <h5>
                                        <i className="icon-ListBullets"></i>
                                        Add sale group
                                    </h5>
                                </div>
                                <form onSubmit={handleFormDataInsert}>
                                    <div className="educare-class-form-box bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] px-[25px] py-[30px] maxXs:p-[15px] rounded-lg">

                                        {/* Start Field  */}
                                        <div className="grid grid-cols-12 gap-5">
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="name"
                                                                    value="Sale group name"
                                                                />
                                                                <sup>*</sup>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <TextInput
                                                        id="title"
                                                        value={data?.title}
                                                        onChange={(e) =>
                                                            setData("title", e.target.value)
                                                        }
                                                        type="text"
                                                        className="block"
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors?.title
                                                        }
                                                        className="mt-2"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-input-field-styles">
                                                    <div className="educare-input-field-styles">
                                                        <div className="educare-input-field-styles-label-wrap">
                                                            <div className="educare-input-field-styles-label">
                                                                <InputLabel
                                                                    htmlFor="product_ids"
                                                                    value="Associate products with this group"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="educare-input-type-file-styles">
                                                        <Autocomplete
                                                            multiple
                                                            id="product"
                                                            options={products}
                                                            disableCloseOnSelect
                                                            getOptionLabel={(option) => option.title}
                                                            value={selectedOptions}
                                                            onChange={handleSelectChange}
                                                            renderOption={(props, option, { selected }) => (
                                                                <li {...props}>
                                                                    <CheckboxA
                                                                        icon={icon}
                                                                        checkedIcon={checkedIcon}
                                                                        style={{ marginRight: 8 }}
                                                                        checked={selected}
                                                                    />
                                                                    {option.title}
                                                                </li>
                                                            )}
                                                            renderInput={(params) => <TextField {...params} placeholder="Classes" />}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-span-12">
                                                <div className="educare-classroom-button-wrapper mt-2">
                                                    <div className="flex justify-end">
                                                        <PrimaryButton
                                                            className="educare-primary-btn-lg-fill"
                                                        >
                                                            Update
                                                        </PrimaryButton>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* Start Field  */}
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
