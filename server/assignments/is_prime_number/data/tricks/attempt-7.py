n = int(input())
i = 0
primo = True

if n == 1:
  print(False)
else:
  while i < n:
    if n % i == 0:
      primo = False
    i += 1	
  print(primo)