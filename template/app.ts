import { DinoSsr } from "@ssr/dinossr";

const dir = new URL('./src', import.meta.url).pathname;
const dinossr = new DinoSsr(dir, {
    static: new URL('./static', import.meta.url).pathname
});
await dinossr.init();