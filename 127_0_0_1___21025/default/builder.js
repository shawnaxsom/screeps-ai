const pathing = require("pathing");

const canExecute = (creep) => {
    return true;
}

const execute = (creep) => {
    if (canExecute(creep)) {
        const goHarvest = () => {
            console.log("goHarvest");
            const source = creep.pos.findClosestByRange(FIND_SOURCES_ACTIVE)
            if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
                // creep.moveTo(source);
                // console.log(creep.name, pathing.getOptimalPath(creep));
                pathing.goToOptimalPath(creep);
            }
        };
        
        const goBuild = () => {
            // console.log("goBuild");
            const source = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES)
            if (creep.build(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        
        console.log(JSON.stringify(Memory.creeps[creep.name].path), creep.name);
        // if (Memory.creeps[creep.name].path && Memory.creeps[creep.name].path.length > 0) {
        //     console.log("going to path:", JSON.stringify(Memory.creeps[creep.name].path), Memory.creeps[creep.name].path.length > 0)
        //     pathing.goToCurrentPath(creep);
        // } else 
        if (_.sum(creep.carry) === creep.carryCapacity) {
            goBuild();
        } else {
            goHarvest();
        }   
        
        if (Memory.creeps[creep.name].path && Memory.creeps[creep.name].path.length === 0) {
            Memory.creeps[creep.name].path = null;
        }
    }
};

module.exports.canExecute = canExecute;
module.exports.execute = execute;