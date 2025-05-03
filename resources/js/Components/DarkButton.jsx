export default function DarkButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                ` transition ease-in-out duration-150 ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
