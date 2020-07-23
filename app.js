const express = require("express");
const app = express();
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const { graphqlHTTP } = require("express-graphql");

const uri =
    "mongodb+srv://tommychinn:test1235@grapql-test.1olma.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("connected", () =>
    console.log("connected to the database")
);

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
