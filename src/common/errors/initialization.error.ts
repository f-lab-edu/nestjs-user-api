export class InitializationError extends Error {
  constructor(readonly message: string) {
    super(message);
  }
}
