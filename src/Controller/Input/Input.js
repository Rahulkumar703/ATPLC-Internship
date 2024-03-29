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

    if (type === 'textarea')
        return (
            <div className={`input-box ${icon ? 'icon' : null}`}>

                <textarea
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
                {
                    icon ?
                        <div className="icon">
                            <i className={icon}></i>
                        </div>
                        :
                        null
                }

                <label htmlFor={name}>{label}</label>
            </div>
        );

    return (
        <div className={`input-box ${icon ? 'icon' : null}`}>

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
            {
                icon ?
                    <div className="icon">
                        <i className={icon}></i>
                    </div>
                    :
                    null
            }

            <label htmlFor={name}>{label}</label>
        </div>
    )
}
