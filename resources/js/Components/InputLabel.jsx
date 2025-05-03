export default function InputLabel({ value, className = '', children, ...props }) {
    return (
        <label {...props} className={`font-primary ` + className}>
            {value ? value : children}
        </label>
    );
}
