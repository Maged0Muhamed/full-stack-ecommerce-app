export interface IProduct {
  id?: string | undefined;
  documentId?: string | undefined;
  title: string;
  description: string;
  price: string;
  stock: string;
  thumbnail: {
    formats: {
      thumbnail: { url: string };
    };
  };
  category: ICategory[];
  qyt?: number;
}
export interface ICategory {
  documentId: string;
  name: string;
}

export interface IRegisterInput {
  name: "email" | "username" | "password";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}

export interface ILoginInput {
  name: "identifier" | "password";
  placeholder: string;
  type: string;
  validation: {
    required?: boolean;
    minLength?: number;
    pattern?: RegExp;
  };
}
export interface IErrorResponse {
  error: {
    details?: {
      errors: {
        message: string;
      }[];
    };
    message?: string;
  };
}
