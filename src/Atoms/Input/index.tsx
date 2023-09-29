interface InputProps {
    type: string;
    name: string;
    id: string;
    placeholder: string;
    value: string;
    required?: boolean;
    className: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    status?: string;
}

const Input: React.FC<InputProps> = ({
    type,
    name,
    id,
    placeholder,
    required,
    className,
    value,
    onChange,
}) => (
    <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        required={required}
        value={value}
        className={className}
        onChange={onChange}
    />
);

export default Input;
