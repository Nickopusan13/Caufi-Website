import NavBar from "@/components/navbar/NavBar";
import Footer from "@/components/Footer";
import MyProfile from "@/components/account/MyProfile";

export default function MyProfilePage() {
  return (
    <>
      <NavBar />
      <main className="w-full pt-21 min-h-screen grow h-full px-3 lg:px-20 bg-white dark:bg-zinc-900 text-black dark:text-white transition-all duration-300">
        <MyProfile />
      </main>
      <Footer />
    </>
  );
}
