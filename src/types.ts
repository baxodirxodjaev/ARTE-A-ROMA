// 🔹 Базовая модель для всех сущностей
export interface BaseModel {
  id: string;
}

// 🔹 Главная страница
export interface Homepage extends BaseModel {
  homeTitle: string;
  homeDescription: string;
  homePoster: string;
}

// 🔹 Продукт или мероприятие
export interface Product extends BaseModel {
  type: "event" | "tariff";
  name: string;
  description: string;
  homeDescription: string;
  price: string; //  Можно заменить на number, если будешь использовать расчёты
  date: string;  // ISO string
  location: string;
  images: string[];
  poster: string;
  isActive: boolean;
  likes: string[]; //  uid пользователей
}

// 🔹 Комментарий
export interface Comments extends BaseModel {
  userId: string;
  userName: string;
  text: string;
  createdAt: string; // ISO string
  likes: string[];   // uid пользователей, которые лайкнули
}

// 🔹 Пользователь
export interface User extends BaseModel {
  name: string;
  email: string;
  avatar: string;
  role: "user" | "admin";
  likedEvents: string[];
  likedProducts: string[];
  createdAt?: string;
}

// 🔹 Политики (Privacy, Refund и т.п.)
export interface Policy extends BaseModel {
  title: string;
  description: string;
}

// 🔹 Галерея (одна картинка)
export interface Gallery extends BaseModel {
  image: string;
}

// 🔹 Авторизация
export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData extends LoginFormData {
  name: string;
}

export type AuthFormInput = {
  email: string;
  password: string;
  name?: string ;
};


export type LikeTarget = {
  id: string;
  likes: string[];
  userId: string;
};


// types.ts
export type ProductFormInput = Omit<Product, "id" | "poster" | "images">;


export type HomepageFormInput = {
  homeTitle: string;
  homeDescription: string;
};