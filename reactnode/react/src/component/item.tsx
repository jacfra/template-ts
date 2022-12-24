import { DemoEntity } from "../generated";
import React from "react";

export const Item = ({ item }: { item: DemoEntity }) => {
  const { id, value } = item;
  return (
    <article className="Item">
      <p>{value}</p>
      <p>{id}</p>
    </article>
  );
};
