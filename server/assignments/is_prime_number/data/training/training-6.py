def is_prime_number(n):
  i = 2
  isPrime = True
  while n > i :
    if n % i == 0:
      isPrime = False
    i += 1
  return isPrime and n != 1