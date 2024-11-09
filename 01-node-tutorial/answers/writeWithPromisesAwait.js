const { writeFile, readFile } = require("fs").promises;
//create a writer function
async function writer(){
    // Writing three lines to tempt.txt
    try {
        await writeFile(
          "./content/tempt.txt",
          "This is the first paragraph\nThis is the second\nThis is the third"
        );
      } catch (error) {
        console.error("Error writing to file:", error);
      }
    }
    // Create the reader function
async function reader() {
    try {
      const first = await readFile("./content/tempt.txt", "utf8");
      console.log(first);
    } catch (error) {
      console.error("Error reading from file:", error);
    }
  }
  // Create the readWrite function to execute writer and reader in order
async function readWrite() {
    try{
        await writer();
        await reader();
    }catch (err){
        console.log("An error occured: ", err)
  }}
  readWrite();
  
