const onData = (socket, io, players) => {
    if (!socket) {
        throw new Error('io and data are required');
    }
    socket.on('sendOrange', ({ data, sendTo, from }) => {
        try {

            if (!data || !from) {
                throw new Error('data, sendTo, and from are required');
            }

            if (sendTo === 0) {
                sendTo = getMaxNumber();
            }
            if (sendTo > getMaxNumber()) {
                sendTo = getminNumber();
            }

            const targetPlayerId = Object.keys(players).find(
                (id) => players[id].number === sendTo
            );

            if (!targetPlayerId) {
                throw new Error('Player with number', sendTo, 'not found');
            }
            console.log(data)
            io.to(targetPlayerId).emit('receiveOrange', { data, from });
        }
        catch (err) {
            console.log(err);
        }
    });
    const getMaxNumber = () => {
        const numbers = Object.values(players).map(player => player.number);
        return Math.max(...numbers);
    };
    const getminNumber = () => {
        const numbers = Object.values(players).map(player => player.number);
        return Math.min(...numbers);
    };

};

const orangeFully = (socket,io,players) => {
    socket.on('orangeFully',(data)=>{
        console.log(data);
        const targetPlayerId = Object.keys(players).find(
          (id) => players[id].number === data.from
        )
        if(data){
          io.to(targetPlayerId).emit('orangeFully',data);
        }
      })
}


module.exports = { onData ,orangeFully};