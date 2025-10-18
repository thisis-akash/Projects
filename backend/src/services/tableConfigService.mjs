export const getTableConfig = async () => {
    return {
        columns: [
            { id: 'id', label: 'Id' },
            { id: 'code', label: 'Code' },
            { id: 'generic_name', label: 'Name' },
            { id: 'company', label: 'Company' },
            { id: 'launch_date', label: 'Launch Date' }
        ],
        defaultSort: { column: 'launch_date', order: 'desc' }
    };
};