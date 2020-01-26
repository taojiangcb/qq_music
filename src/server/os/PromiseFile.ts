import fs from 'fs';
const promiseReadFile = (path: string) => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(path, (err, data) => {
      if (err) {
        console.log('err....');
        console.log(err.stack || err.message);
        reject(err.stack || err.message);
      } 
      else {
        resolve(String(data));
      }
    })
  })
}

export { promiseReadFile }