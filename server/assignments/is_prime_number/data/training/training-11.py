def is_prime_number(n):
  i = 2 
  isPrime = True
  while i < n:
    if n % i == 0:
      isPrime = False
    i += 1	
  
  if n == 1:
    return False
  else:
    return isPrime