def fibonacci(n):
  fib_list = [1, 0]
  count = 0
  while(count < n):
    b = fib_list[len(fib_list) - 1]
    a = fib_list[len(fib_list) - 2]
    fib_list.append(a + b)
    count = count + 1
  return fib_list[n]
