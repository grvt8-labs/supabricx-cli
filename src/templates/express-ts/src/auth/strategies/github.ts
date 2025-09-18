import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      callbackURL: "http://localhost:3000/auth/github/callback",
    },
    async (_accessToken: any, _refreshToken: any, profile: { emails: { value: any; }[]; }, done: (arg0: Error | null, arg1: undefined) => any) => {
      try {
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : "";
        let user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: profile.emails && profile.emails[0] ? profile.emails[0].value : "",
              provider: "github",
            },
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err as Error, undefined);
      }
    }
  )
);

export default passport;
