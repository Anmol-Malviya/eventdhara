export type UserRole = 'user' | 'vendor' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;   
  role: UserRole;
  avatar?: string;      
  createdAt: string;     
}
