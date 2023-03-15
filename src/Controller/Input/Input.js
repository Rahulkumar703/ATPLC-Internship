import './Input.css'

export default function Input(
    {
        icon,
        name,
        onChange,
        value,
        autoComplete = 'on',
        label,
        type,
        placeholder = ' ',
        required,
        disabled = false
    }
) {



    const handelChange = (e) => {
        onChange(e);
    }

    return (
        <div className={`input-box ${icon ? 'icon' : null}`}>
            {
                icon ?
                    <div className="icon">
                        <i className={icon}></i>
                    </div>
                    :
                    null
            }

            <input
                type={type}
                id={name}
                name={name}
                value={value}
                disabled={disabled}
                onChange={handelChange}
                placeholder={placeholder}
                required={required}
                autoComplete={autoComplete}
            />

            <label htmlFor={name}>{label}</label>
        </div>
    )
}
