import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const multipleSelectorData = [
    { title: 'The Shawshank Redemption' },
    { title: 'The Godfather' },
    { title: 'The Godfather: Part II' },
    { title: 'The Dark Knight' },
    { title: '12 Angry Men' },
    { title: "Schindler's List" },
    { title: 'Pulp Fiction' },
];

const MultipleAutocomplete = () => {
    const [selectedOptions, setSelectedOptions] = useState([]);
    const handleSelectChange = (event, value) => {
      setSelectedOptions(value);
    };

    return (
        <div className="educare-create-school-details-form-wrap">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-school-form-action-title">
                    <h5>
                        <i className="icon-PaperPlaneTilt"></i>
                        Multiple Autocomplete Without Check
                    </h5>
                </div>
                <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="lg:col-span-6 maxMd:col-span-12">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-type-file-styles">
                                    <Autocomplete
                                        multiple
                                        id="tags-outlined"
                                        options={multipleSelectorData}
                                        getOptionLabel={(option) => option.title}
                                        filterSelectedOptions
                                        value={selectedOptions}
                                        onChange={handleSelectChange}
                                        renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label=""
                                            placeholder="Select"
                                        />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MultipleAutocomplete;