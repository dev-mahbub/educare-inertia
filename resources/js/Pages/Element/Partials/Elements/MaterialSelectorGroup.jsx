import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import ListSubheader from '@mui/material/ListSubheader';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const categories = [
  {
    name: 'TC',
    options: [
      { name: 'Steve' },
      { name: 'Peter' },
      { name: 'Jhon' },
    ],
  },
  {
    name: 'Active',
    options: [
      { name: 'Andrew' },
      { name: 'Shane' },
      { name: 'Watson' },
    ],
  },
];

export default function MaterialSelectorGroup() {
  const [selectedOption, setSelectedOption] = React.useState('');

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
  };



  return (
    <div className="educare-common-card">
      <div className="bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[27px] maxXs:p-[15px] rounded-lg mb-5">
        <div className="educare-common-card-title">
          <h5>
            <i className="icon-BookBookmark"></i>
            Material Category Wise Selector
          </h5>
        </div>
        <div className="educare-common-card-wrap-border border-t border-grayLight/20 pt-5">
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-6 max2Xl:col-span-12 minMaxMd:col-span-6">
              <div className="educare-material-group-select-styles">
                <FormControl>
                  <InputLabel htmlFor="grouped-select">Select Student</InputLabel>
                  <Select
                    value={selectedOption}
                    onChange={handleSelectChange}
                    id="grouped-select"
                  >
                    <MenuItem value="">
                      <em>Select Student</em>
                    </MenuItem>
                    {categories.map((category, index) => [
                      <ListSubheader className="material-selet-subheader" key={`header-${index}`}>
                        {category.name}
                      </ListSubheader>,
                      ...category.options.map((option, optionIndex) => (
                        <MenuItem
                          key={`option-${index}-${optionIndex}`}
                          value={option.name}
                        >
                          {option.name}
                        </MenuItem>
                      )),
                    ])}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
