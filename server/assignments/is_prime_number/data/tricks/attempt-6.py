def is_prime_number(n):
  i = 1
  while n > i :
    if n % i == 0:
      return False
    i += 1
  return True and n != 1
