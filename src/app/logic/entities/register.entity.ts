export interface RegisterDto {
  email: string;
  password: string;
  accountType: string;
  userDetails: UserDetailsDto;
}

export interface UserDetailsDto {
  firstName: string;
  lastName: string;
  street?: string;
  companyName?: string;
  postalCode: string;
  city: string;
  acceptANB: boolean;
}
