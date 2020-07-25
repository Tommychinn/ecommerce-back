const express = require("express");
const app = express();
const cors = require("cors");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const { graphqlHTTP } = require("express-graphql");
require("dotenv/config");
const { USER, PASS, DB } = process.env;

const uri = `mongodb+srv://${USER}:${PASS}@grapql-test.1olma.mongodb.net/${DB}?retryWrites=true&w=majority`;

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
    console.log("connected to the database")
);

app.use(cors());

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(4050, () => {
    console.log("listening on port 4000");
});
