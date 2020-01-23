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
    // let readStream = fs.createReadStream(path);
    // let bytes: string = "";
    // readStream.setEncoding('UTF8');
    // readStream.on('data', (thunk) => {
    //   bytes += thunk;
    // })
    // readStream.on('end', () => {
    //   resolve(bytes);
    // })
    // readStream.on('error', (err) => {
    //   reject(err.stack || err.message);
    // })
  })
}

export { promiseReadFile }