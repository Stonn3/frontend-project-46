#!/usr/bin/env node

const fs = require('fs');
const _ = require('lodash');

const genDiff = (data1, data2) => {
  const keys = _.union(Object.keys(data1), Object.keys(data2));
  const sortedKeys = _.sortBy(keys);

  const diff = sortedKeys.map((key) => {
    if (!_.has(data1, key)) {
      return `+ ${key}: ${data2[key]}`;
    }
    if (!_.has(data2, key)) {
      return `- ${key}: ${data1[key]}`;
    }
    if (data1[key] === data2[key]) {
      return `  ${key}: ${data1[key]}`;
    }
    return [
      `- ${key}: ${data1[key]}`,
      `+ ${key}: ${data2[key]}`,
    ];
  });

  return `{\n${diff.flat().join('\n')}\n}`;
};

const getDataFromFile = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
};

const [filePath1, filePath2] = process.argv.slice(2);

const data1 = getDataFromFile(filePath1);
const data2 = getDataFromFile(filePath2);

const diff = genDiff(data1, data2);
console.log(diff);
