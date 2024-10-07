import { Rectangle } from "../types/rectangle";
import { ReactElement, useRef, useState } from "react";
import './DrawingCanvas.css';

const RESIZE_CIRCLE_RADIUS = 8;

type DrawingCanvasProps = {
    initialRectangle: Rectangle;
    onResized: (x: number, y: number, width: number, height: number) => void
}

export function DrawingCanvas({ initialRectangle, onResized }: DrawingCanvasProps): ReactElement {

    const rectRef = useRef(null);
    const [isResizing, setIsResizing] = useState(false);
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [lastMouseX, setLastMouseX] = useState(0);
    const [lastMouseY, setLastMouseY] = useState(0);
    const [rectX, setRectX] = useState(initialRectangle.x);
    const [rectY, setRectY] = useState(initialRectangle.y);
    const [rectWidth, setRectWidth] = useState(initialRectangle.width);
    const [rectHeight, setRectHeight] = useState(initialRectangle.height);

    const handleMouseDown = (event: any) => {
        console.log("Mouse down: ", event);
        const [xCord, yCord] = [event.pageX, event.pageY];
        setLastMouseX(xCord);
        setLastMouseY(yCord);
        setIsMouseDown(true);
        setIsResizing(false);
    };

    function offsetPosition(x: number, y: number) {
        const diffX = x - lastMouseX;
        const diffY = y - lastMouseY;

        let newX = rectX;
        let newY = rectY;
        let newWidth = rectWidth;
        let newHeight = rectHeight;

        if (isResizing) {
            newWidth = Math.max(newWidth + diffX, 1);
            newHeight = Math.max(newHeight + diffY, 1);

        } else {
            newX += diffX;
            newY += diffY;
        }

        setRectX(newX);
        setRectY(newY);
        setRectWidth(newWidth);
        setRectHeight(newHeight);

        return [newX, newY, newWidth, newHeight];
    }

    const handleMouseMove = (event: any) => {
        if (isMouseDown) {
            offsetPosition(
                event.pageX,
                event.pageY
            );
            setLastMouseX(event.pageX);
            setLastMouseY(event.pageY);
        }

    };

    const handleMouseUp = (event: any) => {
        if (isMouseDown) {

            const [newX, newY, newWidth, newHeight] = offsetPosition(
                event.pageX,
                event.pageY
            );

            if(isResizing){
                onResized(newX, newY, newWidth, newHeight);
            }
        }

        setIsMouseDown(false);
        setIsResizing(false);
    };

    function handleBeginResize(event: any){
        setLastMouseX(event.pageX);
        setLastMouseY(event.pageY);
        setIsResizing(true);
        setIsMouseDown(true);
    }

    return <svg
        className="canvas-svg"
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
    >
        <rect
            ref={rectRef}
            className="rectangle"
            x={rectX}
            y={rectY}
            stroke="#ff6a00"
            strokeLinejoin="round"
            strokeWidth={5}
            fill="#000"
            onMouseDown={handleMouseDown}
            height={rectHeight}
            width={rectWidth}
        />

        <circle cx={rectX + rectWidth - (RESIZE_CIRCLE_RADIUS / 2)}
                cy={rectY + rectHeight - (RESIZE_CIRCLE_RADIUS / 2)}
                r={RESIZE_CIRCLE_RADIUS}
                onMouseDown={handleBeginResize}
                fill="#00a6ff"/>
    </svg>;
}