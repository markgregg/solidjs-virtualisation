import {
  bigChoices,
  bigObjectChoices,
  bigTypedObjectChoices,
} from './data/data';
import { Choice } from './types';

export interface Complex {
  name: string;
}

export const fetchItems = (text: string): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(bigChoices.filter((item) => item.startsWith(text.toUpperCase())));
    }, Math.floor(Math.random() * 1000));
  });
};

export const slowFetchItems = (text: string): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(bigChoices.filter((item) => item.startsWith(text.toUpperCase())));
    }, 2000);
  });
};

export const fetchTyped = (text: string): Promise<Choice[]> => {
  return new Promise<Choice[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(
        bigTypedObjectChoices.filter((item: Choice) =>
          item.text.startsWith(text.toUpperCase())
        )
      );
    }, Math.floor(Math.random() * 1000));
  });
};

export const slowFetchObjects = (text: string): Promise<Complex[]> => {
  return new Promise<Complex[]>((resolve) => {
    setTimeout(() => {
      resolve(
        bigObjectChoices.filter((item) =>
          item.name.startsWith(text.toUpperCase())
        )
      );
    }, 2000);
  });
};

export const searchItems = (items: string[]): Promise<string[]> => {
  return new Promise<string[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(
        bigChoices.filter((item) => items.find((s) => s.toUpperCase() === item))
      );
    }, Math.floor(Math.random() * 300));
  });
};

export const searchTyped = (items: string[]): Promise<Choice[]> => {
  return new Promise<Choice[]>((resolve, reject) => {
    setTimeout(() => {
      resolve(
        bigTypedObjectChoices.filter((item) =>
          items.find((s) => s === item.value.toString())
        )
      );
    }, Math.floor(Math.random() * 300));
  });
};
