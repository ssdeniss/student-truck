interface HttpResponse<T = any> extends Response {
  json: () => Promise<T>;
}

declare global {
  interface Window {
    _env_: {
      API_BACKEND_URL: string;
    };
  }
}

export const handleHttpErrors = (response: HttpResponse) => {
  if (!response.ok) {
    switch (response.status) {
      case 401:
      case 403:
        window.location.href = '/';
        return Promise.reject(response);
      case 400:
      case 409:
        return response
          .json()
          .then((envelope) =>
            Promise.reject({ inner: envelope.payload || envelope }),
          );
      default:
        return Promise.reject(response);
    }
  }
  return response;
};

const apiCall = async <T = any>(
  method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  endpoint: string,
  data?: any,
  // eslint-disable-next-line no-undef
  options: RequestInit = {},
): Promise<T | string | void> => {
  const response = await fetch(`${window._env_.API_BACKEND_URL}${endpoint}`, {
    method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body: data ? JSON.stringify(data) : undefined,
    ...options,
  });

  await handleHttpErrors(response as HttpResponse);

  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    return response.json();
  } else if (method !== 'DELETE') {
    return response.text();
  }
};

export const get = async <T = any>(
  endpoint: string,
  // eslint-disable-next-line no-undef
  options: RequestInit = {},
): Promise<T | string> => {
  const result = await apiCall<T>('GET', endpoint, options);
  if (typeof result === 'undefined') {
    throw new Error('No response returned');
  }
  return result;
};

export const post = async <T = any>(
  endpoint: string,
  data: any,
  // eslint-disable-next-line no-undef
  options: RequestInit = {},
): Promise<T | string> => {
  const result = await apiCall<T>('POST', endpoint, data, options);
  if (typeof result === 'undefined') {
    throw new Error('No response returned');
  }
  return result;
};

export const put = async <T = any>(
  endpoint: string,
  data: any,
  // eslint-disable-next-line no-undef
  options: RequestInit = {},
): Promise<T | string> => {
  const result = await apiCall<T>('PUT', endpoint, data, options);
  if (typeof result === 'undefined') {
    throw new Error('No response returned');
  }
  return result;
};

export const remove = async (
  endpoint: string,
  // eslint-disable-next-line no-undef
  options: RequestInit = {},
): Promise<void> => {
  await apiCall('DELETE', endpoint, undefined, options);
};
