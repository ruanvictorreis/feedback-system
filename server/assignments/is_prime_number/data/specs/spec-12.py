n = int(input())
lista = []

for i in range(1, n+1):
  if n % i == 0:
    lista.append(i) 

print(len(lista) == 2)