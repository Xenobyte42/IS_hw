const fs = require('fs');
const path = require('path');

const fsp = fs.promises;

const dirPath = path.resolve(__dirname, '/tmp');
const filePath = path.resolve(dirPath, 'hospital-data.json');

console.log(`Will write in ${filePath}`);

const readData = async () => {
  if (!fs.existsSync(filePath)) {
    if (!fs.existsSync(dirPath)) {
      await fsp.mkdir(dirPath);
    }

    const file = await fsp.open(filePath, 'w');
    await file.write('[]');
    await file.close();
    return [];
  }

  const data = await fsp.readFile(filePath, { encoding: 'utf-8'} );
  const parsedData = JSON.parse(data);
  return parsedData.map((rec) => ({ ...rec, date: new Date(rec.date)}));
};

const writeData = async (data) => {
  if (data === undefined) { return ; }
  await fsp.writeFile(filePath, JSON.stringify(data), 'utf-8');
};

module.exports = {
  readData,
  writeData
}