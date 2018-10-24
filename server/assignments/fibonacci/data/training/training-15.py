def fibonacci(n):
  if n == 0:
    return 0
  
  elif n == 1:
    return 1
  
  else:  
    fib_list = [0, 1]
  
    for i in range(n):
      atual = fib_list[-1]
      anterior = fib_list[-2]
      fib_list.append(atual + anterior)
    return fib_list[n]