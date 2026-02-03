import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LandingPage from "@components/landing/LandingPage";

export default async function Home() {
  const cookieStore = await cookies();
  const authUser = cookieStore.get("authUser");

  // If user is authenticated, redirect to dashboard
  if (authUser) {
    redirect("/dashboard");
  }

  // If user is not authenticated, redirect to login
  return <LandingPage />;
}
