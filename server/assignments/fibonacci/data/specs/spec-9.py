n = int(input()) 
lista = [0, 1]
  
for i in range(n):
  lista.append(lista[-1] + lista[-2])
print(lista[n])