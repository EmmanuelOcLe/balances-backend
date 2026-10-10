export function responseSchema({ success = true, message = "", data = null, error = null}) {
  return {
    success,
    message,
    data,
    error
  }
}
