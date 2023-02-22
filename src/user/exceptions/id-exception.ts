export class IdException extends Error {
  constructor(message?: string) {
    super(message || 'invalid id');
  }
}
