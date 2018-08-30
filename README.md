# redux-idle-timeout-monitor 

Redux [middleware](http://redux.js.org/docs/advanced/Middleware.html) 
for monitoring user's idle timeout on application.

Using this [middleware](http://redux.js.org/docs/advanced/Middleware.html) 
you can do followup functionality on timeout because this middleware will dispatch action (ex. autoLogout) that you pass at the time of configuration, So your app can handle that and do respective functionality like clear session or logout the app etc. 


## Usage

```js
import { createStore, applyMiddleware } from 'redux';
import createIdleMonitorReduxMiddleware from 'redux-idle-timeout-monitor';

// configure middleware for 10 minute timeout
const idleMonitorMiddleware = createIdleMonitorReduxMiddleware(10 * 60 * 1000, autoLogout);

export function autoLogout() {
    return {
        type: 'AUTO_LOGOUT',
    };
}
// Add middleware
const store = createStore(
  yourApp,
  applyMiddleware(idleMonitorMiddleware)
);
```
## Installation

```bash
$ npm install redux-idle-timeout-monitor
```

## License

MIT
