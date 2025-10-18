export const getTableConfig = async () => {
    return {
        columns: [
            { id: 'id', label: 'Id', visible: true },
            { id: 'code', label: 'Code', visible: true },
            { id: 'name', label: 'Name', visible: true },
            { id: 'company', label: 'Company', visible: true },
            { id: 'launch_date', label: 'Launch Date', visible: true }
        ],
        defaultSort: { column: 'launch_date', order: 'desc' }
    };
};