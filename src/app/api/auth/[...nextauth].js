import NextAuth from 'next-auth';  
import Providers from 'next-auth/providers';  

export default NextAuth({  
  providers: [  
    Providers.Salesforce({  
      clientId: process.env.SALESFORCE_CLIENT_ID,  
      clientSecret: process.env.SALESFORCE_CLIENT_SECRET,  
      authorizationUrl: 'https://login.salesforce.com/services/oauth2/authorize?response_type=code',  
      scope: 'openid profile email',  
      params: { grant_type: 'authorization_code' },  
      // accessTokenUrl: 'https://login.salesforce.com/services/oauth2/token',  
      // requestTokenUrl: 'https://login.salesforce.com/services/oauth2/token',  
      // profileUrl: 'https://login.salesforce.com/services/oauth2/userinfo',  
      profile(profile) {  
        return {  
          id: profile.sub,  
          name: profile.name,  
          email: profile.email,  
        };  
      },  
    }),  
  ],  
  callbacks: {  
    async jwt(token, user) {  
      if (user) {  
        token.accessToken = user.accessToken;  
      }  
      return token;  
    },  
    async session(session, token) {  
      session.accessToken = token.accessToken;  
      return session;  
    },  
  },  
});