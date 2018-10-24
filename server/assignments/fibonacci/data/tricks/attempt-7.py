n = int(input())
fib_list = [0, 1]

for i in range(n):
  atual = fib_list[len(fib_list)]
  anterior = fib_list[len(fib_list) - 1]
  fib_list.append(atual + anterior)
print(fib_list[n])