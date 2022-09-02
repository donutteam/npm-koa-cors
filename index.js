//
// Type Definitions
//

/**
 * @typedef {Object} CrossOriginRequestSharingMiddlewareOptions
 * @property {Array<String>} [allowCredentialsOrigins] A list of origins that can submit credentials.
 */

//
// Middleware
//

/**
 * A class for creating Koa middlewares that allow cross origin requests from Donut Team domains.
 */
export class CrossOriginRequestSharingMiddleware
{
	/**
	 * The middleware function.
	 * 
	 * @type {import("koa").Middleware}
	 */
	execute;

	/**
	 * Constructs a new CrossOriginRequestSharingMiddleware.
	 *
	 * @param {CrossOriginRequestSharingMiddlewareOptions} options Options for the middleware.
	 * @author Loren Goodwin
	 */
	constructor(options)
	{
		this.execute = async (context, next) =>
		{
			//
			// Get Request Origin
			//

			const origin = context.request.get("Origin");

			//
			// Set Vary on Origin Header
			//

			context.response.vary("Origin");

			//
			// Set CORS Headers
			//

			if (options?.allowCredentialsOrigins?.indexOf(origin) != -1)
			{
				context.response.set("Access-Control-Allow-Credentials", "true");
				context.response.set("Access-Control-Allow-Origin", origin);
			}
			else
			{
				context.response.set("Access-Control-Allow-Credentials", "false");
				context.response.set("Access-Control-Allow-Origin", "*");
			}

			//
			// Preflight Request Response
			//

			if (context.method == "OPTIONS")
			{
				context.response.set("Access-Control-Allow-Headers", context.request.get("Access-Control-Request-Headers"));
				context.status = 204;
				return;
			}

			//
			// Execute Next Middleware
			//

			await next();
		};
	}
}