import time

start = time.time()
print("hello")
text_file = 'rugsack.txt'
skra = open(text_file, 'r').readlines()
sum = 0
text1 = []
text2 = []
text3 = []
length = len(text1)
i=0

for line in skra:
    text1, text2, text3 = [skra[i::3]for i in range(3)]
    
while i<length:
    str1 = ""
    for text in text1[i]:
        if text in text2[i] and text in text3[i]:
            str2 = "".join(set(text))
            for char in str2:
                if char not in str1:
                    str1 +=char
    for char in str1:
        if char.islower() == True:
            sum += ord(char)-96
        if char.isupper() == True:
            sum += ord(char)-38
    i+=1
print(sum)
end = time.time()
print(end - start)