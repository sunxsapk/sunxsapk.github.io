'use client';

import { useEffect, useRef, useState } from "react";

/*
  * window factor is the number of cards to be displayed at each side of center element
  * never set the window factor to greater than items length
  * auto scroll is also supported with scroll direction specifiability
*/

export const ScrollDirection = {
  none: 0,
  right: 1,
  left: -1
};

export default function InfiniteScrollH({
  items,
  componentMap = (item, key) => (null),
  windowFactor = 1,
  autoScroll = true,
  scrollDirection = ScrollDirection.right,
  scrollDelay = 2000,
}) {

  const windowsize = 2 * windowFactor + 3;
  const [index, setIndex] = useState(windowFactor);
  const [_items, setItems] = useState([]);
  const containerRef = useRef();

  //useEffect(()=>{
  //  if(!autoScroll) return;
  //  const timeoutID = setInterval(()=>{
  //    setIndex(p => (p+scrollDirection+items.length)%items.length);
  //  }, scrollDelay);

  //  return () => clearInterval(timeoutID);
  //}, [autoScroll, items, scrollDirection, scrollDelay]);

  const updateList = () => {
    let t = [];
    for (let i = -windowFactor-1; i <= windowFactor+1; i++) {
      const _i = (index + i + items.length) % items.length;
      t.push(items[_i]);
    }
    setItems(t);
  }

  useEffect(() => {
    // check if last item is inside the screen
    // if it is, then add few more items at last
    // else leave it be

    const container = containerRef.current;
    const children = container?.children;
    if(!children) return;

    updateList();

    console.log(container.children);
  }, [index]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const intervalID = setInterval(() => {
      //container.children[index].scrollIntoView({ behaviour: 'smooth', block: 'start' });
    }, scrollDelay);

    return () => clearInterval(intervalID);
  }, [index]);

  return (
    <div className="flex gap-4 overflow-x-auto justify-evenly" ref={containerRef}>
      {_items.map((item, i) => componentMap(item, i))}
    </div>
  );
}
