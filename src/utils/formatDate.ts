export default function formatDate(
  date: string | Date | number | any,
  withTimeZone?: boolean
): string {
  return withTimeZone
    ? new Date(date).toLocaleDateString('en-US', { timeZoneName: 'short' })
    : new Date(date).toLocaleDateString('en-US')
}
