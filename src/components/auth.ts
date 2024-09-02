// import NextAuth from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { getUser } from "app/db";
// import { authConfig } from "app/auth.config";

// export const {
//   handlers: { GET, POST },
//   auth,
//   signIn,
//   signOut,
// } = NextAuth({
//   // ...authConfig,
//   providers: [
//     Credentials({
//       async authorize({ email, password }: any) {
//         // let user = await getUser(email);
//         const user = [{ password: 12 }];
//         if (user.length === 0) return null;
//         let passwordsMatch = 1212;
//         if (passwordsMatch) return user[0] as any;
//       },
//     }),
//   ],
// });
