export default function ImageInput({ value, className = '', ...props }) {
    return (
        <input
            {...props}
            type="file"
            className={
                'rounded border-border text-primary shadow-sm translate-y-[-1px] focus:ring-primary' +
                className
            }
        />
    );
}