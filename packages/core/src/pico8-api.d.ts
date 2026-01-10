/**
 * PICO-8 v0.2.7 Global API Type Definitions
 *
 * To use these global types in your project, add this to your tsconfig.json:
 * {
 *   "compilerOptions": {
 *     "types": ["jspicl/pico8-api"]
 *   }
 * }
 *
 * Or include it directly:
 * {
 *   "include": ["node_modules/jspicl/dist/pico8-api.d.ts"]
 * }
 */

declare global {
  // ===== Graphics =====
  function cls(col?: number): void;
  function camera(x?: number, y?: number): void;
  function clip(x?: number, y?: number, w?: number, h?: number): void;
  function pset(x: number, y: number, col?: number): void;
  function pget(x: number, y: number): number;
  function spr(
    n: number,
    x: number,
    y: number,
    w?: number,
    h?: number,
    flip_x?: boolean,
    flip_y?: boolean
  ): void;
  function map(
    cel_x: number,
    cel_y: number,
    sx: number,
    sy: number,
    cel_w: number,
    cel_h: number,
    layer?: number
  ): void;
  function mget(x: number, y: number): number;
  function mset(x: number, y: number, val: number): void;
  function line(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: number
  ): void;
  function circ(x: number, y: number, r: number, col?: number): void;
  function circfill(x: number, y: number, r: number, col?: number): void;
  function rect(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: number
  ): void;
  function rectfill(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: number
  ): void;
  function rrect(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    r: number,
    col?: number
  ): void;
  function rrectfill(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    r: number,
    col?: number
  ): void;
  function oval(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: number
  ): void;
  function ovalfill(
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    col?: number
  ): void;
  function pal(c0?: number, c1?: number, p?: number): void;
  function palt(col?: number, t?: boolean): void;
  function fillp(pattern?: number): void;
  function color(col?: number): void;
  function cursor(x: number, y: number, col?: number): void;
  function print(
    str: string | number,
    x?: number,
    y?: number,
    col?: number
  ): void;

  // ===== Tables =====
  function add(tbl: any[], val: any, index?: number): any[];
  function del(tbl: any[], val: any): any;
  function deli(tbl: any[], index: number): any;
  function count(tbl: any[]): number;
  function all(tbl: any[]): any[];
  function foreach(tbl: any[], fn: (item: any) => void): void;

  // ===== Input =====
  function btn(i?: number, p?: number): boolean | number;
  function btnp(i?: number, p?: number): boolean | number;

  // ===== Audio =====
  function music(n?: number, fade_len?: number, channel_mask?: number): void;
  function sfx(
    n: number,
    channel?: number,
    offset?: number,
    length?: number
  ): void;

  // ===== Memory =====
  function peek(addr: number): number;
  function peek2(addr: number): number;
  function peek4(addr: number): number;
  function poke(addr: number, val: number): void;
  function poke2(addr: number, val: number): void;
  function poke4(addr: number, val: number): void;
  function memcpy(dest: number, source: number, len: number): void;
  function memset(dest: number, val: number, len: number): void;
  function reload(
    dest: number,
    source: number,
    len: number,
    filename?: string
  ): void;
  function cstore(
    dest: number,
    source: number,
    len: number,
    filename?: string
  ): void;

  // ===== Cart Data =====
  function cartdata(id: string): boolean;
  function dset(index: number, value: number): void;
  function dget(index: number): number;

  // ===== Strings =====
  function chr(...codes: number[]): string;
  function ord(str: string, index?: number): number;
  function sub(str: string, start: number, end?: number): string;
  function tonum(val: any, format?: number): number | undefined;
  function tostr(val: any, hex?: boolean): string;

  // ===== Math =====
  function max(x: number, y: number): number;
  function min(x: number, y: number): number;
  function mid(x: number, y: number, z: number): number;
  function flr(x: number): number;
  function abs(x: number): number;
  function sgn(x: number): number;
  function sqrt(x: number): number;
  function sin(x: number): number;
  function cos(x: number): number;
  function atan2(dx: number, dy: number): number;
  function rnd(x?: number): number;
  function srand(seed: number): void;
  function band(x: number, y: number): number;
  function bor(x: number, y: number): number;
  function bxor(x: number, y: number): number;
  function bnot(x: number): number;
  function shl(x: number, n: number): number;
  function shr(x: number, n: number): number;
  function rotl(x: number, n: number): number;
  function rotr(x: number, n: number): number;

  // ===== System =====
  function run(): void;
  function stop(): void;
  function resume(): void;
  function reset(): void;
  function load(filename: string, breadcrumb?: string, param?: string): void;
  function save(filename: string): void;
  function stat(id: number): number | string;
  function menuitem(index: number, label?: string, callback?: () => void): void;
  function printh(str: string, filename?: string, overwrite?: boolean): void;

  // ===== Callbacks =====
  function _init(): void;
  function _update(): void;
  function _update60(): void;
  function _draw(): void;
}

export {};
