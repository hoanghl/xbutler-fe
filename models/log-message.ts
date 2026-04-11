export enum LogLevel {
  ERROR = 1,
  WARN,
  INFO,
  DEBUG,
  TRACE,
}

export class LogMessage {
  level: LogLevel;
  content: string;
  dt: Date;

  constructor(level: LogLevel, content: string, dt: Date = new Date()) {
    this.level = level;
    this.content = content;
    this.dt = dt;
  }
}
