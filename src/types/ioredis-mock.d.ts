declare module "ioredis-mock" {
	interface RedisStatic {
		new(port?: number, host?: string, options?: any): any;
	}

	var IORedis: RedisStatic;
	export = IORedis;
}
