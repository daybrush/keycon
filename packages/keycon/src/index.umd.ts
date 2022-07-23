import keycon, * as others from "./index";

for (const name in others) {
    (keycon as any)[name] = (others as any)[name];
}
export default keycon;
