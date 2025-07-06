import NavBar from "./NavBar";
import Stars from "./Stars";

export default function HeroSection() {

  return (
    <div className={`hero-section flex flex-col items-center  w-full h-screen`}>
      <Stars />
      <NavBar />
      <div className=" h-full flex flex-col pt-20 items-center">
        <h1 className="
          my-outline-text
          lg:text-[150px]
          font-extrabold
          font-sans
          text-transparent
          bg-clip-text
          bg-gradient-to-b
          from-black/60
          to-white/30
          h1-shadow
        ">
          Persevex
        </h1>
        <span className="lg:text-2xl mb-10 text-white text-center lg:w-[650px]">Where innovation meets real-world learning through expert education and impactful internships.</span>
        <button class="button">Explore courses</button>
      </div>
    </div>
  );
}