// import { auth0 } from "@/lib/auth0";
// import HomePage from "../components/Home_page";

// export default async function Home() {
//   const session = await auth0.getSession();

//   if (!session) {
//     return (
//       <div className="flex flex-col items-center justify-center h-screen gap-4">
//         <h1 className="text-2xl font-bold">Welcome to the Store</h1>
//         <div className="flex gap-3">
//           <a
//             href="/auth/login"
//             className="bg-[#4A1942] text-white px-6 py-2 rounded-full font-semibold hover:bg-[#C84B11] transition-colors"
//           >
//             Login
//           </a>
//           <a
//             href="/auth/login?screen_hint=signup"
//             className="border border-[#4A1942] text-[#4A1942] px-6 py-2 rounded-full font-semibold hover:bg-[#4A1942] hover:text-white transition-colors"
//           >
//             Sign Up
//           </a>
//         </div>
//       </div>
//     );
//   }

//   return <HomePage />;
// }


import { auth0 } from "@/lib/auth0";
import { redirect } from "next/navigation";
import HomePage from "../../components/Home_page";

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    redirect("/auth/login");
  }

  return <HomePage />;
}