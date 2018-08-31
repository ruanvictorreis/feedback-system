def is_prime_number(n):  
  for i in range(n):
    if n % i == 0:
      return False
  return True and n != 1