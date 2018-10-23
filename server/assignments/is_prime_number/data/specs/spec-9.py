n = int(input())
primo = True
i = 2 
  
while i < n:
  if n % i == 0:
    primo = False
  i += 1	

if n == 1:
  print(False)
else:
  print(primo)