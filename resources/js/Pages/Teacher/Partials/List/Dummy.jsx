// TabsComponent.js
import React, { useState } from 'react';
import { Tabs, Tab, Paper, Typography } from '@mui/material';

const tabContent = [
  "Content for Tab 1",
  "Content for Tab 2",
  "Content for Tab 3",
];

const TabsComponent = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {tabContent.map((content, index) => (
          <Tab key={index} label={`Tab ${index + 1}`} />
        ))}
      </Tabs>

      {tabContent.map((content, index) => (
        <div key={index} hidden={value !== index}>
          <Typography>{content}</Typography>
        </div>
      ))}
    </Paper>
  );
};

export default TabsComponent;
