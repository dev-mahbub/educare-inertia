import React from 'react';
import CheckboxA from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Tooltip } from '@mui/material';
import { useState } from 'react';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const multipleSelectorData = [
    { title: 'The Shawshank Redemption' },
    { title: 'The Godfather' },
    { title: 'The Godfather: Part II' },
    { title: 'The Dark Knight' },
    { title: '12 Angry Men' },
    { title: "Schindler's List" },
    { title: 'Pulp Fiction' },
];

const MultipleSelectors = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleSelectChange = (event, value) => {
        setSelectedOptions(value);
    };
    const handleRemoveOption = (optionToRemove) => {
        setSelectedOptions((prevSelectedOptions) =>
            prevSelectedOptions.filter((option) => option !== optionToRemove)
        );
    };

 
    return (
        <div className="educare-create-school-details-form-wrap">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-school-form-action-title">
                    <h5>
                        <i className="icon-PaperPlaneTilt"></i>
                        Multiple Value Selector Autocomplete
                    </h5>
                </div>
                <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-type-file-styles">
                                    <Autocomplete
                                        multiple
                                        id="checkboxes-tags-demo"
                                        options={multipleSelectorData}
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
                        <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
                            <div className='educare-multiple-check-item'>
                                <ul>
                                    {selectedOptions.map((option, index) => (
                                        <li key={index}>
                                            <span>{option.title}</span>
                                            <div>
                                                <Tooltip
                                                    title="Delete"
                                                    placement="top"
                                                    arrow
                                                >
                                                    <button type='button' className="educare-danger-btn-sm-fill" onClick={() => handleRemoveOption(option)}>
                                                        <i className="icon-TrashSimple"></i>
                                                    </button>
                                                </Tooltip>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultipleSelectors;
