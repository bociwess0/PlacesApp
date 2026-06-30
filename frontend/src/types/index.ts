export interface User {
  name: string;
  id: number;
  places: number;
  image: string;
}

export interface Place {
  id: number;
  _id: string;
  title: string;
  street: string;
  address: string;
  city: string;
  country: string;
  location: {
    lat: string,
    lng: string
  };
  longitude: number;
  description: string;
  image: string;
  creatorId: number;
}
