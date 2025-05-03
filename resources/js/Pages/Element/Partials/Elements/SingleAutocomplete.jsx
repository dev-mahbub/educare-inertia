import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useState } from 'react';

const singleSelectorData = [ 
    { label: 'The Shawshank Redemption' },
    { label: 'The Godfather' },
    { label: 'The Godfather: Part II' },
    { label: 'The Dark Knight' },
    { label: '12 Angry Men' },
    { label: "Schindler's List" },
    { label: 'Pulp Fiction' },
];

const SingleAutocomplete = () => {
    const [selectedOptions, setSelectedOptions] = useState(null);
    const handleSelectChange = (event, value) => {
      setSelectedOptions(value);
    };
  
    return (
        <div className="educare-create-school-details-form-wrap">
            <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5">
                <div className="educare-school-form-action-title">
                    <h5>
                        <i className="icon-PaperPlaneTilt"></i>
                        Single Autocomplete
                    </h5>
                </div>
                <div className="educare-create-school-details-form-wrap-border border-t border-grayLight/20 pt-5">
                    <div className="grid grid-cols-12 gap-5">
                        <div className="lg:col-span-6 maxMd:col-span-12">
                            <div className="educare-input-field-styles">
                                <div className="educare-input-type-file-styles">
                                <Autocomplete
                                    disablePortal
                                    options={singleSelectorData}
                                    value={selectedOptions}
                                    onChange={handleSelectChange}
                                    renderInput={(params) => <TextField {...params} label="" placeholder='Select' />}
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

export default SingleAutocomplete;