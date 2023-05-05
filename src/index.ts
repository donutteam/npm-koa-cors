//
// Imports
//

import type { Middleware } from "koa";

//
// Middleware
//

export interface CrossOriginResourceSharingMiddlewareOptions
{
	/** A list of origins that can submit credentials. */
	allowCredentialsOrigins?: string[];
}

/** A class for creating Koa middlewares that allow cross origin requests from Donut Team domains.*/
export class CrossOriginResourceSharingMiddleware
{
	/** A list of origins that can submit credentials. */
	allowCredentialsOrigins : string[];

	/** The middleware function. */
	execute : Middleware;

	/**
	 * Constructs a new CrossOriginRequestSharingMiddleware.
	 * 
	 * @author Loren Goodwin
	 */
	constructor(options : CrossOriginResourceSharingMiddlewareOptions)
	{
		this.allowCredentialsOrigins = options?.allowCredentialsOrigins ?? [];

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

			if (this.allowCredentialsOrigins?.indexOf(origin) != -1)
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
				context.response.status = 204;
				return;
			}

			//
			// Execute Next Middleware
			//

			await next();
		};
	}
}