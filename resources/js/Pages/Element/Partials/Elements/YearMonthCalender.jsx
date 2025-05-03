import InputLabel from '@/Components/InputLabel';
import React from 'react';
import { useState } from 'react';
import DatePicker  from 'react-datepicker';

const YearMonthCalender = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
        <div className="educare-input-field-styles">
            <InputLabel
                value="Start Date"
            />
            <DatePicker
                selected={startDate}
                onChange={(date) =>
                    setStartDate(date)
                }
                showYearDropdown
                showMonthDropdown
                useShortMonthInDropdown
                showPopperArrow={false}
                peekNextMonth
                dropdownMode="select"
                isClearable
                dateFormat="dd/MM/yyyy"
                placeholderText="Start date"
                className="w-full"
            />
        </div>
    );
};

export default YearMonthCalender;