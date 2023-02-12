import type { Component } from 'solid-js';
import { Orientation } from "solidjs-virtualisation";
import './Item.css';

export interface ItemProps {
  index: number;
  orientation: Orientation;
  variableSize: boolean;
}
const Item: Component<ItemProps> = (props: ItemProps) => {

  const itemStyle = (orientation: Orientation) => {
    return orientation === 'Horizontal'
      ? {
        height: '40px',
      }
      : {
        width: '170px'
      }
  };


  const getImageHeight = (variableSize: boolean, orientation: Orientation, index: number) => {
    return variableSize && orientation === 'Vertical'
      ? 40 + (index % 5) * 10
      : '40px';
  };

  const getImageWidth = (variableSize: boolean, orientation: Orientation, index: number) => {
    return variableSize && orientation === 'Horizontal'
      ? 40 + (index % 5) * 10
      : '40px';
  };

  return (
    <div class="item"
      style={itemStyle(props.orientation)}
    >
      <img
        height={getImageHeight(props.variableSize, props.orientation, props.index)}
        width={getImageWidth(props.variableSize, props.orientation, props.index)}
        alt={props.index.toString()}
        src={`https://picsum.photos/id/${(props.index % 10) + 1}/200/300`}
      />
      <pre>Item {props.index.toLocaleString()}</pre>
    </div>
  );
};

export default Item;
