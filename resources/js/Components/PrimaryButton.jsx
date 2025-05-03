export default function PrimaryButton({ type='', className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            type={type}
            className={
                `transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
