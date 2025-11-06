import { useState, useEffect } from "react";
import styled from "styled-components";

const Dark = () => {
  const [dark, setDark] = useState(
    () => localStorage.getItem("darkMode") === "true"
  );

  // ⚡ Applique le dark mode à <body> et le stocke
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("darkMode", dark);
  }, [dark]);

  return (
    <StyledWrapper>
      <input
        type="checkbox"
        checked={dark}
        onChange={() => setDark(!dark)}
        className="input__check"
        id="dark-toggle"
      />
      <label htmlFor="dark-toggle" className="slider" />
    </StyledWrapper>
  );
};

export default Dark;

const StyledWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 3.5em;
  height: 2em;

  .input__check {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fdfefedc;
    border-radius: 30px;
    transition: 0.4s;
  }

  .slider::before {
    content: "";
    position: absolute;
    height: 1.4em;
    width: 1.4em;
    left: 0.3em;
    bottom: 0.35em;
    border-radius: 50%;
    background-color: #ff99fd;
    transition: 0.4s;
  }

  .input__check:checked + .slider {
    background-color: #17202a;
  }

  .input__check:checked + .slider::before {
    transform: translateX(1.5em);
  }
`;
