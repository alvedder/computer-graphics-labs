import {saveAs} from "file-saver";
import OBJFile from "obj-file-parser";

export function createImage(name = "image", width = 200, height = 200) {
    const canvas = document.createElement("canvas");
    canvas.className = "image";
    canvas.width = width;
    canvas.height = height;

    document
        .getElementById("image-container")
        .insertAdjacentElement("beforeend", canvas);

    canvas.addEventListener("click", () => {
        const dataURL = canvas.toDataURL();
        saveAs(dataURL, `${name}.png`)
    });

    return canvas;
}

export function drawStar(lineDrawer, x0 = 100, y0 = 100, length = 95) {
    for (let i = 0; i <= 12; ++i) {
        const alpha = 2 * 3.14 * i / 13;
        lineDrawer
            .drawLine(x0, y0, x0 + length * Math.cos(alpha), y0 + length * Math.sin(alpha));
    }
}

export function prepareObjFileUploading(handleParsedObjFile) {
    const objFileInput = document.getElementById("obj-file-input");
    const objFileSubmit = document.getElementById("obj-file-submit");
    const fileReader = new FileReader();
    fileReader.onload = (fileLoadedEvent) => {
        const fileContent = fileLoadedEvent.target.result;
        const objFile = new OBJFile(fileContent);
        const parsedObjFile = objFile.parse();
        // console.log(parsedObjFile);
        handleParsedObjFile(parsedObjFile);
    };

    objFileSubmit.addEventListener("click", () => {
        fileReader.readAsText(objFileInput.files[0], "UTF-8");
    });
}
