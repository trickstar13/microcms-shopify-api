import type { NextApiRequest, NextApiResponse } from 'next';

const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const accessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { keywords }
  } = req;

  const myQuery = `query getAllProducts(
    $first: Int = 250
    $query: String = "title:${keywords}"
    $sortKey: ProductSortKeys = RELEVANCE
    $reverse: Boolean = false
  ) {
    products(
      first: $first
      sortKey: $sortKey
      reverse: $reverse
      query: $query
    ) {
      edges {
        node {
          id
          title
          vendor
          handle
          description
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          images(first: 1, maxWidth:400) {
            edges {
              node {
                originalSrc
                altText
                width
                height
              }
            }
          }
        }
      }
    }
  }`;

  fetch(`https://${shopifyDomain}/api/2020-10/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/graphql',
      'X-Shopify-Storefront-Access-Token': accessToken
    },
    'body': myQuery
  })
  .then(response => response.json())
  .then((data) => {
    res.status(200).json(data);
  })
  .catch((error: any) => {
    res.status(500).send(error);
  });
}
