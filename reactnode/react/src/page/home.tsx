import React from "react";
import { ReactElement } from "react";
import { client } from "../client";
import { DemoEntity, useGetDemoQuery } from "../generated";

export const Home = () => {
  const demos = useGetDemoQuery(client, {});
  return (
    <div>
      {demos.data?.demo.map((demo: DemoEntity): ReactElement => {
        return (
          <div key={demo.id}>
            <div>{demo.id}</div>
            <div>{demo.value}</div>
          </div>
        );
      })}
    </div>
  );
};
