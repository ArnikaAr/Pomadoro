function EventBus() {
    this.eventCallbackPairs = {};
}

EventBus.prototype.subscribe = function (type, callback) {
    var eventCallbackPair = this.eventCallbackPairs[type];

    if (eventCallbackPair) {
        eventCallbackPair.push(callback);
    } else {
        this.eventCallbackPairs[type] = [callback];
    }

};

EventBus.prototype.post = function (type, data) {
    var eventCallbackPair = this.eventCallbackPairs[type];

    if (!eventCallbackPair) {
        console.error("There is no matching event type!");
        return;
    }

    eventCallbackPair.forEach(function (callback) {
        callback(data);
    })

};


module.exports = new EventBus();