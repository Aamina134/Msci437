import pandas as pd 
import numpy as np 
import sys
import csv
import os
import re
import json

route = sys.argv[1]
timeOfDay = sys.argv[2]
transportation = sys.argv[3]


# Edit timeOfDay, transportation, and routeAreas, to play around with parameters
# timeOfDay = "Evening" # 'Morning', 'Afternoon', 'Evening', 'Night'
# transportation = 'Feet' # 'Bikes', 'Feet', or 'Transit'

numLonInc = 40
numLatInc = 20

lonInc = 0.517203388408703/numLonInc
latInc = 0.266676942739899/numLatInc

minLon = -79.6392473469942 + lonInc
minLat = 43.5864869503928 + latInc

maxLon = minLon + lonInc*19
maxLat = minLat + latInc*9


routeAreas = [[False] * numLonInc for i in range (numLatInc)]
for point in route:
    if point[0] < minLon:
        if point[1] < minLat:
            routeAreas[0][0] = True
        elif point [1] >= maxLat:
            routeAreas[numLatInc-1][0] = True
        else:
            latIndex = int((route[1]-minLat)/latInc)+1
            routeAreas[latIndex][0] = True
    elif point[0] >= maxLon:
        if point[1] < minLat:
            routeAreas[0][numLonInc-1] = True
        elif point [1] >= maxLat:
            routeAreas[numLatInc-1][numLonInc-1] = True
        else:
            latIndex = int((route[1]-minLat)/latInc)+1
            routeAreas[latIndex][numLonInc-1] = True
    else:
        if point[1] < minLat:
            lonIndex = int((route[0]-minLon)/lonInc)+1
            routeAreas[latIndex][lonIndex] = True
        elif point [1] >= maxLat:
            lonIndex = int((route[0]-minLon)/lonInc)+1
            routeAreas[latIndex][lonIndex] = True
        else:
            latIndex = int((route[1]-minLat)/latInc)+1
            lonIndex = int((route[0]-minLon)/lonInc)+1
            routeAreas[latIndex][lonIndex] = True

priority = {'Bikes': [0.7, 0.2, 0.03, 0.1, 0.2, 0.6], 'Feet': [0.56, 0, 0.09, 0.15, 0.3, 0.54], 'Transit': [0.14, 0, 0.09, 0.2, 0.2, 0.36]}
maxBike = 158130
maxFeet = 126504
maxTransit = 31626

file = os.getcwd() + "\data\datasets\\"+ timeOfDay + ".csv"

with open(file, newline='') as csvfile:
    rows = csv.reader(csvfile, delimiter=',', quotechar='"')
    lat = []
    for row in rows:
        c = 0
        long = []
        for item in row:
            long.append([int(s) for s in re.findall(r'\b\d+\b', item)])
        lat.append(long)

counts = [0,0,0,0,0,0]

# (Below was used to obtain max danger scores for each mode of transportation)
# for row in lat:
#     for value in row:
#         sum = 0
#         c = 0
#         for items in value:
#             sum+=priority['Bikes'][c]*value[c]
#         if maxBike < sum:
#             maxBike = sum
#         sum = 0
#         c = 0
#         for items in value:
#             sum+=priority['Feet'][c]*value[c]
#         if maxFeet < sum:
#             maxFeet = sum
#         sum = 0
#         c = 0
#         for items in value:
#             sum+=priority['Transit'][c]*value[c]
#         if maxTransit < sum:
#             maxTransit = sum

# print(int(maxBike))
# print(int(maxFeet)) 
# print(int(maxTransit))

r = 0
for row in routeAreas:
    c = 0
    for value in row:
        if value:
            counts[0] += lat[r][c][0]
            counts[1] += lat[r][c][1]
            counts[2] += lat[r][c][2]
            counts[3] += lat[r][c][3]
            counts[4] += lat[r][c][4]
            counts[5] += lat[r][c][5]
        c+=1
    r+=1
# print(counts)

score = 0
for c in range(6):
    score+=counts[c]*priority[transportation][c]

print(score)