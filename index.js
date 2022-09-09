import * as fs from 'node:fs';
import fetch from 'node-fetch';

const url = 'http://text-processing.com/api/sentiment/';

async function postData(link = '', data = '') {
  const response = await fetch(link, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: new URLSearchParams({
      text: data,
    }),
  });
  return response.json();
}

const labelExt = (label) => {
  if (label === 'neg') {
    return 'negative';
  }
  if (label === 'pos') {
    return 'positive';
  } else {
    return 'neutral';
  }
};

if (!process.argv[2]) {
  throw new Error(
    'Please add a sentence or word as arguments. You can also add a text file to the project directory and add its path as the argument. There is already one in it call myText.txt.',
  );
}

if (process.argv[2].includes('.txt')) {
  const readMe = fs.readFileSync(process.argv[2], 'utf-8');
  await postData(url, readMe).then((res) => {
    console.log(
      `Your text has the following sentiment:\n\n${labelExt(res.label)} with ${(
        res.probability[res.label] * 100
      ).toFixed(2)}% probability.`,
    );
  });
} else {
  const text = process.argv.splice(2).join(' ');
  await postData(url, text).then((res) => {
    console.log(
      `Your text has the following sentiment:\n\n${labelExt(res.label)} with ${(
        res.probability[res.label] * 100
      ).toFixed(2)}% probability.`,
    );
  });
}
