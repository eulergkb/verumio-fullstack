import { Rectangle } from "./rectangle";

export class CreateRectangle implements Rectangle {
    height: number;
    width: number;
    x: number;
    y: number;

    constructor(x: number, y: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }
}