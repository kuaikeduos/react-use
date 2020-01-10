# `useMouseDrag`

鼠标点击可以拖拽

## Demo

[stackblitz](https://stackblitz.com/edit/react-mouse-drag?file=DragDemo.tsx)

## Usage

```jsx
import React, { useRef } from 'react';
import useMouseDrag from './useMouseDrag';

const DragDemo: React.FC = () => {

  const demoRef = useRef(null)
  useMouseDrag(demoRef)

  return (
    <div ref={demoRef}>拖我</div>
  )
}

export default DragDemo;
```

## Reference

```ts
useMouse(ref);
```
