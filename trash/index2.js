// include required modules
import express from "express";
import { Flavor } from "./models/Flavor.js";
import { errorHandler, notFound } from "./middleware/error.js";
import morgan from "morgan";
import cors from "cors";
// const cors = require('cors');

// load config from .env-file


// create APP object
const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cors());

morgan.token('post-data', (req) => {
    (req.method === 'POST' || req.method === 'PUT') ? JSON.stringify(req.body) : ''
});
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'));


// GET-STATUS route
app.get("/api/health", async (req, res) => {
    res.status(200).json({ status: "ok" });
});



// Create new flavor
app.post("/api/flavors", async (req, res, next) => {
    try {
        // console.log(req.body );
        const { name, tags = [] } = req.body || {};

        // 1) Validate input
        if (!name || typeof name !== "string" || !name.trim()) {
            return res.status(400).json({ error: "Name is required (must be string)" });
        }

        if (!Array.isArray(tags)) {
            return res.status(400).json({ error: "Tags must be an array" });
        }

        // 2) Create flavor
        const flavor = await Flavor.create({ name: name.trim(), tags });

        // 3) Return success
        return res.status(201).json(flavor);
    } catch (err) {
        // 4) Handle duplicate key error (E11000) - 400
        if (err && err.code === 11000) {
            return res.status(409).json({ error: "Flavor already exists" });
        }

        // 5) Pass other errors to error handler
        next(err);
    }
});

app.get("/api/flavors", async (req, res, next) => {
    try {
        const { q, tag, skip = 0, limit = 50 } = req.query;
        const filter = {};
        if (q) filter.name = { $regex: q, $options: 'i' };
        if (tag) filter.tags = tag;

        const flavors = await Flavor.find(filter)
            .sort({ createdAt: -1 })
            .skip(Number(skip))
            .limit(Math.min(Number(limit), 100));

        res.json(flavors);
    }
    catch (err) { next(err); }

});

// vote for flavor
app.post("/api/flavors/:id/vote", async (req, res, next) => {
    try {
        const flavor = await Flavor.findByIdAndUpdate(
            req.params.id,
            { $inc: { votes: 1 } },
            // Return updated document
            { new: true }
        );
        if (!flavor) return res.status(404).json({ error: 'Flavor not found.' });

        res.json(flavor);
    }
    catch (err) { next(err); }
});

// get 5 top rated flavors
app.get("/api/flavors/top", async (req, res, next) => {
    try {

        const flavors = await Flavor.find()
            // descending order  
            .sort({ votes: -1, createdAt: -1 }) // Descending order (highest first)
            .limit(5);
        res.json(flavors);
    }
    catch (err) { next(err); }

});

// delete the flavor
app.delete("/api/flavors/:id", async (req, res, next) => {
    //console.log(req.params);
    try {
        // check admin-header presence
        const isAdmin = req.headers['x-admin-hattu'] || "";
        if (isAdmin.toLowerCase() !== 'true') {
            return res.status(403).json({ error: "Admin access required" });
        }

        // try delete specified ID
        const isDeleted = await Flavor.findByIdAndDelete(req.params.id);

        // return 404 if flavor not fount
        if (!isDeleted) return res.status(404).json({ error: 'Flavor not found.' });

        // return "deleted"
        res.status(204).end();
    }
    catch (err) { next(err); }

});

app.use(notFound);
app.use(errorHandler);

export default app;