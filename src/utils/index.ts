import { resolve } from 'path-browserify'; // vite不允许使用path,此处使用path-browserify替代
const fs = require('fs');

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export const getFolder = (path: any) => {
  const components: Array<string> = [];
  const files = fs.readdirSync(path);
  files.forEach(function (item: string) {
    const stat = fs.lstatSync(path + '/' + item);
    if (stat.isDirectory() === true && item != 'components') {
      components.push(path + '/' + item);
      components.push(pathResolve(path + '/' + item));
    }
  });
  return components;
};

export function formatNum(num: number) {
  let res: string
  if (num / 10000 >= 10000) {
    res = Math.ceil(num / 10000 / 10000) + '亿'
  } else {
    res = Math.ceil(num / 10000) + '万'
  }
  return res
}
