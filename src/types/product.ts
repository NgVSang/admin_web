export interface IProduct {
  _id: string;
  type: string;
  IDSupplier: {
    _id: string;
    companyName: string;
    description: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    logoImage: string;
  };
  IDCategory: ({ _id: string; CategoryName: string } | string)[];
  nameProduct: string;
  pictureLinks: Array<string>;
  description: string;
  color: Array<string>;
  size: Array<string>;
  price: number;
  quantity: number;
  deleted: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
  rating: number;
}

export interface ICategory {
  _id: number;
  CategoryName: string;
  Description: string;
  slug: string;
  deleted: boolean;
  __v: number;
  createdAt: string;
  updatedAt: string;
  IDProduct: IProduct[];
}

export interface ISupplier {
  _id: string;
  companyName: string;
  description: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  status: string;
  deleted: boolean;
  logoImage: string;
  userID: {
    _id: string;
    account: string;
    Roles: string[];
    isActive: string;
    deleted: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
    Address: string;
    dayOfBirth: string;
    firstName: string;
    gender: boolean;
    lastName: string;
    phone: number;
    profilePicture: string;
  };
  createdAt: string;
  updatedAt: string;
  __v: number;
}
