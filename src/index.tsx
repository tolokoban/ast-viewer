import { createRoot } from "react-dom/client";
import { App } from "./App";

function get(id: string): HTMLElement {
    const elem = document.getElementById(id)
    if (!elem) {
        throw new Error(`Unable to find element with id #${id}!`)
    }
    return elem
}

createRoot(get("root")).render(<App />);
