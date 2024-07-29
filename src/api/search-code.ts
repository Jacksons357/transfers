import axios from 'axios'

const headers = {
  'X-Cosmos-Token': 'PO7ziItx_FGFT361gqt0RQ',
  'Content-Type': 'application/json',
  // 'User-Agent': 'Cosmos-API-Request', utilizar se der erro.
}
export async function searchCode(value: string) {
  try {
    const response = await axios.get(
      `https://api.cosmos.bluesoft.com.br/gtins/${value}`,
      { headers },
    )

    const productName = await response.data.description
    return productName
  } catch (error) {
    console.error('Erro ao buscar dados do produto: ', error)
    return 'Produto não encontrado'
  }
}