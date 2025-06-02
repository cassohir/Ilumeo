import { fastRedact } from './fast-redact.formats';

describe('fastRedact', () => {
  it('should redact a single root-level key with default censor', () => {
    const input = {
      name: 'Cassio',
      age: 30,
      city: 'Wonderland',
    };

    const resultJson = fastRedact(input, { paths: ['age'] });
    const result = JSON.parse(resultJson) as Record<string, unknown>;

    expect(result).toEqual({
      name: 'Cassio',
      age: '*[Redacted]*',
      city: 'Wonderland',
    });

    expect(input.age).toBe(30);
  });

  it('should redact a nested key with default censor', () => {
    const input = {
      user: {
        id: 'user-123',
        credentials: {
          password: 'secret',
          pin: '1234',
        },
        email: 'cassiohir@example.com',
      },
      status: 'active',
    };

    const resultJson = fastRedact(input, {
      paths: ['user.credentials.password'],
    });
    const result = JSON.parse(resultJson) as Record<string, unknown>;

    expect((result.user as any).credentials).toEqual({
      password: '*[Redacted]*',
      pin: '1234',
    });
    expect((result.user as any).email).toBe('cassiohir@example.com');
    expect(result.status).toBe('active');

    expect((input.user as any).credentials.password).toBe('secret');
  });

  it('should redact multiple paths at different levels', () => {
    const input = {
      account: {
        username: 'cassio123',
        details: {
          ssn: '999-88-7777',
          phone: '555-1234',
        },
      },
      preferences: {
        theme: 'dark',
        notifications: {
          email: true,
          sms: false,
        },
      },
    };

    const paths = ['account.details.ssn', 'preferences.notifications.sms'];
    const resultJson = fastRedact(input, { paths });
    const result = JSON.parse(resultJson) as Record<string, unknown>;

    expect((result.account as any).details).toEqual({
      ssn: '*[Redacted]*',
      phone: '555-1234',
    });
    expect((result.preferences as any).notifications).toEqual({
      email: true,
      sms: '*[Redacted]*',
    });

    expect((result.account as any).username).toBe('cassio123');
    expect((result.preferences as any).theme).toBe('dark');
  });

  it('should use a custom censor string when provided', () => {
    const input = {
      user: {
        token: 'abc123token',
        email: 'cassio@example.com',
      },
    };

    const customCensor = '[REMOVED]';
    const resultJson = fastRedact(input, {
      paths: ['user.token'],
      censor: customCensor,
    });
    const result = JSON.parse(resultJson) as Record<string, unknown>;

    expect((result.user as any).token).toBe(customCensor);
    expect((result.user as any).email).toBe('cassio@example.com');
  });

  it('should ignore paths that do not exist without throwing an error', () => {
    const input = {
      name: 'Bob',
      profile: {
        age: 40,
      },
    };

    const resultJson = fastRedact(input, {
      paths: ['nonexistent', 'profile.address', 'profile.age'],
    });
    const result = JSON.parse(resultJson) as Record<string, unknown>;

    expect(result).toEqual({
      name: 'Bob',
      profile: {
        age: '*[Redacted]*',
      },
    });
  });

  it('should handle an empty paths array by returning the original object as JSON', () => {
    const input = {
      key1: 'value1',
      key2: {
        nested: 'value2',
      },
    };

    const resultJson = fastRedact(input, { paths: [] });
    const result = JSON.parse(resultJson) as Record<string, unknown>;

    expect(result).toEqual(input);
  });

  it('should not mutate nested objects when redacting', () => {
    const input = {
      a: {
        b: {
          c: 'secret',
        },
      },
    };

    const clonedInput = JSON.parse(JSON.stringify(input));
    const resultJson = fastRedact(input, { paths: ['a.b.c'] });
    JSON.parse(resultJson);

    expect(input).toEqual(clonedInput);
  });
});
