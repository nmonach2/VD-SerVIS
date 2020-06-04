

import requests
import sys
import grequests
import datetime
import csv

from math import sin, cos, sqrt, atan2, radians


'''
Function to compute distance between two points
Parameters:
- x: longitude in WGS84 format
- y: latitude in WGS84 format
Returns: distance in meters
'''

def distance(y, x):
    # approximate radius of earth in km
    R = 6373.0

    # transform in radians
    lat1 = radians(float(x[1]))
    lon1 = radians(float(x[0]))
    lat2 = radians(float(y[0]))
    lon2 = radians(float(y[1]))
    
    # compute distance in degree
    dlon = lon2 - lon1
    dlat = lat2 - lat1

    # compute great circle distance
    a = sin(dlat / 2)**2 + cos(lat1) * cos(lat2) * sin(dlon / 2)**2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    distance = R * c
    #print(distance)
    return distance * 1000

 # retrieve location of each services

csv_file = []

with open("SER_units.csv") as service: #Location of all service units
    csv_file = list(csv.reader(service, delimiter=";"))[1:]
    
hectares = []
with open("hectares.csv") as hectares_csv: #Location of all hectares reference points
    hectares = list(csv.reader(hectares_csv))[1:]

i = 0
offset = 1 # batch size
url = 'http://23.97.242.138:8080/otp/routers/ch/plan'
        
# appending to csv file
with open('SER_units.csv', 'w') as out:
    # while we still don't have processed all hectares
    while i + offset < len(hectares):
         # print current time to be able to track progress
        if i % 1 == 0:
            print("PROGRESS : Hectare ["+str(i) + "] at " +str(datetime.datetime.now()))
            
        hect = hectares[i:i+offset]  # select batch
        p = []
        service = []
        for h in hect:  # for each hectare
            coord_h_str = str(h[1]) + ',' + str(h[0])  # concatenate both coordinate
            
            param_req = []  # request parameters for each service
           
           # for each service we will compute time
            for j, e in enumerate(csv_file):
                #print(j)
                # compute only if service is closer than X meters
                if distance(e[4:6], h[:2]) > 20000:
                    continue
                    
                service.append(e)
                coord_e_str = str(e[4]) + ',' + str(e[5])
                
                # sometime request do not give result in a direction. We therefore test both
                data = {
                    'toPlace': coord_e_str,
                    'fromPlace': coord_h_str,
                    'mode': 'CAR,WALK',
                    'numItineraries': 1
                }
                
                param_req.append(data)
                data_inv = {
                    'toPlace': coord_h_str,
                    'fromPlace': coord_e_str,
                    'mode': 'CAR,WALK',
                    'numItineraries': 1
                }
                param_req.append(data_inv) 
                
            p += param_req # add request to batch to process
            
        #  we will send requests in parallel via grequests.
        # We launch the http request for all the service at the same time.
        # We therefore do not have to wait for the first response before 
        # sending the next one resulting in a massive speedup.
        requests = [grequests.get(url, params=p[i]) for i in range(0, len(p))]
        response = grequests.map(requests)  # mapping the response to a list
        
        '''
        Get a JSON object and returns the duration of the first itineraries if present, else the system biggest number
        '''
        def get_duration(x): 
            return x.json().get('plan', {}).get('itineraries', [{}])[0].get('duration', sys.maxsize)
       
        for j in range(0, len(hect)):
            services_responses_for_specific_hectare = response[j*len(service)*2:(j+1)*len(service)*2]  # we get the service in the batched responses
            times = [get_duration(x) if x is not None else sys.maxsize for x in services_responses_for_specific_hectare ]  # iterate over all services response to get the durations
            nearest_service_unit = times.index(min(times)) // 2  # get the closest service index (divide by 2 since we looked for both direction)
            coord = hect[j]
            nearest_service_unit_id = service[nearest_service_unit][0]
            duration = min(times)  # shortest duration
            # write to .csv hectare infos, duration to the nearest service unit and its id
            out.write(str(hect[j][2]) + ';' + str(coord[1]) + ';' + str(coord[0]) + ';' + nearest_service_unit_id + ';' + str(duration) + ';' +  str(hect[j][5])+ '\n');
            
        i += offset  # increment hectares index by a batch size
    