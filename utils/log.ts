function getTimestamp(): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
  }).format(new Date());
}

export function log(content: any, tag: string = "xButler") {
  console.log("\x1b[32m%s\x1b[0m", `${tag} | ${getTimestamp()} | ${content}`);
}

export function warn(content: any, tag: string = "xButler") {
  console.warn("\x1b[33m%s\x1b[0m", `${tag} | ${getTimestamp()} | ${content}`);
}

export function error(content: any, tag: string = "xButler") {
  console.error("\x1b[31m%s\x1b[0m", `${tag} | ${getTimestamp()} | ${content}`);
}

export function debug(content: any, tag: string = "xButler") {
  console.debug("\x1b[34m%s\x1b[0m", `${tag} | ${getTimestamp()} | ${content}`);
}
