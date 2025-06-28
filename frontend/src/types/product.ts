export type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  countInStock: number;
  parcel: {
    length: number;
    width: number;
    height: number;
    weight: number;
    packageType: string;
    declaredValue: number;
    packageNumber: number;
    consignmentNote: string;
    packageProtected: boolean;
  };
};
