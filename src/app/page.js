import { useSession, signIn, signOut } from 'next-auth/client';  

export default function HomePage() {  
  const [session, loading] = useSession();  

  if (loading) {  
    return <p>Loading...</p>;  
  }  

  return (  
    <div>  
      {!session ? (  
        <>  
          <p>You are not signed in.</p>  
          <button onClick={() => signIn('salesforce')}>Sign in with Salesforce</button>  
        </>  
      ) : (  
        <>  
          <p>Welcome, {session.user.name}!</p>  
          <button onClick={() => signOut()}>Sign out</button>  
        </>  
      )}  
    </div>  
  );  
}