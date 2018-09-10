def is_prime_number(n):
  isPrime = False
  for i in range(2, n):
    if n % i == 0:
      isPrime = True
  return isPrime and n != 1
