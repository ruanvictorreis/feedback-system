def is_prime_number(n):
  if n == 1:
    return False
	  
  for i in range(n):
    if n % i == 0:
      return False
  return True
