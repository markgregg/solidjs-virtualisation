import { Component, createSignal, JSX } from 'solid-js';
import styles from './App.module.css';
import Item from './Item';
import VirtualContainer from 'solidjs-virtualisation';
import { Horizontal, Orientation, Vertical } from './types';

const items: number[] = [];
for (let index = 1; index <= 1000000; index++) {
  items.push(index);
}

const App = () => {
  const [orientation, setHorizontal] = createSignal<Orientation>(Vertical);
  const [size, setSize] = createSignal<'Fixed' | 'Variable'>('Fixed');

  const orientationChanged = () => {
    setHorizontal(orientation() === Vertical ? Horizontal : Vertical);
  };

  const sizeChanged = () => {
    setSize(size() === 'Fixed' ? 'Variable' : 'Fixed');
  };

  const contentStyle = () =>
    orientation() === Horizontal
      ? {
          width: '400px',
        }
      : {
          height: '400px',
        };

  return (
    <div class={styles.app}>
      <p onClick={orientationChanged}>
        {orientation()} orientation (click to change)
      </p>
      <p onClick={sizeChanged}>{size()} size (click to change)</p>
      <div style={contentStyle()}>
        <VirtualContainer
          thumbColor="blue"
          thumbHoverColor="darkblue"
          orientation={orientation()}
          items={items}
          itemLength={
            size() === 'Fixed'
              ? orientation() === Horizontal
                ? 140
                : 40
              : undefined
          }
          render={(item) => (
            <Item
              index={item}
              orientation={orientation()}
              variableHeight={size() === 'Variable'}
            />
          )}
        />
      </div>
    </div>
  );
};

export default App;
