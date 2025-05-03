export default function RadioInput({ value, className = '', ...props }) {
    return (
        <label className="text-[16px] font-primary inline-flex items-center gap-1.5 text-headingLight">
            <input
                {...props}
                type="radio"
                value={value}
                className={
                    'rounded border-border text-primary shadow-sm translate-y-[-1px] focus:ring-primary' +
                    className
                }
            />
            {value}
        </label>
        
    );
}