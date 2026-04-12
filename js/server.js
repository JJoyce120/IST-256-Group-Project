const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const FILE = "orders.json";

app.get("/orders", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));
    res.json(data);
});

app.post("/orders", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));

    let newOrder = {
        id: Date.now(),
        ...req.body,
        status: "pending"
    };

    data.push(newOrder);
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

    res.json(newOrder);
});

app.put("/orders/:id", (req, res) => {
    let data = JSON.parse(fs.readFileSync(FILE));

    data = data.map(order =>
        order.id == req.params.id
            ? { ...order, status: req.body.status }
            : order
    );

    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
    res.json({ message: "Updated" });
});

app.listen(3000, () => console.log("Server running on port 3000"));
