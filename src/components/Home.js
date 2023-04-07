import { useState, useRef, useEffect } from "react";
import { Divider, Fade } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LightModeIcon from "@mui/icons-material/LightMode";
import Brightness3Icon from "@mui/icons-material/Brightness3";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import "./Home.css";
function Home(props) {
  const [firstLoad, setFirstLoad] = useState(true);
  const [sunClass, setSunClass] = useState("sun-component");
  const [darkMode, setDarkMode] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [paused, setPaused] = useState(false);
  const sun = useRef(null);
  const [heading, setheading] = useState(false);
  const [paragraph, setParagraph] = useState(false);
  const [subHeading, setSubHeading] = useState(false);
  const [icons, setIcons] = useState(false);
  useEffect(() => {
    console.log(expanded);
    setTimeout(() => {
      setheading(expanded);
    }, 500);
    setTimeout(() => {
      setSubHeading(expanded);
    }, 550);
    setTimeout(() => {
      setParagraph(expanded);
    }, 550);
    setTimeout(() => {
      setIcons(expanded);
    }, 600);
  }, [expanded]);
  const handleClick = (e) => {
    if (paused) return;
    setPaused(true);
    e.stopPropagation();
    if (darkMode) {
      if (expanded) {
        setSunClass("sun-component-dark");
        setPaused(false);
      } else {
        sun.current.style.backgroundColor = "#b65153";
        setSunClass("sun-component-dark-expanded");
        setPaused(false);
      }
    } else {
      if (sunClass === "sun-component") {
        setSunClass("sun-component-expanded");
        autoAdjustColor(`hsl(30, 100%, 51%)`, 51, 100, 0.7, sun, () => {
          setSunClass("sun-component-expanded");
          sun.current.style.backgroundColor = "hsl(30, 100%, 100%)";
          setPaused(false);
        });
      } else {
        setSunClass("sun-component");
        autoAdjustColor(`hsl(30, 100%, 100%)`, 100, 51, -0.7, sun, () => {
          setSunClass("sun-component");
          sun.current.style.backgroundColor = "#ff8003";
          setPaused(false);
        });
      }
    }
    setExpanded(!expanded);
  };
  const handleLights = () => {
    if (paused) return;
    setPaused(true);
    if (darkMode) {
      if (expanded) {
        //If turning dark mode off and and was dark expanded -> then dark to light
        autoAdjustColor("hsl(0, 38%, 100%)", 47, 100, 2, sun, () => {
          setSunClass("sun-component-expanded");
          sun.current.style.backgroundColor = "hsl(0, 38%, 100%)";
          setPaused(false);
        });
      } else {
        //If turning dark mode off and small then simply change class
        sun.current.style.backgroundColor = "#ff8003";
        sun.current.style.transition = "background-color 1s ease";
        console.log(sun.current.style);
        setSunClass(
          "sun-component",
          setTimeout(() => {
            sun.current.style.transition = "";
          }, 1000)
        );
        setPaused(false);
      }
    } else {
      if (expanded) {
        //If turning dark mode on and expanded then shade color and turn tp dark mode expanded
        autoAdjustColor("hsl(359, 41%, 100%)", 100, 52, -2, sun, () => {
          sun.current.style.backgroundColor = "#A74B4B";
          setSunClass("sun-component-dark-expanded");
          setPaused(false);
        });
      } else {
        //If turning dark mode on and small sun
        sun.current.style.backgroundColor = "#A74B4B";
        sun.current.style.transition = "background-color 1s ease";
        setSunClass(
          "sun-component-dark",
          setTimeout(() => {
            sun.current.style.transition = "";
          }, 1000)
        );
        setPaused(false);
      }
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className={darkMode ? "page-wrapper-dark" : "page-wrapper"}>
      <button id="testBtn" onClick={handleClick}>
        Click Me
      </button>
      <div className="info-section">
        <div className="info-inner-wrapper">
          <div>
            <Fade in={heading}>
              <h1 className="name">Milo Marcus</h1>
            </Fade>
          </div>
          <Fade in={heading}>
            <div className="divider"></div>
          </Fade>
          <div>
            <Fade in={subHeading}>
              <h1 className="small-header">
                {"Full Stack Engineer"}
                <br></br>
                {"& Data Enthusiast"}{" "}
              </h1>
            </Fade>
            <Fade in={paragraph}>
              <div className="p-wrapper">
                <p>
                  I'm a developer skilled at building scalable applications and
                  appealing websites with an emphasis on visualizations.
                  Passionate about creating tools that make life more wonderful.
                  <br></br>
                  Based in New York City
                </p>
              </div>
            </Fade>
            <Fade in={icons}>
              <div className="iconHolder">
                <div className="icon-wrapper">
                  <GitHubIcon className="icon" />
                </div>
                <div className="icon-wrapper">
                  <LinkedInIcon className="icon" />
                </div>
                <div className="icon-wrapper" onClick={handleLights}>
                  <Brightness3Icon className="icon" />
                </div>
                <div className="icon-wrapper" onClick={handleClick}>
                  <ArrowCircleUpIcon className="icon" />
                </div>
              </div>
            </Fade>
          </div>
          <div>
            <p></p>
          </div>
          <div></div>
        </div>
      </div>
      <div
        ref={sun}
        className={sunClass}
        onClick={!expanded ? handleLights : () => {}}
      ></div>
      <div className="test">
        <img
          className="bottomSVG-light"
          src={require("./assets/Bottom.svg").default}
        ></img>
      </div>
    </div>
  );
}
export default Home;

function autoAdjustColor(hls, start, stop, change, ref, callback) {
  let cnt = start;
  const secondComma = findSecondCommaIndex(hls);
  const NewHsl = hls.substring(0, secondComma + 1);
  const changeColor = setInterval(() => {
    // console.log(ref.current.style.backgroundColor);
    if (change < 0 ? cnt < stop : cnt > stop) {
      clearInterval(changeColor);
      ref.current.style.backgroundColor = ` ${NewHsl} ${stop}%)`;
      callback();
    } else {
      ref.current.style.backgroundColor = `${NewHsl} ${cnt}%)`;
    }
    cnt += change;
  }, 20);
}

function findSecondCommaIndex(str) {
  const firstCommaIndex = str.indexOf(",");
  if (firstCommaIndex === -1) {
    // If the string doesn't contain any comma
    return -1;
  }
  const secondCommaIndex = str.indexOf(",", firstCommaIndex + 1);
  if (secondCommaIndex === -1) {
    // If the string contains only one comma
    return -1;
  }
  return secondCommaIndex;
}
