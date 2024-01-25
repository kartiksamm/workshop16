const fs = require("fs");
const superagent = require("superagent");
const { reject } = require("superagent/lib/request-base");

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject("I could not find the file");
      }
      resolve(data);
    });
  });
};
const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject("could not write file");
      }
      resolve("success");
    });
  });
};
const getPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed ${data}`);
    const res = await superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const imageUrl = res.body.message;
    console.log(imageUrl);
    await writeFilePro("dog-img.txt", imageUrl);
    console.log("random file saved");
  } catch (err) {
    console.log(err);
  }
};
getPic();
