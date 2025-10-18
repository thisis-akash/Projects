import * as TableConfigService from '../services/tableConfigService.mjs';

export const getConfig = async (req, res) => {
  try {

    const config = await TableConfigService.getTableConfig();
    res.json(config);

  } catch (error) {

    console.error(error);
    res.status(500).json({ error: 'Failed to fetch table configuration' });
    
  }
};