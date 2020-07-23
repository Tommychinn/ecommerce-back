const _ = require("lodash");
const graphql = require("graphql");
const Product = require("../models/products");

const {
    GraphQLObjectType,
    GraphQLList,
    GraphQLID,
    GraphQLInt,
    GraphQLSchema,
    GraphQLString,
    GraphQLBoolean,
    GraphQLFloat,
    GraphQLNonNull,
} = graphql;

const ProductType = new GraphQLObjectType({
    name: "Product",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        price: { type: GraphQLFloat },
        discountPrice: { type: GraphQLFloat },
        discountPercentage: { type: GraphQLInt },
        brand: { type: GraphQLString },
        shippingTime: { type: GraphQLInt },
        availableInGeo: { type: GraphQLBoolean },
        noStock: { type: GraphQLInt },
        category: { type: GraphQLString },
    }),
});

const SizeType = new GraphQLObjectType({
    name: "Size",
    fields: () => ({
        size: { type: GraphQLString },
        noStock: { type: GraphQLInt },
        productId: { type: GraphQLString },
    }),
});

const RootQuery = new GraphQLObjectType({
    name: "RootQuery",
    fields: {
        product: {
            type: ProductType,
            args: { id: { type: GraphQLID } },
            resolve(parents, args) {
                // return _.find(products, { id: args.id });
                return Product.findById(args.id);
            },
        },

        size: {
            type: SizeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return SizeType.findById(args.id);
            },
        },
    },
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addProduct: {
            type: ProductType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLFloat) },
                discountPrice: { type: new GraphQLNonNull(GraphQLFloat) },
                discountPercentage: { type: new GraphQLNonNull(GraphQLInt) },
                brand: { type: new GraphQLNonNull(GraphQLString) },
                shippingTime: { type: new GraphQLNonNull(GraphQLInt) },
                availableInGeo: { type: new GraphQLNonNull(GraphQLBoolean) },
                noStock: { type: new GraphQLNonNull(GraphQLInt) },
                category: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let product = new Product({
                    name: args.name,
                    price: args.price,
                    discountPrice: args.discountPrice,
                    discountPercentage: args.discountPercentage,
                    brand: args.brand,
                    shippingTime: args.shippingTime,
                    availableInGeo: args.availableInGeo,
                    noStock: args.noStock,
                    category: args.category,
                });
                return product.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
