function Modal({ children, onClose }) {
    try {
        return (
            <div 
                data-name="modal-overlay"
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            >
                <div 
                    data-name="modal-content"
                    className="bg-white rounded-lg shadow-xl w-full max-w-md relative"
                >
                    <button
                        data-name="modal-close"
                        onClick={onClose}
                        className="absolute top-4 left-4 text-gray-400 hover:text-gray-600"
                    >
                        <i className="fas fa-times"></i>
                    </button>
                    {children}
                </div>
            </div>
        );
    } catch (error) {
        console.error('Modal error:', error);
        reportError(error);
        return null;
    }
}
