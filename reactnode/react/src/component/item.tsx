import { DemoEntity } from "../generated";

export default ({ item }: { item: DemoEntity }) => {
  const { id, value } = item;
  return (
    <article className="Item">
      <p>{value}</p>
      <p>{id}</p>
    </article>
  );
};
