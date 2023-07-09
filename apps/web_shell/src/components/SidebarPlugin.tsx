import React, { useRef, useEffect } from "react";
import { mount } from "sidebar/Main";

export default ({
  span, transaction
}: {
    span: any;
    transaction: any;
}) => {
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current!, { sdk: { sentry: { span, transaction } } });
  }, []);

  return <div ref={ref} />;
};
