import fs from 'fs';
import csv from 'csv-parser'

export const addExtraRowToCSV = (name, genres) => {
    fs.readFile('movies.csv', 'utf8', (err, data) => {
      if (err) {
        console.error('Lỗi khi đọc tệp CSV:', err);
        return;
      }
      const rows = data.trim().split('\n');
      const lastRow = rows.length;
      
      const extraRow = `${lastRow+1},${name},${genres.join('|')}\n`;
      fs.appendFileSync('movies.csv', extraRow);
    });
}
  
export const check_name_in_csv = (name) => {
    return new Promise((resolve, reject) => {
        const results = [];
        fs.createReadStream('history.csv')
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                const found = results.some(row => row.userName === name);
                resolve(found);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
}
  
export const getDataByUserName = async (userName) => {
    const results = [];

    return new Promise((resolve, reject) => {
        fs.createReadStream('history.csv')
            .pipe(csv())
            .on('data', (data) => {
                if (data.userName === userName) {
                    results.push(data.Film);
                }
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', (error) => {
                reject(error);
            });
    });
};