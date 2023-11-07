interface Medicine {
  _id: string;
  name: string;
  activeIngredients: string[];
  price: number;
  availableQuantity: number;
  pictureUrl?: string;
  description?: string;
  usages?: string[];
  isOverTheCounter?: boolean;
  isArchived?: boolean;
}

export default Medicine;
