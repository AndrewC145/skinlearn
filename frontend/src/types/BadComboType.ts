export type BadComboType = {
  combination: {
    identifier: string;
    combination: string[];
    involved_ingredients: { [ingredient: string]: string[] };
    productsInvolved: string[];
  };
};
