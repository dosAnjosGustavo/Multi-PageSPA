import fs from 'fs/promises';

export async function readData(): Promise<StoredData> {
  const data = await fs.readFile('events.json', 'utf8');
  return JSON.parse(data);
}

export async function writeData(data: StoredData) {
  await fs.writeFile('events.json', JSON.stringify(data));
}
