import { encodeStringToBase64 } from './encode64';
import { genId } from './genId';
import { getFullKeyPaths } from './object';

describe('Utils', () => {
  it('should generate a valid UUID-like string', () => {
    const id = genId();
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

    expect(id).toMatch(uuidRegex);
  });

  it('should encode a given string to Base64', () => {
    const input = 'Hello, World!';
    const expectedOutput = Buffer.from(input, 'utf-8').toString('base64');

    const result = encodeStringToBase64(input);

    expect(result).toBe(expectedOutput);
  });

  it('should generate unique IDs on each call', () => {
    const id1 = genId();
    const id2 = genId();

    expect(id1).not.toBe(id2);
  });

  it('should produce IDs of length 36', () => {
    const id = genId();
    expect(id.length).toBe(36);
  });

  it('should return the correct key paths for a given key in a nested object', () => {
    const obj = {
      a: {
        b: {
          key: 'value1',
          c: {
            key: 'value2',
          },
        },
      },
      d: {
        key: 'value3',
      },
    };

    const key = 'key';
    const result = getFullKeyPaths(obj, key);

    expect(result).toEqual(['a.b.key', 'a.b.c.key', 'd.key']);
  });
  it('should return an empty array if the key is not found', () => {
    const obj = {
      a: {
        b: {
          value: 'value1',
        },
      },
    };

    const key = 'key';
    const result = getFullKeyPaths(obj, key);

    expect(result).toEqual([]);
  });

  it('should handle an empty object and return an empty array', () => {
    const obj = {};
    const key = 'key';
    const result = getFullKeyPaths(obj, key);

    expect(result).toEqual([]);
  });

  it('should handle a primitive value for the key and return the path correctly', () => {
    const obj = {
      a: {
        key: 'value',
      },
    };

    const key = 'key';
    const result = getFullKeyPaths(obj, key);

    expect(result).toEqual(['a.key']);
  });
});
