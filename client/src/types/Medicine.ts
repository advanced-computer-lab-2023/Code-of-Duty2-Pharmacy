interface Medicine {
  _id: string;
  name: string;
  activeIngredients: string[];
  price: number;
  availableQuantity: number;
  originalPrice: number; // not in the database, only sent by server for frontend displays
  pictureUrl?: string;
  description?: string;
  usages?: string[];
  isOverTheCounter?: boolean;
  isArchived?: boolean;
}

export default Medicine;
