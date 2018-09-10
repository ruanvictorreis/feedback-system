def is_prime_number(n):
  prime = False
  i = 2
  
  if n == 1:
    return False
    
  while i < n:
    if n % i == 0:
      prime = True
    i += 1	
  return prime
