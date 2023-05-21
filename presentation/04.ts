export interface Dimension {
    x: number,
    y: number,
    width: number,
    height: number
}

export interface Box {
    id: string,
    page: number,
    isCurrent: boolean,
    dimension: Dimension
}

export interface Stage {
    id: string,
    width: number,
    height: number
}

export const clipBoxToStage = (
    box: Box,
    stage: Stage
): Dimension => {
    let heightDiff = 0;
    let widthDiff = 0;
    let y = box.dimension.y;
    let x = box.dimension.x;
    let width = box.dimension.width;
    let height = box.dimension.height;

    if (box.dimension.y < 0) {
        heightDiff = box.dimension.y;
        y = 0;
    }

    if (box.dimension.x < 0) {
        widthDiff = box.dimension.x;
        x = 0;
    }

    const boundingBoxRightSide =
        box.dimension.x + box.dimension.width;
    const boundingBoxBottomSide =
        box.dimension.y + box.dimension.height;

    if (boundingBoxRightSide > stage.width) {
        const rightSideDiff = stage.width - boundingBoxRightSide;
        widthDiff += rightSideDiff;
    }

    if (boundingBoxBottomSide > stage.height) {
        const bottomSideDiff = stage.height - boundingBoxBottomSide;
        heightDiff += bottomSideDiff;
    }

    width = width + widthDiff;
    height = height + heightDiff;
    return { y, x, width, height };
};