def is_prime_number(n):
  prime = True
  i = 2 
  
  while i < n:
    if n % i == 1:
      prime = False
    i += 1	
  return prime and n != 1
