import { useEffect, useState } from 'react';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { router, useForm } from '@inertiajs/react';
import PrimaryButton from '@/Components/PrimaryButton';
import Autocomplete from '@mui/material/Autocomplete';
import { TextField } from '@mui/material';
import CheckboxA from '@mui/material/Checkbox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export default function SaleGroupEditPopupForm({ editPopupOpen, setEditPopupOpen, editData }) {


    // const [data, setData] = useState(editData);

    const {
        data,
        setData
    } = useForm({
        title: "",
        product_ids: [],
    });

    useEffect(() => {
        setData(editData);
    }, [editData])

    const handleUpdate = (e) => {
        e.preventDefault();
        router.put(route('sale_group.update', data.id), data);
        closeModal();
    };

    const closeModal = () => {
        setEditPopupOpen(false);
    };

    console.log('data', data);

    return (
        <div className='educare-admission-follow-up-area space-y-6'>
            <Modal show={editPopupOpen} onClose={closeModal}>
                <form onSubmit={handleUpdate} className="p-[30px] pt-2.5">
                    <div className="educare-popup-form-wrapper border-b border-border/50">
                        <div className="educare-popup-form-header py-3">
                            <h5>Update sale group</h5>
                        </div>
                        <div className="educare-popup-form pt-5 pb-[26px] maxSm:py-4 flex flex-col gap-3">
                            <div className="grid grid-cols-12 gap-5">
                                <div className="col-span-12">
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
                                    <div className="educare-input-field-styles">
                                        <TextInput
                                            id="title"
                                            value={data?.title}
                                            // onChange={(e) => setData({ ...data, title: e.target.value })}
                                            onChange={(e) =>
                                                setData("title", e.target.value)
                                            }
                                            type="text"
                                            className="block"
                                            required
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
                                            {/* <Autocomplete
                                                multiple
                                                id="product_ids"
                                                options={data?.sale_group_products}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) => option.title}
                                                value={data?.sale_group_products?.filter(product => data?.product_ids?.includes(product?.id))}
                                                onChange={(event, value) => {
                                                    setData("product_ids", value?.map((item) => item.id));
                                                }}
                                                renderOption={(props, option, { selected }) => (
                                                    <li {...props}>
                                                        <CheckboxA
                                                            icon={icon}
                                                            checkedIcon={checkedIcon}
                                                            style={{ marginRight: 12 }}
                                                            checked={selected}
                                                        />
                                                        {option.title}
                                                    </li>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder="Select products" />
                                                )}
                                            /> */}

                                            <Autocomplete
                                                multiple
                                                id="product_ids"
                                                options={data?.sale_group_products}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) => option.title}
                                                value={data?.sale_group_products?.filter(product => data?.product_ids?.includes(product?.id))}
                                                onChange={(event, value) => {
                                                    setData("product_ids", value?.map((item) => item.id));
                                                }}
                                                renderOption={(props, option, { selected }) => (
                                                    <li {...props}>
                                                        <CheckboxA
                                                            icon={icon}
                                                            checkedIcon={checkedIcon}
                                                            style={{ marginRight: 12 }}
                                                            checked={selected}
                                                        />
                                                        {option.title}
                                                    </li>
                                                )}
                                                renderInput={(params) => (
                                                    <TextField {...params} placeholder="Select products" />
                                                )}
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => (
                                                        <div key={index} {...getTagProps({ index })}>
                                                            {option.title}
                                                        </div>
                                                    ))
                                                }
                                            />

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-2 mb-4 flex justify-end">
                            <PrimaryButton className="educare-primary-btn-md-fill">
                                Update
                            </PrimaryButton>
                            <SecondaryButton className="ml-3" onClick={closeModal}>Cancel</SecondaryButton>
                        </div>
                    </div>
                </form>
            </Modal>
        </div>
    );
}
