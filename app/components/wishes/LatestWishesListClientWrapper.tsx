"use client";
import LatestWishesList from "./LatestWishesList";
import { Wish } from "./WishCard";

export default function LatestWishesListClientWrapper({ wishes }: { wishes: Wish[] }) {
  return <LatestWishesList wishes={wishes} />;
}
