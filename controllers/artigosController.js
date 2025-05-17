import fetch from 'node-fetch';

const API_KEY = 'v1hHV96Bw50g2zlpQOTAIF7eRjJ8mcob'; // Substitua por sua chave, se necessário

export async function buscarArtigos(req, res) {
  try {
    const response = await fetch('https://api.core.ac.uk/v3/search/works', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(req.body)
    });

    if (!response.ok) {
      throw new Error(`Erro na API externa: ${response.status}`);
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ erro: error.message });
  }
}
