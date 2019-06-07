import keycon, { getKey, getCombi } from "./KeyController";

(keycon as any).getKey = getKey;
(keycon as any).getCombi = getCombi;

export default keycon;
