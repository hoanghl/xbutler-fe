export class IP {
  a: number = 0;
  b: number = 0;
  c: number = 0;
  d: number = 0;

  constructor(a: number, b: number, c: number, d: number) {
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
  }

  /**
   * Parse octets of IpV4 in string format to IP
   * @param text IP in text format
   * @returns
   */
  static parseFromString(text: string): IP | null {
    try {
      const octets = text.split(".").map((val, _) => parseInt(val));
      if (octets.length != 4) {
        console.error(
          `Error as parsing IP: Expected 4 octets. Received: ${JSON.stringify(
            octets
          )}`
        );

        return null;
      }
      return new IP(octets[0], octets[1], octets[2], octets[3]);
    } catch (error) {
      console.error(`Error as parsing IP: ${error}`);
      return null;
    }
  }
}
