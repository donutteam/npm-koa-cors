# Koa Cross Origin Resource Sharing
A class for creating Koa middlewares that set CORS headers.

## Installation
Install the package with NPM:

```
npm install @donutteam/koa-cors
```

## Usage
To use this class, simply instantiate an instance and add it to your Koa stack:

```js
import Koa from "koa";

import { CrossOriginResourceSharingMiddleware } from "@donutteam/koa-cors";

const app = new Koa();

const crossOriginResourceSharingMiddleware = new CrossOriginResourceSharingMiddleware();

// Be sure to add the execute function on the instance
// and NOT the instance itself
app.use(crossOriginResourceSharingMiddleware.execute);
```

## Options
### allowCredentialsOrigins
This option is simply an array of origins that are allowed to include credentials.

```js
const crossOriginResourceSharingMiddleware = new CrossOriginResourceSharingMiddleware(
	{
		allowCredentialsOrigins:
		[
			"https://donutteam.com",
		],
	});
```

## License
[MIT](https://github.com/donutteam/koa-cors/blob/main/LICENSE.md)