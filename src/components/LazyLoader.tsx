import React, { Suspense } from "react";
import LoadingScreen from "./LoadingScreen";

const LazyLoader = (Component: React.ElementType) => {
  const LoadableComponent = (props: object) => (
    <Suspense fallback={<LoadingScreen />}>
      <Component {...props} />
    </Suspense>
  );

  return LoadableComponent;
};

export default LazyLoader;
