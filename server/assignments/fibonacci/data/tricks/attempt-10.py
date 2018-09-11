def fibonacci(n):
  fib_list = [0, 1]
  
  if n == 0:
    return fib_list[0]
  
  if n == 1:
    return fib_list[1]
  
  for i in range(n-1):
    temp = fib_list[0] + fib_list[1]
    fib_list[0] = fib_list[1]
    fib_list[1] = temp 
  return fib_list[0]