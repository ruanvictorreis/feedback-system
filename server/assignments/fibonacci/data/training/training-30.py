def fibonacci(n): 
  if n == 0: 
    return 0 
  if n == 1: 
    return 1 
  else: 
    x = 0 
    y = 1 
    ans = 0 
    for i in range(n - 1): 
      ans = x + y 
      x = y 
      y = ans 
    return ans