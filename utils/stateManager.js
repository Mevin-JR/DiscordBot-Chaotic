// A simple state manager to keep track of dragged users and intervals.
const state = new Map();

/**
 * structure in the Map:
 * key (userId) -> value: {
 *   originalChannelId: string,
 *   intervalId: NodeJS.Timeout,
 *   guildId: string
 * }
 */

module.exports = {
    get(userId) {
        return state.get(userId);
    },
    set(userId, data) {
        state.set(userId, data);
    },
    remove(userId) {
        state.delete(userId);
    },
    has(userId) {
        return state.has(userId);
    }
};
