def fibonacci(n):
  temp = 0
  fib_list = [0, 1]
  
  if n == 0:
    return temp
  
  if n == 1:
    return fib_list[0] + fib_list[1]
  
  for i in range(1, n):
    temp = fib_list[0] + fib_list[1]
    fib_list[0] = fib_list[1]
    fib_list[1] = temp 
  return temp
