import React, { forwardRef, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  space,
  color,
  compose,
  width,
  maxWidth,
  minWidth,
  height,
  display,
  flex,
  flexWrap,
  flexDirection,
  alignItems,
  alignContent,
  justifyContent,
  justifyItems,
} from "styled-system";
import { Dialog } from "@reach/dialog";
import { QRCodeSVG } from "qrcode.react";
import blockies from "ethereum-blockies";

/** Minimal theme object for ThemeProvider (site uses custom CSS classes). */
export const theme = {};

const system = compose(
  space,
  color,
  width,
  maxWidth,
  minWidth,
  height,
  display,
  flex,
  flexWrap,
  flexDirection,
  alignItems,
  alignContent,
  justifyContent,
  justifyItems
);

export const Box = styled.div`
  box-sizing: border-box;
  min-width: 0;
  ${system}
`;

export const Flex = styled(Box)`
  display: flex;
`;

export const Text = styled.span`
  box-sizing: border-box;
  ${system}
`;

export const Heading = forwardRef(({ as: Comp = "h2", ...props }, ref) => (
  <Comp ref={ref} {...props} />
));

const OutlineBtn = forwardRef((props, ref) => (
  <button type="button" ref={ref} {...props} />
));

export const Button = { Outline: OutlineBtn };

export const Input = forwardRef((props, ref) => <input ref={ref} {...props} />);

export function Modal({ isOpen, onDismiss, children, ...rest }) {
  return (
    <Dialog
      isOpen={Boolean(isOpen)}
      onDismiss={onDismiss ?? (() => {})}
      {...rest}
    >
      {children}
    </Dialog>
  );
}

export function QR({ value, size = 128, bgColor = "#ffffff", fgColor = "#000000", ...rest }) {
  return (
    <QRCodeSVG
      value={value || ""}
      size={Number(size) || 128}
      bgColor={bgColor}
      fgColor={fgColor}
      {...rest}
    />
  );
}

export const Loader = forwardRef(function Loader(
  { children, color, disabled, size = 24, className, ...rest },
  ref
) {
  const px = typeof size === "number" ? `${size}px` : String(size);
  return (
    <span
      ref={ref}
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        color: color || "currentColor",
        opacity: disabled ? 0.6 : 1,
      }}
      {...rest}
    >
      <span
        aria-hidden
        style={{
          width: px,
          height: px,
          border: "2px solid rgba(255,255,255,0.2)",
          borderTopColor: "currentColor",
          borderRadius: "50%",
          animation: "ui-spin 0.75s linear infinite",
          flexShrink: 0,
        }}
      />
      {children}
    </span>
  );
});

export function Blockie({ seed, ...props }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.innerHTML = "";
    const icon = blockies.create({
      seed: String(seed),
      size: 8,
      scale: 4,
    });
    el.appendChild(icon);
  }, [seed]);
  return <span ref={ref} {...props} />;
}
