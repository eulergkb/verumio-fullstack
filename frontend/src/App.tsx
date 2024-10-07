import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import { DrawingCanvas } from "./components/DrawingCanvas";
import { Rectangle } from "./types/rectangle";
import * as RectangleApi from "./api/rectagle-api-client";
import { CreateRectangle } from "./types/createRectangle";

const DEFAULT_RECTANGLE: Rectangle = {
    x: 0,
    y: 0,
    width: 120,
    height: 120
};

function App() {

    const [rectangle, setRectangle] = useState<Rectangle|null>(null);

    const perimeter = useMemo(() =>
        rectangle ? 2 * (rectangle.width + rectangle.height) : 0,
        [rectangle?.width, rectangle?.height]
    );

      async function handleResized(x: number,
                                   y: number,
                                   width: number,
                                   height: number){

        const updatedRectangle = {
            x,
            y,
            width,
            height
        };

        setRectangle(updatedRectangle);

        const result = await RectangleApi.validateRectangle(
            new CreateRectangle(x,y,width,height)
        );

        if(!result.ok){
            console.error("An error occurred while validating rectangle :- ", result.getErrorMessage());
            window.alert(result.getErrorMessage());
        }
    }

    useEffect(() => {
        async function fetchRectangle() {
            const result = await RectangleApi.getRectangle();
            if (!result.ok) {
                window.alert("Failed fetching rectangle details. Will use default rectangle dimensions!");
                setRectangle(DEFAULT_RECTANGLE);
            }
            else{
                setRectangle(result.getData<Rectangle>());
            }
        }

        fetchRectangle();
    }, []);

    return (
        <div className="container">
            <header className="header">
                <h1>Rectangle Playground</h1>
                {rectangle && <>
                    <div className="property"><b>Width: </b> {rectangle.width}</div>
                    <div className="property"><b>Height: </b> {rectangle.height}</div>
                    <div className="property"><b>Perimeter: </b> {perimeter}</div>
                </>}
            </header>

            <div className="canvas">
                {rectangle ?
                    <DrawingCanvas initialRectangle={rectangle}
                                   onResized={handleResized}/> :
                    <span>Fetching rectangle...</span>
                }
            </div>
        </div>
    );
}

export default App;
