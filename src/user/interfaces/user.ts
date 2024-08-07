export interface UserDto {
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
}
