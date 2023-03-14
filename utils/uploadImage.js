// import fs from 'fs';
// import path from 'path';

// export async function uploadFile(file) {
//   const filePath = path.resolve('./uploads', file.name);
//   const stream = fs.createWriteStream(filePath);
//   await new Promise((resolve, reject) => {
//     stream.on('error', reject);
//     file.stream.pipe(stream);
//     stream.on('finish', resolve);
//   });
//   console.log(filePath)
//   return filePath;
// }
