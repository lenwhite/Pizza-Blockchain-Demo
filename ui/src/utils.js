export function serializeForm(form) {
  const fd = new FormData(form);

  return Array.from(fd.entries()).reduce((acc, pair) => ({
    ...acc,
    [pair[0]]: pair[1],
  }), {});
}