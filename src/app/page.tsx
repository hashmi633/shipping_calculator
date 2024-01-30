import Image from "next/image";
import { Country } from "./Country";

export default function Home() {
  return (
    <main>
      <div>
        <h2>Price Calculator</h2>
      </div>
      <Country />
      
    </main>
  );
}
