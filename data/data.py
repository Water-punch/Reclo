import pandas as pd
# import csv

data = pd.read_csv("temp.csv")
print(data)

data1 = pd.read_csv("kr_waste.csv")
print(data1)

data2 = pd.read_csv("us_dr.csv")
print(data2)
# k = open("./temp.csv",'r',encoding="utf-8")

# kdr = csv.reader(k)

# for line in kdr:
#     print(line)