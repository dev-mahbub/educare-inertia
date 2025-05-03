import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const monthOptions = [
    { id: 1, title: 'April', start_date: '2024-04-01', end_date: '2024-04-30' },
    { id: 2, title: 'May', start_date: '2024-05-01', end_date: '2024-05-31' },
    { id: 3, title: 'June', start_date: '2024-06-01', end_date: '2024-06-30' },
    { id: 4, title: 'July', start_date: '2024-07-01', end_date: '2024-07-31' },
    { id: 5, title: 'August', start_date: '2024-08-01', end_date: '2024-08-31' },
    { id: 6, title: 'September', start_date: '2024-09-01', end_date: '2024-09-30'}
]

const AutoCompleteCount = () => {

    const [personName, setPersonName] = React.useState([]);
    console.log(personName, 'personName')

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <div className='bg-white/70 shadow-[0_2px_10px_0px_rgba(0,0,0,0.08)] p-[30px] pt-[25px] maxXs:p-[15px] rounded-lg mb-5'>
            <h5 className='text-[16px] text-headingLight font-primary mb-3 font-semibold'>Count Autocomplete Style</h5>
            <div className="grid grid-cols-12 gap-5">
                <div className="col-span-12 md:col-span-6">
                    <div className="educare-input-field-styles select-count">
                        <InputLabel
                            value="Select Class"
                        />
                        <div className="educare-input-type-file-styles">
                            <FormControl sx={{ m: 1, width: 300 }}>
                                <Select
                                    labelId="demo-multiple-checkbox-label"
                                    id="demo-multiple-checkbox"
                                    multiple
                                    value={personName}
                                    onChange={handleChange}
                                    input={<OutlinedInput label="Tag" />}
                                    renderValue={(selected) => selected.length + " selected"}
                                >
                                    {names.map((name) => (
                                        <MenuItem key={name} value={name}>
                                            <Checkbox checked={personName.includes(name)} />
                                            <ListItemText primary={name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoCompleteCount;