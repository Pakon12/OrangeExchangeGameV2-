const oranges = ['orangeA', 'orangeB', 'orangeC', 'orangeD', 'orangeE', 'orangeF'];

function getRandomOrange(number) {
    switch (number) {
        case 1:
            return { orangeP1: oranges[1], orangeP2: oranges[1] ,showOrange: 2 ,position: null};
        case 2:
            return { orangeP1: oranges[0], orangeP2: oranges[0] ,showOrange: 1 ,position: "P1"};
        // case 1:
        //     return { orangeP1: oranges[3], orangeP2: oranges[2] ,showOrange: 2 ,position: null};
        // case 2:
        //     return { orangeP1: oranges[5], orangeP2: oranges[4] ,showOrange: 1 ,position: "P1"};
        case 3:
            return { orangeP1: oranges[1], orangeP2: oranges[0] ,showOrange: 2 ,position: null};
        case 4:
            return { orangeP1: oranges[2], orangeP2: oranges[3] ,showOrange: 1 ,position: "P1"};
        case 5:
            return { orangeP1: oranges[4], orangeP2: oranges[5] ,showOrange: 2 ,position: null};
        case 6:
            return { orangeP1: oranges[0], orangeP2: oranges[1] ,showOrange: 2 ,position: null};
        default:
            throw new Error(`Invalid number: ${number}`);

    }
}

module.exports = {getRandomOrange};

