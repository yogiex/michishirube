import { describe, it, expect } from 'vitest';
import { ValueObject } from '../value-object.js';

interface EmailProps {
  readonly value: string;
}

class Email extends ValueObject<EmailProps> {
  constructor(value: string) {
    if (!value.includes('@')) throw new Error('Invalid email');
    super({ value });
  }

  get value(): string {
    return this.props.value;
  }

  isFrozen(): boolean {
    return Object.isFrozen(this.props);
  }
}

describe('ValueObject', () => {
  it('menyimpan props', () => {
    expect(new Email('a@b.com').value).toBe('a@b.com');
  });

  it('equals true untuk props sama', () => {
    expect(new Email('a@b.com').equals(new Email('a@b.com'))).toBe(true);
  });

  it('equals true untuk referensi sama', () => {
    const e = new Email('a@b.com');
    expect(e.equals(e)).toBe(true);
  });

  it('equals false untuk props beda', () => {
    expect(new Email('a@b.com').equals(new Email('c@d.com'))).toBe(false);
  });

  it('equals false untuk undefined / null', () => {
    expect(new Email('a@b.com').equals(undefined)).toBe(false);
    expect(new Email('a@b.com').equals(null)).toBe(false);
  });

  it('immutable — props frozen', () => {
    expect(new Email('a@b.com').isFrozen()).toBe(true);
  });

  it('toJSON mengembalikan copy props', () => {
    expect(new Email('a@b.com').toJSON()).toEqual({ value: 'a@b.com' });
    expect(JSON.stringify(new Email('a@b.com'))).toBe('{"value":"a@b.com"}');
  });

  it('validasi di constructor', () => {
    expect(() => new Email('invalid')).toThrow(/Invalid/);
  });
});
