module.exports.getOptimalPath = (creep) => {
  let goals = _.map(creep.room.find(FIND_SOURCES), function(source) {
    // We can't actually walk on sources-- set `range` to 1 
    // so we path next to it.
    return { pos: source.pos, range: 1 };
  });

  let ret = PathFinder.search(
    creep.pos, goals,
    {
      // We need to set the defaults costs higher so that we
      // can set the road cost lower in `roomCallback`
      plainCost: 2,
      swampCost: 10,

      roomCallback: function(roomName) {

        let room = Game.rooms[roomName];
        // In this example `room` will always exist, but since 
        // PathFinder supports searches which span multiple rooms 
        // you should be careful!
        if (!room) return;
        let costs = new PathFinder.CostMatrix;

        room.find(FIND_STRUCTURES).forEach(function(struct) {
          if (struct.structureType === STRUCTURE_ROAD) {
            // Favor roads over plain tiles
            costs.set(struct.pos.x, struct.pos.y, 1);
          } else if (struct.structureType !== STRUCTURE_CONTAINER &&
                     (struct.structureType !== STRUCTURE_RAMPART ||
                      !struct.my)) {
            // Can't walk through non-walkable buildings
            costs.set(struct.pos.x, struct.pos.y, 0xff);
          }
        });

        // Avoid creeps in the room
        room.find(FIND_CREEPS).forEach(function(creep) {
          costs.set(creep.pos.x, creep.pos.y, 0xff);
        });

        return costs;
      },
    }
  );
  
  return ret.path;
}

module.exports.goToCurrentPath = (creep) => {
    const pos = Memory.creeps[creep.name].path.shift();
    const roomPosition = new RoomPosition(pos.x, pos.y, pos["roomName"]);
    const direction = creep.pos.getDirectionTo(roomPosition);
    creep.move(direction);
    
    if (Memory.creeps[creep.name].path.length === 0) {
        Memory.creeps[creep.name].path = null;
    }
}

module.exports.goToOptimalPath = (creep) => {
    if (!Memory.creeps[creep.name].path || Memory.creeps[creep.name].path.length === 0) {
        Memory.creeps[creep.name].path = module.exports.getOptimalPath(creep);
    }
    module.exports.goToCurrentPath(creep);
}