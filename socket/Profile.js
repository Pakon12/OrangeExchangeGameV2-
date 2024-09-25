// Use module.exports to export in CommonJS
const { getRandomOrange } = require('./RandomOrange.js');

const emitProfile = (io, data) => {
    if (!io || !data) {
        throw new Error('io and data are required');
    }
    io.emit('profile', data);
};

const emitLength = (io, data) => {
    io.emit('length', data);
};

const upDatePlayerNumbers = (io, players) => {
    const playerIds = Object.keys(players);

    playerIds.forEach((id, index) => {
        // Update player number
        players[id].number = index + 1;
        players[id]={...players[id], ...getRandomOrange(players[id].number)}; 

        // Emit updated profile data only to the specific player
        io.to(id).emit('profile', players[id]);
    });
};


// Export the function
module.exports = {
    emitProfile, emitLength, upDatePlayerNumbers
};
