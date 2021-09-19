import { useCallback, useMemo, useState } from "react";

// 余白が発生しないように画面外に余分にアイテムを表示しておく
const EXTRA_ITEM_COUNT = 3;

type Args<Item> = {
  containerHeight: number;
  itemHeight: number;
  items: Item[];
};

type ReturnItems<Item> = {
  startIndex: number;
  handleScroll: React.UIEventHandler<HTMLDivElement>;
  displayingItems: Item[];
};

export const useVirtualScroll = <Item extends unknown>({
  containerHeight,
  itemHeight,
  items,
}: Args<Item>): ReturnItems<Item> => {
  const [startIndex, setStartIndex] = useState<number>(0);
  const maxDisplayCount = Math.floor(
    containerHeight / itemHeight + EXTRA_ITEM_COUNT
  );

  const handleScroll: React.UIEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      const { scrollTop } = e.currentTarget;
      console.log(scrollTop)
      const nextStartIndex = Math.floor(scrollTop / itemHeight);
      setStartIndex(nextStartIndex);
    },
    [itemHeight]
  );

  const displayingItems = useMemo(
    () => items.slice(startIndex, startIndex + maxDisplayCount),
    [startIndex, maxDisplayCount]
  );

  return { handleScroll, displayingItems, startIndex };
};