def fibonacci(n):
  fib_list = [1, 0]
  count = 0
  while(count < n):
    atual = fib_list[len(fib_list) - 1]
    anterior = fib_list[len(fib_list) - 2]
    fib_list.append(anterior + atual)
    count = count + 1
  return fib_list[n]
