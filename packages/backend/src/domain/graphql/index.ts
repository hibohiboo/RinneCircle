import { HasuraResponse } from "./types";

export const getGraphQLClient = (url: string, secret: string) => {
  return new GraphqlClient(url, secret);
};

export class GraphqlClient {
  constructor(private url: string, private secret: string) {}
  async executeQuery<T>(query: string) {
    console.log("query", query);
    const body = JSON.stringify({ query });
    const response = await fetch(this.url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-hasura-admin-secret": this.secret,
        "x-hasura-role": "lambda",
      },
      body,
    });
    return response.json() as Promise<HasuraResponse<T>>;
  }
}
