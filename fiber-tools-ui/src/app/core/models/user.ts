export interface User {
  disabled: false;
  displayName: string;
  email: string;
  emailVerified: boolean;
  id?: string;
  phoneNumber: string;
  photoURL: string;
  roles: string[];
  uid: string;
}
