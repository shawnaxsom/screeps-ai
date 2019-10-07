const spawnWorkers = require("spawn-workers");

const workerStrategies = {
    "builder": require("builder"),
    "rcl-worker": require("rcl-worker"),
    "spawn-worker": require("spawn-worker"),
    "warrior": require("warrior")
}

let swarmStrategy = null;
// swarmStrategy = "builder";

module.exports.loop = () => {
    let numberOfCreeps = 0;
    
    for (const creepName in Game.creeps) {
        // console.log("====== Handling creep", creepName);
        numberOfCreeps += 1;
        const creep = Game.creeps[creepName];
        const strategies = [
            workerStrategies[swarmStrategy || Memory.creeps[creepName].role] || workerStrategies["rcl-worker"],
            ...Object.values(workerStrategies)
        ];
        
    
        const strategy = strategies.find(s => s.canExecute(creep));
        strategy.execute(creep);
    }
    
    if (numberOfCreeps < 10) {
        let role;
        const num = Math.random();
        if (num < 0.3) {
            role = "spawn-worker";
        } else if (num < 0.6) {
            role = "rcl-worker";
        } else if (num < 0.8) {
            role = "warrior";
        } else {
            role = "builder";
        }
        
        spawnWorkers.spawnCreep(role);
    }
}

const numberOfCreeps = () => {
    let numberOfCreeps = 0;
    
    for (const creepName in Game.creeps) {
        numberOfCreeps += 1;
    }
    
    return numberOfCreeps;
}

