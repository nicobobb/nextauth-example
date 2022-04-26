import { signIn, signOut } from "next-auth/react";
import Nav from "../components/Nav";
export default function Home() {
  return (
    <>
      <Nav />
      <button onClick={() => signIn("google")}>Iniciar sesión</button>
    </>
  );
}
