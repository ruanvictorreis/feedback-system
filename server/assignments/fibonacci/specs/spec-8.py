def fibonacci(n):
  f_ant = 0
  f_atual = 1
  i = 1
  
  if n == 0:
    return 0	    
  
  while i < n:
    f_prox = f_ant + f_atual
    f_ant = f_atual
    f_atual = f_prox
    i = i + 1     
  return f_atual
