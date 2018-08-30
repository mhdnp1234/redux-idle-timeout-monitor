export const LAST_USER_INTERACTION_TIMESTAMP = 'LAST_USER_INTERACTION_TIMESTAMP';
export const ON_USER_INTERACTION = 'app/IdleMonitor/ON_USER_INTERACTION';
export const MONITOR_TIMEOUT = 'app/IdleMonitor/MONITOR_TIMEOUT';

export function onInteraction() {
    return {
        type: ON_USER_INTERACTION,
    };
}

export function monitorTimeout() {
    return {
        type: MONITOR_TIMEOUT,
    };
}

export const eventList = [
    'mousemove',
    'keydown',
    'wheel',
    'DOMMouseScroll',
    'mouseWheel',
    'mousedown',
    'touchstart',
    'touchmove',
    'MSPointerDown',
    'MSPointerMove',
];

/**
 * returns redux middleware for idle timeout feature
 * @param {number} timeout in miliseconds
 * @param {Function} logout function that issue logout action type
 */
export default function createIdleMonitorReduxMiddleware(timeout, logout) {

    return (store) => {
        eventList.map((eventName) => document.addEventListener(eventName, () => {
            store.dispatch(onInteraction());
        }));
        setInterval(() => {
            store.dispatch(monitorTimeout());
        }, 60000);

        // return function that has action in argument
        return (next) => {

            return (action) => {
                switch (action.type) {
                    case ON_USER_INTERACTION: {
                        localStorage.setItem(LAST_USER_INTERACTION_TIMESTAMP, Date.now());
                        break;
                    }
                    case MONITOR_TIMEOUT: {
                        const lastUserInteractionTimestamp = localStorage.getItem(LAST_USER_INTERACTION_TIMESTAMP);
                        const timeElapsed = Date.now() - lastUserInteractionTimestamp;
                        if (timeElapsed >= timeout) {
                            store.dispatch(logout());
                        }
                        break;
                    }
                    default:
                }
                next(action);
            };
        };
    };
}

