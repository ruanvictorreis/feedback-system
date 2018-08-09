def is_prime_number(n):
  if n < 2:
    return False

  prime = True
  i = 2 
  
  while i < n and prime:
    if n % i:
	  prime = False
    i += 1	
  return prime
