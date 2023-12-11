"use client"
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { UserContext } from "@/context/UserContext";

export function GetCartAndUser() {
  return function GetContextData() {
    const cartContext = useContext(CartContext);
    const userContext = useContext(UserContext);

    //@ts-ignore
    return { cart: cartContext.cart, user: userContext.user };
  };
}