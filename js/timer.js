// All credit to users Bergi and Leon Williams on StackOverflow

/**
 * Self-adjusting interval to account for drifting
 *
 * @param {function} workFunc  Callback containing the work to be done
 *                             for each interval
 * @param {int}      interval  Interval speed (in milliseconds) - This
 * @param {function} errorFunc (Optional) Callback to run if the drift
 *                             exceeds interval
 */
function AdjustingInterval(workFunc, interval, errorFunc) {
    var that = this;
    var expected, timeout;
    this.interval = interval;
    this.running = false;

    this.start = function() {
        if (this.running)
            this.stop();
        this.running = true;
        expected = Date.now() + this.interval;
        timeout = setTimeout(step, this.interval);
    };

    this.stop = function() {
        this.running = false;
        clearTimeout(timeout);
    };

    function step() {
        var drift = Date.now() - expected;
        if (drift > that.interval) {
            // You could have some default stuff here too...
            if (errorFunc) errorFunc();
        }
        workFunc();
        expected += that.interval;
        timeout = setTimeout(step, Math.max(0, that.interval-drift));
    }
}