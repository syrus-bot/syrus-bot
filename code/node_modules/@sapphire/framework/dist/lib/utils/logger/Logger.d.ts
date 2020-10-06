import { ILogger, LogLevel } from './ILogger';
export declare class Logger implements ILogger {
    level: LogLevel;
    constructor(level: LogLevel);
    trace(...values: readonly unknown[]): void;
    debug(...values: readonly unknown[]): void;
    info(...values: readonly unknown[]): void;
    warn(...values: readonly unknown[]): void;
    error(...values: readonly unknown[]): void;
    fatal(...values: readonly unknown[]): void;
    write(level: LogLevel, ...values: readonly unknown[]): void;
    private static readonly levels;
}
export declare type LogMethods = 'trace' | 'debug' | 'info' | 'warn' | 'error';
//# sourceMappingURL=Logger.d.ts.map