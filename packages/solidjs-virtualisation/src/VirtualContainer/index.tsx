import {
  Component,
  onMount,
  createSignal,
  JSXElement,
  createEffect,
  JSX,
} from 'solid-js';
import { Orientation, Vertical } from '../types';
import Scrollbar from '../Scrollbar';

export interface VirtualContainerProps {
  orientation: Orientation;
  items: any[];
  itemSize?: number;
  render: (item: any, index: number) => JSXElement;
  hideArrows?: boolean;
  listSize?: number;
  moveToItem?: number;
}

interface Item {
  index: number;
  item: any;
}

const VirtualContainer: Component<VirtualContainerProps> = (
  props: VirtualContainerProps
) => {
  let divRef: HTMLDivElement | undefined = undefined;
  const [position, setPosition] = createSignal<number>(0);
  const [wholeItemsPerPage, setWholeItemsPerPage] = createSignal<number>(0);
  const [visibleItems, setVisibleItems] = createSignal<Item[]>([]);
  const [containerLength, setContainerLength] = createSignal<number>();
  const [itemSize,setItemSize] = createSignal<number>(props.itemSize ?? 20);

  onMount(() => {
    initialise(props.orientation, props.items, itemSize());
  });

  const updateItems = (start: number) => {
    if (divRef) {
      const viewport =
        containerLength() ??
        (props.orientation === Vertical
          ? divRef.clientHeight
          : divRef.clientWidth) ??
        0;
      const itemLength = itemSize() ?? 5;
      const itemsPerPage =
        Math.floor(viewport / (itemLength + 2)) +
        (Math.floor(viewport / (itemLength + 2)) * (itemLength + 2) < viewport
          ? 1
          : 0);
      const newItems: Item[] = props.items
        .slice(start, start + itemsPerPage)
        .map((item, index) => {
          return { index: start + index, item };
        });
      if (
        newItems.length !== visibleItems().length ||
        (newItems.length > 0 && newItems[0].item !== visibleItems()[0])
      ) {
        setVisibleItems(newItems);
      }
    }
  };

  const initialise = (
    orientation: Orientation,
    items: any[],
    itemSize?: number
  ) => {
    if (divRef) {
      const viewport =
        (props.orientation === Vertical
          ? divRef.clientHeight
          : divRef.clientWidth) ?? 0;
      if (itemSize && itemSize * items.length < viewport) {
        setContainerLength(itemSize * items.length);
      }
      const length = containerLength();
      if (length && itemSize && itemSize * items.length > length) {
        setContainerLength(undefined);
      }
      const wholeItems = !itemSize
        ? 1
        : Math.floor((containerLength() ?? viewport) / (itemSize + 2));
      setWholeItemsPerPage(wholeItems);
      setTimeout(() => {
        updateItems(0);
      }, 1);
    }
  };

  createEffect(() => {
    initialise(props.orientation, props.items, itemSize());
  });

  const handleScroll = (item: number) => {
    setPosition(item);
    updateItems(item);
  };

  const getTargetItem = (item?: number): number | undefined => {
    if (item === undefined) {
      return;
    }
    if (item < position()) {
      return item;
    }
    if (item > position() + wholeItemsPerPage()) {
      return position() + (item - (position() + wholeItemsPerPage()));
    }
  };

  const setFirstElementRef = (ref: HTMLDivElement) => {
    setTimeout(() => {
      if( props.orientation === Vertical ) {
        if( !props.itemSize && ref.clientHeight != 0 && ref.clientHeight != itemSize() ) {
          setItemSize(ref.clientHeight)
        }
      } else {
        if( !props.itemSize && ref.clientWidth != 0 &&  ref.clientWidth != itemSize() ) {
          setItemSize(ref.clientWidth)
        }
      }
    }, 10);
  }

  const verticalItemListStyle: JSX.CSSProperties = {
    flex: '1',
    display: 'flex',
    'flex-direction': 'column',
    'column-gap': '2px',
  };

  const horizontalItemListStyle: JSX.CSSProperties = {
    flex: '1',
    display: 'flex',
    'flex-direction': 'row',
    'row-gap': '2px',
  };

  const verticalContainerStyle: JSX.CSSProperties = {
    display: 'flex',
    overflow: 'hidden',
    'flex-direction': 'row',
    height: '100%',
  };

  const horizontalContainerStyle: JSX.CSSProperties = {
    display: 'flex',
    overflow: 'hidden',
    'flex-direction': 'column',
    width: '100%',
  };

  const containerStyle = (
    orientation: Orientation,
    containerSize?: number,
    length?: number
  ): JSX.CSSProperties => {
    return orientation === Vertical
      ? {
          height: containerSize ? `${length ?? containerSize}px` : '100%',
        }
      : {
          width: containerSize ? `${length ?? containerSize}px` : '100%',
        };
  };

  return (
    <div
      style={containerStyle(
        props.orientation,
        props.listSize,
        containerLength()
      )}
    >
      <div
        style={
          props.orientation === Vertical
            ? verticalContainerStyle
            : horizontalContainerStyle
        }
        ref={divRef}
      >
        <div
          style={
            props.orientation === Vertical
              ? verticalItemListStyle
              : horizontalItemListStyle
          }
        >
          {visibleItems().map((item, index) => index === 0
            ?<div ref={setFirstElementRef}>{props.render(item.item, item.index)}</div>
            :<div>{props.render(item.item, item.index)}</div>
          )}
        </div>
        {!containerLength() && (
          <Scrollbar
            moveToItem={getTargetItem(props.moveToItem)}
            orientation={props.orientation}
            itemCount={props.items.length}
            itemsPerPage={wholeItemsPerPage()}
            onScroll={handleScroll}
            hideArrows={props.hideArrows}
          />
        )}
      </div>
    </div>
  );
};

export default VirtualContainer;
