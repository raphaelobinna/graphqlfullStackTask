const { prisma } = require('./db')
const Query = require('./Query')
const randomstring = require("randomstring");

   const Mutation = {
        signupUser: async (parent, args) => {
            console.log('was hit')

            const newUser = await prisma.user.create({
                data: {
                    key: randomstring.generate(20),
                }
            });
           
            return `Your api key is ${newUser.key}`;
        },
       
};

const resolvers = {
    Query,
    Mutation
}

module.exports = resolvers