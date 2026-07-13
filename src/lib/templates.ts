// Six Fundamental Creativity Templates from Goldenberg, Mazursky & Solomon (1999)
// "The Fundamental Templates of Quality Ads" — Marketing Science, Vol. 18, No. 3

export interface Template {
  key: string;
  name: string;
  shortDescription: string;
  fullDescription: string;
  icon: string; // lucide icon name
  gradient: string; // tailwind gradient classes
  promptGuidance: string;
}

export const TEMPLATES: Template[] = [
  {
    key: "pictorial_analogy",
    name: "Pictorial Analogy",
    shortDescription: "A symbol is visually merged with the product to convey the message.",
    fullDescription:
      "The product (or one of its components) and a symbol of the message theme are unified through a visual linking operator — shape, color, or sound. In the Replacement version, a product replaces a symbol. In the Extreme Analogy version, the symbol is taken to an extreme.",
    icon: "Lightbulb",
    gradient: "from-violet-500 to-purple-700",
    promptGuidance: `Use the Pictorial Analogy template. Either:
- REPLACEMENT: An element from the product space (e.g. the product itself or a component) replaces a symbol that represents the message. The two are matched by shape, color, texture, or sound (e.g. Nike Air sneaker shaped like a fireman's sheet = protection/cushioning).
- EXTREME ANALOGY: A symbol associated with the message is taken to an extreme or absurd degree to highlight the product's benefit.
Create a concept where a visual metaphor powerfully connects the product to its key benefit through shape/color/sound matching.`,
  },
  {
    key: "extreme_situation",
    name: "Extreme Situation",
    shortDescription: "The product's benefit is pushed to an absurd, unrealistic extreme.",
    fullDescription:
      "Presents situations that are unrealistic in order to enhance the prominence of key product attributes. Versions: Absurd Alternative (tongue-in-cheek ridiculous alternative to using the product), Extreme Attribute (attribute exaggerated to impossible proportions), Extreme Worth (value of product exaggerated unrealistically).",
    icon: "Zap",
    gradient: "from-orange-500 to-red-600",
    promptGuidance: `Use the Extreme Situation template. Choose one of:
- ABSURD ALTERNATIVE: Humorously suggest that instead of using the product, the viewer could try some ridiculous alternative that achieves the same result. The absurdity must be obvious — "You don't have to buy our product, you could always..." (e.g., an old lady barking like a dog instead of using a security lock).
- EXTREME ATTRIBUTE: Take the product's key attribute to a physically impossible or absurd extreme to prove how powerful it is (e.g., car speakers so loud they collapse a bridge).
- EXTREME WORTH: Exaggerate the VALUE or importance of the product to an unrealistic extreme (e.g., someone canceling a once-in-a-lifetime event just to not miss using the product).
The absurdity must be immediately recognizable to the viewer.`,
  },
  {
    key: "consequences",
    name: "Consequences",
    shortDescription: "Shows dramatic results of using — or not using — the product.",
    fullDescription:
      "Indicates the implications of either executing or failing to execute the recommendation in the ad. Extreme Consequences version shows exaggerated results of using the product. Inverted Consequences version warns against NOT using it.",
    icon: "GitBranch",
    gradient: "from-emerald-500 to-teal-600",
    promptGuidance: `Use the Consequences template. Choose one of:
- EXTREME CONSEQUENCES: Show an extreme, chain-reaction consequence of the product's key attribute being applied to the fullest extent. The result must be recognizably absurd but based on a real product fact (e.g., speakers so powerful that the vibrations collapse a bridge — still based on real vibration physics).
- INVERTED CONSEQUENCES: Warn the viewer about what happens if they DON'T use the product. Show the negative consequence of NOT following the recommendation — the absence of the product leads to a clearly negative result (e.g., without vitamins, an energetic person can't get out of bed).
The consequence must feel inevitable given the product's attribute.`,
  },
  {
    key: "competition",
    name: "Competition",
    shortDescription: "The product competes against an unexpected opponent from a different class.",
    fullDescription:
      "The product is subjected to competition with another product or event from a different class, where the competitor is expected to be superior. Versions: Attribute in Competition, Worth in Competition, Uncommon Use (product attribute solves an unexpected problem).",
    icon: "Trophy",
    gradient: "from-amber-400 to-yellow-600",
    promptGuidance: `Use the Competition template. Choose one of:
- UNCOMMON USE: Show the product being used in a completely unintended context to solve an unexpected problem, demonstrating an attribute so powerful it transcends its original purpose (e.g., jeans strong enough to tow a car). Introduce ambiguity at first — don't reveal it's an ad for the product until the resolution.
- ATTRIBUTE IN COMPETITION: The product's key attribute directly competes with something known to be superior in that dimension, and wins or holds its own (e.g., a car racing a bullet and keeping pace, demonstrating speed).
- WORTH IN COMPETITION: The product is so valuable that the viewer faces a genuine dilemma choosing between it and something universally considered more important (e.g., pausing an important call to not leave a favorite cereal).
The key is surprise — the competitor is from a completely different class.`,
  },
  {
    key: "interactive_experiment",
    name: "Interactive Experiment",
    shortDescription: "The viewer performs an action that physically reveals the product's benefit.",
    fullDescription:
      "Induces realization of product benefits by requiring the viewer to engage in an interactive experience with the ad medium. Activation version requires physical action. Imaginary Experiment version asks the viewer to mentally simulate an experiment.",
    icon: "FlaskConical",
    gradient: "from-cyan-500 to-blue-600",
    promptGuidance: `Use the Interactive Experiment template. Choose one of:
- ACTIVATION: Design an ad that requires the viewer to physically interact with the medium (a magazine, a screen, a billboard) to receive the message. The experiment must be executable immediately, and the result reveals a need or benefit in a compelling, undeniable way (e.g., scratch a black patch in a print ad — dandruff appears on your fingers, proving you need anti-dandruff shampoo). The result highlights a general NEED, not just the brand's quality.
- IMAGINARY EXPERIMENT: Ask the viewer to mentally simulate an experiment or scenario. Guide them through an imaginative exercise that leads them to realize the product's benefit through their own reasoning.
The insight must feel like a personal discovery, not a claim.`,
  },
  {
    key: "dimensionality_alteration",
    name: "Dimensionality Alteration",
    shortDescription: "Manipulates time, scale, or space to reframe the product's value.",
    fullDescription:
      "Manipulates the dimension of the product in relation to its environment. Versions: New Parameter Connection (previously unrelated parameters linked), Multiplication (duplicating product, comparing copies), Division (splitting product into components), Time Leap (shifting scenario to past or future to highlight benefit).",
    icon: "Scaling",
    gradient: "from-pink-500 to-rose-600",
    promptGuidance: `Use the Dimensionality Alteration template. Choose one of:
- TIME LEAP: Take an ordinary situation involving the product and shift it dramatically to the past or future. The new time frame must be relevant to the product's attribute and create an emotionally resonant or entertaining scenario (e.g., life insurance ad where the wife argues with her late husband at a seance about why he cancelled his policy).
- NEW PARAMETER CONNECTION: Link two previously unrelated parameters to demonstrate the product's power (e.g., the speed of a new aircraft is demonstrated by showing the ocean shrinking in size).
- MULTIPLICATION: Multiply the product and create a relationship or comparison between the copies that reveals something powerful about the product.
- DIVISION: Break the product into its components and create a meaningful relationship between them that highlights the product's core benefit.
The dimension shift (time/space/scale) must feel surprising but inevitable once seen.`,
  },
];

export type AdConceptInput = {
  productName: string;
  keyBenefit: string;
  brandTone: string;
  postFormat: string;
  targetAudience?: string;
  competitors?: string;
  campaignType?: string;
};

export type AdConcept = {
  templateKey: string;
  templateName: string;
  conceptIdea: string;
  visualHook: string;
  copyHook: string;
  callToAction: string;
};

export type AdConceptsResult = {
  concepts: AdConcept[];
};
