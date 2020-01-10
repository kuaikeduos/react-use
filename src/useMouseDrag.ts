import { useEffect, RefObject } from 'react'

// https://stackblitz.com/edit/native-mouse-drag?file=index.ts
// https://stackblitz.com/edit/react-mouse-drag?file=useMouseDrag.ts

const useMouseDrag = (ref: RefObject<HTMLElement>, options = {
  range: [-Infinity, Infinity, Infinity, -Infinity], // 上右下左
}) => {

  useEffect(() => {

    const dom = ref.current;
    let x = 0;
    let y = 0;
    let l = 0;
    let t = 0;
    let isDown = false;

    if (!dom) return;

    function handleMouseDown(e: MouseEvent) {

      if (!dom) return;

      //获取x坐标和y坐标
      x = e.clientX;
      y = e.clientY;

      //获取左部和顶部的偏移量
      l = dom.offsetLeft;
      t = dom.offsetTop;
      //开关打开
      isDown = true;
      //设置样式  
      dom.style.cursor = 'move';
    }

    function handleMouseUp() {
      if (!dom) return;
      //开关关闭
      isDown = false;
      dom.style.cursor = 'default';
    }

    function handleMouseMove(e: MouseEvent) {
      
      if (!dom) return;

      if (!isDown) {
        return;
      }
      //获取x和y
      let nx = e.clientX;
      let ny = e.clientY;
      //计算移动后的左偏移量和顶部的偏移量
      let nl = nx - (x - l);
      let nt = ny - (y - t);

      if (options.range[3] <= nl && nl <= options.range[1]) {
        dom.style.left = nl + 'px';
      }

      if (options.range[0] <= nt && nt <= options.range[2]) {
        dom.style.top = nt + 'px';
      }
    }

    dom.addEventListener('mousedown', handleMouseDown);
    dom.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      removeEventListener('mousedown', handleMouseDown)
      removeEventListener('mouseup', handleMouseUp)
      removeEventListener('mousemove', handleMouseMove)
    };
  }, [ref.current])

}

export default useMouseDrag