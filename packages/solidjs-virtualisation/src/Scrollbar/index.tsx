import {
  Component,
  onCleanup,
  onMount,
  createEffect,
  createMemo,
  createSignal,
  JSX,
} from 'solid-js';
import { Horizontal, Orientation, Vertical } from '../types';
                    
export interface ScrollBarRef {
  scrollToItem: (item: number) => void;
}

export interface ScrollBarProps {
  ref?: ScrollBarRef | ((ref: ScrollBarRef) => void);
  orientation: Orientation;
  itemCount: number;
  itemsPerPage?: number;
  onScroll: (item: number) => void;
  width?: string;
  hideArrows?: boolean;
  onTracking?: (tracking: boolean) => void;
}

interface ScrollbarState {
  position: number;
  item: number;
  thumbSize: number;
  itemsPerThumb: number;
  tracking: boolean;
  hover: 'None' | 'Thumb' | 'Down' | 'Up';
  timer?: number;
  repeatingTimeInterval?: number;
  lastPropPosition?: number;
  orientation: Orientation;
  itemCount: number;
  itemsPerPage?: number;
}

const ScollBar: Component<ScrollBarProps> = (props: ScrollBarProps) => {
  const arrowLength = 15;
  const arrowLengthAndSpace = 17;
  const barLength = props.hideArrows ? 0 : arrowLengthAndSpace;
  const barLengths = props.hideArrows ? 0 : arrowLengthAndSpace * 2;
  let canvasRef: HTMLCanvasElement | undefined = undefined;
  const state = createMemo<ScrollbarState>(() => {
    return {
      position: props.hideArrows ? 0 : arrowLengthAndSpace,
      item: 0,
      thumbSize: 0,
      itemsPerThumb: 0,
      tracking: false,
      hover: 'None',
      orientation: Vertical,
      itemCount: 0
    };
  });
  const [refresh, setRefresh] = createSignal<number>(0);

  onMount(() => {
    document.addEventListener('mousedown', handleMouseDown, true);
    document.addEventListener('mouseup', handleMouseUp, true);
    document.addEventListener('mousemove', handleMouseMove, true);
    if( props.ref ) {
      const gridRef: ScrollBarRef = {
        scrollToItem: (item: number) => {
          if (canvasRef) {
            if( item !== state().item ) { 
              scrollToItem(item, canvasRef.height, canvasRef.width);
            }
          }
        }
      };
      const callback = props.ref && (props.ref as (ref: ScrollBarRef) => void);
      if (callback) {
        callback(gridRef);
      } else {
        props.ref = gridRef;
      }
    }
  });

  onCleanup(async () => {
    document.removeEventListener('mousedown', handleMouseDown, true);
    document.removeEventListener('mouseup', handleMouseUp, true);
    document.removeEventListener('mousemove', handleMouseMove, true);
  });

  const initialiseCanvas = () => {
    if (canvasRef) {
      canvasRef.height = canvasRef.clientHeight;
      canvasRef.width = canvasRef.clientWidth;
      const length = props.orientation === Vertical ? canvasRef.height : canvasRef.width;
      state().thumbSize =
        Math.floor(
          (length - barLengths) / ((props.itemCount - (props.itemsPerPage ?? 1))+1)
        ) < 10
          ? 10
          : Math.floor(
              (length - barLengths) /
                ((props.itemCount - (props.itemsPerPage ?? 1))+ 1)
            );
      state().itemsPerThumb =
        (props.itemCount - (props.itemsPerPage ?? 1)) /
        (length - state().thumbSize - barLengths);
    }
  };

  createEffect(() => {
    if( props.orientation !== state().orientation ||
      props.itemCount !== state().itemCount ||
      props.itemsPerPage !== state().itemsPerPage) {
      state().orientation = props.orientation;
      state().itemCount = props.itemCount;
      state().itemsPerPage = props.itemsPerPage;
      setTimeout(() => {
        initialiseCanvas();
        setRefresh(performance.now());

        //if visible item is no longer valid adjust
        if( state().item >= props.itemCount ) {
          setTimeout(() => {
            if( canvasRef ) {
              scrollToItem(props.itemCount-1, canvasRef.height, canvasRef.width);
            }
          }, 1);
        }
      }, 1);
    }
  });

  createEffect(() => {
    drawScrollBar(refresh());
  });

  const repeat = (action: () => boolean) => {
    state().repeatingTimeInterval = 200;
    const runAction = () => {
      if (action()) {
        const repeatingTimeInterval = state().repeatingTimeInterval;
        if (repeatingTimeInterval) {
          state().repeatingTimeInterval =
            repeatingTimeInterval > 5 ? repeatingTimeInterval - 5 : 5;
          setTimeout(runAction, repeatingTimeInterval);
        }
      }
    };
    setTimeout(runAction, state().repeatingTimeInterval);
  };

  const scrollToItem = (item: number, h: number, w: number) => {
    state().item = item;
    const length = props.orientation === Vertical ? h : w;
    state().position = Math.ceil(
      ((length - state().thumbSize - barLengths) /
        (props.itemCount - (props.itemsPerPage ?? 1))) *
        item +
        barLength
    );
    setRefresh(performance.now());
    props.onScroll(item);
  };

  const handleMouseDown = (event: MouseEvent) => {
    if (canvasRef) {
      const y = event.clientY - canvasRef.getClientRects()[0].top;
      const x = event.clientX - canvasRef.getClientRects()[0].left;
      const ref = canvasRef;
      if (
        !props.hideArrows &&
        isPointInMoveUp(x, y, canvasRef.clientHeight, canvasRef.clientWidth)
      ) {
        repeat(() => {
          if (state().item > 0) {
            scrollToItem(state().item - 1, ref.height, ref.width);
            return true;
          }
          return false;
        });
        event.preventDefault();
        event.stopImmediatePropagation();
      } else if (
        !props.hideArrows &&
        isPointInMoveDown(x, y, canvasRef.clientHeight, canvasRef.clientWidth)
      ) {
        repeat(() => {
          if (state().item + (props.itemsPerPage ?? 1) < props.itemCount) {
            scrollToItem(state().item + 1, ref.height, ref.width);
            return true;
          }
          return false;
        });
        event.preventDefault();
        event.stopImmediatePropagation();
      } else if (
        event.target !== null &&
        canvasRef.contains(event.target as Node) === true
      ) {
        state().tracking = true;
        if( props.onTracking ) {
          props.onTracking(true);
        }
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    }
  };

  const handleMouseUp = (event: MouseEvent) => {
    if (state().tracking) {
      handleMouseMove(event);
      event.preventDefault();
      event.stopImmediatePropagation();
      setTimeout(() => {
        if( props.onTracking ) {
          props.onTracking(false);
        }
      }, 10)
    }
    if (state().repeatingTimeInterval) {
      state().repeatingTimeInterval = undefined;
      event.preventDefault();
      event.stopImmediatePropagation();
    }
    state().tracking = false;
  };

  const isPointInMoveUp = (
    x: number,
    y: number,
    h: number,
    w: number
  ): boolean => {
    return (
      (props.orientation === Vertical && y > 0 && y <= arrowLengthAndSpace && x > 0 && x < w) ||
      (props.orientation === Horizontal && x > 0 && x <= arrowLengthAndSpace && y > 0 && y < h)
    );
  };

  const isPointInMoveDown = (
    x: number,
    y: number,
    h: number,
    w: number
  ): boolean => {
    return (
      (props.orientation === Vertical &&
        y < h &&
        y >= h - arrowLengthAndSpace &&
        x > 0 &&
        x < w) ||
      (props.orientation === Horizontal &&
        x < w &&
        x >= w - arrowLengthAndSpace &&
        y > 0 &&
        y < h)
    );
  };

  const isPointInThumb = (
    x: number,
    y: number,
    h: number,
    w: number
  ): boolean => {
    return (
      (props.orientation === Vertical &&
        y > state().position &&
        y <= state().position + state().thumbSize &&
        x > 0 &&
        x < w) ||
      (props.orientation === Horizontal &&
        x > state().position &&
        x <= state().position + state().thumbSize &&
        y > 0 &&
        y < h)
    );
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (canvasRef) {
      let stopHovering = false;
      if (
        state().hover !== 'None' &&
        (!state().tracking || state().hover !== 'Thumb')
      ) {
        state().hover = 'None';
        stopHovering = true;
      }
      if (state().tracking) {
        const oldPosition = state().position;
        let newPosition = (state().position =
          (props.orientation === Vertical
            ? event.clientY - canvasRef.getClientRects()[0].top
            : event.clientX - canvasRef.getClientRects()[0].left) -
          state().thumbSize);
        if (newPosition < barLength) {
          state().position = barLength;
        } else if (
          newPosition + state().thumbSize >
          (props.orientation === Vertical
            ? canvasRef.clientHeight
            : canvasRef.clientWidth) -
            barLength
        ) {
          state().position =
            (props.orientation === Vertical
              ? canvasRef.clientHeight
              : canvasRef.clientWidth) -
            state().thumbSize -
            barLength;
        } else {
          state().position = newPosition;
        }
        if (oldPosition !== state().position) {
          state().item =
            Math.round(
              (state().position - barLength) * state().itemsPerThumb
            ) >=
            props.itemCount - (props.itemsPerPage ?? 1)
              ? props.itemCount - (props.itemsPerPage ?? 1)
              : Math.round(
                  (state().position - barLength) * state().itemsPerThumb
                );

          if (state().timer) {
            clearTimeout(state().timer);
          }
          state().timer = setTimeout(() => props.onScroll(state().item), 2);
          setRefresh(performance.now());
        }
        event.preventDefault();
        event.stopImmediatePropagation();
      } else {
        const y = event.clientY - canvasRef.getClientRects()[0].top;
        const x = event.clientX - canvasRef.getClientRects()[0].left;
        let hovering = false;
        if (
          isPointInThumb(x, y, canvasRef.clientHeight, canvasRef.clientWidth)
        ) {
          state().hover = 'Thumb';
          hovering = true;
        } else if (
          !props.hideArrows &&
          isPointInMoveUp(x, y, canvasRef.clientHeight, canvasRef.clientWidth) &&
          state().item > 0
        ) {
          state().hover = 'Up';
          hovering = true;
        } else if (
          !props.hideArrows &&
          isPointInMoveDown(x, y, canvasRef.clientHeight, canvasRef.clientWidth) &&
          state().item < props.itemCount - (props.itemsPerPage ?? 1)
        ) {
          state().hover = 'Down';
          hovering = true;
        }
        if (hovering) {
          setRefresh(performance.now());
          event.preventDefault();
          event.stopImmediatePropagation();
          return;
        }
      }
      if (stopHovering) {
        setRefresh(performance.now());
      }
    }
  };

  const getCSSVariable = (name: string): string | undefined => {
    const styles = getComputedStyle(document.documentElement);
    const value = styles.getPropertyValue(name).trim();
    return value === '' ? undefined : value;
  };

  const drawScrollBar = (refresh: number) => {
    if (canvasRef) {
      const context = canvasRef.getContext('2d');

      if (context) {
        const scrollbarColor = getCSSVariable('--scrollbarColor') ?? 'white';
        const scrollbarArrowColor =
          getCSSVariable('--scrollbarArrowColor') ?? '#6f6e6e';
        const scrollbarArrowHoverColor =
          getCSSVariable('--scrollbarArrowHoverColor') ?? '#6f6e6e';
        const scrollbarArrowHoverBackground =
          getCSSVariable('--scrollbarArrowHoverBackground') ?? '#a9a9a9';
        const scrollbarThumbColor =
          getCSSVariable('--scrollbarThumbColor') ?? '#a9a9a9';
        const scrollbarThumbHoverColor =
          getCSSVariable('--scrollbarThumbHoverColor') ?? '#6f6e6e';

        //scroll bar
        context.fillStyle = scrollbarColor;
        context.fillRect(0, 0, canvasRef.clientWidth, canvasRef.height);

        //draw thumb
        context.fillStyle =
          state().hover === 'Thumb'
            ? scrollbarThumbHoverColor
            : scrollbarThumbColor;
        if (props.orientation === Vertical) {
          context.fillRect(
            2,
            state().position,
            canvasRef.clientWidth-4,
            state().thumbSize
          );
        } else {
          context.fillRect(
            state().position,
            2,
            state().thumbSize-4,
            canvasRef.clientHeight
          );
        }

        if (!props.hideArrows) {
          if (state().hover === 'Up') {
            context.fillStyle = scrollbarArrowHoverBackground;
            if (props.orientation === Vertical) {
              context.fillRect(0, 0, canvasRef.clientWidth, arrowLength);
            } else {
              context.fillRect(0, 0, arrowLength, canvasRef.clientHeight);
            }
          }
        }

        if (!props.hideArrows) {
          if (state().hover === 'Down') {
            context.fillStyle = scrollbarArrowHoverBackground;
            if (props.orientation === Vertical) {
              context.fillRect(
                0,
                canvasRef.clientHeight - arrowLength,
                canvasRef.clientWidth,
                canvasRef.clientHeight
              );
            } else {
              context.fillRect(
                canvasRef.clientWidth - arrowLength,
                0,
                canvasRef.clientWidth,
                canvasRef.clientHeight
              );
            }
          }
        }

        if (!props.hideArrows) {
          context.beginPath();
          if (props.orientation === Vertical) {
            context.moveTo(canvasRef.clientWidth / 2, 5);
            context.lineTo(canvasRef.clientWidth / 2 + 3, 10);
            context.lineTo(canvasRef.clientWidth / 2 - 3, 10);
          } else {
            context.moveTo(5, canvasRef.clientHeight / 2);
            context.lineTo(10, canvasRef.clientHeight / 2 + 3);
            context.lineTo(10, canvasRef.clientHeight / 2 - 3);
          }
          context.closePath();

          // the outline
          context.lineWidth = 1;
          context.strokeStyle =
            state().hover === 'Up'
              ? scrollbarArrowHoverColor
              : scrollbarArrowColor;
          context.stroke();

          // the fill color
          context.fillStyle =
            state().hover === 'Up'
              ? scrollbarArrowHoverColor
              : scrollbarArrowColor;
          context.fill();

          context.beginPath();
          if (props.orientation === Vertical) {
            context.moveTo(
              canvasRef.clientWidth / 2,
              canvasRef.clientHeight - 5
            );
            context.lineTo(
              canvasRef.clientWidth / 2 + 3,
              canvasRef.clientHeight - 10
            );
            context.lineTo(
              canvasRef.clientWidth / 2 - 3,
              canvasRef.clientHeight - 10
            );
          } else {
            context.moveTo(
              canvasRef.clientWidth - 5,
              canvasRef.clientHeight / 2
            );
            context.lineTo(
              canvasRef.clientWidth - 10,
              canvasRef.clientHeight / 2 + 3
            );
            context.lineTo(
              canvasRef.clientWidth - 10,
              canvasRef.clientHeight / 2 - 3
            );
          }
          context.closePath();

          // the outline
          context.lineWidth = 1;
          context.strokeStyle =
            state().hover === 'Down'
              ? scrollbarArrowHoverColor
              : scrollbarArrowColor;
          context.stroke();

          // the fill color
          context.fillStyle =
            state().hover === 'Down'
              ? scrollbarArrowHoverColor
              : scrollbarArrowColor;
          context.fill();
        }
      }
    }
  };

  const verticalstyle: JSX.CSSProperties = {
    width: props.width ?? '20px',
    height: '100%',
  };

  const horizontalstyle: JSX.CSSProperties = {
    height: props.width ?? '20px',
    width: '100%',
  };

  return (
    <canvas
      style={props.orientation === Vertical ? verticalstyle : horizontalstyle}
      ref={canvasRef}
    />
  );
};

export default ScollBar;
