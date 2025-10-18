import React, { useEffect, useState, useMemo } from 'react';
import { Paper, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { getDrugsData, getTableConfig } from './api';

import 'react-virtualized/styles.css';

export default function DrugTable() {
    const [companyFilter, setCompanyFilter] = useState('');
    const [drugs, setDrugs] = useState([]);
    const [tableConfig, setTableConfig] = useState({});

    useEffect(() => {
        getTableConfig().then(tableConfig => setTableConfig(tableConfig))
    }, [])

    useEffect(() => {
        getDrugsData({ companyFilter }).then(data => setDrugs(data))
    }, [companyFilter])

    const companies = [...new Set(drugs.map(d => d.company))];

    const filteredDrugs = companyFilter
        ? drugs.filter(d => d.company === companyFilter)
        : drugs;

    const paginationModel = { page: 1, pageSize: 20 };

    const columns = useMemo(() => {
        if (!tableConfig?.columns) return [];
        const columns = tableConfig?.columns;
        return [
            { width: 100, field: 'index', headerName: columns[0].label },
            { width: 150, field: columns[1].id, headerName: columns[1].label },
            { width: 600, field: columns[2].id, headerName: columns[2].label, valueGetter: (value, row) => `${row.generic_name} (${row.brand_name})`},
            { width: 500, field: columns[3].id, headerName: columns[3].label },
            { width: 180, field: columns[4].id, headerName: columns[4].label, valueGetter: (value, row) => `${new Date(value).toLocaleDateString()}` },
        ];
    }, [tableConfig])

    const rows = useMemo(() => {
        return filteredDrugs.map((drug, index) => ({ ...drug, index: index + 1 }));
    }, [filteredDrugs])

    const handleCellDoubleClick = (params) => {
        if (params.field === "company") {
            setCompanyFilter(params.value)
        }
    }

    const renderCompanyDropdown = () => (
        <FormControl
            fullWidth sx={{ mb: 2 }}>
            <InputLabel>Company</InputLabel>
            <Select value={companyFilter} label="Company" onChange={e => setCompanyFilter(e.target.value)} >
                <MenuItem value="">All Companies</MenuItem>
                {companies.map(c => (<MenuItem key={c} value={c}> {c} </MenuItem>))}
            </Select>
        </FormControl>
    )

    const renderDrugsTable = () => (
        <Paper sx={{ height: 600, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{ pagination: { paginationModel } }}
                pageSizeOptions={[5, 10]}
                sx={{ border: 0 }}
                onCellDoubleClick={handleCellDoubleClick}
            />
        </Paper>
    )

    return (
        <div className='drug-table-container'>
            <h1>Drugs Table</h1>
            {renderCompanyDropdown()}
            {renderDrugsTable()}
        </div>
    );
}