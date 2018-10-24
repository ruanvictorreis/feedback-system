def fibonacci(n):
  if n == 0:
    return 0
  
  elif n == 1:
    return 1
  
  else:  
    fib_list = [0, 1]
    count = 0
  
    while (count < n):
      size = len(fib_list)
      atual = fib_list[size - 1]
      anterior = fib_list[size - 2]
      fib_list.append(atual + anterior)
      count = count + 1
    return fib_list[n]