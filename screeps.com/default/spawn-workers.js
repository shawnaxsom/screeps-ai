const numberOfCreeps = () => {
    let numberOfCreeps = 0;
    
    for (const creepName in Game.creeps) {
        numberOfCreeps += 1;
    }
    
    return numberOfCreeps;
}

const spawnCreep = (creepType) => {
    return Game.spawns.Spawn1.spawnCreep([WORK, MOVE, CARRY], `${creepType}${numberOfCreeps()}`, {
        memory: {
            role: creepType
        }
    })
}

const spawnRclWorker = () => {
    spawnCreep("rcl-worker");
};

const spawnBuilder = () => { 
    spawnCreep("builder");
};

module.exports.spawnCreep = spawnCreep;
module.exports.spawnRclWorker = spawnRclWorker;
module.exports.spawnBuilder = spawnBuilder;