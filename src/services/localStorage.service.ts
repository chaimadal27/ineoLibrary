import { UserModel } from '@app/domain/UserModel';

export const testUser:UserModel = {
  user_id: 1,
  first_name: '',
  last_name: '',
  email: 'mm@mm.com'
}

// export const persistToken = (token: string): void => {
//   localStorage.setItem('access', token);
// };

export const persistToken = (token: string): void => {
  document.cookie = `access=${token};max-age=3600;path=/;`;
};

// export const readToken = (): string => {
//   return localStorage.getItem('access') || "";
// };

export const readToken = (): string => {
  const cookieMatch = document.cookie.match(/access=([^;]+)/);
  return cookieMatch ? cookieMatch[1] : '';
};

// export const persistUser = (user: UserModel): void => {
//   localStorage.setItem('user', JSON.stringify(user));
// };

export const persistUser = (user: UserModel): void => {
  document.cookie = `user=${JSON.stringify(user)};path=/;`;
};
// export const readUser = (): UserModel | null => {
//   const userStr = localStorage.getItem('user');
//   return userStr ? JSON.parse(userStr) : testUser;
// };
export const readUser = (): UserModel | null => {
  const cookieMatch = document.cookie.match(/user=([^;]+)/);
  return cookieMatch ? JSON.parse(cookieMatch[1]) : testUser;
};


//export const deleteToken = (): void => localStorage.removeItem('access');
export const deleteToken = (): void => {
  document.cookie = `access=;max-age=0;path=/;`;
};
//export const deleteUser = (): void => localStorage.removeItem('user');
export const deleteUser = (): void => {
  document.cookie = `user=;max-age=0;path=/;`;
};