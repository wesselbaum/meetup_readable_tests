import {describe, expect, it} from 'vitest'
import {Box, clipBoxToStage, Dimension, Stage} from "./04";
import {fakerDE as faker} from "@faker-js/faker";


const basicStage: Stage = {
    id: faker.string.uuid(),
    width: faker.number.int({min: 0, max: 999}),
    height: faker.number.int({min: 0, max: 999})
};
const basicDimension: Dimension = {
    x: faker.number.int({min: -999, max: 999}),
    y: faker.number.int({min: -999, max: 999}),
    height: faker.number.int({min: 0, max: 1999}),
    width: faker.number.int({min: 0, max: 1999})
};
const basicBox: Box = {
    id: faker.string.uuid(),
    dimension: basicDimension,
    page: faker.number.int({min: 0, max: 9999}),
    isCurrent: false
}

const buildStage = (overrides: Partial<Stage>): Stage => ({...basicStage, ...overrides})

const buildDimension = (overrides: Partial<Dimension>): Dimension => ({...basicDimension, ...overrides})

const buildBox = (overrides: Partial<Box>): Box => ({...basicBox, ...overrides})

describe('Box clip to Stage', () => {
    it('should do nothing if the Box is inside the Stage', function () {
        const stage = buildStage({id: "DifferentID"})
        const box = buildBox({dimension: buildDimension({x: 0, y:0, width: stage.width, height: stage.height})});

        expect(clipBoxToStage(box, stage)).toEqual({...box.dimension})

    });

    it('should shrink the Box if it is going out top of the Stage', function () {
        const box = buildBox({
            dimension: buildDimension({
                y: -5,
                x: 1, // We see this is necessary, since it could become negative and this is not what we want to test
                height: basicStage.height, // We see this is necessary, since it could become larger than the stage and this is not what we want to test
                width: basicStage.width - 2 // We see this is necessary, since it could become larger than the stage and this is not what we want to test
            })
        })

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, y: 0, height: box.dimension.height - 5})
    });

    it.skip('should shrink the Box if it is going out right of the Stage', function () {
        const box = buildBox({dimension: buildDimension({x: 5, width: basicStage.width})})
        box.dimension.width = 5;

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, width: basicStage.width - 5})
    });

    it.skip('should shrink the Box if it is going out bottom of the Stage', function () {
        const box = buildBox({dimension: buildDimension({height: 21})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, height: 20})
    });

    it.skip('should shrink the Box if it is going out left of the Stage', function () {
        const box = buildBox({dimension: buildDimension({x: -5})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, width: 5})
    });

    it.skip('should shrink the Box if it is going out top and right of the Stage', function () {
        const box = buildBox({dimension: buildDimension({y: -5, width: 21})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, y: 0, height: 5, width: 20})
    });

    it.skip('should shrink the Box if it is going out top and bottom of the Stage', function () {
        const box = buildBox({dimension: buildDimension({y: -5, height: 40})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, y: 0, height: 30})
    });

    it.skip('should shrink the Box if it is going out top and left of the Stage', function () {
        const box = buildBox({dimension: buildDimension({x: -5, y: -5})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, y: 0, height: 5, width: 5})
    });

    it.skip('should shrink the Box if it is going out right and bottom of the Stage', function () {
        const box = buildBox({dimension: buildDimension({height: 21, width: 21})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, height: 20, width: 20})
    });

    it.skip('should shrink the Box if it is going out right and left of the Stage', function () {
        const box = buildBox({dimension: buildDimension({x: -5, width: 40})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, width: 30})
    });

    it.skip('should shrink the Box if it is going out bottom and left of the Stage', function () {
        const box = buildBox({dimension: buildDimension({x: -5, height: 21})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, height: 20, width: 5})
    });

    it.skip('should shrink the Box if it is going out top, right and bottom of the Stage', function () {
        const box = buildBox({dimension: buildDimension({y: -5, height: 40, width: 21})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, y: 0, height: 30, width: 20})
    });

    it.skip('should shrink the Box if it is going out top, bottom and left of the Stage', function () {
        const box = buildBox({dimension: buildDimension({x: -5, y: -5, height: 40})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, y: 0, height: 30, width: 5})
    });

    it.skip('should shrink the Box if it is going out right, bottom and left of the Stage', function () {
        const box = buildBox({dimension: buildDimension({x: -5, height: 40, width: 40})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, height: 20, width: 30})
    });

    it.skip('should shrink the Box if it is going out top, right and left of the Stage', function () {
        const box = buildBox({dimension: buildDimension({x: -5, y: -5, width: 40})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, y: 0, height: 5, width: 30})
    });

    it.skip('should shrink the Box if it is going out all sides of the Stage', function () {
        const box = buildBox({dimension: buildDimension({x: -5, y: -5, height: 40, width: 40})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, y: 0, height: 30, width: 30})
    });
})
