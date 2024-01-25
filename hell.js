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
//same with axios
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`breed: ${data}`);
    return superagent
      .get(`https://dog.ceo/api/breed/${data}/images/random`)
      .then((res) => {
        const imageUrl = res.body.message;
        console.log(imageUrl);
        return writeFilePro("dog-img.txt", imageUrl).then(() => {
          console.log("random image  savd");
        });
      });
  })
  .catch((err) => {
    console.log(err);
  });
