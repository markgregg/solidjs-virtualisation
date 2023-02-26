import { Component, createEffect, createSignal, onMount } from 'solid-js';
import './VirtualisationExample.css';
import Item from '../Item';
import VirtualContainer, {VirtualContainerRef, Orientation} from "solidjs-virtualisation";

export interface VirtualisationExampleProps {
  theme: string;
}

const VirtualisationExample: Component<VirtualisationExampleProps> = (
  props: VirtualisationExampleProps
) => {
  let virtualContainerRef: VirtualContainerRef | undefined = undefined;
  const [orientation, setHorizontal] = createSignal<Orientation>('Vertical');
  const [size, setSize] = createSignal<'Fixed' | 'Variable'>('Fixed');
  const [items, setItems] = createSignal<number[]>([]);
  const [itemCount, setItemCount] = createSignal<number>(10000000);

  const orientationChanged = () => {
    setHorizontal(orientation() === 'Vertical' ? 'Horizontal' : 'Vertical');
  };

  onMount(() => {
    createItems(10000000);
  });

  createEffect(() => {
    setTimeout( () => {
      orientationChanged();
      orientationChanged();
    },1)
  });

  const createItems = (count: number) => {
    if( Number.isNaN(count) || count === 0) {
      return;
    }
    if( count > 10000000) {
      count = 10000000;
    }
    setItemCount(count);
    const items: number[] = [];
    for (let index = 1; index <= count; index++) {
      items.push(index);
    }
    setItems(items);
  };

  const jump = (index: number) => {
    virtualContainerRef?.scrollToItem(index <= 0 ? 0 : index-1);
  };

  const sizeChanged = () => {
    setSize(size() === 'Fixed' ? 'Variable' : 'Fixed');
  };

  return (
    <div class='main'>
      <p>Rather using a virtual DOM, SolidJS only updates elements in response to a reaction. 
        The SolidJs-Select control renders all options in response to a single reaction. This would cause SolidJs a lot of work.
        I've overcome the problem by virtualising the options, so only visible items are rendered.
      </p>
      <div class='settings'>
        <div class='columns'>
          <p class='entry'>Orientation</p>
          <p class='entry'>Item Size</p>
          <p class='entry'>Item count</p>
          <p class='entry'>Jump to item</p>
        </div>
        <div class='columns'>
          <p class='entryValue' onClick={orientationChanged}>{orientation()}</p>
          <p class='entryValue' onClick={sizeChanged}>{size()}</p>
          <input 
            class='entryInput' 
            type="number" 
            min="1" 
            max="10000000"
            value={itemCount()}
            onChange={e => createItems(Number((e.target as HTMLInputElement).value))}
          />
          <input 
            class='jumpInput' 
            type="number" 
            min="1" 
            max={itemCount()}
            onChange={e => jump(Number((e.target as HTMLInputElement).value))}
          />
        </div>
      </div>
      <div class='containerCenter'>
        <div class={ orientation() === 'Horizontal' ? 'contentHorizontal' : 'contentVertical'}>
          <VirtualContainer
            ref={virtualContainerRef}
            orientation={orientation()}
            items={items()}
            render={(item: any) => (
              <Item
                index={item}
                orientation={orientation()}
                variableSize={size() === 'Variable'}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default VirtualisationExample;