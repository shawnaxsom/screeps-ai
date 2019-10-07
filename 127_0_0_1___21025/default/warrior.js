const pathing = require("pathing");

const canExecute = (creep) => {
    return true;
}

const execute = (creep) => {
    if (canExecute(creep)) {
        const goFight = () => {
            console.log("goFight");
            const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(target) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        };
        
        const goBuild = () => {
            // console.log("goBuild");
            const source = creep.pos.findClosestByRange(FIND_MY_CONSTRUCTION_SITES)
            if (creep.build(source, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
        
        if (_.sum(creep.carry) === creep.carryCapacity) {
            goFight();
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