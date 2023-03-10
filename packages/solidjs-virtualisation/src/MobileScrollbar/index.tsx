import {
  Component,
  createEffect,
  createSignal,
  For,
  JSX,
  onMount
} from 'solid-js';
import { Horizontal, Orientation, Vertical } from '../types';
                    
export interface MobileScrollBarRef {
  scrollToItem: (item: number) => void;
}

export interface MobileScrollBarProps {
  ref?: MobileScrollBarRef | ((ref: MobileScrollBarRef) => void);
  orientation: Orientation;
  itemCount: number;
  itemSize: number;
  itemsPerPage?: number;
  onScroll: (item: number) => void;
  children: JSX.Element;
}

const maxSize = 32767;
const MobileScrollbar: Component<MobileScrollBarProps> = (props: MobileScrollBarProps) => {
  let containerDivRef: HTMLDivElement | undefined = undefined;
  const [size,setSize] = createSignal(0)
  const [factor,setFactor] = createSignal(1)
  const [position,setPosition] = createSignal(0)
  
  onMount(() => {
    if( props.ref ) {
      const ref: MobileScrollBarRef = {
        scrollToItem: (item: number) => {
          const x = props.orientation === Vertical ? 0 : (item) / factor();
          const y = props.orientation === Horizontal ? 0 : (item) / factor();
          containerDivRef?.scrollTo(x,y);
        }
      }
      const callback = props.ref && (props.ref as (ref: MobileScrollBarRef) => void);
      if (callback) {
        callback(ref);
      } else {
        props.ref = ref;
      }
    }
  });

  createEffect(() => {
    if( containerDivRef ) {
      const contianerSize = (props.orientation === Vertical ? containerDivRef.clientHeight : containerDivRef.clientWidth)+1;
      let sizeFactor = 1;
      while( ((props.itemCount-(props.itemsPerPage ?? 1)) / sizeFactor ) + contianerSize > maxSize ) {
        sizeFactor = sizeFactor * 10;
      }
      setFactor(sizeFactor)
      setSize((props.itemCount-(props.itemsPerPage ?? 1)) / sizeFactor + contianerSize );
    }
  });
  
  const scrollAreaStyle = (orientation: Orientation, size: number) => {
    return orientation === Vertical
    ? {
        height: `${size}px`,
        width: '1px'
      }
    : {
        width: `${size}px`,
        height: '1px'
      };
  }

  const scrolled = (event: UIEvent) => {
    const element = event?.target as HTMLDivElement;
    if( element )  {
      const position = props.orientation === Vertical ? element.scrollTop : element.scrollLeft;
      const item = position * factor() > (props.itemCount-(props.itemsPerPage ?? 1)) 
        ? (props.itemCount-(props.itemsPerPage ?? 1)) 
        : position * factor() ;
      props.onScroll(item);
      setPosition(position);
    }
  }

  return (
    <>
      <div 
        ref={containerDivRef}
        style={{
          height: '100%',
          width: '100%',
          overflow: 'auto',
          position: 'relative',
          "z-index": 99,
        }}
        onScroll={scrolled}
      >
        <div
          style={scrollAreaStyle(props.orientation, size())}
        />
        <div
        style={{
          height: '100%',
          width: '100%',
          overflow: 'hidden',
          position: 'absolute',
          display: 'flex',
          'row-gap': '2px',
          top: props.orientation === Vertical ? `${position()}px` : 0,
          left: props.orientation === Horizontal ? `${position()}px` : 0,
          'flex-direction': props.orientation === Vertical ? 'column' : 'row'
        }}
      >
          { props.children }
      </div>  
      </div>
    </>
  );
};

export default MobileScrollbar;
