import readline from "readline";
import chalk from "chalk";
import fs from "fs";
import path from "path";


let fileName = "todo.json";
let dirPath = path.join(import.meta.dirname, fileName);

fs.readdir(import.meta.dirname, (err, data) => {
    if(!data.includes(fileName)){
        fs.writeFileSync(dirPath, `${JSON.stringify({todo_lists: []})}`);      
    }
})




let redMsg = chalk.red.bold;
let warnMsg = chalk.hex("#e67e22").bold
let blueMsg = chalk.blue.bold;
let cyanMsg = chalk.cyan.bold;
let yellowMsg = chalk.yellow;
let greenMsg = chalk.green.bold;


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});



let todo_lists = [];


function showMenu(){
    console.log(chalk.bold("\n============ CLI To-Do App ============\n"));
    console.log(yellowMsg(`${blueMsg("Select 1")} : add todo list`));
    console.log(yellowMsg(`${blueMsg("Select 2")} : view todo list`));
    console.log(yellowMsg(`${blueMsg("Select 3")} : permanently delete tasks`));
    console.log(yellowMsg(`${blueMsg("Select 4")} : exit from app`));
    console.log("\n");
    rl.question(`Select Options : `, handelInput)
}


const handelInput = (selected) => {
    if(selected === "1"){
        rl.question(cyanMsg("Enter your task : "), (task) => {
            todo_lists.push(task);
            addTodoList(task);
        });
    }
    else if(selected === "2"){
        fs.readFile(dirPath, "utf-8", (err, data) => {
            let parseData = JSON.parse(data);
            parseData.todo_lists.forEach((e, i) => {
                console.log(`${blueMsg(`Task ${i+1}`)} : ${e}`);
            });
            showMenu();
        })
    }
    else if(selected === "3"){
        // del
        rl.question(`${warnMsg(`Are you sure ! ${greenMsg(`(y)`)} or ${greenMsg(`(n)`)}`)} : `, (cmd) => {
            if(cmd === "y"){
                fs.unlink(dirPath, (err) => {
                    if(err) console.log(err.message);
                    console.log(redMsg("File Has Been Deleted"));
                    showMenu();
                })
            }else{
                showMenu();
            }
        })
        
    }
    else if(selected === "4"){
        console.log(yellowMsg("Good Bye !"));
        rl.close();
    }
    else{
        console.log(redMsg("Unexpected Command"));
        showMenu();
    }
};


showMenu();





// todo list array add on todo.json file

function addTodoList(task){
    
    fs.readFile(dirPath, "utf-8", (err, data) => {
        let parseData = JSON.parse(data);
        parseData.todo_lists.push(task)
    
        fs.writeFile(dirPath, `${JSON.stringify(parseData)}`, () => {
            console.log(greenMsg("Task Has Been Added !"));
            showMenu();
        });
        
    })
    
}