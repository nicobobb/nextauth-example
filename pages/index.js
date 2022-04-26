import { useSession, signIn, signOut } from "next-auth/react";
import { Nav } from "../components/Nav";
export default function Home() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Nav />
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Cerrar Sesión</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("google")}>Iniciar sesión</button>
    </>
  );
}
