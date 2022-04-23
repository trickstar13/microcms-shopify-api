# microcms-shopify-api

## 機能

- Shopify の特定ストアでの商品名検索
- 商品を選択し、microCMS 側に保存

## 技術構成

- Next.js
- ESLint
- Prettier

## 環境変数

プロジェクトルートに`.env.local`ファイルを作成し、以下の項目を設定してください。

- NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN（Shopifyのストアドメイン）
- NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN（ShopifyのStorefrontアクセストークン）
- NEXT_PUBLIC_SERVICE_ID（連携する microCMS のサービス ID）

例：

```
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=example.myshopify.com
NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NEXT_PUBLIC_SERVICE_ID=xxxxxxx
```

## 開発方法

```bash
# パッケージをインストール
$ npm install

# 開発サーバーを起動（localhost:3000）
$ npm run dev
```

microCMS の iFrame フィールドにて`http://localhost:3000`を指定することでデバッグ可能です。

## ライセンス

Apache License 2.0
