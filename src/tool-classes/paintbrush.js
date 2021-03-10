import {Color} from "../models/color";
import {random, round} from "mathjs";

export class Paintbrush {

    constructor(ctx,
                defaultBackgroundColor = new Color(0, 0, 0),
                defaultColor = new Color(255, 255, 255)) {
        this.setNewContext(ctx);
        this.defaultBackgroundColor = defaultBackgroundColor;
        this.defaultColor = defaultColor;
    }

    setNewContext(ctx) {
        this.ctx = ctx;
        ctx.imageSmoothingEnabled = false;
        this.imageData = ctx.getImageData(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight);
        return this;
    }

    fill(color = this.defaultBackgroundColor) {
        for (let y = 0; y < this.imageData.height; y++) {
            for (let x = 0; x < this.imageData.width; x++) {
                this.setPixel(x, y, color);
            }
        }
        return this;
    }

    grayscale() {
        for (let y = 0; y < this.imageData.height; y++) {
            for (let x = 0; x < this.imageData.width; x++) {
                const pixelData = this.ctx.getImageData(x, y, x + 1, y + 1);
                const averageColorValue = (pixelData.data[0] + pixelData.data[1] + pixelData.data[2]) / 3;
                this.setPixel(x, y, new Color(averageColorValue, averageColorValue, averageColorValue));
            }
        }
        return this;
    }

    gradient() {
        for (let y = 0; y < this.imageData.height; y++) {
            for (let x = 0; x < this.imageData.width; x++) {
                const value = (x + y) % this.imageData.width;
                this.setPixel(x, y, {r: value, g: value, b: value, a: 255})
            }
        }
        return this;
    }

    setPixel(x, y, color = this.defaultColor) {
        const pixel = this.ctx.createImageData(1, 1)
        pixel.data[0] = color.r;
        pixel.data[1] = color.g;
        pixel.data[2] = color.b;
        pixel.data[3] = color.a;
        this.ctx.putImageData(pixel, round(x), round(y));
        return this;
    }

    static getRandomColor() {
        const getRandomColorComponent = () => random(256);
        return new Color(
            getRandomColorComponent(),
            getRandomColorComponent(),
            getRandomColorComponent()
        )
    }
}