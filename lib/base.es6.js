class Base {
    constructor(options) {
        this.events = {}
    }

    on(str, fn) {
        this.events[str] = fn
    }

    trigger(str, value) {
        if (this.events[str] && this.events[str] instanceof Function) this.events[str].call(this, value)
    }
}

module.exports = Base