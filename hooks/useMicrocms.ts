import { useCallback, useEffect, useState } from 'react';
import { microcmsPostData, microcmsUpdateStyle } from '../lib/microcms';
import type { Item } from '../types/result';

type UseMicrocms = () => [Item | undefined, (item: any) => void];

export const useMicrocms: UseMicrocms = () => {
  const [id, setId] = useState<string>('');
  const [data, setData] = useState<Item>();

  useEffect(() => {
    window.addEventListener('message', (e) => {
      if (
        e.isTrusted &&
        e.data.action === 'MICROCMS_GET_DEFAULT_DATA'
      ) {
        setId(e.data.id);
        setData(e.data.message?.data);
        console.log(e.data.message?.data);
        microcmsUpdateStyle({
          id: e.data.id,
          message: {
            height: 400
          }
        });
      }
    });
  }, []);

  const selectData = useCallback(
    (item: Item) => {
      setData(item);
      microcmsPostData({
        id,
        message: {
          id: item.node.id,
          title: item.node.vendor + '/' + item.node.title,
          imageUrl: item.node.images.edges[0].node.originalSrc,
          updatedAt: new Date(),
          data: item
        }
      });
    },
    [id]
  );

  return [data, selectData];
};
