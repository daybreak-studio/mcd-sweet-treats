"use client";

import { AnimatePresence } from "framer-motion";
import { LayoutRouterContext } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter } from "next/navigation";
import React, { PropsWithChildren, useContext, useRef } from "react";

type Props = {
  children: React.ReactNode;
};

function FrozenRouter(props: PropsWithChildren<{}>) {
  const context = useContext(LayoutRouterContext);
  const frozen = useRef(context).current;

  return (
    <LayoutRouterContext.Provider value={frozen}>
      {props.children}
    </LayoutRouterContext.Provider>
  );
}

const PageTransition = ({ children }: Props) => {
  const path = usePathname();

  return (
    <AnimatePresence>
      <FrozenRouter key={path}>{children}</FrozenRouter>
    </AnimatePresence>
  );
};

export default PageTransition;
