FROM node:18

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
RUN npm i
RUN npm i -D -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-resolvers
COPY codegen.yml /app/codegen.yml
CMD ["npm", "run", "dev" ]