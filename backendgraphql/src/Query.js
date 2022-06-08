const { prisma } = require('./db')
const { Octokit } = require("@octokit/core");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

const Query = {

    landing: async (_, args) => {

        return 'Hello World'

    },
    commits: async (_, args, { user }) => {
        if (!user) {
            throw new Error('You are not authenticated')
        }


        const [isAvailable] = await prisma.user.findMany({
            where: {key: user}
        })

        if(!isAvailable){
            throw new Error('Invalid user')
        }

        const Commits = await octokit.request(
            `GET /repos/facebook/react/commits`, { owner: 'facebook', repo: 'react' }
        );

       

        var result = [];

        for (let i = 0; i <= Commits.data.length; i++) {

            if (i >= args.offset) {

                result.push(Commits.data[i]);

            }

            if (args.limit && result.length === args.limit) {

                break;

            }

        }

        return result;

    },

}

module.exports = Query
