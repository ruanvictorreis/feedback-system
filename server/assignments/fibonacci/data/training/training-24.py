def fibonacci(n):
  n0 = 0 
  n1 = 1

  if n == 0: 
    return n0 
  elif n == 1: 
    return n1 
  else: 
    while n > 0: 
      temp = n0 
      n0 = n1 
      n1 = temp + n1 
      n -= 1 
    return n0