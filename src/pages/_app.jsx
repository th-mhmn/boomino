import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

import "../styles/globals.css";
import Main from "@/components/Main";

export default function Home() {
  return (
    <div className={"w-screen h-screen flex justify-center items-center"}>
      <Main />
    </div>
  );
}
