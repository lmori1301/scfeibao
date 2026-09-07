export const TEST_DATA_MARKER = '[测试数据]';

function shouldSkipObject(value: object) {
  return (
    value instanceof Date ||
    value instanceof Map ||
    value instanceof Set ||
    value instanceof URL ||
    ArrayBuffer.isView(value) ||
    value instanceof ArrayBuffer
  );
}

function stripValue<T>(value: T, seen: WeakSet<object>): T {
  if (typeof value === 'string') {
    const sanitized = value.startsWith(TEST_DATA_MARKER)
      ? value.slice(TEST_DATA_MARKER.length)
      : value;
    return sanitized as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => stripValue(item, seen)) as T;
  }

  if (!value || typeof value !== 'object' || shouldSkipObject(value)) {
    return value;
  }

  if (seen.has(value)) {
    return value;
  }
  seen.add(value);

  for (const key of Object.keys(value)) {
    const objectValue = value as Record<string, unknown>;
    objectValue[key] = stripValue(objectValue[key], seen);
  }

  return value;
}

export function stripTestDataMarker<T>(value: T): T {
  return stripValue(value, new WeakSet<object>());
}
