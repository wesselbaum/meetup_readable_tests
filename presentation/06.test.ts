import {describe, expect, it} from 'vitest'
import {Box, clipBoxToStage, Dimension, Stage} from "./04";

// Initiale Tests
describe('Box clip to Stage', () => {
    it('should do nothing if the Box is inside the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: 10, y: 10, height: 10, width: 10}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 10, y: 10, height: 10, width: 10})

    });

    it('should shrink the Box if it is going out top of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: 10, y: -5, height: 10, width: 10}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 10, y: 0, height: 5, width: 10})
    });

    it('should shrink the Box if it is going out right of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: 10, y: 10, height: 10, width: 21}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 10, y: 10, height: 10, width: 20})
    });

    it('should shrink the Box if it is going out bottom of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: 10, y: 10, height: 21, width: 10}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 10, y: 10, height: 20, width: 10})
    });

    it('should shrink the Box if it is going out left of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: -5, y: 10, height: 10, width: 10}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 0, y: 10, height: 10, width: 5})
    });

    it('should shrink the Box if it is going out top and right of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: 10, y: -5, height: 10, width: 21}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 10, y: 0, height: 5, width: 20})
    });

    it('should shrink the Box if it is going out top and bottom of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: 10, y: -5, height: 40, width: 10}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 10, y: 0, height: 30, width: 10})
    });

    it('should shrink the Box if it is going out top and left of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: -5, y: -5, height: 10, width: 10}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 0, y: 0, height: 5, width: 5})
    });

    it('should shrink the Box if it is going out right and bottom of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: 10, y: 10, height: 21, width: 21}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 10, y: 10, height: 20, width: 20})
    });

    it('should shrink the Box if it is going out right and left of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: -5, y: 10, height: 10, width: 40}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 0, y: 10, height: 10, width: 30})
    });

    it('should shrink the Box if it is going out bottom and left of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: -5, y: 10, height: 21, width: 10}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 0, y: 10, height: 20, width: 5})
    });

    it('should shrink the Box if it is going out top, right and bottom of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: 10, y: -5, height: 40, width: 21}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 10, y: 0, height: 30, width: 20})
    });

    it('should shrink the Box if it is going out top, bottom and left of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: -5, y: -5, height: 40, width: 10}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 0, y: 0, height: 30, width: 5})
    });

    it('should shrink the Box if it is going out right, bottom and left of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: -5, y: 10, height: 40, width: 40}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 0, y: 10, height: 20, width: 30})
    });

    it('should shrink the Box if it is going out top, right and left of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: -5, y: -5, height: 10, width: 40}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 0, y: 0, height: 5, width: 30})
    });

    it('should shrink the Box if it is going out all sides of the Stage', function () {
        const stage: Stage = {id: 'Stage', width: 30, height: 30}
        const box: Box = {id: 'Box', dimension: {x: -5, y: -5, height: 40, width: 40}, page: 1, isCurrent: false}

        expect(clipBoxToStage(box, stage)).toEqual({x: 0, y: 0, height: 30, width: 30})
    });
})
