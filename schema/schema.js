const _ = require("lodash");
const graphql = require("graphql");
const Product = require("../models/products");
const Size = require("../models/sizes");
const Image = require("../models/images");
const Carousel = require("../models/carousel");
const Client = require("../models/client");

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

const ClientType = new GraphQLObjectType({
    name: "Client",
    fields: () => ({
        id: { type: GraphQLID },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
        email: { type: GraphQLString },
    }),
});

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
        images: {
            type: GraphQLList(ImageType),
            resolve(parent, args) {
                return Image.find({ productId: parent.id });
            },
        },
    }),
});

// const AuthorType = new GraphQLObjectType({
//     name: "Author",
//     fields: () => ({
//         id: { type: GraphQLID },
//         name: { type: GraphQLString },
//         age: { type: GraphQLInt },
//         books: {
//             type: GraphQLList(BookType),
//             resolve(parent, args) {
//                 // return _.filter(books, { authorId: parent.id });
//                 return Book.find({ authorId: parent.id });
//             },
//         },
//     }),
// });

const ImageType = new GraphQLObjectType({
    name: "Image",
    fields: () => ({
        image: { type: GraphQLString },
        productId: { type: GraphQLString },
    }),
});

const CarouselType = new GraphQLObjectType({
    name: "Carousel",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        image1: { type: GraphQLString },
        image2: { type: GraphQLString },
        image3: { type: GraphQLString },
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
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Client.findById(args.id);
            },
        },

        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Client.find({});
            },
        },

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

        carousel: {
            type: CarouselType,
            args: {
                id: { type: GraphQLID },
            },
            resolve(parent, args) {
                return Carousel.findById(args.id);
            },
        },

        carousels: {
            type: new GraphQLList(CarouselType),
            resolve(parent, args) {
                return Carousel.find({});
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
        addClient: {
            type: ClientType,
            args: {
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                lastName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let client = new Client({
                    firstName: args.firstName,
                    lastName: args.lastName,
                    email: args.email,
                });
                return client.save();
            },
        },

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
        addCarousel: {
            type: CarouselType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                image1: { type: new GraphQLNonNull(GraphQLString) },
                image2: { type: new GraphQLNonNull(GraphQLString) },
                image3: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {
                let carousel = new Carousel({
                    name: args.name,
                    image1: args.image1,
                    image2: args.image2,
                    image3: args.image3,
                });
                return carousel.save();
            },
        },
    },
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation,
});
