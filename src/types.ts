
export interface BaseModel {
    id: string;
  }
  

  export interface Homepage extends BaseModel {
    homeTitle? : string;
    homeDescription? : string;
    homePoster? : string;
  }


  export interface Product extends BaseModel {
    type: "event" | "tariff";
    name: string;
    description: string;
    homeDescription: string;
    price: string;
    date: string; 
    location: string; 
    images?: string[];
    poster?: string;
    isActive: boolean;
    likes: string[];
  }

  export interface Comments extends BaseModel {
    userId: string;   
    userName: string; 
    text: string;     
    createdAt: string; 
    likes: [];  
  }
  

  export interface User extends BaseModel {
    name: string;
    email: string;
    avatar: string;
    role: "user" | "admin";
    likedEvents: string[];
    likedProducts: string[];
    createdAt? : string
  }
  

export interface Policy extends BaseModel {
  title : string,
  description : string,
}
  
export interface Gallery extends BaseModel {
  image: string;
}


export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignUpFormData extends LoginFormData {
  name: string;
}