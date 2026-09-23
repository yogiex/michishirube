export interface UpstreamRequest {
  readonly method: string;
  readonly url: string;
  readonly headers: Readonly<Record<string, string>>;
  readonly body?: string | Buffer;
  readonly timeoutMs: number;
  readonly signal?: AbortSignal;
}

export interface UpstreamResponse {
  readonly status: number;
  readonly headers: Readonly<Record<string, string>>;
  readonly body: Buffer;
}

export interface UpstreamClientPort {
  request(input: UpstreamRequest): Promise<UpstreamResponse>;
}
