import Image from 'next/image';
import React from 'react';
import type { Item, Result } from '../types/result';
import styles from '../styles/result.module.css';

type Props = {
  result: Result | null;
  error: any;
  loading: boolean;
  selectData: (item: Item) => void;
};

const Index: React.VFC<Props> = ({ result, error, loading, selectData }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <Image src='/images/icon_loading.svg' alt='' width='38' height='38' />
      </div>
    );
  }
  if (error) {
    return (
      <div className={styles.error}>
        <p>エラーが発生しました</p>
      </div>
    );
  }
  if (result?.data.products.length === 0) {
    return (
      <div className={styles.empty}>
        <p>検索結果が見つかりません</p>
      </div>
    );
  }
  return (
    <ul className={styles.lists}>
      {result?.data.products.edges.map((item: any) => (
        <li
          key={item.node.id}
          className={styles.list}
          onClick={() => selectData(item)}
        >
          <div className={styles.image}>
            <Image
              src={item.node.images.edges[0].node.originalSrc}
              alt=''
              width={item.node.images.edges[0].node.width}
              height={item.node.images.edges[0].node.height}
            />
          </div>
          <div>
            <ul>
              <li>ID: {item.node.id}</li>
              <li>{item.node.vendor} / {item.node.title}</li>
              <li>{item.node.priceRange.minVariantPrice.amount}{item.node.priceRange.minVariantPrice.currencyCode}</li>
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Index;
