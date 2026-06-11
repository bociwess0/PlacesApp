export interface User {
  name: string;
  id: number;
  places: number;
  image: string;
}

export interface Place {
  id: number;
  title: string;
  street: string;
  address: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  description: string;
  image: string;
  creatorId: number;
}
