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
        const box = buildBox({dimension: buildDimension({x: 0, y: 0, width: stage.width, height: stage.height})});

        expect(clipBoxToStage(box, stage)).toEqual({...box.dimension})

    });


    it('should shrink the Box if it is going out all sides of the Stage', function () {
        const box = buildBox({dimension: buildDimension({x: -5, y: -5, height: basicStage.height + 10, width: basicStage.width + 10})})

        expect(clipBoxToStage(box, basicStage)).toEqual({...box.dimension, x: 0, y: 0, height: basicStage.height, width: basicStage.width})
    });
})
