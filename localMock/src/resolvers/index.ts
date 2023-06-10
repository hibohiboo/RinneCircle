import { Resolvers } from "../types/generated/graphql";
import { dateScalar } from "./scalar/date";
import * as mutaiton from "./mutation/";

const resolvers: Resolvers = {
  Mutation: mutaiton,
};

export default resolvers;
