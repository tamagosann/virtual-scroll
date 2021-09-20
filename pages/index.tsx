import React, { createRef, Fragment, PureComponent } from 'react';
import { FixedSizeList as List } from 'react-window';
import InfiniteLoader from 'react-window-infinite-loader';
import AutoSizer from 'react-virtualized-auto-sizer';

const LOADING = 1;
const LOADED = 2;
let itemStatusMap = {};

export default function App() {
  //それぞれのアイテムがロード完了かどうかを判断
  const isItemLoaded = (index) => !!itemStatusMap[index];

  //列がロードされなければいけない時に発動。
  //全てがロードされたらresolveを返す
  const loadMoreItems = (startIndex, stopIndex) => {
    for (let index = startIndex; index <= stopIndex; index++) {
      itemStatusMap[index] = LOADING;
    }
    return new Promise((resolve) =>
      setTimeout(() => {
        for (let index = startIndex; index <= stopIndex; index++) {
          itemStatusMap[index] = LOADED;
        }
        resolve('solved!');
      }, 2500)
    );
  };

  const Row = ({ index, style }) => {
    let label;
    if (itemStatusMap[index] === LOADED) {
      label = `Row ${index}`;
    } else {
      label = 'Loading...';
    }
    return (
      <div className="ListItem" style={style}>
        {label}
      </div>
    );
  };

  return (
    <Fragment>
      <p className="Note">
        This demo app mimics loading remote data with a 2.5s timer. While rows
        are "loading" they will display a "Loading..." label. Once data has been
        "loaded" the row number will be displayed. Start scrolling the list to
        automatically load data.
      </p>
      <AutoSizer>
        {({ height, width }) => (
          <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={1000}
            loadMoreItems={loadMoreItems}
          >
            {({ onItemsRendered, ref }) => (
              <List
                className="List"
                height={height}
                itemCount={1000}
                itemSize={30}
                onItemsRendered={onItemsRendered}
                ref={ref}
                width={width}
                overscanCount={4}
              >
                {Row}
              </List>
            )}
          </InfiniteLoader>
        )}
      </AutoSizer>

    </Fragment>
  );
}
