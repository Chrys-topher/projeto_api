import express from 'express';
import fetch from 'node-fetch';

const router = express.Router();

const API_KEY = 'v1hHV96Bw50g2zlpQOTAIF7eRjJ8mcob';

router.post('/buscar', async (req, res) => {
  try {
    const requestBody = {
      ...req.body,
      filters: {
        ...(req.body.filters || {}),
        language: ['pt']
      }
    };

    const coreResponse = await fetch('https://api.core.ac.uk/v3/search/works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const data = await coreResponse.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});


export default router;
