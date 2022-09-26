export class RequestError extends Error {
    status: number;
    info: any;
  
    constructor(message: string, status: number, info: any) {
      super(message);
      this.status = status;
      this.info = info;
    }
  }
  
  type RequestOptions = {
    /**
     * If request should throw an error when status code higher than 400
     * @default true
     */
    throwOnError?: boolean;
    authenticated?: boolean;
  };
  
  /**
   * The idea of this request function is to encapsulate the implementation of API requests, to be implemented using
   * any technology needed (axios, fetch, XHR, etc).
   * @param url The Url address
   * @param method The HTTP Method for the request
   * @param data The data for methods other than 'GET'
   * @param headers Headers to pass to the backend
   * @param paramOptions Other request options
   */
  const request = async (
    url: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    data?: any,
    headers: Record<string, string> = {},
    paramOptions?: RequestOptions,
  ) => {
    const options: RequestOptions = {
      throwOnError: true,
      authenticated: false,
      ...paramOptions,
    };
    //Logs para o QA. Não remova!
    console.info(`Request ${JSON.stringify({ url, headers, body: data })}`);
  
    const response = await fetch(url, { method, body: data, headers });
  
    const responseJson = response.json();
  
    //Logs para o QA. Não remova!
    console.info(
      `Response ${JSON.stringify({
        url,
        response: await responseJson,
        status: response.status,
      })}`,
    );

    if (options.throwOnError && !response.ok) {
      throw new RequestError(
        'Error on request',
        response.status,
        await responseJson,
      );
    }
  
    return responseJson;
  };
  
  //#region JSON requests
  
  const requestJson = (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data: any, headers: any, options: any) => {
    const requestHeaders = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    };
  
    return request(
      url,
      method,
      data ? JSON.stringify(data) : undefined,
      requestHeaders,
      options,
    );
  };
  
  export const getJSON = <T>(
    url: string,
    headers?: Record<string, string>,
    options?: RequestOptions,
  ): Promise<T> => requestJson(url, 'GET', undefined, headers, options);
  
  export const postJSON = <T>(
    url: string,
    data: unknown,
    headers?: Record<string, string>,
    options?: RequestOptions,
  ): Promise<T> => requestJson(url, 'POST', data, headers, options);