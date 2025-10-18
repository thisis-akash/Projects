const API_BASE_URL = 'http://localhost:3000/api/v1'

export const getDrugsData = async (params) => {
    try {
        const { companyFilter } = params
        const url = `${API_BASE_URL}/drugs?${companyFilter ? `company=${encodeURIComponent(companyFilter)}` : ''}`;

        return fetch(url).then(res => res.json())
    } catch (ex) {
        console.error('Error in fetching drugs api:', err)
        throw ex
    }
}

export const getTableConfig = async () => {
    try {
        const url = `${API_BASE_URL}/table-config`;
        return fetch(url).then(res => res.json())
    } catch (ex) {
        console.error('Error in fetching table config api:', err)
        throw ex
    }
}