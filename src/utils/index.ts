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

// get duration
export const getDurations = (milliseconds: number): string => {
  // days
  const days = milliseconds / 1000 / 60 / 60 / 24
  const daysRound = Math.floor(days)
  const daysStr = `${daysRound > 0 ? `${daysRound}` : ''}`
  // hours
  const hours = milliseconds / 1000 / 60 / 60 - (24 * daysRound)
  const hoursRound = Math.floor(hours)
  const hoursStr = `${hoursRound > 0 ? `${hoursRound}` : ''}`
  // minutes
  const minutes = milliseconds / 1000 / 60 - (24 * 60 * daysRound) - (60 * hoursRound)
  const minutesRound = Math.floor(minutes)
  const minutesStr = `${minutesRound > 0 ? (minutesRound < 10 ? `${'0' + minutesRound}` : minutesRound) : '00'}`
  // seconds
  const seconds = milliseconds / 1000 - (24 * 60 * 60 * daysRound) - (60 * 60 * hoursRound) - (60 * minutesRound)
  const secondsRound = Math.floor(seconds)
  const secondsStr = `${secondsRound > 0 ? (secondsRound < 10 ? `${'0' + secondsRound}` : secondsRound) : '00'} `
  // ms
  const ms = milliseconds - (24 * 60 * 60 * 1000 * daysRound) - (60 * 60 * 1000 * hoursRound) - (60 * 1000 * minutesRound) - (secondsRound * 1000)
  const msStr = `${ms > 0 ? `${ms}` : ''}`

  const str = `${minutesStr}:${secondsStr}`
  return str
}
