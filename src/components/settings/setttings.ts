import jss from 'jss'
import preset from "jss-preset-default"

jss.setup(preset())

export class Settings {
  settings: HTMLElement

  constructor() {
    let body = document.body;
    let settingsNode = body.querySelector(".be-settings");

    let customStyleElement = document.createElement("style")

    // 未设定.be-setings
    let haveBiliEvolved = settingsNode !== null
    if (!haveBiliEvolved) {
      let styles = {
        "be-settings": {
          lineHeight: "normal",
          fontSize: "12px",
          "--panel-height": "calc(100vh - 120px)",
        },
        sidebar: {
          position: "fixed",
          top: "50%",
          zIndex: "1002",
          transform:
            "translateX(calc(-50% * var(--direction))) translateY(-50%)",
          left: "0",
          "--direction": "1",
          "& > div": {
            width: "26px",
            borderRadius: "21px !important",
            transform: "translateX(calc(-13px * var(--direction))) !important",
            display: "flex",
            justifyContent: "flex-end !important",
            marginBottom: "26px",
            transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
            cursor: "pointer",
            "-webkit-tap-highlight-color": "transparent",
            height: "26px",
            padding: "8px",
            boxSizing: "content-box",
            backgroundColor: "rgba(255, 255, 255, 0.6666666667)",
            position: "relative",

            "&:hover": {
              width: "52px !important",
              transition: "transform 0.3s ease-out, opacity 0.3s ease-out",
            },

            "& > i": {
              "--size": "26px",
              fontSize: "26px",
              color: "#888",
              fill: "#888",
              transition: "0.2s ease-out !important",
              stroke: "inherit",
              fontStyle: "normal",
              lineHeight: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "var(--size)",
              height: "var(--size)",
            },
          },
        },
      };

      const { classes } = jss.createStyleSheet(styles).attach();

      let beSettingsNode = document.createElement("div");
      beSettingsNode.className = classes["be-settings"];

      let sideBarNode = document.createElement("div")
      sideBarNode.className = classes.sidebar

      let buttonItem = document.createElement("div")
      buttonItem.setAttribute(
        "style",
        `width: 52px !important;
border-radius: 21px !important;
transform: translateX(calc(-13px * var(--direction))) !important;
display: flex !important;
justify-content: flex-end !important;
margin-bottom: 26px;
transition: transform 0.3s ease-out, opacity 0.3s ease-out;
cursor: pointer;
-webkit-tap-highlight-color: transparent;
width: 26px;
height: 26px;
padding: 8px;
box-sizing: content-box;
background-color: rgba(255, 255, 255, 0.6666666667);
border-radius: 50%;
position: relative;`
      );

      let iconItem = document.createElement("i")
      iconItem.innerHTML = `<div class="custom-icon" style="display: flex">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    style="--size: 26px; color: inherit; fill: inherit; stroke: inherit; stroke-width: 0; width: var(--size); height: var(--size);"
  >
    <path 
      d="M27,7.35l-9-5.2a4,4,0,0,0-4,0L5,7.35a4,4,0,0,0-2,3.46V21.19a4,4,0,0,0,2,3.46l9,5.2a4,4,0,0,0,4,0l9-5.2a4,4,0,0,0,2-3.46V10.81A4,4,0,0,0,27,7.35Zm-11.74-3a1.51,1.51,0,0,1,1.5,0l8.49,4.9L16,14.56,6.76,9.22Zm-9,18.17a1.51,1.51,0,0,1-.75-1.3v-9.8l9.24,5.33V27.39Zm19.48,0-8.49,4.9V16.72l9.24-5.33v9.8A1.51,1.51,0,0,1,25.74,22.49Z"
      style="fill: inherit; stroke: inherit; stroke-width: 0;"
    ></path>
  </svg>
</div>`;

      buttonItem.appendChild(iconItem)
      buttonItem.addEventListener("click", () => {
        let panel = document.querySelector(".be-popup.widgets-panel-popup")
        panel.classList.remove("closed")
      })

      sideBarNode.appendChild(buttonItem)
      beSettingsNode.appendChild(sideBarNode);
      body.appendChild(beSettingsNode);

      settingsNode = body.querySelector(".be-settings")

      body.append(customStyleElement)
    }

    this.settings = settingsNode as HTMLElement
  }
}