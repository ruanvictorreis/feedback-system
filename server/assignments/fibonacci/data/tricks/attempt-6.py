def fibonacci(n):
  fib_list = [1, 1]
  
  for i in range(n):
      atual = fib_list[len(fib_list) - 1]
      anterior = fib_list[len(fib_list) - 2]
      fib_list.append(atual + anterior)
  return fib_list[n]
