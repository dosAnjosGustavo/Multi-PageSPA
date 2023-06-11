export function isValidText(value?: string, minLength = 1) {
  return value && value.trim().length >= minLength;
}

export function isValidDate(value?: string) {
  if (!value) return false;

  const date = new Date(value) as Date | 'Invalid Date';
  return date !== 'Invalid Date';
}

export function isValidImageUrl(value?: string) {
  return value && value.startsWith('http');
}

export function isValidEmail(value?: string) {
  return value && value.includes('@');
}
