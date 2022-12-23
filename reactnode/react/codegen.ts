import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  // for dev env use only
  // localhost will more than likely always be right
  // port is equivalent to GQLNODE_HTTP_PORT
  schema: `http://localhost:8080/graphql`,
  generates: {
    "./src/generated/index.ts": {
      plugins: [
        "typescript",
        "typescript-operations",
        "typescript-react-query",
      ],
      config: {
        fetcher: "graphql-request",
      },
    },
  },
  documents: ["src/graphql/**/*.{gql,graphql}"],
  ignoreNoDocuments: true,
};

export default config;
