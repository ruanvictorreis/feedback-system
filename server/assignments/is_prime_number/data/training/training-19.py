def is_prime_number(n):
  if n == 1:
    return False 
  elif n <= 3:
    return True
  else:
    isPrime = True
    for i in range(2, n, 1):
      if n % i == 0:
        isPrime = False
    return isPrime