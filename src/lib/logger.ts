declare const EdgeRuntime: string | undefined;

export type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  metadata?: Record<string, unknown>;
}

interface ErrorMetadata {
  name: string;
  message: string;
  stack?: string;
}

class Logger {
  private static instance: Logger;
  private userId?: string;
  private requestId?: string;
  private isDevelopment: boolean;
  private isEdge: boolean;

  private constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
    this.isEdge = typeof EdgeRuntime !== 'undefined';
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public setUserId(userId: string): void {
    this.userId = userId;
  }

  public setRequestId(requestId: string): void {
    this.requestId = requestId;
  }

  private formatLog(level: LogLevel, message: string, metadata?: Record<string, unknown>): string {
    const timestamp = new Date().toISOString();
    const baseLog = `[${timestamp}] ${level.toUpperCase()}: ${message}`;

    if (!metadata || Object.keys(metadata).length === 0) {
      return baseLog;
    }

    try {
      return `${baseLog}\n${JSON.stringify(metadata, null, 2)}`;
    } catch (error) {
      return `${baseLog}\n[Erro ao serializar metadata]`;
    }
  }

  private async logToConsole(level: LogLevel, message: string, metadata?: Record<string, unknown>): Promise<void> {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      metadata: {
        ...metadata,
        userId: this.userId,
        requestId: this.requestId,
      },
    };

    const formattedMessage = this.formatLog(level, message, entry.metadata);

    switch (level) {
      case 'info':
        console.info(formattedMessage);
        break;
      case 'warn':
        console.warn(formattedMessage);
        break;
      case 'error':
        console.error(formattedMessage);
        break;
      case 'debug':
        console.debug(formattedMessage);
        break;
    }
  }

  public async info(message: string, metadata?: Record<string, unknown>): Promise<void> {
    if (this.isDevelopment || this.isEdge) {
      await this.logToConsole('info', message, metadata);
    }
  }

  public async warn(message: string, metadata?: Record<string, unknown>): Promise<void> {
    await this.logToConsole('warn', message, metadata);
  }

  public async error(
    message: string,
    error?: Error,
    metadata?: Record<string, unknown>
  ): Promise<void> {
    const errorMetadata: ErrorMetadata | undefined = error
      ? {
          name: error.name,
          message: error.message,
          stack: error.stack,
        }
      : undefined;

    const fullMetadata = {
      ...metadata,
      error: errorMetadata,
    };

    await this.logToConsole('error', message, fullMetadata);

    // Em desenvolvimento, mostra o stack trace completo
    if (this.isDevelopment && error?.stack) {
      console.error(error.stack);
    }
  }

  public async debug(message: string, metadata?: Record<string, unknown>): Promise<void> {
    if (this.isDevelopment || this.isEdge) {
      await this.logToConsole('debug', message, metadata);
    }
  }
}

export const logger = Logger.getInstance();
