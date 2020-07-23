const _ = require("lodash");
const graphql = require("graphql");
const Product = require("../models/products");
const Size = require("../models/sizes");
const Image = require("../models/images");

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

const ImageType = new GraphQLObjectType({
    name: "Image",
    fields: () => ({
        image: { type: GraphQLString },
        productId: { type: GraphQLString },
    }),
});

const SizeType = new GraphQLObjectType({
    name: "Size",
    fields: () => ({
        size: { type: GraphQLString },
        category: { type: GraphQLString },
        // noStock: { type: GraphQLInt },
        // productId: { type: GraphQLString },
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

        products: {
            type: new GraphQLList(ProductType),
            resolve(parent, args) {
                return Product.find({});
            },
        },

        image: {
            type: ImageType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Image.findById(args.id);
            },
        },

        images: {
            type: new GraphQLList(ImageType),
            resolve(parent, args) {
                return Image.find({});
            },
        },

        size: {
            type: SizeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return SizeType.findById(args.id);
            },
        },

        sizes: {
            type: new GraphQLList(SizeType),
            resolve(parent, args) {
                return Size.find({});
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
        addSize: {
            type: SizeType,
            args: {
                size: { type: new GraphQLNonNull(GraphQLString) },
                category: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let siZe = new Size({
                    size: args.size,
                    category: args.category,
                });
                return siZe.save();
            },
        },
        addImage: {
            type: ImageType,
            args: {
                image: { type: new GraphQLNonNull(GraphQLString) },
                productId: { type: GraphQLString },
            },
            resolve(parent, args) {
                let imaGe = new Image({
                    image: args.image,
                    productId: args.productId,
                });
                return imaGe.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
