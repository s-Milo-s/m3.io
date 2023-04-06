import { useState, useRef, useEffect } from "react";
import "./Home.css";
function Home(props) {
  const [sunClass, setSunClass] = useState("sun-component");
  const sun = useRef(null);

  const handleClick = () => {
    if (sunClass === "sun-component") {
      setSunClass("sun-component-expanded");
      let cnt = 51;
      const increaseSunColor = setInterval(() => {
        console.log(sun.current.style.backgroundColor);
        if (cnt > 100) {
          clearInterval(increaseSunColor);
          sun.current.style.backgroundColor = `hsl(30, 100%, 100%)`;
        } else {
          sun.current.style.backgroundColor = `hsl(30, 100%, ${cnt}%)`;
        }
        cnt += 2;
      }, 20);
    } else {
      setSunClass("sun-component");
      let cnt = 100;
      const decreaseSunColor = setInterval(() => {
        console.log(sun.current.style.backgroundColor);
        sun.current.style.backgroundColor = `hsl(30, 100%, ${cnt}%)`;
        if (cnt < 51) {
          sun.current.style.backgroundColor = `hsl(30, 100%, 51%)`;
          clearInterval(decreaseSunColor);
        } else {
          sun.current.style.backgroundColor = `hsl(30, 100%, ${cnt}%)`;
        }
        cnt -= 2;
      }, 20);
    }
  };
  return (
    <div id="page-wrapper">
      <button id="testBtn" onClick={handleClick}>
        Click Me
      </button>
      <div ref={sun} className={sunClass}></div>
    </div>
  );
}

export default Home;
