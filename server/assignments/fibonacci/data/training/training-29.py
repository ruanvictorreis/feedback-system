def fibonacci(n):
  lista = [0, 1, 1]
  if(n > 2): 
    for i in range(3, n+1): 
      lista.append(lista[i - 1] + lista[i - 2]) 
  return lista[n]