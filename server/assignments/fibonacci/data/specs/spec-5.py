n = int(input())
fib_list = [0, 1]
contador = 0
  
while (contador < n):
  atual = fib_list[-1]
  anterior = fib_list[-2]
  fib_list.append(atual + anterior)
  contador = contador + 1
print(fib_list[n])