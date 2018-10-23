n = int(input())

if n == 1:
  print(False)
else:  
  primo = True
  
  for i in range(1, n):
    if n % i == 0:
      primo = False
  print(primo)
