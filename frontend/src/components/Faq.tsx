import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

interface Faq1Props {
  heading?: string;
  items?: FaqItem[];
}

const Faq = ({
  heading = "Frequently asked questions",
  items = [
    {
      id: "faq-1",
      question: "How do I scan my skincare ingredients?",
      answer:
        "Copy the ingredients list from the product and paste it in to our checker. Please ensure that they are comma separated.",
    },
    {
      id: "faq-2",
      question: "What if I have personal ingredients that I want to avoid?",
      answer:
        "If you personally react negatively to any other ingredients that are not listed in our most common comedogenic ingredients list. You can add it by pressing the edit ingredients button.",
    },
    {
      id: "faq-3",
      question: "What ingredients should I avoid?",
      answer:
        "Skincare works different for everybody. The ingredients highlighted in red from our analyzer typically cause problem for acne-prone skin concerns.",
    },
  ],
}: Faq1Props) => {
  return (
    <section className="flex items-center justify-center py-32">
      <div className="container max-w-3xl">
        <h1 className="mb-4 text-3xl font-semibold md:mb-11 md:text-4xl">
          {heading}
        </h1>
        <Accordion type="single" collapsible>
          {items.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-lg font-semibold hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground text-base">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
