import { Resolvers } from "../types/generated/graphql";
import { dateScalar } from "./scalar/date";
import * as mutaiton from "./mutation/";
import * as query from "./query";

const resolvers: Resolvers = {
  Query: query,
  Mutation: mutaiton,
  Date: dateScalar,
};

export default resolvers;
