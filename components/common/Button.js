function Button({ 
    children, 
    onClick, 
    type = 'button', 
    variant = 'primary', 
    size = 'md', 
    disabled = false, 
    loading = false,
    className = '',
    fullWidth = false
}) {
    try {
        const getVariantClasses = () => {
            switch (variant) {
                case 'primary':
                    return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
                case 'secondary':
                    return 'bg-gray-200 text-gray-700 hover:bg-gray-300 focus:ring-gray-500';
                case 'success':
                    return 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500';
                case 'danger':
                    return 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500';
                case 'warning':
                    return 'bg-yellow-500 text-white hover:bg-yellow-600 focus:ring-yellow-500';
                case 'outline':
                    return 'bg-transparent text-blue-600 border border-blue-600 hover:bg-blue-50 focus:ring-blue-500';
                default:
                    return 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
            }
        };

        const getSizeClasses = () => {
            switch (size) {
                case 'sm':
                    return 'px-3 py-1.5 text-sm';
                case 'md':
                    return 'px-4 py-2';
                case 'lg':
                    return 'px-6 py-3 text-lg';
                default:
                    return 'px-4 py-2';
            }
        };

        return (
            <button
                data-name="button"
                type={type}
                className={`
                    inline-flex items-center justify-center rounded-md font-medium
                    focus:outline-none focus:ring-2 focus:ring-offset-2
                    transition-colors duration-200 ease-in-out
                    ${getVariantClasses()}
                    ${getSizeClasses()}
                    ${disabled || loading ? 'opacity-60 cursor-not-allowed' : ''}
                    ${fullWidth ? 'w-full' : ''}
                    ${className}
                `}
                onClick={onClick}
                disabled={disabled || loading}
            >
                {loading && (
                    <svg 
                        className="animate-spin -mr-1 ml-2 h-4 w-4 text-current" 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24"
                    >
                        <circle 
                            className="opacity-25" 
                            cx="12" 
                            cy="12" 
                            r="10" 
                            stroke="currentColor" 
                            strokeWidth="4"
                        ></circle>
                        <path 
                            className="opacity-75" 
                            fill="currentColor" 
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                )}
                {children}
            </button>
        );
    } catch (error) {
        console.error('Button component error:', error);
        reportError(error);
        return null;
    }
}
