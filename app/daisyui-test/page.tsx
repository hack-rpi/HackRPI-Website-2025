import NavBar from "@/components/nav-bar/nav-bar";
import Footer from "@/components/footer/footer";
import TestDaisyUIComponent from "../test-daisyui-component";

export default function DaisyUITestPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar showOnScroll={false} />
      <main className="flex-grow flex justify-center items-center">
        <TestDaisyUIComponent />
      </main>
      <Footer />
    </div>
  );
} 