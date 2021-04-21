import React from "react";

const useImageLoad = (): any => {
  const [loaded, setLoaded] = React.useState(false);
  const ref = React.useRef<HTMLImageElement>();

  const onLoad = () => setLoaded(true);

  React.useEffect(() => {
    if (ref.current && ref.current.complete) onLoad();
  }, []);

  return [ref, loaded, onLoad];
};

export default useImageLoad;
