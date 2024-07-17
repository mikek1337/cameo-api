export interface CreatorDto {
  profession: string;
  bio: string;
  price: number;
  userid: string;
}

export interface Creator {
  id: string;
  bio: string;
  price: number;
  profession: string;
  user: {
    first_name: string;
    last_name: string;
    profile_picture: string;
  };
}
