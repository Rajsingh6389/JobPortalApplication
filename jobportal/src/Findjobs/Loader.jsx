import React from "react";
import styled from "styled-components";

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="pl">
        {Array.from({ length: 12 }).map((_, i) => (
          <div className="pl__dot" key={i} />
        ))}

        <div className="pl__text">Loading...</div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  /* FULL SCREEN CENTER */
  width: 100%;
  height: 100%;

  /* COLOR VARIABLES */
  --bg: #1b1b1b;
  --primary1: #ffcc33;
  --primary2: #ffe07a;
  --fg-t: rgba(0, 0, 0, 0.4);

  /* RESPONSIVE SCALE */
  @media (max-width: 480px) {
    .pl {
      transform: scale(0.7) rotateX(30deg) rotateZ(45deg); /* shrink on small screens */
    }
  }

  @media (max-width: 360px) {
    .pl {
      transform: scale(0.55) rotateX(30deg) rotateZ(45deg);
    }
  }

  .pl {
    width: 14em;
    height: 14em;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    text-transform: uppercase;
    letter-spacing: 0.12em;

    box-shadow: 
      2em 0 2em rgba(0, 0, 0, 0.2) inset,
      -2em 0 2em rgba(255, 255, 255, 0.1) inset;

    border-radius: 50%;

    /* preserve original tilt */
    transform: rotateX(30deg) rotateZ(45deg);
  }

  .pl__dot {
    position: absolute;
    width: 1.6em;
    height: 1.6em;
    border-radius: 50%;
    top: calc(50% - 0.8em);
    left: calc(50% - 0.8em);

    box-shadow:
      0.1em 0.1em 0 0.1em black,
      0.3em 0 0.3em rgba(0, 0, 0, 0.5);

    animation-name: shadow724;
    animation-duration: 2s;
    animation-iteration-count: infinite;
  }

  /* BEFORE & AFTER DOTS */
  .pl__dot:before,
  .pl__dot:after {
    content: "";
    position: absolute;
    width: inherit;
    left: 0;
    display: block;
    animation-duration: 2s;
    animation-iteration-count: infinite;
    transition: background-color 0.2s ease;
  }

  .pl__dot:before {
    height: inherit;
    border-radius: 50%;
    z-index: 1;

    background-color: var(--bg);
    box-shadow: inset 0.05em 0 0.1em rgba(255, 255, 255, 0.2);

    animation-name: pushInOut1724;
  }

  .pl__dot:after {
    height: 3em;
    bottom: 0;
    border-radius: 0.75em;

    background-color: var(--primary1);
    clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);

    box-shadow:
      inset 0.1em 0.3em 0.2em rgba(255, 255, 255, 0.4),
      inset 0 -0.4em 0.2em #2e3138,
      inset 0 -1em 0.25em rgba(0, 0, 0, 0.3);

    transform-origin: 50% 2.25em;
    transform: rotate(-45deg);

    animation-name: pushInOut2724;
  }

  /* DYNAMIC DOT POSITIONS (same as yours) */
  ${Array.from({ length: 12 })
    .map(
      (_, i) => `
    .pl__dot:nth-child(${i + 1}) {
      transform: rotate(${-(i * 30)}deg) translateX(5em) rotate(${i * 30}deg);
      animation-delay: -${(i / 6).toFixed(3)}s;
      z-index: ${i < 6 ? i : 12 - i};
    }
  `
    )
    .join("")}

  /* TEXT */
  .pl__text {
    position: relative;
    transform: rotateZ(-45deg);
    font-size: 0.8em;
    font-weight: 500;
    text-shadow: 0 0 0.1em var(--fg-t);
    color: white;
  }

  /* KEYFRAMES (unchanged) */
  @keyframes shadow724 {
    from {
      animation-timing-function: ease-in;
      box-shadow: 0.1em 0.1em 0 0.1em black, 0.3em 0 0.3em rgba(0, 0, 0, 0.3);
    }
    25% {
      animation-timing-function: ease-out;
      box-shadow: 0.1em 0.1em 0 0.1em black, 0.8em 0 0.8em rgba(0, 0, 0, 0.5);
    }
    50%, to {
      box-shadow: 0.1em 0.1em 0 0.1em black, 0.3em 0 0.3em rgba(0, 0, 0, 0.3);
    }
  }

  @keyframes pushInOut1724 {
    from { transform: translate(0, 0); }
    25%  { transform: translate(-71%, -71%); }
    50%,
    to   { transform: translate(0, 0); }
  }

  @keyframes pushInOut2724 {
    from {
      clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
    }
    25% {
      clip-path: polygon(0 25%, 100% 25%, 100% 100%, 0 100%);
    }
    50%, to {
      clip-path: polygon(0 75%, 100% 75%, 100% 100%, 0 100%);
    }
  }
`;

export default Loader;
