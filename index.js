const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');

const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');
const { MONGODB } = require(`./config.js`);

const pubsub = new PubSub()

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: ({req}) => ({req, pubsub})
});

mongoose
	.connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true  })
	.then(() => {
		console.log('MongoDB Connected');
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log(`Server running at ${res.url}`);
	});

// const { ApolloServer } = require('apollo-server');
// const mongoose = require('mongoose');

// const typeDefs = require('./graphql/typeDefs');
// const resolvers = require('./graphql/resolvers');
// const { MONGODB } = require('./config');

//  require('dotenv').config();

// const PORT = process.env.PORT || 5000;

// const server = new ApolloServer({
// 	typeDefs,
// 	resolvers,
// 	context: ({ req }) => ({ req })
// });

// mongoose
// 	.connect(process.env.MONGODB, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true
// 	})
// 	.then(() => {
// 		console.log('Mongodb connected');
// 		return server.listen({ port: PORT });
// 	})
// 	.then((res) => {
// 		console.log(`Server running at ${res.url}`);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});
