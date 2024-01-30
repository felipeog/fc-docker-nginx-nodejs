const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;
const connection = mysql.createConnection({
  host: "db",
  user: "root",
  password: "root",
  database: "nodedb",
});
const namesToChoose = [
  "Celma",
  "Erison",
  "Felipe",
  "Jonnatha",
  "Laura",
  "Léa",
  "Leonídia",
  "Luiza",
  "Márcia",
  "Matheus",
  "Patrícia",
  "Pedro",
  "Renan",
  "Shayene",
  "Thiago",
  "Victor",
];

app.get("/", (_req, res) => {
  const randomName =
    namesToChoose[Math.floor(Math.random() * namesToChoose.length)];

  connection.query(`INSERT INTO people(name) values('${randomName}')`);

  connection.query(`SELECT * FROM people`, (error, results, _fields) => {
    if (error) throw error;

    const names = results.map((person) => person.name);
    const items = names.reduce((items, name) => `${items}<li>${name}</li>`, "");
    const list = `<ol>${items}</ol>`;

    res.send(`<h1>Full Cycle Rocks!</h1>${list}`);
  });
});

app.listen(port, () => {
  console.log("Rodando na porta " + port);
});
