const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const FILE = "submissions.json";

app.get("/submissions", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

app.post("/submissions", (req, res) => {
    const data = JSON.parse(fs.readFileSync(FILE));

    const newSubmission = {
        id: Date.now(),
        name: req.body.name,
        email: req.body.email,
        participation: req.body.participation,
        sessions: req.body.sessions,
        notes: req.body.notes,
        status: "pending"
    };

    data.push(newSubmission);

    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

    res.json(newSubmission);
});

app.put("/submissions/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));

    data = data.map(item => {
        if (item.id == req.params.id) {
            return { ...item, status: req.body.status };
        }
        return item;
    });

    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

    res.json({ message: "Updated" });
});


app.listen(3000, () => {
    console.log("Server running on port 3000");
});
