import {describe, expect, it} from 'vitest'
import {Box, clipBoxToStage, Dimension, Stage} from "./04";


const basicStage: Stage = {id: 'Stage', width: 30, height: 30};
const basicDimension: Dimension = {x: 10, y: 10, height: 10, width: 10};
const basicBox: Box = {id: 'Box', dimension: basicDimension, page: 1, isCurrent: false}

describe('Box clip to Stage', () => {
    it('should do nothing if the Box is inside the Stage', function () {
        const stage: Stage = {...basicStage, id: "DifferentID"}
        const box: Box = {...basicBox}

        expect(clipBoxToStage(box, stage)).toEqual({...box.dimension})

    });

    it('should shrink the Box if it is going out top of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, y: -5}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, y: 0, height: 5})
    });

    it('should shrink the Box if it is going out right of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, width: 21}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, width: 20})
    });

    it('should shrink the Box if it is going out bottom of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, height: 21}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, height: 20})
    });

    it('should shrink the Box if it is going out left of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, x: -5}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, width: 5})
    });

    it('should shrink the Box if it is going out top and right of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, y: -5, width: 21}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, y: 0, height: 5, width: 20})
    });

    it('should shrink the Box if it is going out top and bottom of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, y: -5, height: 40}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, y: 0, height: 30})
    });

    it('should shrink the Box if it is going out top and left of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, x: -5, y: -5}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, y: 0, height: 5, width: 5})
    });

    it('should shrink the Box if it is going out right and bottom of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, height: 21, width: 21}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, height: 20, width: 20})
    });

    it('should shrink the Box if it is going out right and left of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, x: -5, width: 40}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, width: 30})
    });

    it('should shrink the Box if it is going out bottom and left of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, x: -5, height: 21}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, height: 20, width: 5})
    });

    it('should shrink the Box if it is going out top, right and bottom of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension,  y: -5, height: 40, width: 21}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, y: 0, height: 30, width: 20})
    });

    it('should shrink the Box if it is going out top, bottom and left of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, x: -5, y: -5, height: 40}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, y: 0, height: 30, width: 5})
    });

    it('should shrink the Box if it is going out right, bottom and left of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, x: -5, height: 40, width: 40}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, height: 20, width: 30})
    });

    it('should shrink the Box if it is going out top, right and left of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, x: -5, y: -5, width: 40}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, y: 0, height: 5, width: 30})
    });

    it('should shrink the Box if it is going out all sides of the Stage', function () {
        const box: Box = {...basicBox, dimension: {...basicDimension, x: -5, y: -5, height: 40, width: 40}}

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, y: 0, height: 30, width: 30})
    });
})
