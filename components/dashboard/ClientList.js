function ClientList() {
    try {
        const [clients, setClients] = React.useState([]);
        const [isLoading, setIsLoading] = React.useState(true);
        const [error, setError] = React.useState(null);
        const [showAddModal, setShowAddModal] = React.useState(false);
        const [showImportModal, setShowImportModal] = React.useState(false);
        const [showEditModal, setShowEditModal] = React.useState(false);
        const [showPaymentModal, setShowPaymentModal] = React.useState(false);
        const [currentClient, setCurrentClient] = React.useState(null);
        const [filter, setFilter] = React.useState('all');
        const [searchTerm, setSearchTerm] = React.useState('');
        const [selectedClients, setSelectedClients] = React.useState([]);
        
        React.useEffect(() => {
            fetchClients();
        }, []);
        
        const fetchClients = async () => {
            setIsLoading(true);
            try {
                // In a real app, this would be an API call
                // const data = await getClients();
                
                // For demo purposes, we'll use mock data
                await new Promise(resolve => setTimeout(resolve, 800));
                setClients(getMockClients());
            } catch (error) {
                console.error('Error fetching clients:', error);
                setError('فشل في تحميل بيانات العملاء');
            } finally {
                setIsLoading(false);
            }
        };
        
        const handleAddClient = (client) => {
            setClients([...clients, { 
                ...client, 
                id: Date.now(),
                paidAmount: 0,
                remainingAmount: parseFloat(client.amount) 
            }]);
            setShowAddModal(false);
        };
        
        const handleEditClient = (updatedClient) => {
            const oldClient = clients.find(c => c.id === updatedClient.id);
            const newRemainingAmount = parseFloat(updatedClient.amount) - (oldClient.paidAmount || 0);
            
            setClients(clients.map(client => 
                client.id === updatedClient.id ? {
                    ...updatedClient,
                    remainingAmount: newRemainingAmount >= 0 ? newRemainingAmount : 0,
                    paidAmount: oldClient.paidAmount || 0
                } : client
            ));
            setShowEditModal(false);
            setCurrentClient(null);
        };
        
        const handleDeleteClient = (id) => {
            if (window.confirm('هل أنت متأكد من حذف هذا العميل؟')) {
                setClients(clients.filter(client => client.id !== id));
            }
        };
        
        const handleToggleSelect = (id) => {
            if (selectedClients.includes(id)) {
                setSelectedClients(selectedClients.filter(clientId => clientId !== id));
            } else {
                setSelectedClients([...selectedClients, id]);
            }
        };
        
        const handleSelectAll = () => {
            if (selectedClients.length === filteredClients.length) {
                setSelectedClients([]);
            } else {
                setSelectedClients(filteredClients.map(client => client.id));
            }
        };
        
        const handleSendReminders = async () => {
            if (selectedClients.length === 0) {
                alert('يرجى اختيار عميل واحد على الأقل');
                return;
            }
            
            const selectedClientData = clients.filter(client => 
                selectedClients.includes(client.id)
            );
            
            try {
                // In a real app, this would call an API
                // const results = await sendRemindersToClients(selectedClientData);
                
                // For demo purposes
                await new Promise(resolve => setTimeout(resolve, 1000));
                alert(`تم إرسال التذكيرات إلى ${selectedClients.length} عملاء بنجاح`);
            } catch (error) {
                console.error('Error sending reminders:', error);
                alert('حدث خطأ أثناء إرسال التذكيرات');
            }
        };
        
        const handleImportClients = (importedClients) => {
            // Add payment tracking fields to imported clients
            const enhancedClients = importedClients.map(client => ({
                ...client,
                paidAmount: 0,
                remainingAmount: parseFloat(client.amount)
            }));
            
            setClients([...clients, ...enhancedClients]);
            setShowImportModal(false);
        };
        
        const handleUpdateStatus = (id, status) => {
            setClients(clients.map(client => 
                client.id === id ? { ...client, status } : client
            ));
        };

        const handleAddPayment = (clientId, paymentAmount) => {
            setClients(clients.map(client => {
                if (client.id === clientId) {
                    const paidAmount = (parseFloat(client.paidAmount) || 0) + parseFloat(paymentAmount);
                    const totalAmount = parseFloat(client.amount);
                    const remainingAmount = totalAmount - paidAmount;
                    
                    return {
                        ...client,
                        paidAmount: paidAmount,
                        remainingAmount: remainingAmount > 0 ? remainingAmount : 0,
                        status: remainingAmount <= 0 ? 'paid' : 'unpaid'
                    };
                }
                return client;
            }));
            setShowPaymentModal(false);
            setCurrentClient(null);
        };
        
        // Filter clients based on status and search term
        const filteredClients = clients.filter(client => {
            const matchesFilter = filter === 'all' || client.status === filter;
            const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                                 client.phone.includes(searchTerm);
            return matchesFilter && matchesSearch;
        });
        
        // Client form component
        const ClientForm = ({ client, onSubmit, onCancel }) => {
            const [formData, setFormData] = React.useState({
                name: client?.name || '',
                phone: client?.phone || '',
                amount: client?.amount || '',
                dueDate: client?.dueDate || '',
                status: client?.status || 'unpaid'
            });
            
            const handleChange = (e) => {
                const { name, value } = e.target;
                setFormData({ ...formData, [name]: value });
            };
            
            const handleSubmit = (e) => {
                e.preventDefault();
                onSubmit(client?.id ? { ...formData, id: client.id } : formData);
            };
            
            return (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            اسم العميل
                        </label>
                        <Input
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            رقم الهاتف
                        </label>
                        <Input
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            type="tel"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            المبلغ الشهري (درهم)
                        </label>
                        <Input
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            type="number"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            تاريخ الاستحقاق
                        </label>
                        <Input
                            name="dueDate"
                            value={formData.dueDate}
                            onChange={handleChange}
                            type="date"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            حالة الدفع
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                            <option value="paid">تم الدفع</option>
                            <option value="unpaid">لم يتم الدفع</option>
                        </select>
                    </div>
                    <div className="flex justify-end space-x-2 space-x-reverse">
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            إلغاء
                        </Button>
                        <Button type="submit">
                            {client ? 'تحديث' : 'إضافة'}
                        </Button>
                    </div>
                </form>
            );
        };
        
        // Payment form component
        const PaymentForm = ({ client, onSubmit, onCancel }) => {
            const [paymentAmount, setPaymentAmount] = React.useState('');
            const [paymentDate, setPaymentDate] = React.useState(
                new Date().toISOString().split('T')[0]
            );
            const [paymentNote, setPaymentNote] = React.useState('');
            const [error, setError] = React.useState('');
            
            const handleSubmit = (e) => {
                e.preventDefault();
                
                if (!paymentAmount || isNaN(parseFloat(paymentAmount)) || parseFloat(paymentAmount) <= 0) {
                    setError('يرجى إدخال مبلغ صحيح');
                    return;
                }
                
                if (parseFloat(paymentAmount) > parseFloat(client.remainingAmount)) {
                    setError('المبلغ المدخل أكبر من المبلغ المتبقي');
                    return;
                }
                
                onSubmit(client.id, paymentAmount);
            };
            
            return (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <div className="bg-blue-50 p-4 rounded-md mb-4">
                            <h3 className="font-bold text-blue-700 mb-2">معلومات العميل</h3>
                            <p className="text-sm text-gray-700">الاسم: {client.name}</p>
                            <p className="text-sm text-gray-700">المبلغ الإجمالي: {client.amount} درهم</p>
                            <p className="text-sm text-gray-700">المبلغ المدفوع: {client.paidAmount || 0} درهم</p>
                            <p className="text-sm text-gray-700">المبلغ المتبقي: {client.remainingAmount || client.amount} درهم</p>
                        </div>
                        
                        {error && (
                            <div className="bg-red-50 text-red-700 p-3 rounded mb-4">
                                {error}
                            </div>
                        )}
                        
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            مبلغ الدفع (درهم)
                        </label>
                        <Input
                            value={paymentAmount}
                            onChange={(e) => {
                                setPaymentAmount(e.target.value);
                                setError('');
                            }}
                            type="number"
                            max={client.remainingAmount}
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            تاريخ الدفع
                        </label>
                        <Input
                            value={paymentDate}
                            onChange={(e) => setPaymentDate(e.target.value)}
                            type="date"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ملاحظات (اختياري)
                        </label>
                        <textarea
                            value={paymentNote}
                            onChange={(e) => setPaymentNote(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            rows="2"
                        />
                    </div>
                    <div className="flex justify-end space-x-2 space-x-reverse">
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            إلغاء
                        </Button>
                        <Button type="submit">
                            تسجيل الدفع
                        </Button>
                    </div>
                </form>
            );
        };
        
        // Import clients form
        const ImportForm = ({ onSubmit, onCancel }) => {
            const [file, setFile] = React.useState(null);
            const [isProcessing, setIsProcessing] = React.useState(false);
            
            const handleFileChange = (e) => {
                setFile(e.target.files[0]);
            };
            
            const handleSubmit = async (e) => {
                e.preventDefault();
                if (!file) return;
                
                setIsProcessing(true);
                
                try {
                    // In a real app, this would call an API to process the file
                    // const importedClients = await importClients(file);
                    
                    // For demo purposes
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    
                    // Mock imported clients
                    const importedClients = [
                        { id: Date.now() + 1, name: 'عميل مستورد 1', phone: '0501111111', amount: 5000, dueDate: '2023-07-15', status: 'unpaid' },
                        { id: Date.now() + 2, name: 'عميل مستورد 2', phone: '0502222222', amount: 7500, dueDate: '2023-07-20', status: 'unpaid' }
                    ];
                    
                    onSubmit(importedClients);
                } catch (error) {
                    console.error('Error importing clients:', error);
                    alert('حدث خطأ أثناء استيراد العملاء');
                } finally {
                    setIsProcessing(false);
                }
            };
            
            return (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            ملف Excel
                        </label>
                        <input
                            type="file"
                            accept=".xlsx,.xls,.csv"
                            onChange={handleFileChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            required
                        />
                    </div>
                    <div>
                        <p className="text-sm text-gray-600 mb-2">تنسيق الملف المطلوب:</p>
                        <ul className="list-disc list-inside text-sm text-gray-600 mb-4">
                            <li>الأعمدة: الاسم، رقم الهاتف، المبلغ، تاريخ الاستحقاق</li>
                            <li>يجب أن يكون الصف الأول عناوين الأعمدة</li>
                            <li>يجب أن تكون أرقام الهاتف بتنسيق دولي (مثال: 966501234567)</li>
                        </ul>
                        <a href="#" className="text-blue-600 text-sm">تحميل نموذج</a>
                    </div>
                    <div className="flex justify-end space-x-2 space-x-reverse">
                        <Button type="button" variant="secondary" onClick={onCancel}>
                            إلغاء
                        </Button>
                        <Button type="submit" loading={isProcessing}>
                            استيراد
                        </Button>
                    </div>
                </form>
            );
        };
        
        return (
            <div data-name="client-list-container">
                <h1 className="text-2xl font-bold mb-6">إدارة العملاء</h1>
                
                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-4">
                        {error}
                    </div>
                )}
                
                <div className="bg-white rounded-lg shadow p-6 mb-6">
                    <div className="flex flex-wrap items-center justify-between mb-4">
                        <div className="flex space-x-2 space-x-reverse mb-2 sm:mb-0">
                            <button
                                onClick={() => setFilter('all')}
                                className={`px-4 py-2 rounded-md ${
                                    filter === 'all'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                الكل
                            </button>
                            <button
                                onClick={() => setFilter('paid')}
                                className={`px-4 py-2 rounded-md ${
                                    filter === 'paid'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                تم الدفع
                            </button>
                            <button
                                onClick={() => setFilter('unpaid')}
                                className={`px-4 py-2 rounded-md ${
                                    filter === 'unpaid'
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                }`}
                            >
                                لم يتم الدفع
                            </button>
                        </div>
                        
                        <div className="flex space-x-2 space-x-reverse">
                            <Button
                                onClick={() => setShowAddModal(true)}
                                variant="primary"
                            >
                                <i className="fas fa-plus ml-2"></i>
                                إضافة عميل
                            </Button>
                            <Button
                                onClick={() => setShowImportModal(true)}
                                variant="secondary"
                            >
                                <i className="fas fa-file-import ml-2"></i>
                                استيراد
                            </Button>
                        </div>
                    </div>
                    
                    <div className="mb-4">
                        <Input
                            placeholder="بحث بالاسم أو رقم الهاتف"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            icon="fa-search"
                        />
                    </div>
                    
                    {selectedClients.length > 0 && (
                        <div className="bg-blue-50 p-3 rounded-md flex items-center justify-between mb-4">
                            <p className="text-blue-700">
                                تم اختيار {selectedClients.length} عملاء
                            </p>
                            <div className="flex space-x-2 space-x-reverse">
                                <Button
                                    onClick={handleSendReminders}
                                    size="sm"
                                >
                                    <i className="fas fa-paper-plane ml-2"></i>
                                    إرسال تذكير
                                </Button>
                                <Button
                                    onClick={() => setSelectedClients([])}
                                    variant="secondary"
                                    size="sm"
                                >
                                    إلغاء التحديد
                                </Button>
                            </div>
                        </div>
                    )}
                    
                    {isLoading ? (
                        <div className="flex justify-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : filteredClients.length === 0 ? (
                        <div className="text-center py-12">
                            <p className="text-gray-600">لا يوجد عملاء مطابقين للبحث</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="client-table">
                                <thead>
                                    <tr>
                                        <th className="w-10">
                                            <input
                                                type="checkbox"
                                                checked={selectedClients.length === filteredClients.length && filteredClients.length > 0}
                                                onChange={handleSelectAll}
                                                className="h-4 w-4"
                                            />
                                        </th>
                                        <th>الاسم</th>
                                        <th>رقم الهاتف</th>
                                        <th>المبلغ الإجمالي</th>
                                        <th>المبلغ المدفوع</th>
                                        <th>المبلغ المتبقي</th>
                                        <th>تاريخ الاستحقاق</th>
                                        <th>الحالة</th>
                                        <th>الإجراءات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredClients.map(client => (
                                        <tr key={client.id}>
                                            <td>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedClients.includes(client.id)}
                                                    onChange={() => handleToggleSelect(client.id)}
                                                    className="h-4 w-4"
                                                />
                                            </td>
                                            <td>{client.name}</td>
                                            <td>{client.phone}</td>
                                            <td>{client.amount} درهم</td>
                                            <td>{client.paidAmount || 0} درهم</td>
                                            <td>{client.remainingAmount || client.amount} درهم</td>
                                            <td>{client.dueDate}</td>
                                            <td>
                                                {client.status === 'paid' ? (
                                                    <span className="status-badge status-badge-success">
                                                        تم الدفع
                                                    </span>
                                                ) : (
                                                    <span className="status-badge status-badge-error">
                                                        لم يتم الدفع
                                                    </span>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex space-x-1 space-x-reverse">
                                                    <button
                                                        onClick={() => {
                                                            setCurrentClient(client);
                                                            setShowEditModal(true);
                                                        }}
                                                        className="p-1 text-blue-600 hover:text-blue-800"
                                                        title="تعديل"
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteClient(client.id)}
                                                        className="p-1 text-red-600 hover:text-red-800"
                                                        title="حذف"
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setCurrentClient(client);
                                                            setShowPaymentModal(true);
                                                        }}
                                                        className="p-1 text-green-600 hover:text-green-800"
                                                        title="تسجيل دفعة"
                                                    >
                                                        <i className="fas fa-money-bill-wave"></i>
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(client.id, client.status === 'paid' ? 'unpaid' : 'paid')}
                                                        className={`p-1 ${client.status === 'paid' ? 'text-orange-600 hover:text-orange-800' : 'text-green-600 hover:text-green-800'}`}
                                                        title={client.status === 'paid' ? 'تغيير إلى لم يتم الدفع' : 'تغيير إلى تم الدفع'}
                                                    >
                                                        <i className={`fas ${client.status === 'paid' ? 'fa-times-circle' : 'fa-check-circle'}`}></i>
                                                    </button>
                                                    <button
                                                        onClick={() => alert(`سيتم إرسال تذكير إلى ${client.name}`)}
                                                        className="p-1 text-green-600 hover:text-green-800"
                                                        title="إرسال تذكير"
                                                    >
                                                        <i className="fab fa-whatsapp"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
                
                {showAddModal && (
                    <Modal onClose={() => setShowAddModal(false)}>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">إضافة عميل جديد</h2>
                            <ClientForm 
                                onSubmit={handleAddClient}
                                onCancel={() => setShowAddModal(false)}
                            />
                        </div>
                    </Modal>
                )}
                
                {showEditModal && currentClient && (
                    <Modal onClose={() => {
                        setShowEditModal(false);
                        setCurrentClient(null);
                    }}>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">تعديل بيانات العميل</h2>
                            <ClientForm 
                                client={currentClient}
                                onSubmit={handleEditClient}
                                onCancel={() => {
                                    setShowEditModal(false);
                                    setCurrentClient(null);
                                }}
                            />
                        </div>
                    </Modal>
                )}
                
                {showPaymentModal && currentClient && (
                    <Modal onClose={() => {
                        setShowPaymentModal(false);
                        setCurrentClient(null);
                    }}>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">تسجيل دفعة جديدة</h2>
                            <PaymentForm 
                                client={currentClient}
                                onSubmit={handleAddPayment}
                                onCancel={() => {
                                    setShowPaymentModal(false);
                                    setCurrentClient(null);
                                }}
                            />
                        </div>
                    </Modal>
                )}
                
                {showImportModal && (
                    <Modal onClose={() => setShowImportModal(false)}>
                        <div className="p-6">
                            <h2 className="text-2xl font-bold mb-6">استيراد العملاء</h2>
                            <ImportForm 
                                onSubmit={handleImportClients}
                                onCancel={() => setShowImportModal(false)}
                            />
                        </div>
                    </Modal>
                )}
            </div>
        );
    } catch (error) {
        console.error('Client list component error:', error);
        reportError(error);
        return <div>Something went wrong</div>;
    }
}
