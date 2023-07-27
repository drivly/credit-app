import { twMerge } from 'tailwind-merge'
import { ClassValue, clsx } from 'clsx'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatSSN(value: string) {
  if (!value) return value
  const ssn = value.replace(/\D/g, '')
  const ssnLength = ssn.length
  if (ssnLength < 4) return ssn
  if (ssnLength < 6) return `${ssn.slice(0, 3)}-${ssn.slice(3)}`
  return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5, 9)}`
}

export function formatMoney(value: string) {
  if (!value) return value
  const money = value.replace(/\D/g, '')
  const moneyLength = money.length
  if (moneyLength > 7) return value.slice(0, -1)

  if (moneyLength < 4) return '$' + money
  if (moneyLength < 5) return '$' + money.slice(0, 1) + ',' + money.slice(1)
  if (moneyLength < 6) return '$' + money.slice(0, 2) + ',' + money.slice(2)
  if (moneyLength < 7) return '$' + money.slice(0, 3) + ',' + money.slice(3)
  if (moneyLength < 8)
    return '$' + money.slice(0, 1) + ',' + money.slice(1, 4) + ',' + money.slice(4)
}

export function formatMiles(value: string) {
  if (!value) return value
  const miles = value.replace(/\D/g, '')
  const milesLength = miles.length
  if (milesLength > 7) return value.slice(0, -1)

  if (milesLength < 4) return miles
  if (milesLength < 5) return miles.slice(0, 1) + ',' + miles.slice(1)
  if (milesLength < 6) return miles.slice(0, 2) + ',' + miles.slice(2)
  if (milesLength < 7) return miles.slice(0, 3) + ',' + miles.slice(3)
  if (milesLength < 8) return miles.slice(0, 1) + ',' + miles.slice(1, 4) + ',' + miles.slice(4)
}

export function isAtLeast18(dateString: string | number | Date) {
  var dateOfBirth = new Date(dateString)
  var today = new Date()

  var age = today.getFullYear() - dateOfBirth.getFullYear()
  var monthDiff = today.getMonth() - dateOfBirth.getMonth()

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--
  }

  return age >= 18
}

export function vinChecksum(vin: string) {
  const checksumTable: Record<string, number> = {
    A: 1,
    B: 2,
    C: 3,
    D: 4,
    E: 5,
    F: 6,
    G: 7,
    H: 8,
    J: 1,
    K: 2,
    L: 3,
    M: 4,
    N: 5,
    P: 7,
    R: 9,
    S: 2,
    T: 3,
    U: 4,
    V: 5,
    W: 6,
    X: 7,
    Y: 8,
    Z: 9,
  }
  const weights = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]
  let checksum = 0
  for (let index = 0; index < vin.length; index++) {
    const value = vin[index]
    checksum += weights[index] * (checksumTable[value] || parseInt(value))
  }
  checksum %= 11
  return vin[8] === (checksum === 10 ? 'X' : checksum.toString())
}
