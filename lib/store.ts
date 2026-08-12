export type IceType = {
  id: number;
  name: string;
  price: number;
};

export const store = {
  locations: ["Gusa", "Lapasan", "SM Downtown", "Ayala Centrio", "Carmen", "SM Uptown"],
  iceTypes: [
    { id: 1, name: "Block Ice", price: 120 }, 
    { id: 2, name: "Tube Ice", price: 150 }, 
    { id: 3, name: "Crushed Ice", price: 80 }
  ] as IceType[],
  sackSizes: ["Small Sack", "Big Sack"],
  paymentTypes: ["Cash", "Charge Invoice"]
};
