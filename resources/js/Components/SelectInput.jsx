import { forwardRef, useEffect, useRef } from 'react';

export default forwardRef(function TextInput({ data_label, data, className = '', isFocused = false, ...props }, ref) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <select
            {...props}
            ref={input}
            className={
                'focus:border-primary focus:ring-primary ' +
                className
            }>
            <option value="">Select {data_label}</option>
            {data?.length &&
                data?.map((item, index) => (
                    <option key={index} value={item.id}>{item.title}</option>
                ))}
        </select>
    );
});
