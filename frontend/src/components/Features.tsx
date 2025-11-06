import featurePore from "../assets/images/poreclogger-img.jpg";
import routine from "../assets/images/routine.jpg";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

type FeatureProps = {
  img: string;
  title: string;
  alt: string;
  text: string;
  btn: { name: string; link: string };
  className?: string;
};

function Features() {
  const poreFeature = {
    name: "CHECK NOW",
    link: "/pore-clogging-checker",
  };
  const routineFeature = {
    name: "CREATE",
    link: "/routine-builder",
  };
  const poreFeatureText =
    "Ever wondered if the skincare product you are about to buy contains contains any common ingredients that are known to do more harm to your skin than benefit? Use our tool to find out any comedogenic ingredients.";
  const routineFeatureText =
    "Obtain the ability to create and organize your skincare routine for both daytime and night time, and the opportunity to check what ingredients conflict each other during the build process.";
  return (
    <section className="font-figtree bg-[#fffbf3]">
      <FeatureCard
        text={poreFeatureText}
        img={featurePore}
        alt="Skincare liquids on table"
        title="Pore Clogging Checker"
        btn={poreFeature}
        className="flex"
      />
      <FeatureCard
        img={routine}
        alt="Skincare routine products"
        title="Skincare Routine Builder"
        className="flex flex-row-reverse"
        btn={routineFeature}
        text={routineFeatureText}
      />
    </section>
  );
}

function FeatureCard({ img, title, text, alt, btn, className }: FeatureProps) {
  return (
    <div className={className}>
      <div className="w-1/2">
        <img src={img} alt={alt} />
      </div>
      <div className="flex w-1/2 items-center justify-center">
        <div className="w-4/5 space-y-6">
          <h2 className="text-4xl font-semibold">{title}</h2>
          <p>{text}</p>
          <Link to={btn.link}>
            <Button className="cursor-pointer">{btn.name}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Features;
