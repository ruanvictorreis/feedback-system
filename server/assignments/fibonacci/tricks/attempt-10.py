def fibonacci(n):
  fib_list = [0, 1]
  for i in range(n):
      a = fib_list[len(fib_list)]
      b = fib_list[len(fib_list) - 1]
      fib_list.append(a + b)
  return fib_list[n]
