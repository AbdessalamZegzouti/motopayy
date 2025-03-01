function Input({ 
    type = 'text', 
    placeholder = '', 
    value = '', 
    onChange, 
    icon = null, 
    disabled = false,
    className = '',
    name = '',
    required = false,
    min = null,
    max = null
}) {
    try {
        return (
            <div data-name="input-container" className={`relative ${className}`}>
                {icon && (
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <i className={`fas ${icon} text-gray-400`}></i>
                    </div>
                )}
                <input
                    type={type}
                    className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                        icon ? 'pr-10' : ''
                    } ${disabled ? 'bg-gray-100 text-gray-500' : ''}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    disabled={disabled}
                    name={name}
                    required={required}
                    min={min}
                    max={max}
                />
            </div>
        );
    } catch (error) {
        console.error('Input component error:', error);
        reportError(error);
        return null;
    }
}
