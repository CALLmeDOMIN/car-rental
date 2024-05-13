export type Car = {
  id: number;
  name: string;
  brand: string;
  transmission: string;
  year: number;
  price: number;
  distance: number;
  passengers: number;
  capacity: number;
  engineCapacity: number;
  horsepower: number;
  topSpeed: number;
  description: string;
  imageUrl: string;
};

type Bookmark = {
  id: number;
  carId: number;
  userId: string;
};

export type Cars = Car[];
export type Bookmarks = Bookmark[];
