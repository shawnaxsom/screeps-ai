const canExecute = (creep) => {
    const everySpawnIsFull = creep.pos.findInRange(FIND_MY_SPAWNS, 30)
        .every(spawn => spawn.energy === spawn.energyCapacity);
    return !everySpawnIsFull;
}

const execute = (creep) => {
    if (_.sum(creep.carry) === creep.carryCapacity) {
        let source = creep.pos.findClosestByRange(FIND_MY_SPAWNS);
        if (source.energy === source.energyCapacityAvailable) {
            source = creep.pos.findInRange(FIND_MY_SPAWNS, 30).filter(spawn => spawn.energy !== spawn.energyCapacity)[0];
        }
        
        if (source) {
            const result = creep.transfer(source, RESOURCE_ENERGY);
            if (result === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
    } else {
        const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
        if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
    }
};

module.exports.canExecute = canExecute;
module.exports.execute = execute;