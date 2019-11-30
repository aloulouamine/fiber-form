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
  roles_v2: Roles;
}


export interface Roles {
  admin: boolean;
  supervisor: boolean;
}