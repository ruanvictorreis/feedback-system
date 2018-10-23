n = int(input())

if n == 1:
  print(False)
else:
  primo = True
  
  for i in range(2, n+1):
    if n % i == 0:
      primo = False
  print(primo)
