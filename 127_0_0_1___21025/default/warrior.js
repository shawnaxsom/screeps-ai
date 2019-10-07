const pathing = require("pathing");

const canExecute = (creep) => {
    return true;
}

const execute = (creep) => {
    if (canExecute(creep)) {
        const goFight = () => {
            // console.log("goFight");
            const target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            if(target) {
                if(creep.attack(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target);
                }
            }
        };

        goFight();
    }
};

module.exports.canExecute = canExecute;
module.exports.execute = execute;