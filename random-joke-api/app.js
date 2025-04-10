import https from "https";
import chalk from "chalk";
import { error } from "console";


function getJoke(){
    const url = "https://official-joke-api.appspot.com/random_joke";

    https.get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
            data += chunk;
        });

        res.on("end", () => {
            let parse = JSON.parse(data);

            console.log(chalk.bold.blue(`Type : ${parse.type}`));
            console.log(chalk.bold.yellow(`Setup : ${parse.setup}`));
            console.log(chalk.bold.green(`Setup : ${parse.punchline}`));
        });

        res.on("error", (err) => {
            console.log(`while fetching API : ${err.message}`);
            
        })
    });
};


getJoke();