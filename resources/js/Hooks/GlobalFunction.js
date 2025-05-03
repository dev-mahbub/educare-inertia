const concatName = (value1, value2, value3, value4) => {
    const nameParts = [value1, value2, value3, value4].filter(Boolean);
    return nameParts.join(' ');
};

const getLength50 = (item, fieldName) => {
    const fieldValue = item?.[fieldName];
    return fieldValue && fieldValue?.length > 50 ? fieldValue?.slice(0, 50) + '...' : fieldValue;
}

export {concatName, getLength50};
