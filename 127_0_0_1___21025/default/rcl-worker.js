const canExecute = (creep) => {
    return true;
}

const execute = (creep) => {
    if (_.sum(creep.carry) === creep.carryCapacity) {
        // console.log("creepName", creepName.substr(creepName.length - 1));
        if (creep.transfer(creep.room.controller, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
            creep.moveTo(creep.room.controller);
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