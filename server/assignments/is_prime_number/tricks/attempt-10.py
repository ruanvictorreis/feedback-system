def is_prime_number(n):  
  for i in range(2, n):
    if not ( n % i ):
      return False
  return True
