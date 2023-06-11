## 実行手順

下記の手順で GraphQL サーバを作成

1. コンテナの作成
2. docker の起動
3. マイグレーション
4. seed の実行

```
./bin/container_build.sh
./bin/up.sh
./bin/migrate.sh
./bin/seed.sh
```

### 実行の確認

| アプリ                 | URL                    |
| ---------------------- | ---------------------- |
| GraphQL サーバ(Apollo) | http://127.0.0.1:4000/ |
| Adminer                | http://127.0.0.1:8080/ |

## 開発手順

1. スキーマから型定義の作成
2. 型定義から Prisma クライアントの肩を作成

```
./bin/codegen.sh
npm run generate
```

3. Mutation,Query のリゾルバ作成

## 参考

[Apollo Server と Prisma ではじめる GraphQL API 開発入門](https://zenn.dev/eringiv3/books/a85174531fd56a/viewer/e25cc1)

[Generating Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client/working-with-prismaclient/generating-prisma-client#the-prismaclient-npm-package)
