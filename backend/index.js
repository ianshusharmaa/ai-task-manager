const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let list = [];

app.get("/tasks", (req, res) => {
  res.send(list);
});

app.post("/tasks", (req, res) => {
  const item = {
    id: Date.now(),
    text: req.body.text,
    done: false
  };
  list.push(item);
  res.send(item);
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  list = list.map(t => (t.id === id ? { ...t, done: true } : t));
  res.send({ ok: true });
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);
  list = list.filter(t => t.id !== id);
  res.send({ ok: true });
});

app.get("/tips", (req, res) => {
  res.send([
    "Start with the easiest task.",
    "Keep your daily list short.",
    "Review completed tasks at the end of the day."
  ]);
});

app.listen(5000, () => {
  console.log("Backend running on 5000");
});
