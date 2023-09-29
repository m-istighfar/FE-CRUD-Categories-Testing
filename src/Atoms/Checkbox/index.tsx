interface CheckboxProps {
    id: string;
    required?: boolean;
    className: string;
}

const Checkbox: React.FC<CheckboxProps> = ({ id, required, className }) => (
    <input id={id} type='checkbox' required={required} className={className} />
);

export default Checkbox;
