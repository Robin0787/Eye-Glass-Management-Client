/* eslint-disable @typescript-eslint/no-explicit-any */
export type TGender = "male" | "female" | "unisex";
export type TFrameSize = "sm" | "md" | "lg" | "xl";

export interface TAddProduct {
  name: string;
  image: string;
  frame: string;
  shape: string;
  lensType: string;
  frameSize: TFrameSize;
  brand: string;
  price: number;
  quantity: number;
  gender: TGender;
  color: string;
}

export interface TProduct {
  _id: string;
  name: string;
  image: string;
  frame: string;
  shape: string;
  lensType: string;
  frameSize: string;
  brand: string;
  price: number;
  quantity: number;
  gender: TGender;
  color: string;
  addedBy: string;
}
