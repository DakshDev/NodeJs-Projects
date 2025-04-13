import fs from "fs";
import path from "path";
import readline from "readline";
import chalk from "chalk";
import { log } from "console";


let welcomeMsg = chalk.bold.hex("#16a085");
let warnMsg = chalk.bold.hex("#e67e22");
let errMsg = chalk.bold.hex("#e74c3c");
let guideMsg = chalk.yellow;
let optionMsg = chalk.bold.blueBright;
let selectMsg = chalk.blueBright;
let fileMsg = chalk.green;
let successMsg = chalk.bold.hex("#2ecc71");



const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})


let mainFileName = "default.txt";






// createFile
function createFile(fileName, fileContent){
    fs.writeFile(path.join(import.meta.dirname, fileName), `${fileContent}`, "utf-8", (err) => {
        if(err) console.log(errMsg("While File Creating: "), err.message);
        else console.log(successMsg("File is created!")); defaultMain();
    });
}

// viewFile
function viewFile(fileName){
    fs.readFile(path.join(import.meta.dirname, fileName), "utf-8", (err, data) => {
        if(err) console.log(errMsg("While Reading File: "), err.message);
        else{
            console.log(`\n${data}`);
            defaultMain();
        }
    });
}

// update file
function updateFile(fileName){
    rl.question(selectMsg("Update Content: "),(content) => {
        fs.writeFile(path.join(import.meta.dirname, fileName), content, "utf-8", (err) => {
            if(err) console.log(errMsg("While Updating Content: "), err.message);
            else{
                console.log(successMsg("File is Updated !"));
                defaultMain();
            }
        });
    })
}



// main handler
const optionHandler = (cmd) => {
    if(cmd === "1" || cmd === "create"){
        rl.question(`${selectMsg("Enter File Name: (default.txt)")} `, (cmd) => {
            if(cmd === "") {
                rl.question(`${selectMsg("Enter File Content")} `, (fileContent="No Content Added !") => {
                    createFile(mainFileName, fileContent);
                });
            }
            if(cmd){
                mainFileName = cmd;
                rl.question(`${selectMsg("Enter File Content")} `, (fileContent="No Content Added !") => {
                    createFile(mainFileName, fileContent);
                });
            }
        })
    }
    else if(cmd === "2" || cmd === "view"){
        fs.readdir(import.meta.dirname, "utf-8", (err, data) => {
            if(err) console.log(errMsg("While File Reading: "), err.message);
            else {
                data.forEach((e, i) => console.log(fileMsg(`${i+1}) ${e}`)) );
                console.log("\n");
                rl.question(`${selectMsg("Enter File Name:")} `, (fileName) => {
                    if(fileName === "") {
                        console.log(warnMsg("Enter File Name: ")); viewFile(fileName);
                    }
                    else viewFile(fileName);
                })  
            }
        })
        
    }
    else if(cmd === "3" || cmd === "update"){
        fs.readdir(import.meta.dirname, "utf-8", (err, data) => {
            if(err) console.log(errMsg("While Dir Read: "), err.message);
            else{
                data.forEach((e, i) => console.log(fileMsg(`${i+1}) ${e}`)) );
                console.log("\n");
                rl.question(`${selectMsg("Enter File Name:")} `, (fileName) => {
                    if(fileName === "") {
                        console.log(warnMsg("Enter File Name"));
                        defaultMain();
                    }
                    else updateFile(fileName);
                })
            }
        })
    }
    else if(cmd === "4" || cmd === "rename"){
        fs.readdir(import.meta.dirname, "utf-8", (err, data) => {
            data.forEach((e, i) => console.log(fileMsg(`${i+1}) ${e}`)) );
            console.log("\n");
            rl.question(selectMsg("Enter File Name: "), (fileName) => {
                rl.question(selectMsg("Rename it: "), (rename) => {
                    fs.rename(path.join(import.meta.dirname, fileName), rename, (err) => {
                        if(err) console.log(errMsg("While Renaming File: "), err.message);
                        else {
                            console.log(successMsg(`File Renamed from (${warnMsg(fileName)}) to (${warnMsg(rename)})`));
                        }
                    })
                })
            });
        });
    }
    else if(cmd === "5" || cmd === "delete"){
        fs.readdir(import.meta.dirname, "utf-8", (err, data) => {
            if(err) console.log(errMsg("While Read Dir: "), err.message);
            else{
                rl.question(warnMsg(`Are you sure to delete the file ${optionMsg("(y)")} or ${optionMsg("(n)")} `), (cmd) => {
                    if(cmd === "" || cmd === "n") defaultMain();
                    else{
                        data.forEach((e, i) => console.log(fileMsg(`${i+1}) ${e}`)) );
                        console.log("\n");
                        rl.question(selectMsg("Enter File Name: "), (fileName) => {
                            if(fileName === ""){
                                console.log(warnMsg("Enter File Name"));
                                defaultMain();
                            }
                            else{
                                fs.unlink(path.join(import.meta.dirname, fileName), (err) => {
                                    if(err) console.log(errMsg("While Deleting File: "), err.message);
                                    console.log(successMsg("File is Deleted Sucessfully!"));
                                    defaultMain()                         ;
                                })     
                            }
                        });
                    }
                })
            }
        });
    }
    else if(cmd === "6" || cmd === "exit"){
        rl.close();
        console.log(warnMsg(`You are exit from the ${welcomeMsg("File Create App")}`));
    }
    else{
        console.log(errMsg("Unexpected Command!"));
        defaultMain();
    }
};







const defaultMain = () => {
console.log(`
\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/
\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/
\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/\\/
`);
    console.log(`${welcomeMsg("Welcome to the File Creater App\n")}`);
    setTimeout(() => {
        console.log(`${guideMsg(`1. Create a new file ${optionMsg("(create)")}`)}`);
        console.log(`${guideMsg(`2. View existing file ${optionMsg("(view)")}`)}`);
        console.log(`${guideMsg(`3. Update content to a file ${optionMsg("(update)")}`)}`);
        console.log(`${guideMsg(`4. Rename a file ${optionMsg("(rename)")}`)}`);
        console.log(`${guideMsg(`5. Delete a file ${optionMsg("(delete)")}`)}`);
        console.log(`${guideMsg(`6. Exit ${optionMsg("(exit)")}`)}`);
        rl.question(`${selectMsg(`\nselect the option: `)}`, optionHandler);
    }, 100);
}

defaultMain();