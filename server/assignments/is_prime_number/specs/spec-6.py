def is_prime_number(n):
  i = 2
  while n > i :
    if n % i == 0 and i != n:
      return False
    i += 1
  return True and n != 1
