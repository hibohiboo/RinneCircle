FROM node:18

# コンテナ上の作業ディレクトリ作成
WORKDIR /app

COPY package.json /app/package.json
COPY tsconfig.json /app/tsconfig.json
RUN npm i

COPY codegen.yml /app/codegen.yml
CMD ["npm", "run", "dev" ]