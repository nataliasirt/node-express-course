const { writeFile, readFile } = require("fs").promises;

writeFile("./content/tempt.txt", "This is the first paragraph\n")
  .then(() => {
    return writeFile("./content/tempt.txt", "This is the second paragraph\n", {
      flag: "a",
    });
  })
  .then(() => {
    return writeFile("./content/tempt.txt", "This is the last paragraph\n", {
      flag: "a",
    });
  })
  .then(() => {
    const first = readFile("./content/tempt.txt", "utf8");
    return first;
  })
  .then((result) => {
    console.log(result);
  })
  .catch((error) => {
    console.log("An error occurred: ", error);
  });