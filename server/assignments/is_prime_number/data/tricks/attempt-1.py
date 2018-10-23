n = int(input())
prime = True
i = 2
  
while i < n:
  if n % i == 0:
    prime = False
  i += 1	
print(prime)