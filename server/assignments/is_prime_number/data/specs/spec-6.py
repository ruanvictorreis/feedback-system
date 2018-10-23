n = int(input())
if n == 1:
  print(False) 
else:
  primo = True
  i = 2 
  
  while i < n:
    if n % i == 0:
      primo = False
    i += 1	
  
  print(primo)