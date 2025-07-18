# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

### Steps:

1. `pnpm create t3-app@latest`
2. Remove discord auth provider from env.js and auth/config.ts
3. Added .env variables: PROCESS_VIDEO_ENDPOINT, PROCESS_VIDEO_ENDPOINT_AUTH, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET_NAME
4. `pnpm add inngest`, add `pnpm dlx inngest-cli@latest dev` to package.json
5. Following the inngest docs: https://www.inngest.com/docs/getting-started/nextjs-quick-start
6. Creating the inngest function to call our modal endpoint, setting the inngest function concurrency to 1 so that only one job run at a time and the others wait in a queue.
7. Modifying the concurrency to use the userId as the key so that only 1 job runs for a user at a time. That means multiple users can have multiple jobs running at the same time but only one job per user. If one user is trying to invoke more than one job, the other job will wait in the queue.
8. 