import axios, { Method, AxiosRequestConfig, AxiosResponse } from 'axios';

export class ApiRequestItems {
	protected requestConfig: AxiosRequestConfig = {};

	public url(url: string): this {
		this.requestConfig.url = url;
		return this;
	}

	public method(method: Method): this {
		this.requestConfig.method = method;
		return this;
	}

	public async send(): Promise<AxiosResponse> {
		try {
			return await axios.request(this.requestConfig);
		} catch (error) {
			if (error.response) {
				const responseData = error.response.data;
				throw new Error(
						`${this.requestConfig.method}: API Call to endpoint: "${this.requestConfig.url}" Failed with error!
						Response status code: "${error.response.status}",
						Response status text: "${error.response.statusText}",
						Response data: ${JSON.stringify(responseData)}`,
				);
			} else if (error.request) {
				throw new Error(
						`${this.requestConfig.method}: API Call to endpoint: "${this.requestConfig.url}" Failed with error!
						No response received.`,
				);
			} else {
				throw new Error(
						`${this.requestConfig.method}: API Call to endpoint: "${this.requestConfig.url}" Failed with error!
						Error message: "${error.message}".`,
				);
			}
		}
	}
}
