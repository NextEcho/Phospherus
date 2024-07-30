import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
function Archive() {
  return (
    <div className="archive-page flex flex-col min-h-screen">
      <div className="navigation">
        <NavBar />
      </div>
      <div className="content bg-[#1A1823] w-full h-full flex flex-1 flex-col items-center px-96 pt-24 pb-8">
      </div>
      <div className="bottom">
        <Footer />
      </div>
    </div>
  );
}

export default Archive;
