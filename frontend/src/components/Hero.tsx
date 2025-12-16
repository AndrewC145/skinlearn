import heroImg from "../assets/images/hero.jpg";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

function Hero() {
  return (
    <section>
      <div className="relative h-[90vh] text-white">
        <img
          src={heroImg}
          className="size-full object-cover"
          alt="Hero Skincare"
        />
        <div className="font-figtree absolute top-1/2 left-1/2 -translate-1/2 space-y-8 text-center text-white">
          <h2 className="text-5xl font-normal">Perfect Your Skin</h2>
          <Link to="/routine-builder">
            <Button
              className="cursor-pointer rounded-none border-2 border-white bg-transparent px-8 py-6 text-xl font-normal hover:bg-transparent"
              variant="default"
            >
              BUILD NOW
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
