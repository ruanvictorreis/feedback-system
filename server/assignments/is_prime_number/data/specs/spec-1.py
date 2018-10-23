n = int(input())
primo = True
i = 2

if n == 1:
  primo = False
  
while i < n and primo:
  if n % i == 0:
    primo = False
  i += 1	

print(primo)